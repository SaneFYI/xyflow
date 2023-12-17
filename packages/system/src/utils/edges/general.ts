import { Connection, Transform, errorMessages, internalsSymbol, isEdgeBase } from '../..';
import { EdgeBase, NodeBase } from '../../types';
import { isNumeric, getOverlappingArea, boxToRect, nodeToBox, getBoundsOfBoxes, devWarn } from '../general';

// this is used for straight edges and simple smoothstep edges (LTR, RTL, BTT, TTB)
export function getEdgeCenter({
  sourceX,
  sourceY,
  targetX,
  targetY,
}: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}): [number, number, number, number] {
  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  return [centerX, centerY, xOffset, yOffset];
}

export function getEdgeZIndex(
  selected: boolean | undefined,
  zIndex: number | undefined,
  sourceNode: NodeBase,
  targetNode: NodeBase,
  elevateEdgesOnSelect?: boolean
) {
  const hasZIndex = isNumeric(zIndex);
  let nextZIndex = hasZIndex ? zIndex! : 0;

  if (elevateEdgesOnSelect) {
    const edgeOrConnectedNodeSelected = selected || targetNode?.selected || sourceNode?.selected;
    const selectedZIndex = Math.max(sourceNode?.[internalsSymbol]?.z || 0, targetNode?.[internalsSymbol]?.z || 0, 1000);
    nextZIndex = (hasZIndex ? zIndex! : 0) + (edgeOrConnectedNodeSelected ? selectedZIndex : 0);
  }

  return nextZIndex;
}

type IsEdgeVisibleParams = {
  sourceNode: NodeBase;
  targetNode: NodeBase;
  width: number;
  height: number;
  transform: Transform;
};

export function isEdgeVisible({ sourceNode, targetNode, width, height, transform }: IsEdgeVisibleParams): boolean {
  const edgeBox = getBoundsOfBoxes(nodeToBox(sourceNode), nodeToBox(targetNode));

  if (edgeBox.x === edgeBox.x2) {
    edgeBox.x2 += 1;
  }

  if (edgeBox.y === edgeBox.y2) {
    edgeBox.y2 += 1;
  }

  const viewRect = {
    x: -transform[0] / transform[2],
    y: -transform[1] / transform[2],
    width: width / transform[2],
    height: height / transform[2],
  };

  return getOverlappingArea(viewRect, boxToRect(edgeBox)) > 0;
}

const getEdgeId = ({ source, sourceHandle, target, targetHandle }: Connection | EdgeBase): string =>
  `xy-edge__${source}${sourceHandle || ''}-${target}${targetHandle || ''}`;

const connectionExists = (edge: EdgeBase, edges: EdgeBase[]) => {
  return edges.some(
    (el) =>
      el.source === edge.source &&
      el.target === edge.target &&
      (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
      (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle))
  );
};

export const addEdgeBase = <EdgeType extends EdgeBase>(
  edgeParams: EdgeType | Connection,
  edges: EdgeType[]
): EdgeType[] => {
  if (!edgeParams.source || !edgeParams.target) {
    devWarn('006', errorMessages['error006']());

    return edges;
  }

  let edge: EdgeType;
  if (isEdgeBase(edgeParams)) {
    edge = { ...edgeParams };
  } else {
    edge = {
      ...edgeParams,
      id: getEdgeId(edgeParams),
    } as EdgeType;
  }

  if (connectionExists(edge, edges)) {
    return edges;
  }

  if (edge.sourceHandle === null) {
    delete edge.sourceHandle;
  }

  if (edge.targetHandle === null) {
    delete edge.targetHandle;
  }

  return edges.concat(edge);
};

export type UpdateEdgeOptions = {
  shouldReplaceId?: boolean;
};

export const updateEdgeBase = <EdgeType extends EdgeBase>(
  oldEdge: EdgeType,
  newConnection: Connection,
  edges: EdgeType[],
  options: UpdateEdgeOptions = { shouldReplaceId: true }
): EdgeType[] => {
  const { id: oldEdgeId, ...rest } = oldEdge;

  if (!newConnection.source || !newConnection.target) {
    devWarn('006', errorMessages['error006']());

    return edges;
  }

  const foundEdge = edges.find((e) => e.id === oldEdge.id) as EdgeType;

  if (!foundEdge) {
    devWarn('007', errorMessages['error007'](oldEdgeId));

    return edges;
  }

  // Remove old edge and create the new edge with parameters of old edge.
  const edge = {
    ...rest,
    id: options.shouldReplaceId ? getEdgeId(newConnection) : oldEdgeId,
    source: newConnection.source,
    target: newConnection.target,
    sourceHandle: newConnection.sourceHandle,
    targetHandle: newConnection.targetHandle,
  } as EdgeType;

  return edges.filter((e) => e.id !== oldEdgeId).concat(edge);
};
