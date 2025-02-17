import { useMemo } from 'react';
import { zoomIdentity } from 'd3-zoom';
import { shallow } from 'zustand/shallow';

import { useStoreApi, useStore } from '../hooks/useStore';
import { pointToRendererPoint, getViewportForBounds, getD3Transition, rendererPointToPoint } from '../utils/graph';
import { fitView } from '../store/utils';
import type { ViewportHelperFunctions, ReactFlowState, XYPosition } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialViewportHelper: ViewportHelperFunctions = {
  zoomIn: noop,
  zoomOut: noop,
  zoomTo: noop,
  getZoom: () => 1,
  setViewport: noop,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  fitView: () => false,
  setCenter: noop,
  fitBounds: noop,
  project: (position: XYPosition) => position,
  screenToFlowPosition: (position: XYPosition) => position,
  flowToScreenPosition: (position: XYPosition) => position,
  viewportInitialized: false,
};

const selector = (s: ReactFlowState) => ({
  d3Zoom: s.d3Zoom,
  d3Selection: s.d3Selection,
});

const useViewportHelper = (): ViewportHelperFunctions => {
  const store = useStoreApi();
  const { d3Zoom, d3Selection } = useStore(selector, shallow);

  const viewportHelperFunctions = useMemo<ViewportHelperFunctions>(() => {
    if (d3Selection && d3Zoom) {
      return {
        zoomIn: (options) => d3Zoom.scaleBy(getD3Transition(d3Selection, options?.duration), 1.2),
        zoomOut: (options) => d3Zoom.scaleBy(getD3Transition(d3Selection, options?.duration), 1 / 1.2),
        zoomTo: (zoomLevel, options) => d3Zoom.scaleTo(getD3Transition(d3Selection, options?.duration), zoomLevel),
        getZoom: () => store.getState().transform[2],
        setViewport: (transform, options) => {
          const [x, y, zoom] = store.getState().transform;
          const nextTransform = zoomIdentity
            .translate(transform.x ?? x, transform.y ?? y)
            .scale(transform.zoom ?? zoom);
          d3Zoom.transform(getD3Transition(d3Selection, options?.duration), nextTransform);
        },
        getViewport: () => {
          const [x, y, zoom] = store.getState().transform;
          return { x, y, zoom };
        },
        fitView: (options) => fitView(store.getState, options),
        setCenter: (x, y, options) => {
          const { width, height, maxZoom } = store.getState();
          const nextZoom = typeof options?.zoom !== 'undefined' ? options.zoom : maxZoom;
          const centerX = width / 2 - x * nextZoom;
          const centerY = height / 2 - y * nextZoom;
          const transform = zoomIdentity.translate(centerX, centerY).scale(nextZoom);

          d3Zoom.transform(getD3Transition(d3Selection, options?.duration), transform);
        },
        fitBounds: (bounds, options) => {
          const { width, height, minZoom, maxZoom } = store.getState();
          const { x, y, zoom } = getViewportForBounds(bounds, width, height, minZoom, maxZoom, options?.padding ?? 0.1);
          const transform = zoomIdentity.translate(x, y).scale(zoom);

          d3Zoom.transform(getD3Transition(d3Selection, options?.duration), transform);
        },
        // @deprecated Use `screenToFlowPosition`.
        project: (position: XYPosition) => {
          const { transform, snapToGrid, snapGrid } = store.getState();

          console.warn(
            '[DEPRECATED] `project` is deprecated. Instead use `screenToFlowPosition`. There is no need to subtract the react flow bounds anymore! https://reactflow.dev/api-reference/types/react-flow-instance#screen-to-flow-position'
          );

          return pointToRendererPoint(position, transform, snapToGrid, snapGrid);
        },
        screenToFlowPosition: (position: XYPosition) => {
          const { transform, snapToGrid, snapGrid, domNode } = store.getState();

          if (!domNode) {
            return position;
          }

          const { x: domX, y: domY } = domNode.getBoundingClientRect();
          const relativePosition = {
            x: position.x - domX,
            y: position.y - domY,
          };

          return pointToRendererPoint(relativePosition, transform, snapToGrid, snapGrid);
        },
        flowToScreenPosition: (position: XYPosition) => {
          const { transform, domNode } = store.getState();

          if (!domNode) {
            return position;
          }

          const { x: domX, y: domY } = domNode.getBoundingClientRect();
          const rendererPosition = rendererPointToPoint(position, transform);

          return {
            x: rendererPosition.x + domX,
            y: rendererPosition.y + domY,
          };
        },
        viewportInitialized: true,
      };
    }

    return initialViewportHelper;
  }, [d3Zoom, d3Selection]);

  return viewportHelperFunctions;
};

export default useViewportHelper;
