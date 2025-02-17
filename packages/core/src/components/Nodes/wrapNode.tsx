import React, { useEffect, useRef, memo } from 'react';
import type { ComponentType, MouseEvent, KeyboardEvent } from 'react';
import cc from 'classcat';

import { useStoreApi } from '../../hooks/useStore';
import { Provider } from '../../contexts/NodeIdContext';
import { ARIA_NODE_DESC_KEY } from '../A11yDescriptions';
import useDrag from '../../hooks/useDrag';
import useUpdateNodePositions from '../../hooks/useUpdateNodePositions';
import { getMouseHandler, handleNodeClick } from './utils';
import { elementSelectionKeys, isInputDOMNode } from '../../utils';
import type { NodeProps, WrapNodeProps, XYPosition } from '../../types';

export const arrowKeyDiffs: Record<string, XYPosition> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

export default (NodeComponent: ComponentType<NodeProps>) => {
  const NodeWrapper = ({
    id,
    type,
    data,
    xPos,
    yPos,
    xPosOrigin,
    yPosOrigin,
    selected,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onContextMenu,
    onDoubleClick,
    style,
    className,
    isDraggable,
    isSelectable,
    isConnectable,
    isFocusable,
    selectNodesOnDrag,
    sourcePosition,
    targetPosition,
    hidden,
    resizeObserver,
    dragHandle,
    zIndex,
    isParent,
    noDragClassName,
    noPanClassName,
    initialized,
    disableKeyboardA11y,
    ariaLabel,
    rfId,
    hasHandleBounds,
  }: WrapNodeProps) => {
    const store = useStoreApi();
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const prevNodeRef = useRef<HTMLDivElement | null>(null);
    const prevSourcePosition = useRef(sourcePosition);
    const prevTargetPosition = useRef(targetPosition);
    const prevType = useRef(type);
    const hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
    const updatePositions = useUpdateNodePositions();

    const onMouseEnterHandler = getMouseHandler(id, store.getState, onMouseEnter);
    const onMouseMoveHandler = getMouseHandler(id, store.getState, onMouseMove);
    const onMouseLeaveHandler = getMouseHandler(id, store.getState, onMouseLeave);
    const onContextMenuHandler = getMouseHandler(id, store.getState, onContextMenu);
    const onDoubleClickHandler = getMouseHandler(id, store.getState, onDoubleClick);
    const onSelectNodeHandler = (event: MouseEvent) => {
      const { nodeDragThreshold, preventNodeClick } = store.getState();
      console.log("internal node click", preventNodeClick)

      if (preventNodeClick) {
        return;
      }

      if (isSelectable && (!selectNodesOnDrag || !isDraggable || nodeDragThreshold > 0)) {
        // this handler gets called within the drag start event when selectNodesOnDrag=true
        handleNodeClick({
          id,
          store,
          nodeRef,
        });
      }

      if (onClick) {
        const node = store.getState().nodeInternals.get(id);

        if (node) {
          onClick(event, { ...node });
        }
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isInputDOMNode(event)) {
        return;
      }

      if (disableKeyboardA11y) {
        return;
      }

      if (elementSelectionKeys.includes(event.key) && isSelectable) {
        const unselect = event.key === 'Escape';

        handleNodeClick({
          id,
          store,
          unselect,
          nodeRef,
        });
      } else if (isDraggable && selected && Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
        store.setState({
          ariaLiveMessage: `Moved selected node ${event.key
            .replace('Arrow', '')
            .toLowerCase()}. New position, x: ${~~xPos}, y: ${~~yPos}`,
        });

        updatePositions({
          x: arrowKeyDiffs[event.key].x,
          y: arrowKeyDiffs[event.key].y,
          isShiftPressed: event.shiftKey,
        });
      }
    };

    useEffect(() => {
      return () => {
        if (prevNodeRef.current) {
          resizeObserver?.unobserve(prevNodeRef.current);
          prevNodeRef.current = null;
        }
      };
    }, []);

    useEffect(() => {
      if (nodeRef.current && !hidden) {
        const currNode = nodeRef.current;
        if (!initialized || !hasHandleBounds || prevNodeRef.current !== currNode) {
          // At this point we always want to make sure that the node gets re-measured / re-initialized.
          // We need to unobserve it first in case it is still observed
          if (prevNodeRef.current) {
            resizeObserver?.unobserve(prevNodeRef.current);
          }
          resizeObserver?.observe(currNode);
          prevNodeRef.current = currNode;
        }
      }
    }, [hidden, initialized, hasHandleBounds]);

    useEffect(() => {
      // when the user programmatically changes the source or handle position, we re-initialize the node
      const typeChanged = prevType.current !== type;
      const sourcePosChanged = prevSourcePosition.current !== sourcePosition;
      const targetPosChanged = prevTargetPosition.current !== targetPosition;

      if (nodeRef.current && (typeChanged || sourcePosChanged || targetPosChanged)) {
        if (typeChanged) {
          prevType.current = type;
        }
        if (sourcePosChanged) {
          prevSourcePosition.current = sourcePosition;
        }
        if (targetPosChanged) {
          prevTargetPosition.current = targetPosition;
        }
        store.getState().updateNodeDimensions([{ id, nodeElement: nodeRef.current, forceUpdate: true }]);
      }
    }, [id, type, sourcePosition, targetPosition]);

    const dragging = useDrag({
      nodeRef,
      disabled: hidden || !isDraggable,
      noDragClassName,
      handleSelector: dragHandle,
      nodeId: id,
      isSelectable,
      selectNodesOnDrag,
    });

    if (hidden) {
      return null;
    }

    return (
      <div
        className={cc([
          'react-flow__node',
          `react-flow__node-${type}`,
          {
            // this is overwritable by passing `nopan` as a class name
            [noPanClassName]: isDraggable,
          },
          className,
          {
            selected,
            selectable: isSelectable,
            parent: isParent,
            dragging,
          },
        ])}
        ref={nodeRef}
        style={{
          zIndex,
          transform: `translate(${xPosOrigin}px,${yPosOrigin}px)`,
          pointerEvents: hasPointerEvents ? 'all' : 'none',
          visibility: initialized ? 'visible' : 'hidden',
          ...style,
        }}
        data-id={id}
        data-testid={`rf__node-${id}`}
        onMouseEnter={onMouseEnterHandler}
        onMouseMove={onMouseMoveHandler}
        onMouseLeave={onMouseLeaveHandler}
        onContextMenu={onContextMenuHandler}
        onClick={onSelectNodeHandler}
        onDoubleClick={onDoubleClickHandler}
        onKeyDown={isFocusable ? onKeyDown : undefined}
        tabIndex={isFocusable ? 0 : undefined}
        role={isFocusable ? 'button' : undefined}
        aria-describedby={disableKeyboardA11y ? undefined : `${ARIA_NODE_DESC_KEY}-${rfId}`}
        aria-label={ariaLabel}
      >
        <Provider value={id}>
          <NodeComponent
            id={id}
            data={data}
            type={type}
            xPos={xPos}
            yPos={yPos}
            selected={selected}
            isConnectable={isConnectable}
            sourcePosition={sourcePosition}
            targetPosition={targetPosition}
            dragging={dragging}
            dragHandle={dragHandle}
            zIndex={zIndex}
          />
        </Provider>
      </div>
    );
  };

  NodeWrapper.displayName = 'NodeWrapper';

  return memo(NodeWrapper);
};
