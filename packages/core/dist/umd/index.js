(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactFlowCore = {}, global.React, global.ReactDOM));
})(this, (function (exports, React, reactDom) { 'use strict';

  function cc(names) {
    if (typeof names === "string" || typeof names === "number") return "" + names

    let out = "";

    if (Array.isArray(names)) {
      for (let i = 0, tmp; i < names.length; i++) {
        if ((tmp = cc(names[i])) !== "") {
          out += (out && " ") + tmp;
        }
      }
    } else {
      for (let k in names) {
        if (names[k]) out += (out && " ") + k;
      }
    }

    return out
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var withSelectorExports = {};
  var withSelector = {
    get exports(){ return withSelectorExports; },
    set exports(v){ withSelectorExports = v; },
  };

  var withSelector_production_min = {};

  var shimExports = {};
  var shim = {
    get exports(){ return shimExports; },
    set exports(v){ shimExports = v; },
  };

  var useSyncExternalStoreShim_production_min = {};

  /**
   * @license React
   * use-sync-external-store-shim.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var hasRequiredUseSyncExternalStoreShim_production_min;

  function requireUseSyncExternalStoreShim_production_min () {
  	if (hasRequiredUseSyncExternalStoreShim_production_min) return useSyncExternalStoreShim_production_min;
  	hasRequiredUseSyncExternalStoreShim_production_min = 1;
  var e=React;function h(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var k="function"===typeof Object.is?Object.is:h,l=e.useState,m=e.useEffect,n=e.useLayoutEffect,p=e.useDebugValue;function q(a,b){var d=b(),f=l({inst:{value:d,getSnapshot:b}}),c=f[0].inst,g=f[1];n(function(){c.value=d;c.getSnapshot=b;r(c)&&g({inst:c});},[a,d,b]);m(function(){r(c)&&g({inst:c});return a(function(){r(c)&&g({inst:c});})},[a]);p(d);return d}
  	function r(a){var b=a.getSnapshot;a=a.value;try{var d=b();return !k(a,d)}catch(f){return !0}}function t(a,b){return b()}var u="undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement?t:q;useSyncExternalStoreShim_production_min.useSyncExternalStore=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:u;
  	return useSyncExternalStoreShim_production_min;
  }

  var hasRequiredShim;

  function requireShim () {
  	if (hasRequiredShim) return shimExports;
  	hasRequiredShim = 1;
  	(function (module) {

  		{
  		  module.exports = requireUseSyncExternalStoreShim_production_min();
  		}
  } (shim));
  	return shimExports;
  }

  /**
   * @license React
   * use-sync-external-store-shim/with-selector.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var hasRequiredWithSelector_production_min;

  function requireWithSelector_production_min () {
  	if (hasRequiredWithSelector_production_min) return withSelector_production_min;
  	hasRequiredWithSelector_production_min = 1;
  var h=React,n=requireShim();function p(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var q="function"===typeof Object.is?Object.is:p,r=n.useSyncExternalStore,t=h.useRef,u=h.useEffect,v=h.useMemo,w=h.useDebugValue;
  	withSelector_production_min.useSyncExternalStoreWithSelector=function(a,b,e,l,g){var c=t(null);if(null===c.current){var f={hasValue:!1,value:null};c.current=f;}else f=c.current;c=v(function(){function a(a){if(!c){c=!0;d=a;a=l(a);if(void 0!==g&&f.hasValue){var b=f.value;if(g(b,a))return k=b}return k=a}b=k;if(q(d,a))return b;var e=l(a);if(void 0!==g&&g(b,e))return b;d=a;return k=e}var c=!1,d,k,m=void 0===e?null:e;return [function(){return a(b())},null===m?void 0:function(){return a(m())}]},[b,e,l,g]);var d=r(a,c[0],c[1]);
  	u(function(){f.hasValue=!0;f.value=d;},[d]);w(d);return d};
  	return withSelector_production_min;
  }

  (function (module) {

  	{
  	  module.exports = requireWithSelector_production_min();
  	}
  } (withSelector));

  var useSyncExternalStoreExports = /*@__PURE__*/getDefaultExportFromCjs(withSelectorExports);

  const createStoreImpl = (createState) => {
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
        listeners.forEach((listener) => listener(state, previousState));
      }
    };
    const getState = () => state;
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    const destroy = () => {
      if ((undefined ? undefined.MODE : void 0) !== "production") {
        console.warn(
          "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
        );
      }
      listeners.clear();
    };
    const api = { setState, getState, subscribe, destroy };
    state = createState(setState, getState, api);
    return api;
  };
  const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

  const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
  function useStoreWithEqualityFn(api, selector = api.getState, equalityFn) {
    const slice = useSyncExternalStoreWithSelector(
      api.subscribe,
      api.getState,
      api.getServerState || api.getState,
      selector,
      equalityFn
    );
    React.useDebugValue(slice);
    return slice;
  }
  const createWithEqualityFnImpl = (createState, defaultEqualityFn) => {
    const api = createStore(createState);
    const useBoundStoreWithEqualityFn = (selector, equalityFn = defaultEqualityFn) => useStoreWithEqualityFn(api, selector, equalityFn);
    Object.assign(useBoundStoreWithEqualityFn, api);
    return useBoundStoreWithEqualityFn;
  };
  const createWithEqualityFn = (createState, defaultEqualityFn) => createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl;

  const StoreContext = React.createContext(null);
  const Provider$1 = StoreContext.Provider;

  const errorMessages = {
      error001: () => '[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001',
      error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
      error003: (nodeType) => `Node type "${nodeType}" not found. Using fallback type "default".`,
      error004: () => 'The React Flow parent container needs a width and a height to render the graph.',
      error005: () => 'Only child nodes can use a parent extent.',
      error006: () => "Can't create edge. An edge needs a source and a target.",
      error007: (id) => `The old edge with id=${id} does not exist.`,
      error009: (type) => `Marker type "${type}" doesn't exist.`,
      error008: (sourceHandle, edge) => `Couldn't create edge for ${!sourceHandle ? 'source' : 'target'} handle id: "${!sourceHandle ? edge.sourceHandle : edge.targetHandle}", edge id: ${edge.id}.`,
      error010: () => 'Handle: No node id found. Make sure to only use a Handle inside a custom Node.',
      error011: (edgeType) => `Edge type "${edgeType}" not found. Using fallback type "default".`,
      error012: (id) => `Node with id "${id}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  };

  const zustandErrorMessage = errorMessages['error001']();
  function useStore(selector, equalityFn) {
      const store = React.useContext(StoreContext);
      if (store === null) {
          throw new Error(zustandErrorMessage);
      }
      return useStoreWithEqualityFn(store, selector, equalityFn);
  }
  const useStoreApi = () => {
      const store = React.useContext(StoreContext);
      if (store === null) {
          throw new Error(zustandErrorMessage);
      }
      return React.useMemo(() => ({
          getState: store.getState,
          setState: store.setState,
          subscribe: store.subscribe,
          destroy: store.destroy,
      }), [store]);
  };

  const selector$h = (s) => (s.userSelectionActive ? 'none' : 'all');
  function Panel({ position, children, className, style, ...rest }) {
      const pointerEvents = useStore(selector$h);
      const positionClasses = `${position}`.split('-');
      return (React.createElement("div", { className: cc(['react-flow__panel', className, ...positionClasses]), style: { ...style, pointerEvents }, ...rest }, children));
  }

  function Attribution({ proOptions, position = 'bottom-right' }) {
      if (proOptions?.hideAttribution) {
          return null;
      }
      return (React.createElement(Panel, { position: position, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://reactflow.dev/pro" },
          React.createElement("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution" }, "React Flow")));
  }

  const EdgeText = ({ x, y, label, labelStyle = {}, labelShowBg = true, labelBgStyle = {}, labelBgPadding = [2, 4], labelBgBorderRadius = 2, children, className, ...rest }) => {
      const edgeRef = React.useRef(null);
      const [edgeTextBbox, setEdgeTextBbox] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
      const edgeTextClasses = cc(['react-flow__edge-textwrapper', className]);
      React.useEffect(() => {
          if (edgeRef.current) {
              const textBbox = edgeRef.current.getBBox();
              setEdgeTextBbox({
                  x: textBbox.x,
                  y: textBbox.y,
                  width: textBbox.width,
                  height: textBbox.height,
              });
          }
      }, [label]);
      if (typeof label === 'undefined' || !label) {
          return null;
      }
      return (React.createElement("g", { transform: `translate(${x - edgeTextBbox.width / 2} ${y - edgeTextBbox.height / 2})`, className: edgeTextClasses, visibility: edgeTextBbox.width ? 'visible' : 'hidden', ...rest },
          labelShowBg && (React.createElement("rect", { width: edgeTextBbox.width + 2 * labelBgPadding[0], x: -labelBgPadding[0], y: -labelBgPadding[1], height: edgeTextBbox.height + 2 * labelBgPadding[1], className: "react-flow__edge-textbg", style: labelBgStyle, rx: labelBgBorderRadius, ry: labelBgBorderRadius })),
          React.createElement("text", { className: "react-flow__edge-text", y: edgeTextBbox.height / 2, dy: "0.3em", ref: edgeRef, style: labelStyle }, label),
          children));
  };
  var EdgeText$1 = React.memo(EdgeText);

  const getDimensions = (node) => ({
      width: node.offsetWidth,
      height: node.offsetHeight,
  });
  const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);
  const clampPosition = (position = { x: 0, y: 0 }, extent) => ({
      x: clamp(position.x, extent[0][0], extent[1][0]),
      y: clamp(position.y, extent[0][1], extent[1][1]),
  });
  // returns a number between 0 and 1 that represents the velocity of the movement
  // when the mouse is close to the edge of the canvas
  const calcAutoPanVelocity = (value, min, max) => {
      if (value < min) {
          return clamp(Math.abs(value - min), 1, 50) / 50;
      }
      else if (value > max) {
          return -clamp(Math.abs(value - max), 1, 50) / 50;
      }
      return 0;
  };
  const calcAutoPan = (pos, bounds) => {
      const xMovement = calcAutoPanVelocity(pos.x, 35, bounds.width - 35) * 20;
      const yMovement = calcAutoPanVelocity(pos.y, 35, bounds.height - 35) * 20;
      return [xMovement, yMovement];
  };
  const getHostForElement = (element) => element.getRootNode?.() || window?.document;
  const getBoundsOfBoxes = (box1, box2) => ({
      x: Math.min(box1.x, box2.x),
      y: Math.min(box1.y, box2.y),
      x2: Math.max(box1.x2, box2.x2),
      y2: Math.max(box1.y2, box2.y2),
  });
  const rectToBox = ({ x, y, width, height }) => ({
      x,
      y,
      x2: x + width,
      y2: y + height,
  });
  const boxToRect = ({ x, y, x2, y2 }) => ({
      x,
      y,
      width: x2 - x,
      height: y2 - y,
  });
  const nodeToRect = (node) => ({
      ...(node.positionAbsolute || { x: 0, y: 0 }),
      width: node.width || 0,
      height: node.height || 0,
  });
  const getBoundsOfRects = (rect1, rect2) => boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));
  const getOverlappingArea = (rectA, rectB) => {
      const xOverlap = Math.max(0, Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x));
      const yOverlap = Math.max(0, Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y));
      return Math.ceil(xOverlap * yOverlap);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isRectObject = (obj) => isNumeric(obj.width) && isNumeric(obj.height) && isNumeric(obj.x) && isNumeric(obj.y);
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const isNumeric = (n) => !isNaN(n) && isFinite(n);
  const internalsSymbol = Symbol.for('internals');
  // used for a11y key board controls for nodes and edges
  const elementSelectionKeys = ['Enter', ' ', 'Escape'];
  const devWarn = (id, message) => {
  };
  const isReactKeyboardEvent = (event) => 'nativeEvent' in event;
  function isInputDOMNode(event) {
      const kbEvent = isReactKeyboardEvent(event) ? event.nativeEvent : event;
      // using composed path for handling shadow dom
      const target = (kbEvent.composedPath?.()?.[0] || event.target);
      const isInput = ['INPUT', 'SELECT', 'TEXTAREA'].includes(target?.nodeName) || target?.hasAttribute('contenteditable');
      // when an input field is focused we don't want to trigger deletion or movement of nodes
      return isInput || !!target?.closest('.nokey');
  }
  const isMouseEvent = (event) => 'clientX' in event;
  const getEventPosition = (event, bounds) => {
      const isMouseTriggered = isMouseEvent(event);
      const evtX = isMouseTriggered ? event.clientX : event.touches?.[0].clientX;
      const evtY = isMouseTriggered ? event.clientY : event.touches?.[0].clientY;
      return {
          x: evtX - (bounds?.left ?? 0),
          y: evtY - (bounds?.top ?? 0),
      };
  };
  const isMacOs = () => typeof navigator !== 'undefined' && navigator?.userAgent?.indexOf('Mac') >= 0;

  const BaseEdge = ({ id, path, labelX, labelY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth = 20, }) => {
      return (React.createElement(React.Fragment, null,
          React.createElement("path", { id: id, style: style, d: path, fill: "none", className: "react-flow__edge-path", markerEnd: markerEnd, markerStart: markerStart }),
          interactionWidth && (React.createElement("path", { d: path, fill: "none", strokeOpacity: 0, strokeWidth: interactionWidth, className: "react-flow__edge-interaction" })),
          label && isNumeric(labelX) && isNumeric(labelY) ? (React.createElement(EdgeText$1, { x: labelX, y: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius })) : null));
  };
  BaseEdge.displayName = 'BaseEdge';

  const getMarkerEnd = (markerType, markerEndId) => {
      if (typeof markerEndId !== 'undefined' && markerEndId) {
          return `url(#${markerEndId})`;
      }
      return typeof markerType !== 'undefined' ? `url(#react-flow__${markerType})` : 'none';
  };
  function getMouseHandler$1(id, getState, handler) {
      return handler === undefined
          ? handler
          : (event) => {
              const edge = getState().edges.find((e) => e.id === id);
              if (edge) {
                  handler(event, { ...edge });
              }
          };
  }
  // this is used for straight edges and simple smoothstep edges (LTR, RTL, BTT, TTB)
  function getEdgeCenter({ sourceX, sourceY, targetX, targetY, }) {
      const xOffset = Math.abs(targetX - sourceX) / 2;
      const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
      const yOffset = Math.abs(targetY - sourceY) / 2;
      const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
      return [centerX, centerY, xOffset, yOffset];
  }
  function getBezierEdgeCenter({ sourceX, sourceY, targetX, targetY, sourceControlX, sourceControlY, targetControlX, targetControlY, }) {
      // cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
      // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve
      const centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
      const centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
      const offsetX = Math.abs(centerX - sourceX);
      const offsetY = Math.abs(centerY - sourceY);
      return [centerX, centerY, offsetX, offsetY];
  }

  exports.ConnectionMode = void 0;
  (function (ConnectionMode) {
      ConnectionMode["Strict"] = "strict";
      ConnectionMode["Loose"] = "loose";
  })(exports.ConnectionMode || (exports.ConnectionMode = {}));
  exports.PanOnScrollMode = void 0;
  (function (PanOnScrollMode) {
      PanOnScrollMode["Free"] = "free";
      PanOnScrollMode["Vertical"] = "vertical";
      PanOnScrollMode["Horizontal"] = "horizontal";
  })(exports.PanOnScrollMode || (exports.PanOnScrollMode = {}));
  exports.SelectionMode = void 0;
  (function (SelectionMode) {
      SelectionMode["Partial"] = "partial";
      SelectionMode["Full"] = "full";
  })(exports.SelectionMode || (exports.SelectionMode = {}));

  exports.ConnectionLineType = void 0;
  (function (ConnectionLineType) {
      ConnectionLineType["Bezier"] = "default";
      ConnectionLineType["Straight"] = "straight";
      ConnectionLineType["Step"] = "step";
      ConnectionLineType["SmoothStep"] = "smoothstep";
      ConnectionLineType["SimpleBezier"] = "simplebezier";
  })(exports.ConnectionLineType || (exports.ConnectionLineType = {}));
  exports.MarkerType = void 0;
  (function (MarkerType) {
      MarkerType["Arrow"] = "arrow";
      MarkerType["ArrowClosed"] = "arrowclosed";
  })(exports.MarkerType || (exports.MarkerType = {}));

  exports.Position = void 0;
  (function (Position) {
      Position["Left"] = "left";
      Position["Top"] = "top";
      Position["Right"] = "right";
      Position["Bottom"] = "bottom";
  })(exports.Position || (exports.Position = {}));

  function getControl({ pos, x1, y1, x2, y2 }) {
      if (pos === exports.Position.Left || pos === exports.Position.Right) {
          return [0.5 * (x1 + x2), y1];
      }
      return [x1, 0.5 * (y1 + y2)];
  }
  function getSimpleBezierPath({ sourceX, sourceY, sourcePosition = exports.Position.Bottom, targetX, targetY, targetPosition = exports.Position.Top, }) {
      const [sourceControlX, sourceControlY] = getControl({
          pos: sourcePosition,
          x1: sourceX,
          y1: sourceY,
          x2: targetX,
          y2: targetY,
      });
      const [targetControlX, targetControlY] = getControl({
          pos: targetPosition,
          x1: targetX,
          y1: targetY,
          x2: sourceX,
          y2: sourceY,
      });
      const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
          sourceX,
          sourceY,
          targetX,
          targetY,
          sourceControlX,
          sourceControlY,
          targetControlX,
          targetControlY,
      });
      return [
          `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
          labelX,
          labelY,
          offsetX,
          offsetY,
      ];
  }
  const SimpleBezierEdge = React.memo(({ sourceX, sourceY, targetX, targetY, sourcePosition = exports.Position.Bottom, targetPosition = exports.Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth, }) => {
      const [path, labelX, labelY] = getSimpleBezierPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
      });
      return (React.createElement(BaseEdge, { path: path, labelX: labelX, labelY: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius, style: style, markerEnd: markerEnd, markerStart: markerStart, interactionWidth: interactionWidth }));
  });
  SimpleBezierEdge.displayName = 'SimpleBezierEdge';

  const handleDirections = {
      [exports.Position.Left]: { x: -1, y: 0 },
      [exports.Position.Right]: { x: 1, y: 0 },
      [exports.Position.Top]: { x: 0, y: -1 },
      [exports.Position.Bottom]: { x: 0, y: 1 },
  };
  const getDirection = ({ source, sourcePosition = exports.Position.Bottom, target, }) => {
      if (sourcePosition === exports.Position.Left || sourcePosition === exports.Position.Right) {
          return source.x < target.x ? { x: 1, y: 0 } : { x: -1, y: 0 };
      }
      return source.y < target.y ? { x: 0, y: 1 } : { x: 0, y: -1 };
  };
  const distance = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  // ith this function we try to mimic a orthogonal edge routing behaviour
  // It's not as good as a real orthogonal edge routing but it's faster and good enough as a default for step and smooth step edges
  function getPoints({ source, sourcePosition = exports.Position.Bottom, target, targetPosition = exports.Position.Top, center, offset, }) {
      const sourceDir = handleDirections[sourcePosition];
      const targetDir = handleDirections[targetPosition];
      const sourceGapped = { x: source.x + sourceDir.x * offset, y: source.y + sourceDir.y * offset };
      const targetGapped = { x: target.x + targetDir.x * offset, y: target.y + targetDir.y * offset };
      const dir = getDirection({
          source: sourceGapped,
          sourcePosition,
          target: targetGapped,
      });
      const dirAccessor = dir.x !== 0 ? 'x' : 'y';
      const currDir = dir[dirAccessor];
      let points = [];
      let centerX, centerY;
      const sourceGapOffset = { x: 0, y: 0 };
      const targetGapOffset = { x: 0, y: 0 };
      const [defaultCenterX, defaultCenterY, defaultOffsetX, defaultOffsetY] = getEdgeCenter({
          sourceX: source.x,
          sourceY: source.y,
          targetX: target.x,
          targetY: target.y,
      });
      // opposite handle positions, default case
      if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
          centerX = center.x ?? defaultCenterX;
          centerY = center.y ?? defaultCenterY;
          //    --->
          //    |
          // >---
          const verticalSplit = [
              { x: centerX, y: sourceGapped.y },
              { x: centerX, y: targetGapped.y },
          ];
          //    |
          //  ---
          //  |
          const horizontalSplit = [
              { x: sourceGapped.x, y: centerY },
              { x: targetGapped.x, y: centerY },
          ];
          if (sourceDir[dirAccessor] === currDir) {
              points = dirAccessor === 'x' ? verticalSplit : horizontalSplit;
          }
          else {
              points = dirAccessor === 'x' ? horizontalSplit : verticalSplit;
          }
      }
      else {
          // sourceTarget means we take x from source and y from target, targetSource is the opposite
          const sourceTarget = [{ x: sourceGapped.x, y: targetGapped.y }];
          const targetSource = [{ x: targetGapped.x, y: sourceGapped.y }];
          // this handles edges with same handle positions
          if (dirAccessor === 'x') {
              points = sourceDir.x === currDir ? targetSource : sourceTarget;
          }
          else {
              points = sourceDir.y === currDir ? sourceTarget : targetSource;
          }
          if (sourcePosition === targetPosition) {
              const diff = Math.abs(source[dirAccessor] - target[dirAccessor]);
              // if an edge goes from right to right for example (sourcePosition === targetPosition) and the distance between source.x and target.x is less than the offset, the added point and the gapped source/target will overlap. This leads to a weird edge path. To avoid this we add a gapOffset to the source/target
              if (diff <= offset) {
                  const gapOffset = Math.min(offset - 1, offset - diff);
                  if (sourceDir[dirAccessor] === currDir) {
                      sourceGapOffset[dirAccessor] = (sourceGapped[dirAccessor] > source[dirAccessor] ? -1 : 1) * gapOffset;
                  }
                  else {
                      targetGapOffset[dirAccessor] = (targetGapped[dirAccessor] > target[dirAccessor] ? -1 : 1) * gapOffset;
                  }
              }
          }
          // these are conditions for handling mixed handle positions like Right -> Bottom for example
          if (sourcePosition !== targetPosition) {
              const dirAccessorOpposite = dirAccessor === 'x' ? 'y' : 'x';
              const isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
              const sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
              const sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
              const flipSourceTarget = (sourceDir[dirAccessor] === 1 && ((!isSameDir && sourceGtTargetOppo) || (isSameDir && sourceLtTargetOppo))) ||
                  (sourceDir[dirAccessor] !== 1 && ((!isSameDir && sourceLtTargetOppo) || (isSameDir && sourceGtTargetOppo)));
              if (flipSourceTarget) {
                  points = dirAccessor === 'x' ? sourceTarget : targetSource;
              }
          }
          const sourceGapPoint = { x: sourceGapped.x + sourceGapOffset.x, y: sourceGapped.y + sourceGapOffset.y };
          const targetGapPoint = { x: targetGapped.x + targetGapOffset.x, y: targetGapped.y + targetGapOffset.y };
          const maxXDistance = Math.max(Math.abs(sourceGapPoint.x - points[0].x), Math.abs(targetGapPoint.x - points[0].x));
          const maxYDistance = Math.max(Math.abs(sourceGapPoint.y - points[0].y), Math.abs(targetGapPoint.y - points[0].y));
          // we want to place the label on the longest segment of the edge
          if (maxXDistance >= maxYDistance) {
              centerX = (sourceGapPoint.x + targetGapPoint.x) / 2;
              centerY = points[0].y;
          }
          else {
              centerX = points[0].x;
              centerY = (sourceGapPoint.y + targetGapPoint.y) / 2;
          }
      }
      const pathPoints = [
          source,
          { x: sourceGapped.x + sourceGapOffset.x, y: sourceGapped.y + sourceGapOffset.y },
          ...points,
          { x: targetGapped.x + targetGapOffset.x, y: targetGapped.y + targetGapOffset.y },
          target,
      ];
      return [pathPoints, centerX, centerY, defaultOffsetX, defaultOffsetY];
  }
  function getBend(a, b, c, size) {
      const bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size);
      const { x, y } = b;
      // no bend
      if ((a.x === x && x === c.x) || (a.y === y && y === c.y)) {
          return `L${x} ${y}`;
      }
      // first segment is horizontal
      if (a.y === y) {
          const xDir = a.x < c.x ? -1 : 1;
          const yDir = a.y < c.y ? 1 : -1;
          return `L ${x + bendSize * xDir},${y}Q ${x},${y} ${x},${y + bendSize * yDir}`;
      }
      const xDir = a.x < c.x ? 1 : -1;
      const yDir = a.y < c.y ? -1 : 1;
      return `L ${x},${y + bendSize * yDir}Q ${x},${y} ${x + bendSize * xDir},${y}`;
  }
  function getSmoothStepPath({ sourceX, sourceY, sourcePosition = exports.Position.Bottom, targetX, targetY, targetPosition = exports.Position.Top, borderRadius = 5, centerX, centerY, offset = 20, }) {
      const [points, labelX, labelY, offsetX, offsetY] = getPoints({
          source: { x: sourceX, y: sourceY },
          sourcePosition,
          target: { x: targetX, y: targetY },
          targetPosition,
          center: { x: centerX, y: centerY },
          offset,
      });
      const path = points.reduce((res, p, i) => {
          let segment = '';
          if (i > 0 && i < points.length - 1) {
              segment = getBend(points[i - 1], p, points[i + 1], borderRadius);
          }
          else {
              segment = `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`;
          }
          res += segment;
          return res;
      }, '');
      return [path, labelX, labelY, offsetX, offsetY];
  }
  const SmoothStepEdge = React.memo(({ sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, sourcePosition = exports.Position.Bottom, targetPosition = exports.Position.Top, markerEnd, markerStart, pathOptions, interactionWidth, }) => {
      const [path, labelX, labelY] = getSmoothStepPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
          borderRadius: pathOptions?.borderRadius,
          offset: pathOptions?.offset,
      });
      return (React.createElement(BaseEdge, { path: path, labelX: labelX, labelY: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius, style: style, markerEnd: markerEnd, markerStart: markerStart, interactionWidth: interactionWidth }));
  });
  SmoothStepEdge.displayName = 'SmoothStepEdge';

  const StepEdge = React.memo((props) => (React.createElement(SmoothStepEdge, { ...props, pathOptions: React.useMemo(() => ({ borderRadius: 0, offset: props.pathOptions?.offset }), [props.pathOptions?.offset]) })));
  StepEdge.displayName = 'StepEdge';

  function getStraightPath({ sourceX, sourceY, targetX, targetY, }) {
      const [labelX, labelY, offsetX, offsetY] = getEdgeCenter({
          sourceX,
          sourceY,
          targetX,
          targetY,
      });
      return [`M ${sourceX},${sourceY}L ${targetX},${targetY}`, labelX, labelY, offsetX, offsetY];
  }
  const StraightEdge = React.memo(({ sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, interactionWidth, }) => {
      const [path, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
      return (React.createElement(BaseEdge, { path: path, labelX: labelX, labelY: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius, style: style, markerEnd: markerEnd, markerStart: markerStart, interactionWidth: interactionWidth }));
  });
  StraightEdge.displayName = 'StraightEdge';

  function calculateControlOffset(distance, curvature) {
      if (distance >= 0) {
          return 0.5 * distance;
      }
      return curvature * 25 * Math.sqrt(-distance);
  }
  function getControlWithCurvature({ pos, x1, y1, x2, y2, c }) {
      switch (pos) {
          case exports.Position.Left:
              return [x1 - calculateControlOffset(x1 - x2, c), y1];
          case exports.Position.Right:
              return [x1 + calculateControlOffset(x2 - x1, c), y1];
          case exports.Position.Top:
              return [x1, y1 - calculateControlOffset(y1 - y2, c)];
          case exports.Position.Bottom:
              return [x1, y1 + calculateControlOffset(y2 - y1, c)];
      }
  }
  function getBezierPath({ sourceX, sourceY, sourcePosition = exports.Position.Bottom, targetX, targetY, targetPosition = exports.Position.Top, curvature = 0.25, }) {
      const [sourceControlX, sourceControlY] = getControlWithCurvature({
          pos: sourcePosition,
          x1: sourceX,
          y1: sourceY,
          x2: targetX,
          y2: targetY,
          c: curvature,
      });
      const [targetControlX, targetControlY] = getControlWithCurvature({
          pos: targetPosition,
          x1: targetX,
          y1: targetY,
          x2: sourceX,
          y2: sourceY,
          c: curvature,
      });
      const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
          sourceX,
          sourceY,
          targetX,
          targetY,
          sourceControlX,
          sourceControlY,
          targetControlX,
          targetControlY,
      });
      return [
          `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
          labelX,
          labelY,
          offsetX,
          offsetY,
      ];
  }
  const BezierEdge = React.memo(({ sourceX, sourceY, targetX, targetY, sourcePosition = exports.Position.Bottom, targetPosition = exports.Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, markerEnd, markerStart, pathOptions, interactionWidth, }) => {
      const [path, labelX, labelY] = getBezierPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
          curvature: pathOptions?.curvature,
      });
      return (React.createElement(BaseEdge, { path: path, labelX: labelX, labelY: labelY, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius, style: style, markerEnd: markerEnd, markerStart: markerStart, interactionWidth: interactionWidth }));
  });
  BezierEdge.displayName = 'BezierEdge';

  function shallow(objA, objB) {
    if (Object.is(objA, objB)) {
      return true;
    }
    if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
      return false;
    }
    if (objA instanceof Map && objB instanceof Map) {
      if (objA.size !== objB.size)
        return false;
      for (const [key, value] of objA) {
        if (!Object.is(value, objB.get(key))) {
          return false;
        }
      }
      return true;
    }
    if (objA instanceof Set && objB instanceof Set) {
      if (objA.size !== objB.size)
        return false;
      for (const value of objA) {
        if (!objB.has(value)) {
          return false;
        }
      }
      return true;
    }
    const keysA = Object.keys(objA);
    if (keysA.length !== Object.keys(objB).length) {
      return false;
    }
    for (let i = 0; i < keysA.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }
    return true;
  }

  const NodeIdContext = React.createContext(null);
  const Provider = NodeIdContext.Provider;
  NodeIdContext.Consumer;
  const useNodeId = () => {
      const nodeId = React.useContext(NodeIdContext);
      return nodeId;
  };

  const isEdge = (element) => 'id' in element && 'source' in element && 'target' in element;
  const isNode = (element) => 'id' in element && !('source' in element) && !('target' in element);
  const getOutgoers = (node, nodes, edges) => {
      if (!isNode(node)) {
          return [];
      }
      const outgoerIds = edges.filter((e) => e.source === node.id).map((e) => e.target);
      return nodes.filter((n) => outgoerIds.includes(n.id));
  };
  const getIncomers = (node, nodes, edges) => {
      if (!isNode(node)) {
          return [];
      }
      const incomersIds = edges.filter((e) => e.target === node.id).map((e) => e.source);
      return nodes.filter((n) => incomersIds.includes(n.id));
  };
  const getEdgeId = ({ source, sourceHandle, target, targetHandle }) => `reactflow__edge-${source}${sourceHandle || ''}-${target}${targetHandle || ''}`;
  const getMarkerId = (marker, rfId) => {
      if (typeof marker === 'undefined') {
          return '';
      }
      if (typeof marker === 'string') {
          return marker;
      }
      const idPrefix = rfId ? `${rfId}__` : '';
      return `${idPrefix}${Object.keys(marker)
        .sort()
        .map((key) => `${key}=${marker[key]}`)
        .join('&')}`;
  };
  const connectionExists = (edge, edges) => {
      return edges.some((el) => el.source === edge.source &&
          el.target === edge.target &&
          (el.sourceHandle === edge.sourceHandle || (!el.sourceHandle && !edge.sourceHandle)) &&
          (el.targetHandle === edge.targetHandle || (!el.targetHandle && !edge.targetHandle)));
  };
  const addEdge = (edgeParams, edges) => {
      if (!edgeParams.source || !edgeParams.target) {
          return edges;
      }
      let edge;
      if (isEdge(edgeParams)) {
          edge = { ...edgeParams };
      }
      else {
          edge = {
              ...edgeParams,
              id: getEdgeId(edgeParams),
          };
      }
      if (connectionExists(edge, edges)) {
          return edges;
      }
      return edges.concat(edge);
  };
  const reconnectEdge = (oldEdge, newConnection, edges, options = { shouldReplaceId: true }) => {
      const { id: oldEdgeId, ...rest } = oldEdge;
      if (!newConnection.source || !newConnection.target) {
          return edges;
      }
      const foundEdge = edges.find((e) => e.id === oldEdgeId);
      if (!foundEdge) {
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
      };
      return edges.filter((e) => e.id !== oldEdgeId).concat(edge);
  };
  /**
   *
   * @deprecated Use `reconnectEdge` instead.
   */
  const updateEdge = (oldEdge, newConnection, edges, options = { shouldReplaceId: true }) => {
      console.warn('[DEPRECATED] `updateEdge` is deprecated. Instead use `reconnectEdge` https://reactflow.dev/api-reference/utils/reconnect-edge');
      return reconnectEdge(oldEdge, newConnection, edges, options);
  };
  const pointToRendererPoint = ({ x, y }, [tx, ty, tScale], snapToGrid, [snapX, snapY]) => {
      const position = {
          x: (x - tx) / tScale,
          y: (y - ty) / tScale,
      };
      if (snapToGrid) {
          return {
              x: snapX * Math.round(position.x / snapX),
              y: snapY * Math.round(position.y / snapY),
          };
      }
      return position;
  };
  const rendererPointToPoint = ({ x, y }, [tx, ty, tScale]) => {
      return {
          x: x * tScale + tx,
          y: y * tScale + ty,
      };
  };
  const getNodePositionWithOrigin = (node, nodeOrigin = [0, 0]) => {
      if (!node) {
          return {
              x: 0,
              y: 0,
              positionAbsolute: {
                  x: 0,
                  y: 0,
              },
          };
      }
      const offsetX = (node.width ?? 0) * nodeOrigin[0];
      const offsetY = (node.height ?? 0) * nodeOrigin[1];
      const position = {
          x: node.position.x - offsetX,
          y: node.position.y - offsetY,
      };
      return {
          ...position,
          positionAbsolute: node.positionAbsolute
              ? {
                  x: node.positionAbsolute.x - offsetX,
                  y: node.positionAbsolute.y - offsetY,
              }
              : position,
      };
  };
  const getNodesBounds = (nodes, nodeOrigin = [0, 0]) => {
      if (nodes.length === 0) {
          return { x: 0, y: 0, width: 0, height: 0 };
      }
      const box = nodes.reduce((currBox, node) => {
          const { x, y } = getNodePositionWithOrigin(node, nodeOrigin).positionAbsolute;
          return getBoundsOfBoxes(currBox, rectToBox({
              x,
              y,
              width: node.width || 0,
              height: node.height || 0,
          }));
      }, { x: Infinity, y: Infinity, x2: -Infinity, y2: -Infinity });
      return boxToRect(box);
  };
  // @deprecated Use `getNodesBounds`.
  const getRectOfNodes = (nodes, nodeOrigin = [0, 0]) => {
      console.warn('[DEPRECATED] `getRectOfNodes` is deprecated. Instead use `getNodesBounds` https://reactflow.dev/api-reference/utils/get-nodes-bounds.');
      return getNodesBounds(nodes, nodeOrigin);
  };
  const getNodesInside = (nodeInternals, rect, [tx, ty, tScale] = [0, 0, 1], partially = false, 
  // set excludeNonSelectableNodes if you want to pay attention to the nodes "selectable" attribute
  excludeNonSelectableNodes = false, nodeOrigin = [0, 0]) => {
      const paneRect = {
          x: (rect.x - tx) / tScale,
          y: (rect.y - ty) / tScale,
          width: rect.width / tScale,
          height: rect.height / tScale,
      };
      const visibleNodes = [];
      nodeInternals.forEach((node) => {
          const { width, height, selectable = true, hidden = false } = node;
          if ((excludeNonSelectableNodes && !selectable) || hidden) {
              return false;
          }
          const { positionAbsolute } = getNodePositionWithOrigin(node, nodeOrigin);
          const nodeRect = {
              x: positionAbsolute.x,
              y: positionAbsolute.y,
              width: width || 0,
              height: height || 0,
          };
          const overlappingArea = getOverlappingArea(paneRect, nodeRect);
          const notInitialized = typeof width === 'undefined' || typeof height === 'undefined' || width === null || height === null;
          const partiallyVisible = partially && overlappingArea > 0;
          const area = (width || 0) * (height || 0);
          const isVisible = notInitialized || partiallyVisible || overlappingArea >= area;
          if (isVisible || node.dragging) {
              visibleNodes.push(node);
          }
      });
      return visibleNodes;
  };
  const getConnectedEdges = (nodes, edges) => {
      const nodeIds = nodes.map((node) => node.id);
      return edges.filter((edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target));
  };
  // @deprecated Use `getViewportForBounds`.
  const getTransformForBounds = (bounds, width, height, minZoom, maxZoom, padding = 0.1) => {
      const { x, y, zoom } = getViewportForBounds(bounds, width, height, minZoom, maxZoom, padding);
      console.warn('[DEPRECATED] `getTransformForBounds` is deprecated. Instead use `getViewportForBounds`. Beware that the return value is type Viewport (`{ x: number, y: number, zoom: number }`) instead of Transform (`[number, number, number]`). https://reactflow.dev/api-reference/utils/get-viewport-for-bounds');
      return [x, y, zoom];
  };
  const getViewportForBounds = (bounds, width, height, minZoom, maxZoom, padding = 0.1) => {
      const xZoom = width / (bounds.width * (1 + padding));
      const yZoom = height / (bounds.height * (1 + padding));
      const zoom = Math.min(xZoom, yZoom);
      const clampedZoom = clamp(zoom, minZoom, maxZoom);
      const boundsCenterX = bounds.x + bounds.width / 2;
      const boundsCenterY = bounds.y + bounds.height / 2;
      const x = width / 2 - boundsCenterX * clampedZoom;
      const y = height / 2 - boundsCenterY * clampedZoom;
      return { x, y, zoom: clampedZoom };
  };
  const getD3Transition = (selection, duration = 0) => {
      return selection.transition().duration(duration);
  };

  // this functions collects all handles and adds an absolute position
  // so that we can later find the closest handle to the mouse position
  function getHandles(node, handleBounds, type, currentHandle) {
      return (handleBounds[type] || []).reduce((res, h) => {
          if (`${node.id}-${h.id}-${type}` !== currentHandle) {
              res.push({
                  id: h.id || null,
                  type,
                  nodeId: node.id,
                  x: (node.positionAbsolute?.x ?? 0) + h.x + h.width / 2,
                  y: (node.positionAbsolute?.y ?? 0) + h.y + h.height / 2,
              });
          }
          return res;
      }, []);
  }
  function getClosestHandle(event, doc, pos, connectionRadius, handles, validator) {
      // we always want to prioritize the handle below the mouse cursor over the closest distance handle,
      // because it could be that the center of another handle is closer to the mouse pointer than the handle below the cursor
      const { x, y } = getEventPosition(event);
      const domNodes = doc.elementsFromPoint(x, y);
      const handleBelow = domNodes.find((el) => el.classList.contains('react-flow__handle'));
      if (handleBelow) {
          const handleNodeId = handleBelow.getAttribute('data-nodeid');
          if (handleNodeId) {
              const handleType = getHandleType(undefined, handleBelow);
              const handleId = handleBelow.getAttribute('data-handleid');
              const validHandleResult = validator({ nodeId: handleNodeId, id: handleId, type: handleType });
              if (validHandleResult) {
                  const handle = handles.find((h) => h.nodeId === handleNodeId && h.type === handleType && h.id === handleId);
                  return {
                      handle: {
                          id: handleId,
                          type: handleType,
                          nodeId: handleNodeId,
                          x: handle?.x || pos.x,
                          y: handle?.y || pos.y,
                      },
                      validHandleResult,
                  };
              }
          }
      }
      // if we couldn't find a handle below the mouse cursor we look for the closest distance based on the connectionRadius
      let closestHandles = [];
      let minDistance = Infinity;
      handles.forEach((handle) => {
          const distance = Math.sqrt((handle.x - pos.x) ** 2 + (handle.y - pos.y) ** 2);
          if (distance <= connectionRadius) {
              const validHandleResult = validator(handle);
              if (distance <= minDistance) {
                  if (distance < minDistance) {
                      closestHandles = [{ handle, validHandleResult }];
                  }
                  else if (distance === minDistance) {
                      // when multiple handles are on the same distance we collect all of them
                      closestHandles.push({
                          handle,
                          validHandleResult,
                      });
                  }
                  minDistance = distance;
              }
          }
      });
      if (!closestHandles.length) {
          return { handle: null, validHandleResult: defaultResult() };
      }
      if (closestHandles.length === 1) {
          return closestHandles[0];
      }
      const hasValidHandle = closestHandles.some(({ validHandleResult }) => validHandleResult.isValid);
      const hasTargetHandle = closestHandles.some(({ handle }) => handle.type === 'target');
      // if multiple handles are layouted on top of each other we prefer the one with type = target and the one that is valid
      return (closestHandles.find(({ handle, validHandleResult }) => hasTargetHandle ? handle.type === 'target' : (hasValidHandle ? validHandleResult.isValid : true)) || closestHandles[0]);
  }
  const nullConnection = { source: null, target: null, sourceHandle: null, targetHandle: null };
  const defaultResult = () => ({
      handleDomNode: null,
      isValid: false,
      connection: nullConnection,
      endHandle: null,
  });
  // checks if  and returns connection in fom of an object { source: 123, target: 312 }
  function isValidHandle(handle, connectionMode, fromNodeId, fromHandleId, fromType, isValidConnection, doc) {
      const isTarget = fromType === 'target';
      const handleToCheck = doc.querySelector(`.react-flow__handle[data-id="${handle?.nodeId}-${handle?.id}-${handle?.type}"]`);
      const result = {
          ...defaultResult(),
          handleDomNode: handleToCheck,
      };
      if (handleToCheck) {
          const handleType = getHandleType(undefined, handleToCheck);
          const handleNodeId = handleToCheck.getAttribute('data-nodeid');
          const handleId = handleToCheck.getAttribute('data-handleid');
          const connectable = handleToCheck.classList.contains('connectable');
          const connectableEnd = handleToCheck.classList.contains('connectableend');
          const connection = {
              source: isTarget ? handleNodeId : fromNodeId,
              sourceHandle: isTarget ? handleId : fromHandleId,
              target: isTarget ? fromNodeId : handleNodeId,
              targetHandle: isTarget ? fromHandleId : handleId,
          };
          result.connection = connection;
          const isConnectable = connectable && connectableEnd;
          // in strict mode we don't allow target to target or source to source connections
          const isValid = isConnectable &&
              (connectionMode === exports.ConnectionMode.Strict
                  ? (isTarget && handleType === 'source') || (!isTarget && handleType === 'target')
                  : handleNodeId !== fromNodeId || handleId !== fromHandleId);
          if (isValid) {
              result.endHandle = {
                  nodeId: handleNodeId,
                  handleId,
                  type: handleType,
              };
              result.isValid = isValidConnection(connection);
          }
      }
      return result;
  }
  function getHandleLookup({ nodes, nodeId, handleId, handleType }) {
      return nodes.reduce((res, node) => {
          if (node[internalsSymbol]) {
              const { handleBounds } = node[internalsSymbol];
              let sourceHandles = [];
              let targetHandles = [];
              if (handleBounds) {
                  sourceHandles = getHandles(node, handleBounds, 'source', `${nodeId}-${handleId}-${handleType}`);
                  targetHandles = getHandles(node, handleBounds, 'target', `${nodeId}-${handleId}-${handleType}`);
              }
              res.push(...sourceHandles, ...targetHandles);
          }
          return res;
      }, []);
  }
  function getHandleType(edgeUpdaterType, handleDomNode) {
      if (edgeUpdaterType) {
          return edgeUpdaterType;
      }
      else if (handleDomNode?.classList.contains('target')) {
          return 'target';
      }
      else if (handleDomNode?.classList.contains('source')) {
          return 'source';
      }
      return null;
  }
  function resetRecentHandle(handleDomNode) {
      handleDomNode?.classList.remove('valid', 'connecting', 'react-flow__handle-valid', 'react-flow__handle-connecting');
  }
  function getConnectionStatus(isInsideConnectionRadius, isHandleValid) {
      let connectionStatus = null;
      if (isHandleValid) {
          connectionStatus = 'valid';
      }
      else if (isInsideConnectionRadius && !isHandleValid) {
          connectionStatus = 'invalid';
      }
      return connectionStatus;
  }

  function handlePointerDown({ event, handleId, nodeId, onConnect, isTarget, getState, setState, isValidConnection, edgeUpdaterType, onReconnectEnd, }) {
      // when react-flow is used inside a shadow root we can't use document
      const doc = getHostForElement(event.target);
      const { connectionMode, domNode, autoPanOnConnect, connectionRadius, onConnectStart, panBy, getNodes, cancelConnection, } = getState();
      let autoPanId = 0;
      let closestHandle;
      const { x, y } = getEventPosition(event);
      const clickedHandle = doc?.elementFromPoint(x, y);
      const handleType = getHandleType(edgeUpdaterType, clickedHandle);
      const containerBounds = domNode?.getBoundingClientRect();
      if (!containerBounds || !handleType) {
          return;
      }
      let prevActiveHandle;
      let connectionPosition = getEventPosition(event, containerBounds);
      let autoPanStarted = false;
      let connection = null;
      let isValid = false;
      let handleDomNode = null;
      const handleLookup = getHandleLookup({
          nodes: getNodes(),
          nodeId,
          handleId,
          handleType,
      });
      // when the user is moving the mouse close to the edge of the canvas while connecting we move the canvas
      const autoPan = () => {
          if (!autoPanOnConnect) {
              return;
          }
          const [xMovement, yMovement] = calcAutoPan(connectionPosition, containerBounds);
          panBy({ x: xMovement, y: yMovement });
          autoPanId = requestAnimationFrame(autoPan);
      };
      setState({
          connectionPosition,
          connectionStatus: null,
          // connectionNodeId etc will be removed in the next major in favor of connectionStartHandle
          connectionNodeId: nodeId,
          connectionHandleId: handleId,
          connectionHandleType: handleType,
          connectionStartHandle: {
              nodeId,
              handleId,
              type: handleType,
          },
          connectionEndHandle: null,
      });
      onConnectStart?.(event, { nodeId, handleId, handleType });
      function onPointerMove(event) {
          const { transform } = getState();
          connectionPosition = getEventPosition(event, containerBounds);
          const { handle, validHandleResult } = getClosestHandle(event, doc, pointToRendererPoint(connectionPosition, transform, false, [1, 1]), connectionRadius, handleLookup, (handle) => isValidHandle(handle, connectionMode, nodeId, handleId, isTarget ? 'target' : 'source', isValidConnection, doc));
          closestHandle = handle;
          if (!autoPanStarted) {
              autoPan();
              autoPanStarted = true;
          }
          handleDomNode = validHandleResult.handleDomNode;
          connection = validHandleResult.connection;
          isValid = validHandleResult.isValid;
          setState({
              connectionPosition: closestHandle && isValid
                  ? rendererPointToPoint({
                      x: closestHandle.x,
                      y: closestHandle.y,
                  }, transform)
                  : connectionPosition,
              connectionStatus: getConnectionStatus(!!closestHandle, isValid),
              connectionEndHandle: validHandleResult.endHandle,
          });
          if (!closestHandle && !isValid && !handleDomNode) {
              return resetRecentHandle(prevActiveHandle);
          }
          if (connection.source !== connection.target && handleDomNode) {
              resetRecentHandle(prevActiveHandle);
              prevActiveHandle = handleDomNode;
              // @todo: remove the old class names "react-flow__handle-" in the next major version
              handleDomNode.classList.add('connecting', 'react-flow__handle-connecting');
              handleDomNode.classList.toggle('valid', isValid);
              handleDomNode.classList.toggle('react-flow__handle-valid', isValid);
          }
      }
      function onPointerUp(event) {
          if ((closestHandle || handleDomNode) && connection && isValid) {
              onConnect?.(connection);
          }
          // it's important to get a fresh reference from the store here
          // in order to get the latest state of onConnectEnd
          getState().onConnectEnd?.(event);
          if (edgeUpdaterType) {
              onReconnectEnd?.(event);
          }
          resetRecentHandle(prevActiveHandle);
          cancelConnection();
          cancelAnimationFrame(autoPanId);
          autoPanStarted = false;
          isValid = false;
          connection = null;
          handleDomNode = null;
          doc.removeEventListener('mousemove', onPointerMove);
          doc.removeEventListener('mouseup', onPointerUp);
          doc.removeEventListener('touchmove', onPointerMove);
          doc.removeEventListener('touchend', onPointerUp);
      }
      doc.addEventListener('mousemove', onPointerMove);
      doc.addEventListener('mouseup', onPointerUp);
      doc.addEventListener('touchmove', onPointerMove);
      doc.addEventListener('touchend', onPointerUp);
  }

  const alwaysValid = () => true;
  const selector$g = (s) => ({
      connectionStartHandle: s.connectionStartHandle,
      connectOnClick: s.connectOnClick,
      noPanClassName: s.noPanClassName,
  });
  const connectingSelector = (nodeId, handleId, type) => (state) => {
      const { connectionStartHandle: startHandle, connectionEndHandle: endHandle, connectionClickStartHandle: clickHandle, } = state;
      return {
          connecting: (startHandle?.nodeId === nodeId && startHandle?.handleId === handleId && startHandle?.type === type) ||
              (endHandle?.nodeId === nodeId && endHandle?.handleId === handleId && endHandle?.type === type),
          clickConnecting: clickHandle?.nodeId === nodeId && clickHandle?.handleId === handleId && clickHandle?.type === type,
      };
  };
  const Handle = React.forwardRef(({ type = 'source', position = exports.Position.Top, isValidConnection, isConnectable = true, isConnectableStart = true, isConnectableEnd = true, id, onConnect, children, className, onMouseDown, onTouchStart, ...rest }, ref) => {
      const handleId = id || null;
      const isTarget = type === 'target';
      const store = useStoreApi();
      const nodeId = useNodeId();
      const { connectOnClick, noPanClassName } = useStore(selector$g, shallow);
      const { connecting, clickConnecting } = useStore(connectingSelector(nodeId, handleId, type), shallow);
      if (!nodeId) {
          store.getState().onError?.('010', errorMessages['error010']());
      }
      const onConnectExtended = (params) => {
          const { defaultEdgeOptions, onConnect: onConnectAction, hasDefaultEdges } = store.getState();
          const edgeParams = {
              ...defaultEdgeOptions,
              ...params,
          };
          if (hasDefaultEdges) {
              const { edges, setEdges } = store.getState();
              setEdges(addEdge(edgeParams, edges));
          }
          onConnectAction?.(edgeParams);
          onConnect?.(edgeParams);
      };
      const onPointerDown = (event) => {
          if (!nodeId) {
              return;
          }
          const isMouseTriggered = isMouseEvent(event);
          if (isConnectableStart && ((isMouseTriggered && event.button === 0) || !isMouseTriggered)) {
              handlePointerDown({
                  event,
                  handleId,
                  nodeId,
                  onConnect: onConnectExtended,
                  isTarget,
                  getState: store.getState,
                  setState: store.setState,
                  isValidConnection: isValidConnection || store.getState().isValidConnection || alwaysValid,
              });
          }
          if (isMouseTriggered) {
              onMouseDown?.(event);
          }
          else {
              onTouchStart?.(event);
          }
      };
      const onClick = (event) => {
          const { onClickConnectStart, onClickConnectEnd, connectionClickStartHandle, connectionMode, isValidConnection: isValidConnectionStore, } = store.getState();
          if (!nodeId || (!connectionClickStartHandle && !isConnectableStart)) {
              return;
          }
          if (!connectionClickStartHandle) {
              onClickConnectStart?.(event, { nodeId, handleId, handleType: type });
              store.setState({ connectionClickStartHandle: { nodeId, type, handleId } });
              return;
          }
          const doc = getHostForElement(event.target);
          const isValidConnectionHandler = isValidConnection || isValidConnectionStore || alwaysValid;
          const { connection, isValid } = isValidHandle({
              nodeId,
              id: handleId,
              type,
          }, connectionMode, connectionClickStartHandle.nodeId, connectionClickStartHandle.handleId || null, connectionClickStartHandle.type, isValidConnectionHandler, doc);
          if (isValid) {
              onConnectExtended(connection);
          }
          onClickConnectEnd?.(event);
          store.setState({ connectionClickStartHandle: null });
      };
      return (React.createElement("div", { "data-handleid": handleId, "data-nodeid": nodeId, "data-handlepos": position, "data-id": `${nodeId}-${handleId}-${type}`, className: cc([
              'react-flow__handle',
              `react-flow__handle-${position}`,
              'nodrag',
              noPanClassName,
              className,
              {
                  source: !isTarget,
                  target: isTarget,
                  connectable: isConnectable,
                  connectablestart: isConnectableStart,
                  connectableend: isConnectableEnd,
                  connecting: clickConnecting,
                  // this class is used to style the handle when the user is connecting
                  connectionindicator: isConnectable && ((isConnectableStart && !connecting) || (isConnectableEnd && connecting)),
              },
          ]), onMouseDown: onPointerDown, onTouchStart: onPointerDown, onClick: connectOnClick ? onClick : undefined, ref: ref, ...rest }, children));
  });
  Handle.displayName = 'Handle';
  var Handle$1 = React.memo(Handle);

  const DefaultNode = ({ data, isConnectable, targetPosition = exports.Position.Top, sourcePosition = exports.Position.Bottom, }) => {
      return (React.createElement(React.Fragment, null,
          React.createElement(Handle$1, { type: "target", position: targetPosition, isConnectable: isConnectable }),
          data?.label,
          React.createElement(Handle$1, { type: "source", position: sourcePosition, isConnectable: isConnectable })));
  };
  DefaultNode.displayName = 'DefaultNode';
  var DefaultNode$1 = React.memo(DefaultNode);

  const InputNode = ({ data, isConnectable, sourcePosition = exports.Position.Bottom }) => (React.createElement(React.Fragment, null,
      data?.label,
      React.createElement(Handle$1, { type: "source", position: sourcePosition, isConnectable: isConnectable })));
  InputNode.displayName = 'InputNode';
  var InputNode$1 = React.memo(InputNode);

  const OutputNode = ({ data, isConnectable, targetPosition = exports.Position.Top }) => (React.createElement(React.Fragment, null,
      React.createElement(Handle$1, { type: "target", position: targetPosition, isConnectable: isConnectable }),
      data?.label));
  OutputNode.displayName = 'OutputNode';
  var OutputNode$1 = React.memo(OutputNode);

  const GroupNode = () => null;
  GroupNode.displayName = 'GroupNode';

  const selector$f = (s) => ({
      selectedNodes: s.getNodes().filter((n) => n.selected),
      selectedEdges: s.edges.filter((e) => e.selected).map((e) => ({ ...e })),
  });
  const selectId = (obj) => obj.id;
  function areEqual(a, b) {
      return (shallow(a.selectedNodes.map(selectId), b.selectedNodes.map(selectId)) &&
          shallow(a.selectedEdges.map(selectId), b.selectedEdges.map(selectId)));
  }
  // This is just a helper component for calling the onSelectionChange listener.
  // @TODO: Now that we have the onNodesChange and on EdgesChange listeners, do we still need this component?
  const SelectionListener = React.memo(({ onSelectionChange }) => {
      const store = useStoreApi();
      const { selectedNodes, selectedEdges } = useStore(selector$f, areEqual);
      React.useEffect(() => {
          const params = { nodes: selectedNodes, edges: selectedEdges };
          onSelectionChange?.(params);
          store.getState().onSelectionChange.forEach((fn) => fn(params));
      }, [selectedNodes, selectedEdges, onSelectionChange]);
      return null;
  });
  SelectionListener.displayName = 'SelectionListener';
  const changeSelector = (s) => !!s.onSelectionChange;
  function Wrapper$1({ onSelectionChange }) {
      const storeHasSelectionChange = useStore(changeSelector);
      if (onSelectionChange || storeHasSelectionChange) {
          return React.createElement(SelectionListener, { onSelectionChange: onSelectionChange });
      }
      return null;
  }

  const selector$e = (s) => ({
      setNodes: s.setNodes,
      setEdges: s.setEdges,
      setDefaultNodesAndEdges: s.setDefaultNodesAndEdges,
      setMinZoom: s.setMinZoom,
      setMaxZoom: s.setMaxZoom,
      setTranslateExtent: s.setTranslateExtent,
      setNodeExtent: s.setNodeExtent,
      reset: s.reset,
  });
  function useStoreUpdater(value, setStoreState) {
      React.useEffect(() => {
          if (typeof value !== 'undefined') {
              setStoreState(value);
          }
      }, [value]);
  }
  // updates with values in store that don't have a dedicated setter function
  function useDirectStoreUpdater(key, value, setState) {
      React.useEffect(() => {
          if (typeof value !== 'undefined') {
              setState({ [key]: value });
          }
      }, [value]);
  }
  const StoreUpdater = ({ nodes, edges, defaultNodes, defaultEdges, onConnect, onConnectStart, onConnectEnd, onClickConnectStart, onClickConnectEnd, nodesDraggable, nodesConnectable, nodesFocusable, edgesFocusable, edgesUpdatable, elevateNodesOnSelect, minZoom, maxZoom, nodeExtent, onNodesChange, onEdgesChange, elementsSelectable, connectionMode, snapGrid, snapToGrid, translateExtent, connectOnClick, defaultEdgeOptions, fitView, fitViewOptions, onNodesDelete, onEdgesDelete, onNodeDrag, onNodeDragStart, onNodeDragStop, onSelectionDrag, onSelectionDragStart, onSelectionDragStop, noPanClassName, nodeOrigin, rfId, autoPanOnConnect, autoPanOnNodeDrag, onError, connectionRadius, isValidConnection, nodeDragThreshold, }) => {
      const { setNodes, setEdges, setDefaultNodesAndEdges, setMinZoom, setMaxZoom, setTranslateExtent, setNodeExtent, reset, } = useStore(selector$e, shallow);
      const store = useStoreApi();
      React.useEffect(() => {
          const edgesWithDefaults = defaultEdges?.map((e) => ({ ...e, ...defaultEdgeOptions }));
          setDefaultNodesAndEdges(defaultNodes, edgesWithDefaults);
          return () => {
              reset();
          };
      }, []);
      useDirectStoreUpdater('defaultEdgeOptions', defaultEdgeOptions, store.setState);
      useDirectStoreUpdater('connectionMode', connectionMode, store.setState);
      useDirectStoreUpdater('onConnect', onConnect, store.setState);
      useDirectStoreUpdater('onConnectStart', onConnectStart, store.setState);
      useDirectStoreUpdater('onConnectEnd', onConnectEnd, store.setState);
      useDirectStoreUpdater('onClickConnectStart', onClickConnectStart, store.setState);
      useDirectStoreUpdater('onClickConnectEnd', onClickConnectEnd, store.setState);
      useDirectStoreUpdater('nodesDraggable', nodesDraggable, store.setState);
      useDirectStoreUpdater('nodesConnectable', nodesConnectable, store.setState);
      useDirectStoreUpdater('nodesFocusable', nodesFocusable, store.setState);
      useDirectStoreUpdater('edgesFocusable', edgesFocusable, store.setState);
      useDirectStoreUpdater('edgesUpdatable', edgesUpdatable, store.setState);
      useDirectStoreUpdater('elementsSelectable', elementsSelectable, store.setState);
      useDirectStoreUpdater('elevateNodesOnSelect', elevateNodesOnSelect, store.setState);
      useDirectStoreUpdater('snapToGrid', snapToGrid, store.setState);
      useDirectStoreUpdater('snapGrid', snapGrid, store.setState);
      useDirectStoreUpdater('onNodesChange', onNodesChange, store.setState);
      useDirectStoreUpdater('onEdgesChange', onEdgesChange, store.setState);
      useDirectStoreUpdater('connectOnClick', connectOnClick, store.setState);
      useDirectStoreUpdater('fitViewOnInit', fitView, store.setState);
      useDirectStoreUpdater('fitViewOnInitOptions', fitViewOptions, store.setState);
      useDirectStoreUpdater('onNodesDelete', onNodesDelete, store.setState);
      useDirectStoreUpdater('onEdgesDelete', onEdgesDelete, store.setState);
      useDirectStoreUpdater('onNodeDrag', onNodeDrag, store.setState);
      useDirectStoreUpdater('onNodeDragStart', onNodeDragStart, store.setState);
      useDirectStoreUpdater('onNodeDragStop', onNodeDragStop, store.setState);
      useDirectStoreUpdater('onSelectionDrag', onSelectionDrag, store.setState);
      useDirectStoreUpdater('onSelectionDragStart', onSelectionDragStart, store.setState);
      useDirectStoreUpdater('onSelectionDragStop', onSelectionDragStop, store.setState);
      useDirectStoreUpdater('noPanClassName', noPanClassName, store.setState);
      useDirectStoreUpdater('nodeOrigin', nodeOrigin, store.setState);
      useDirectStoreUpdater('rfId', rfId, store.setState);
      useDirectStoreUpdater('autoPanOnConnect', autoPanOnConnect, store.setState);
      useDirectStoreUpdater('autoPanOnNodeDrag', autoPanOnNodeDrag, store.setState);
      useDirectStoreUpdater('onError', onError, store.setState);
      useDirectStoreUpdater('connectionRadius', connectionRadius, store.setState);
      useDirectStoreUpdater('isValidConnection', isValidConnection, store.setState);
      useDirectStoreUpdater('nodeDragThreshold', nodeDragThreshold, store.setState);
      useStoreUpdater(nodes, setNodes);
      useStoreUpdater(edges, setEdges);
      useStoreUpdater(minZoom, setMinZoom);
      useStoreUpdater(maxZoom, setMaxZoom);
      useStoreUpdater(translateExtent, setTranslateExtent);
      useStoreUpdater(nodeExtent, setNodeExtent);
      return null;
  };

  const style = { display: 'none' };
  const ariaLiveStyle = {
      position: 'absolute',
      width: 1,
      height: 1,
      margin: -1,
      border: 0,
      padding: 0,
      overflow: 'hidden',
      clip: 'rect(0px, 0px, 0px, 0px)',
      clipPath: 'inset(100%)',
  };
  const ARIA_NODE_DESC_KEY = 'react-flow__node-desc';
  const ARIA_EDGE_DESC_KEY = 'react-flow__edge-desc';
  const ARIA_LIVE_MESSAGE = 'react-flow__aria-live';
  const selector$d = (s) => s.ariaLiveMessage;
  function AriaLiveMessage({ rfId }) {
      const ariaLiveMessage = useStore(selector$d);
      return (React.createElement("div", { id: `${ARIA_LIVE_MESSAGE}-${rfId}`, "aria-live": "assertive", "aria-atomic": "true", style: ariaLiveStyle }, ariaLiveMessage));
  }
  function A11yDescriptions({ rfId, disableKeyboardA11y }) {
      return (React.createElement(React.Fragment, null,
          React.createElement("div", { id: `${ARIA_NODE_DESC_KEY}-${rfId}`, style: style },
              "Press enter or space to select a node.",
              !disableKeyboardA11y && 'You can then use the arrow keys to move the node around.',
              " Press delete to remove it and escape to cancel.",
              ' '),
          React.createElement("div", { id: `${ARIA_EDGE_DESC_KEY}-${rfId}`, style: style }, "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel."),
          !disableKeyboardA11y && React.createElement(AriaLiveMessage, { rfId: rfId })));
  }

  // the keycode can be a string 'a' or an array of strings ['a', 'a+d']
  // a string means a single key 'a' or a combination when '+' is used 'a+d'
  // an array means different possibilities. Explainer: ['a', 'd+s'] here the
  // user can use the single key 'a' or the combination 'd' + 's'
  var useKeyPress = (keyCode = null, options = { actInsideInputWithModifier: true }) => {
      const [keyPressed, setKeyPressed] = React.useState(false);
      // we need to remember if a modifier key is pressed in order to track it
      const modifierPressed = React.useRef(false);
      // we need to remember the pressed keys in order to support combinations
      const pressedKeys = React.useRef(new Set([]));
      // keyCodes = array with single keys [['a']] or key combinations [['a', 's']]
      // keysToWatch = array with all keys flattened ['a', 'd', 'ShiftLeft']
      // used to check if we store event.code or event.key. When the code is in the list of keysToWatch
      // we use the code otherwise the key. Explainer: When you press the left "command" key, the code is "MetaLeft"
      // and the key is "Meta". We want users to be able to pass keys and codes so we assume that the key is meant when
      // we can't find it in the list of keysToWatch.
      const [keyCodes, keysToWatch] = React.useMemo(() => {
          if (keyCode !== null) {
              const keyCodeArr = Array.isArray(keyCode) ? keyCode : [keyCode];
              const keys = keyCodeArr.filter((kc) => typeof kc === 'string').map((kc) => kc.split('+'));
              const keysFlat = keys.reduce((res, item) => res.concat(...item), []);
              return [keys, keysFlat];
          }
          return [[], []];
      }, [keyCode]);
      React.useEffect(() => {
          const doc = typeof document !== 'undefined' ? document : null;
          const target = options?.target || doc;
          if (keyCode !== null) {
              const downHandler = (event) => {
                  modifierPressed.current = event.ctrlKey || event.metaKey || event.shiftKey;
                  const preventAction = (!modifierPressed.current || (modifierPressed.current && !options.actInsideInputWithModifier)) &&
                      isInputDOMNode(event);
                  if (preventAction) {
                      return false;
                  }
                  const keyOrCode = useKeyOrCode(event.code, keysToWatch);
                  pressedKeys.current.add(event[keyOrCode]);
                  if (isMatchingKey(keyCodes, pressedKeys.current, false)) {
                      event.preventDefault();
                      setKeyPressed(true);
                  }
              };
              const upHandler = (event) => {
                  const preventAction = (!modifierPressed.current || (modifierPressed.current && !options.actInsideInputWithModifier)) &&
                      isInputDOMNode(event);
                  if (preventAction) {
                      return false;
                  }
                  const keyOrCode = useKeyOrCode(event.code, keysToWatch);
                  if (isMatchingKey(keyCodes, pressedKeys.current, true)) {
                      setKeyPressed(false);
                      pressedKeys.current.clear();
                  }
                  else {
                      pressedKeys.current.delete(event[keyOrCode]);
                  }
                  // fix for Mac: when cmd key is pressed, keyup is not triggered for any other key, see: https://stackoverflow.com/questions/27380018/when-cmd-key-is-kept-pressed-keyup-is-not-triggered-for-any-other-key
                  if (event.key === 'Meta') {
                      pressedKeys.current.clear();
                  }
                  modifierPressed.current = false;
              };
              const resetHandler = () => {
                  pressedKeys.current.clear();
                  setKeyPressed(false);
              };
              target?.addEventListener('keydown', downHandler);
              target?.addEventListener('keyup', upHandler);
              window.addEventListener('blur', resetHandler);
              return () => {
                  target?.removeEventListener('keydown', downHandler);
                  target?.removeEventListener('keyup', upHandler);
                  window.removeEventListener('blur', resetHandler);
              };
          }
      }, [keyCode, setKeyPressed]);
      return keyPressed;
  };
  // utils
  function isMatchingKey(keyCodes, pressedKeys, isUp) {
      return (keyCodes
          // we only want to compare same sizes of keyCode definitions
          // and pressed keys. When the user specified 'Meta' as a key somewhere
          // this would also be truthy without this filter when user presses 'Meta' + 'r'
          .filter((keys) => isUp || keys.length === pressedKeys.size)
          // since we want to support multiple possibilities only one of the
          // combinations need to be part of the pressed keys
          .some((keys) => keys.every((k) => pressedKeys.has(k))));
  }
  function useKeyOrCode(eventCode, keysToWatch) {
      return keysToWatch.includes(eventCode) ? 'code' : 'key';
  }

  var noop$1 = {value: () => {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames$1(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames$1(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$1(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop$1, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
  }

  function creatorInherit(name) {
    return function() {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(name)
          : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local
        ? creatorFixed
        : creatorInherit)(fullname);
  }

  function none() {}

  function selector$c(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector$c(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  // Given something array like (or null), returns something that is strictly an
  // array. This is used to ensure that array-like objects passed to d3.selectAll
  // or selection.selectAll are converted into proper arrays when creating a
  // selection; we don’t ever want to create a selection backed by a live
  // HTMLCollection or NodeList. However, note that selection.selectAll will use a
  // static NodeList as a group, since it safely derived from querySelectorAll.
  function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection$1(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  var find = Array.prototype.find;

  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst
        : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children() {
    return Array.from(this.children);
  }

  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children
        : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
    insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
    querySelector: function(selector) { return this._parent.querySelector(selector); },
    querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
  };

  function constant$3(x) {
    return function() {
      return x;
    };
  }

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = new Map,
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant$3(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection$1(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  // Given some data, this returns an array-like view of it: an object that
  // exposes a length property and allows numeric indexing. Note that unlike
  // selectAll, this isn’t worried about “live” collections because the resulting
  // array will only be used briefly while data is being bound. (It is possible to
  // cause the data to change while iterating by using a key function, but please
  // don’t; we’d rather avoid a gratuitous copy.)
  function arraylike(data) {
    return typeof data === "object" && "length" in data
      ? data // Array, TypedArray, NodeList, array-like
      : Array.from(data); // Map, Set, iterable, string, or anything else
  }

  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter) enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update) update = update.selection();
    }
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(context) {
    var selection = context.selection ? context.selection() : context;

    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection$1(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection$1(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    return Array.from(this);
  }

  function selection_node() {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    let size = 0;
    for (const node of this) ++size; // eslint-disable-line no-unused-vars
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS$1(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction$1(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS$1(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local
          ? node.getAttributeNS(fullname.space, fullname.local)
          : node.getAttribute(fullname);
    }

    return this.each((value == null
        ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction$1(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove$1 : typeof value === "function"
              ? styleFunction$1
              : styleConstant$1)(name, value, priority == null ? "" : priority))
        : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name)
        || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
        ? this.each((value == null
            ? propertyRemove : typeof value === "function"
            ? propertyFunction
            : propertyConstant)(name, value))
        : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function"
        ? classedFunction : value
        ? classedTrue
        : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction$1
            : textConstant$1)(value))
        : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
        ? this.each(value == null
            ? htmlRemove : (typeof value === "function"
            ? htmlFunction
            : htmlConstant)(value))
        : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector$c(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }

  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name: name};
    });
  }

  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function"
        ? dispatchFunction
        : dispatchConstant)(type, params));
  }

  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }

  var root = [null];

  function Selection$1(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection$1([[document.documentElement]], root);
  }

  function selection_selection() {
    return this;
  }

  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
        : new Selection$1([[selector]], root);
  }

  function sourceEvent(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent) event = sourceEvent;
    return event;
  }

  function pointer(event, node) {
    event = sourceEvent(event);
    if (node === undefined) node = event.currentTarget;
    if (node) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
      }
    }
    return [event.pageX, event.pageY];
  }

  // These are typically used in conjunction with noevent to ensure that we can
  // preventDefault on the event.
  const nonpassive = {passive: false};
  const nonpassivecapture = {capture: true, passive: false};

  function nopropagation$1(event) {
    event.stopImmediatePropagation();
  }

  function noevent$1(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function dragDisable(view) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", noevent$1, nonpassivecapture);
    } else {
      root.__noselect = root.style.MozUserSelect;
      root.style.MozUserSelect = "none";
    }
  }

  function yesdrag(view, noclick) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", null);
    if (noclick) {
      selection.on("click.drag", noevent$1, nonpassivecapture);
      setTimeout(function() { selection.on("click.drag", null); }, 0);
    }
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", null);
    } else {
      root.style.MozUserSelect = root.__noselect;
      delete root.__noselect;
    }
  }

  var constant$2 = x => () => x;

  function DragEvent(type, {
    sourceEvent,
    subject,
    target,
    identifier,
    active,
    x, y, dx, dy,
    dispatch
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      subject: {value: subject, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      identifier: {value: identifier, enumerable: true, configurable: true},
      active: {value: active, enumerable: true, configurable: true},
      x: {value: x, enumerable: true, configurable: true},
      y: {value: y, enumerable: true, configurable: true},
      dx: {value: dx, enumerable: true, configurable: true},
      dy: {value: dy, enumerable: true, configurable: true},
      _: {value: dispatch}
    });
  }

  DragEvent.prototype.on = function() {
    var value = this._.on.apply(this._, arguments);
    return value === this._ ? this : value;
  };

  // Ignore right-click, since that should open the context menu.
  function defaultFilter$1(event) {
    return !event.ctrlKey && !event.button;
  }

  function defaultContainer() {
    return this.parentNode;
  }

  function defaultSubject(event, d) {
    return d == null ? {x: event.x, y: event.y} : d;
  }

  function defaultTouchable$1() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  function drag() {
    var filter = defaultFilter$1,
        container = defaultContainer,
        subject = defaultSubject,
        touchable = defaultTouchable$1,
        gestures = {},
        listeners = dispatch("start", "drag", "end"),
        active = 0,
        mousedownx,
        mousedowny,
        mousemoving,
        touchending,
        clickDistance2 = 0;

    function drag(selection) {
      selection
          .on("mousedown.drag", mousedowned)
        .filter(touchable)
          .on("touchstart.drag", touchstarted)
          .on("touchmove.drag", touchmoved, nonpassive)
          .on("touchend.drag touchcancel.drag", touchended)
          .style("touch-action", "none")
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function mousedowned(event, d) {
      if (touchending || !filter.call(this, event, d)) return;
      var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
      if (!gesture) return;
      select(event.view)
        .on("mousemove.drag", mousemoved, nonpassivecapture)
        .on("mouseup.drag", mouseupped, nonpassivecapture);
      dragDisable(event.view);
      nopropagation$1(event);
      mousemoving = false;
      mousedownx = event.clientX;
      mousedowny = event.clientY;
      gesture("start", event);
    }

    function mousemoved(event) {
      noevent$1(event);
      if (!mousemoving) {
        var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
        mousemoving = dx * dx + dy * dy > clickDistance2;
      }
      gestures.mouse("drag", event);
    }

    function mouseupped(event) {
      select(event.view).on("mousemove.drag mouseup.drag", null);
      yesdrag(event.view, mousemoving);
      noevent$1(event);
      gestures.mouse("end", event);
    }

    function touchstarted(event, d) {
      if (!filter.call(this, event, d)) return;
      var touches = event.changedTouches,
          c = container.call(this, event, d),
          n = touches.length, i, gesture;

      for (i = 0; i < n; ++i) {
        if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
          nopropagation$1(event);
          gesture("start", event, touches[i]);
        }
      }
    }

    function touchmoved(event) {
      var touches = event.changedTouches,
          n = touches.length, i, gesture;

      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          noevent$1(event);
          gesture("drag", event, touches[i]);
        }
      }
    }

    function touchended(event) {
      var touches = event.changedTouches,
          n = touches.length, i, gesture;

      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          nopropagation$1(event);
          gesture("end", event, touches[i]);
        }
      }
    }

    function beforestart(that, container, event, d, identifier, touch) {
      var dispatch = listeners.copy(),
          p = pointer(touch || event, container), dx, dy,
          s;

      if ((s = subject.call(that, new DragEvent("beforestart", {
          sourceEvent: event,
          target: drag,
          identifier,
          active,
          x: p[0],
          y: p[1],
          dx: 0,
          dy: 0,
          dispatch
        }), d)) == null) return;

      dx = s.x - p[0] || 0;
      dy = s.y - p[1] || 0;

      return function gesture(type, event, touch) {
        var p0 = p, n;
        switch (type) {
          case "start": gestures[identifier] = gesture, n = active++; break;
          case "end": delete gestures[identifier], --active; // falls through
          case "drag": p = pointer(touch || event, container), n = active; break;
        }
        dispatch.call(
          type,
          that,
          new DragEvent(type, {
            sourceEvent: event,
            subject: s,
            target: drag,
            identifier,
            active: n,
            x: p[0] + dx,
            y: p[1] + dy,
            dx: p[0] - p0[0],
            dy: p[1] - p0[1],
            dispatch
          }),
          d
        );
      };
    }

    drag.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$2(!!_), drag) : filter;
    };

    drag.container = function(_) {
      return arguments.length ? (container = typeof _ === "function" ? _ : constant$2(_), drag) : container;
    };

    drag.subject = function(_) {
      return arguments.length ? (subject = typeof _ === "function" ? _ : constant$2(_), drag) : subject;
    };

    drag.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$2(!!_), drag) : touchable;
    };

    drag.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? drag : value;
    };

    drag.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
    };

    return drag;
  }

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
      reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
      reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
      reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
      reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
      reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHex8() {
    return this.rgb().formatHex8();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
        : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
        : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
        : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
        : null) // invalid hex
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }

  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }

  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }

  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }

  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }

  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));

  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }

  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var constant$1 = x => () => x;

  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  var degrees = 180 / Math.PI;

  var identity$1 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var svgNode;

  /* eslint-disable no-undef */
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity$1 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity$1;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  var epsilon2 = 1e-12;

  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }

  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }

  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }

  var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

    // p0 = [ux0, uy0, w0]
    // p1 = [ux1, uy1, w1]
    function zoom(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
          ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
          dx = ux1 - ux0,
          dy = uy1 - uy0,
          d2 = dx * dx + dy * dy,
          i,
          S;

      // Special case for u0 ≅ u1.
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t) {
          return [
            ux0 + t * dx,
            uy0 + t * dy,
            w0 * Math.exp(rho * t * S)
          ];
        };
      }

      // General case.
      else {
        var d1 = Math.sqrt(d2),
            b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
            b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
            r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
            r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t) {
          var s = t * S,
              coshr0 = cosh(r0),
              u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u * dx,
            uy0 + u * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }

      i.duration = S * 1000 * rho / Math.SQRT2;

      return i;
    }

    zoom.rho = function(_) {
      var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
      return zoomRho(_1, _2, _4);
    };

    return zoom;
  })(Math.SQRT2, 2, 4);

  var frame = 0, // is an animation frame pending?
      timeout$1 = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout$1) timeout$1 = clearTimeout(timeout$1);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(elapsed => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;

  function schedule(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function init(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time);

      // If the elapsed delay is less than our first sleep, start immediately.
      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o;

      // If the state is not SCHEDULED, then we previously errored on start.
      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue;

        // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!
        if (o.state === STARTED) return timeout(start);

        // Interrupt the active transition, if any.
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }

        // Cancel any pre-empted transitions.
        else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }

      // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      timeout(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tween are initialized.
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted
      self.state = STARTED;

      // Initialize the tween, deleting null tween.
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      }

      // Dispatch the end event.
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];
      for (var i in schedules) return; // eslint-disable-line no-unused-vars
      delete node.__transition;
    }
  }

  function interrupt(node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;

    if (!schedules) return;

    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween(name, value) {
    var id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tween = get(this.node(), id).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }

  function tweenValue(transition, name, value) {
    var id = transition._id;

    transition.each(function() {
      var schedule = set(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get(node, id).value[name];
    };
  }

  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
  }

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS(fullname, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
        : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function() {
      init(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function() {
      init(this, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(id, value))
        : get(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get(this.node(), id).ease;
  }

  function easeVarying(id, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function") throw new Error;
      set(this, id).ease = v;
    };
  }

  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error;

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? init : set;
    return function() {
      var schedule = sit(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var id = this._id;

    return arguments.length < 2
        ? get(this.node(), id).on.on(name)
        : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id) return;
      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selector$c(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection = selection.prototype.constructor;

  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
      var schedule = set(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

      schedule.on = on1;
    };
  }

  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this
        .styleTween(name, styleNull(name, i))
        .on("end.style." + name, styleRemove(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction(tweenValue(this, "text", value))
        : textConstant(value == null ? "" : value + ""));
  }

  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }

  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject},
          end = {value: function() { if (--size === 0) resolve(); }};

      that.each(function() {
        var schedule = set(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }

        schedule.on = on1;
      });

      // The selection was empty, resolve end immediately
      if (size === 0) resolve();
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id} not found`);
      }
    }
    return timing;
  }

  function selection_transition(name) {
    var id,
        timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

  var constant = x => () => x;

  function ZoomEvent(type, {
    sourceEvent,
    target,
    transform,
    dispatch
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      transform: {value: transform, enumerable: true, configurable: true},
      _: {value: dispatch}
    });
  }

  function Transform(k, x, y) {
    this.k = k;
    this.x = x;
    this.y = y;
  }

  Transform.prototype = {
    constructor: Transform,
    scale: function(k) {
      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x) {
      return x * this.k + this.x;
    },
    applyY: function(y) {
      return y * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x) {
      return (x - this.x) / this.k;
    },
    invertY: function(y) {
      return (y - this.y) / this.k;
    },
    rescaleX: function(x) {
      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };

  var identity = new Transform(1, 0, 0);

  Transform.prototype;

  function nopropagation(event) {
    event.stopImmediatePropagation();
  }

  function noevent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // Ignore right-click, since that should open the context menu.
  // except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
  function defaultFilter(event) {
    return (!event.ctrlKey || event.type === 'wheel') && !event.button;
  }

  function defaultExtent() {
    var e = this;
    if (e instanceof SVGElement) {
      e = e.ownerSVGElement || e;
      if (e.hasAttribute("viewBox")) {
        e = e.viewBox.baseVal;
        return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
      }
      return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
    }
    return [[0, 0], [e.clientWidth, e.clientHeight]];
  }

  function defaultTransform() {
    return this.__zoom || identity;
  }

  function defaultWheelDelta(event) {
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
  }

  function defaultTouchable() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  function defaultConstrain(transform, extent, translateExtent) {
    var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
        dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
        dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
        dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
    return transform.translate(
      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
    );
  }

  function zoom() {
    var filter = defaultFilter,
        extent = defaultExtent,
        constrain = defaultConstrain,
        wheelDelta = defaultWheelDelta,
        touchable = defaultTouchable,
        scaleExtent = [0, Infinity],
        translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
        duration = 250,
        interpolate = interpolateZoom,
        listeners = dispatch("start", "zoom", "end"),
        touchstarting,
        touchfirst,
        touchending,
        touchDelay = 500,
        wheelDelay = 150,
        clickDistance2 = 0,
        tapDistance = 10;

    function zoom(selection) {
      selection
          .property("__zoom", defaultTransform)
          .on("wheel.zoom", wheeled, {passive: false})
          .on("mousedown.zoom", mousedowned)
          .on("dblclick.zoom", dblclicked)
        .filter(touchable)
          .on("touchstart.zoom", touchstarted)
          .on("touchmove.zoom", touchmoved)
          .on("touchend.zoom touchcancel.zoom", touchended)
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    zoom.transform = function(collection, transform, point, event) {
      var selection = collection.selection ? collection.selection() : collection;
      selection.property("__zoom", defaultTransform);
      if (collection !== selection) {
        schedule(collection, transform, point, event);
      } else {
        selection.interrupt().each(function() {
          gesture(this, arguments)
            .event(event)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
        });
      }
    };

    zoom.scaleBy = function(selection, k, p, event) {
      zoom.scaleTo(selection, function() {
        var k0 = this.__zoom.k,
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return k0 * k1;
      }, p, event);
    };

    zoom.scaleTo = function(selection, k, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t0 = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
            p1 = t0.invert(p0),
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
      }, p, event);
    };

    zoom.translateBy = function(selection, x, y, event) {
      zoom.transform(selection, function() {
        return constrain(this.__zoom.translate(
          typeof x === "function" ? x.apply(this, arguments) : x,
          typeof y === "function" ? y.apply(this, arguments) : y
        ), extent.apply(this, arguments), translateExtent);
      }, null, event);
    };

    zoom.translateTo = function(selection, x, y, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
        return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
          typeof x === "function" ? -x.apply(this, arguments) : -x,
          typeof y === "function" ? -y.apply(this, arguments) : -y
        ), e, translateExtent);
      }, p, event);
    };

    function scale(transform, k) {
      k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
      return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
    }

    function translate(transform, p0, p1) {
      var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
      return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
    }

    function centroid(extent) {
      return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
    }

    function schedule(transition, transform, point, event) {
      transition
          .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
          .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
          .tween("zoom", function() {
            var that = this,
                args = arguments,
                g = gesture(that, args).event(event),
                e = extent.apply(that, args),
                p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
                w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
                a = that.__zoom,
                b = typeof transform === "function" ? transform.apply(that, args) : transform,
                i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
            return function(t) {
              if (t === 1) t = b; // Avoid rounding error on end.
              else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
              g.zoom(null, t);
            };
          });
    }

    function gesture(that, args, clean) {
      return (!clean && that.__zooming) || new Gesture(that, args);
    }

    function Gesture(that, args) {
      this.that = that;
      this.args = args;
      this.active = 0;
      this.sourceEvent = null;
      this.extent = extent.apply(that, args);
      this.taps = 0;
    }

    Gesture.prototype = {
      event: function(event) {
        if (event) this.sourceEvent = event;
        return this;
      },
      start: function() {
        if (++this.active === 1) {
          this.that.__zooming = this;
          this.emit("start");
        }
        return this;
      },
      zoom: function(key, transform) {
        if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
        if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
        if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
        this.that.__zoom = transform;
        this.emit("zoom");
        return this;
      },
      end: function() {
        if (--this.active === 0) {
          delete this.that.__zooming;
          this.emit("end");
        }
        return this;
      },
      emit: function(type) {
        var d = select(this.that).datum();
        listeners.call(
          type,
          this.that,
          new ZoomEvent(type, {
            sourceEvent: this.sourceEvent,
            target: zoom,
            type,
            transform: this.that.__zoom,
            dispatch: listeners
          }),
          d
        );
      }
    };

    function wheeled(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var g = gesture(this, args).event(event),
          t = this.__zoom,
          k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
          p = pointer(event);

      // If the mouse is in the same location as before, reuse it.
      // If there were recent wheel events, reset the wheel idle timeout.
      if (g.wheel) {
        if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
          g.mouse[1] = t.invert(g.mouse[0] = p);
        }
        clearTimeout(g.wheel);
      }

      // If this wheel event won’t trigger a transform change, ignore it.
      else if (t.k === k) return;

      // Otherwise, capture the mouse point and location at the start.
      else {
        g.mouse = [p, t.invert(p)];
        interrupt(this);
        g.start();
      }

      noevent(event);
      g.wheel = setTimeout(wheelidled, wheelDelay);
      g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

      function wheelidled() {
        g.wheel = null;
        g.end();
      }
    }

    function mousedowned(event, ...args) {
      if (touchending || !filter.apply(this, arguments)) return;
      var currentTarget = event.currentTarget,
          g = gesture(this, args, true).event(event),
          v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
          p = pointer(event, currentTarget),
          x0 = event.clientX,
          y0 = event.clientY;

      dragDisable(event.view);
      nopropagation(event);
      g.mouse = [p, this.__zoom.invert(p)];
      interrupt(this);
      g.start();

      function mousemoved(event) {
        noevent(event);
        if (!g.moved) {
          var dx = event.clientX - x0, dy = event.clientY - y0;
          g.moved = dx * dx + dy * dy > clickDistance2;
        }
        g.event(event)
         .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
      }

      function mouseupped(event) {
        v.on("mousemove.zoom mouseup.zoom", null);
        yesdrag(event.view, g.moved);
        noevent(event);
        g.event(event).end();
      }
    }

    function dblclicked(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var t0 = this.__zoom,
          p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
          p1 = t0.invert(p0),
          k1 = t0.k * (event.shiftKey ? 0.5 : 2),
          t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

      noevent(event);
      if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
      else select(this).call(zoom.transform, t1, p0, event);
    }

    function touchstarted(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var touches = event.touches,
          n = touches.length,
          g = gesture(this, args, event.changedTouches.length === n).event(event),
          started, i, t, p;

      nopropagation(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
        p = [p, this.__zoom.invert(p), t.identifier];
        if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
        else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
      }

      if (touchstarting) touchstarting = clearTimeout(touchstarting);

      if (started) {
        if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
        interrupt(this);
        g.start();
      }
    }

    function touchmoved(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t, p, l;

      noevent(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
        if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
        else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
      }
      t = g.that.__zoom;
      if (g.touch1) {
        var p0 = g.touch0[0], l0 = g.touch0[1],
            p1 = g.touch1[0], l1 = g.touch1[1],
            dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
            dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
        t = scale(t, Math.sqrt(dp / dl));
        p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
        l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      }
      else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
      else return;

      g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
    }

    function touchended(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t;

      nopropagation(event);
      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, touchDelay);
      for (i = 0; i < n; ++i) {
        t = touches[i];
        if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
        else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
      }
      if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
      if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else {
        g.end();
        // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
        if (g.taps === 2) {
          t = pointer(t, this);
          if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
            var p = select(this).on("dblclick.zoom");
            if (p) p.apply(this, arguments);
          }
        }
      }
    }

    zoom.wheelDelta = function(_) {
      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
    };

    zoom.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
    };

    zoom.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
    };

    zoom.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
    };

    zoom.scaleExtent = function(_) {
      return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
    };

    zoom.translateExtent = function(_) {
      return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
    };

    zoom.constrain = function(_) {
      return arguments.length ? (constrain = _, zoom) : constrain;
    };

    zoom.duration = function(_) {
      return arguments.length ? (duration = +_, zoom) : duration;
    };

    zoom.interpolate = function(_) {
      return arguments.length ? (interpolate = _, zoom) : interpolate;
    };

    zoom.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? zoom : value;
    };

    zoom.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
    };

    zoom.tapDistance = function(_) {
      return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
    };

    return zoom;
  }

  function calculateXYZPosition(node, nodeInternals, result, nodeOrigin) {
      const parentId = node.parentNode || node.parentId;
      if (!parentId) {
          return result;
      }
      const parentNode = nodeInternals.get(parentId);
      const parentNodePosition = getNodePositionWithOrigin(parentNode, nodeOrigin);
      return calculateXYZPosition(parentNode, nodeInternals, {
          x: (result.x ?? 0) + parentNodePosition.x,
          y: (result.y ?? 0) + parentNodePosition.y,
          z: (parentNode[internalsSymbol]?.z ?? 0) > (result.z ?? 0) ? parentNode[internalsSymbol]?.z ?? 0 : result.z ?? 0,
      }, nodeOrigin);
  }
  function updateAbsoluteNodePositions(nodeInternals, nodeOrigin, parentNodes) {
      nodeInternals.forEach((node) => {
          const parentId = node.parentNode || node.parentId;
          if (parentId && !nodeInternals.has(parentId)) {
              throw new Error(`Parent node ${parentId} not found`);
          }
          if (parentId || parentNodes?.[node.id]) {
              const { x, y, z } = calculateXYZPosition(node, nodeInternals, {
                  ...node.position,
                  z: node[internalsSymbol]?.z ?? 0,
              }, nodeOrigin);
              node.positionAbsolute = {
                  x,
                  y,
              };
              node[internalsSymbol].z = z;
              if (parentNodes?.[node.id]) {
                  node[internalsSymbol].isParent = true;
              }
          }
      });
  }
  function createNodeInternals(nodes, nodeInternals, nodeOrigin, elevateNodesOnSelect) {
      const nextNodeInternals = new Map();
      const parentNodes = {};
      const selectedNodeZ = elevateNodesOnSelect ? 1000 : 0;
      nodes.forEach((node) => {
          const z = (isNumeric(node.zIndex) ? node.zIndex : 0) + (node.selected ? selectedNodeZ : 0);
          const currInternals = nodeInternals.get(node.id);
          const internals = {
              ...node,
              positionAbsolute: {
                  x: node.position.x,
                  y: node.position.y,
              },
          };
          const parentId = node.parentNode || node.parentId;
          if (parentId) {
              parentNodes[parentId] = true;
          }
          const resetHandleBounds = currInternals?.type && currInternals?.type !== node.type;
          Object.defineProperty(internals, internalsSymbol, {
              enumerable: false,
              value: {
                  handleBounds: resetHandleBounds ? undefined : currInternals?.[internalsSymbol]?.handleBounds,
                  z,
              },
          });
          nextNodeInternals.set(node.id, internals);
      });
      updateAbsoluteNodePositions(nextNodeInternals, nodeOrigin, parentNodes);
      return nextNodeInternals;
  }
  function fitView(get, options = {}) {
      const { getNodes, width, height, minZoom, maxZoom, d3Zoom, d3Selection, fitViewOnInitDone, fitViewOnInit, nodeOrigin, } = get();
      const isInitialFitView = options.initial && !fitViewOnInitDone && fitViewOnInit;
      const d3initialized = d3Zoom && d3Selection;
      if (d3initialized && (isInitialFitView || !options.initial)) {
          const nodes = getNodes().filter((n) => {
              const isVisible = options.includeHiddenNodes ? n.width && n.height : !n.hidden;
              if (options.nodes?.length) {
                  return isVisible && options.nodes.some((optionNode) => optionNode.id === n.id);
              }
              return isVisible;
          });
          const nodesInitialized = nodes.every((n) => n.width && n.height);
          if (nodes.length > 0 && nodesInitialized) {
              const bounds = getNodesBounds(nodes, nodeOrigin);
              const { x, y, zoom } = getViewportForBounds(bounds, width, height, options.minZoom ?? minZoom, options.maxZoom ?? maxZoom, options.padding ?? 0.1);
              const nextTransform = identity.translate(x, y).scale(zoom);
              if (typeof options.duration === 'number' && options.duration > 0) {
                  d3Zoom.transform(getD3Transition(d3Selection, options.duration), nextTransform);
              }
              else {
                  d3Zoom.transform(d3Selection, nextTransform);
              }
              return true;
          }
      }
      return false;
  }
  function handleControlledNodeSelectionChange(nodeChanges, nodeInternals) {
      nodeChanges.forEach((change) => {
          const node = nodeInternals.get(change.id);
          if (node) {
              nodeInternals.set(node.id, {
                  ...node,
                  [internalsSymbol]: node[internalsSymbol],
                  selected: change.selected,
              });
          }
      });
      return new Map(nodeInternals);
  }
  function handleControlledEdgeSelectionChange(edgeChanges, edges) {
      return edges.map((e) => {
          const change = edgeChanges.find((change) => change.id === e.id);
          if (change) {
              e.selected = change.selected;
          }
          return e;
      });
  }
  function updateNodesAndEdgesSelections({ changedNodes, changedEdges, get, set }) {
      const { nodeInternals, edges, onNodesChange, onEdgesChange, hasDefaultNodes, hasDefaultEdges } = get();
      if (changedNodes?.length) {
          if (hasDefaultNodes) {
              set({ nodeInternals: handleControlledNodeSelectionChange(changedNodes, nodeInternals) });
          }
          onNodesChange?.(changedNodes);
      }
      if (changedEdges?.length) {
          if (hasDefaultEdges) {
              set({ edges: handleControlledEdgeSelectionChange(changedEdges, edges) });
          }
          onEdgesChange?.(changedEdges);
      }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => { };
  const initialViewportHelper = {
      zoomIn: noop,
      zoomOut: noop,
      zoomTo: noop,
      getZoom: () => 1,
      setViewport: noop,
      getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
      fitView: () => false,
      setCenter: noop,
      fitBounds: noop,
      project: (position) => position,
      screenToFlowPosition: (position) => position,
      flowToScreenPosition: (position) => position,
      viewportInitialized: false,
  };
  const selector$b = (s) => ({
      d3Zoom: s.d3Zoom,
      d3Selection: s.d3Selection,
  });
  const useViewportHelper = () => {
      const store = useStoreApi();
      const { d3Zoom, d3Selection } = useStore(selector$b, shallow);
      const viewportHelperFunctions = React.useMemo(() => {
          if (d3Selection && d3Zoom) {
              return {
                  zoomIn: (options) => d3Zoom.scaleBy(getD3Transition(d3Selection, options?.duration), 1.2),
                  zoomOut: (options) => d3Zoom.scaleBy(getD3Transition(d3Selection, options?.duration), 1 / 1.2),
                  zoomTo: (zoomLevel, options) => d3Zoom.scaleTo(getD3Transition(d3Selection, options?.duration), zoomLevel),
                  getZoom: () => store.getState().transform[2],
                  setViewport: (transform, options) => {
                      const [x, y, zoom] = store.getState().transform;
                      const nextTransform = identity
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
                      const transform = identity.translate(centerX, centerY).scale(nextZoom);
                      d3Zoom.transform(getD3Transition(d3Selection, options?.duration), transform);
                  },
                  fitBounds: (bounds, options) => {
                      const { width, height, minZoom, maxZoom } = store.getState();
                      const { x, y, zoom } = getViewportForBounds(bounds, width, height, minZoom, maxZoom, options?.padding ?? 0.1);
                      const transform = identity.translate(x, y).scale(zoom);
                      d3Zoom.transform(getD3Transition(d3Selection, options?.duration), transform);
                  },
                  // @deprecated Use `screenToFlowPosition`.
                  project: (position) => {
                      const { transform, snapToGrid, snapGrid } = store.getState();
                      console.warn('[DEPRECATED] `project` is deprecated. Instead use `screenToFlowPosition`. There is no need to subtract the react flow bounds anymore! https://reactflow.dev/api-reference/types/react-flow-instance#screen-to-flow-position');
                      return pointToRendererPoint(position, transform, snapToGrid, snapGrid);
                  },
                  screenToFlowPosition: (position) => {
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
                  flowToScreenPosition: (position) => {
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

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  function useReactFlow() {
      const viewportHelper = useViewportHelper();
      const store = useStoreApi();
      const getNodes = React.useCallback(() => {
          return store
              .getState()
              .getNodes()
              .map((n) => ({ ...n }));
      }, []);
      const getNode = React.useCallback((id) => {
          return store.getState().nodeInternals.get(id);
      }, []);
      const getEdges = React.useCallback(() => {
          const { edges = [] } = store.getState();
          return edges.map((e) => ({ ...e }));
      }, []);
      const getEdge = React.useCallback((id) => {
          const { edges = [] } = store.getState();
          return edges.find((e) => e.id === id);
      }, []);
      const setNodes = React.useCallback((payload) => {
          const { getNodes, setNodes, hasDefaultNodes, onNodesChange } = store.getState();
          const nodes = getNodes();
          const nextNodes = typeof payload === 'function' ? payload(nodes) : payload;
          if (hasDefaultNodes) {
              setNodes(nextNodes);
          }
          else if (onNodesChange) {
              const changes = nextNodes.length === 0
                  ? nodes.map((node) => ({ type: 'remove', id: node.id }))
                  : nextNodes.map((node) => ({ item: node, type: 'reset' }));
              onNodesChange(changes);
          }
      }, []);
      const setEdges = React.useCallback((payload) => {
          const { edges = [], setEdges, hasDefaultEdges, onEdgesChange } = store.getState();
          const nextEdges = typeof payload === 'function' ? payload(edges) : payload;
          if (hasDefaultEdges) {
              setEdges(nextEdges);
          }
          else if (onEdgesChange) {
              const changes = nextEdges.length === 0
                  ? edges.map((edge) => ({ type: 'remove', id: edge.id }))
                  : nextEdges.map((edge) => ({ item: edge, type: 'reset' }));
              onEdgesChange(changes);
          }
      }, []);
      const addNodes = React.useCallback((payload) => {
          const nodes = Array.isArray(payload) ? payload : [payload];
          const { getNodes, setNodes, hasDefaultNodes, onNodesChange } = store.getState();
          if (hasDefaultNodes) {
              const currentNodes = getNodes();
              const nextNodes = [...currentNodes, ...nodes];
              setNodes(nextNodes);
          }
          else if (onNodesChange) {
              const changes = nodes.map((node) => ({ item: node, type: 'add' }));
              onNodesChange(changes);
          }
      }, []);
      const addEdges = React.useCallback((payload) => {
          const nextEdges = Array.isArray(payload) ? payload : [payload];
          const { edges = [], setEdges, hasDefaultEdges, onEdgesChange } = store.getState();
          if (hasDefaultEdges) {
              setEdges([...edges, ...nextEdges]);
          }
          else if (onEdgesChange) {
              const changes = nextEdges.map((edge) => ({ item: edge, type: 'add' }));
              onEdgesChange(changes);
          }
      }, []);
      const toObject = React.useCallback(() => {
          const { getNodes, edges = [], transform } = store.getState();
          const [x, y, zoom] = transform;
          return {
              nodes: getNodes().map((n) => ({ ...n })),
              edges: edges.map((e) => ({ ...e })),
              viewport: {
                  x,
                  y,
                  zoom,
              },
          };
      }, []);
      const deleteElements = React.useCallback(({ nodes: nodesDeleted, edges: edgesDeleted }) => {
          const { nodeInternals, getNodes, edges, hasDefaultNodes, hasDefaultEdges, onNodesDelete, onEdgesDelete, onNodesChange, onEdgesChange, } = store.getState();
          const nodeIds = (nodesDeleted || []).map((node) => node.id);
          const edgeIds = (edgesDeleted || []).map((edge) => edge.id);
          const nodesToRemove = getNodes().reduce((res, node) => {
              const parentId = node.parentNode || node.parentId;
              const parentHit = !nodeIds.includes(node.id) && parentId && res.find((n) => n.id === parentId);
              const deletable = typeof node.deletable === 'boolean' ? node.deletable : true;
              if (deletable && (nodeIds.includes(node.id) || parentHit)) {
                  res.push(node);
              }
              return res;
          }, []);
          const deletableEdges = edges.filter((e) => (typeof e.deletable === 'boolean' ? e.deletable : true));
          const initialHitEdges = deletableEdges.filter((e) => edgeIds.includes(e.id));
          if (nodesToRemove || initialHitEdges) {
              const connectedEdges = getConnectedEdges(nodesToRemove, deletableEdges);
              const edgesToRemove = [...initialHitEdges, ...connectedEdges];
              const edgeIdsToRemove = edgesToRemove.reduce((res, edge) => {
                  if (!res.includes(edge.id)) {
                      res.push(edge.id);
                  }
                  return res;
              }, []);
              if (hasDefaultEdges || hasDefaultNodes) {
                  if (hasDefaultEdges) {
                      store.setState({
                          edges: edges.filter((e) => !edgeIdsToRemove.includes(e.id)),
                      });
                  }
                  if (hasDefaultNodes) {
                      nodesToRemove.forEach((node) => {
                          nodeInternals.delete(node.id);
                      });
                      store.setState({
                          nodeInternals: new Map(nodeInternals),
                      });
                  }
              }
              if (edgeIdsToRemove.length > 0) {
                  onEdgesDelete?.(edgesToRemove);
                  if (onEdgesChange) {
                      onEdgesChange(edgeIdsToRemove.map((id) => ({
                          id,
                          type: 'remove',
                      })));
                  }
              }
              if (nodesToRemove.length > 0) {
                  onNodesDelete?.(nodesToRemove);
                  if (onNodesChange) {
                      const nodeChanges = nodesToRemove.map((n) => ({ id: n.id, type: 'remove' }));
                      onNodesChange(nodeChanges);
                  }
              }
          }
      }, []);
      const getNodeRect = React.useCallback((nodeOrRect) => {
          const isRect = isRectObject(nodeOrRect);
          const node = isRect ? null : store.getState().nodeInternals.get(nodeOrRect.id);
          if (!isRect && !node) {
              return [null, null, isRect];
          }
          const nodeRect = isRect ? nodeOrRect : nodeToRect(node);
          return [nodeRect, node, isRect];
      }, []);
      const getIntersectingNodes = React.useCallback((nodeOrRect, partially = true, nodes) => {
          const [nodeRect, node, isRect] = getNodeRect(nodeOrRect);
          if (!nodeRect) {
              return [];
          }
          return (nodes || store.getState().getNodes()).filter((n) => {
              if (!isRect && (n.id === node.id || !n.positionAbsolute)) {
                  return false;
              }
              const currNodeRect = nodeToRect(n);
              const overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
              const partiallyVisible = partially && overlappingArea > 0;
              return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
          });
      }, []);
      const isNodeIntersecting = React.useCallback((nodeOrRect, area, partially = true) => {
          const [nodeRect] = getNodeRect(nodeOrRect);
          if (!nodeRect) {
              return false;
          }
          const overlappingArea = getOverlappingArea(nodeRect, area);
          const partiallyVisible = partially && overlappingArea > 0;
          return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
      }, []);
      return React.useMemo(() => {
          return {
              ...viewportHelper,
              getNodes,
              getNode,
              getEdges,
              getEdge,
              setNodes,
              setEdges,
              addNodes,
              addEdges,
              toObject,
              deleteElements,
              getIntersectingNodes,
              isNodeIntersecting,
          };
      }, [
          viewportHelper,
          getNodes,
          getNode,
          getEdges,
          getEdge,
          setNodes,
          setEdges,
          addNodes,
          addEdges,
          toObject,
          deleteElements,
          getIntersectingNodes,
          isNodeIntersecting,
      ]);
  }

  const deleteKeyOptions = { actInsideInputWithModifier: false };
  var useGlobalKeyHandler = ({ deleteKeyCode, multiSelectionKeyCode }) => {
      const store = useStoreApi();
      const { deleteElements } = useReactFlow();
      const deleteKeyPressed = useKeyPress(deleteKeyCode, deleteKeyOptions);
      const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);
      React.useEffect(() => {
          if (deleteKeyPressed) {
              const { edges, getNodes } = store.getState();
              const selectedNodes = getNodes().filter((node) => node.selected);
              const selectedEdges = edges.filter((edge) => edge.selected);
              deleteElements({ nodes: selectedNodes, edges: selectedEdges });
              store.setState({ nodesSelectionActive: false });
          }
      }, [deleteKeyPressed]);
      React.useEffect(() => {
          store.setState({ multiSelectionActive: multiSelectionKeyPressed });
      }, [multiSelectionKeyPressed]);
  };

  function useResizeHandler(rendererNode) {
      const store = useStoreApi();
      React.useEffect(() => {
          let resizeObserver;
          const updateDimensions = () => {
              if (!rendererNode.current) {
                  return;
              }
              const size = getDimensions(rendererNode.current);
              if (size.height === 0 || size.width === 0) {
                  store.getState().onError?.('004', errorMessages['error004']());
              }
              store.setState({ width: size.width || 500, height: size.height || 500 });
          };
          updateDimensions();
          window.addEventListener('resize', updateDimensions);
          if (rendererNode.current) {
              resizeObserver = new ResizeObserver(() => updateDimensions());
              resizeObserver.observe(rendererNode.current);
          }
          return () => {
              window.removeEventListener('resize', updateDimensions);
              if (resizeObserver && rendererNode.current) {
                  resizeObserver.unobserve(rendererNode.current);
              }
          };
      }, []);
  }

  const containerStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
  };

  /* eslint-disable @typescript-eslint/ban-ts-comment */
  const viewChanged = (prevViewport, eventTransform) => prevViewport.x !== eventTransform.x || prevViewport.y !== eventTransform.y || prevViewport.zoom !== eventTransform.k;
  const eventToFlowTransform = (eventTransform) => ({
      x: eventTransform.x,
      y: eventTransform.y,
      zoom: eventTransform.k,
  });
  const isWrappedWithClass = (event, className) => event.target.closest(`.${className}`);
  const isRightClickPan = (panOnDrag, usedButton) => usedButton === 2 && Array.isArray(panOnDrag) && panOnDrag.includes(2);
  const wheelDelta = (event) => {
      const factor = event.ctrlKey && isMacOs() ? 10 : 1;
      return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * factor;
  };
  const selector$a = (s) => ({
      d3Zoom: s.d3Zoom,
      d3Selection: s.d3Selection,
      d3ZoomHandler: s.d3ZoomHandler,
      userSelectionActive: s.userSelectionActive,
  });
  const ZoomPane = ({ onMove, onMoveStart, onMoveEnd, onPaneContextMenu, zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = 0.5, panOnScrollMode = exports.PanOnScrollMode.Free, zoomOnDoubleClick = true, elementsSelectable, panOnDrag = true, defaultViewport, translateExtent, minZoom, maxZoom, zoomActivationKeyCode, preventScrolling = true, children, noWheelClassName, noPanClassName, }) => {
      const timerId = React.useRef();
      const store = useStoreApi();
      const isZoomingOrPanning = React.useRef(false);
      const zoomedWithRightMouseButton = React.useRef(false);
      const zoomPane = React.useRef(null);
      const prevTransform = React.useRef({ x: 0, y: 0, zoom: 0 });
      const { d3Zoom, d3Selection, d3ZoomHandler, userSelectionActive } = useStore(selector$a, shallow);
      const zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode);
      const mouseButton = React.useRef(0);
      const isPanScrolling = React.useRef(false);
      const panScrollTimeout = React.useRef();
      useResizeHandler(zoomPane);
      React.useEffect(() => {
          if (zoomPane.current) {
              const bbox = zoomPane.current.getBoundingClientRect();
              const d3ZoomInstance = zoom().scaleExtent([minZoom, maxZoom]).translateExtent(translateExtent);
              const selection = select(zoomPane.current).call(d3ZoomInstance);
              const updatedTransform = identity
                  .translate(defaultViewport.x, defaultViewport.y)
                  .scale(clamp(defaultViewport.zoom, minZoom, maxZoom));
              const extent = [
                  [0, 0],
                  [bbox.width, bbox.height],
              ];
              const constrainedTransform = d3ZoomInstance.constrain()(updatedTransform, extent, translateExtent);
              d3ZoomInstance.transform(selection, constrainedTransform);
              d3ZoomInstance.wheelDelta(wheelDelta);
              store.setState({
                  d3Zoom: d3ZoomInstance,
                  d3Selection: selection,
                  d3ZoomHandler: selection.on('wheel.zoom'),
                  // we need to pass transform because zoom handler is not registered when we set the initial transform
                  transform: [constrainedTransform.x, constrainedTransform.y, constrainedTransform.k],
                  domNode: zoomPane.current.closest('.react-flow'),
              });
          }
      }, []);
      React.useEffect(() => {
          if (d3Selection && d3Zoom) {
              if (panOnScroll && !zoomActivationKeyPressed && !userSelectionActive) {
                  d3Selection.on('wheel.zoom', (event) => {
                      if (isWrappedWithClass(event, noWheelClassName)) {
                          return false;
                      }
                      event.preventDefault();
                      event.stopImmediatePropagation();
                      const currentZoom = d3Selection.property('__zoom').k || 1;
                      // macos and win set ctrlKey=true for pinch gesture on a trackpad
                      if (event.ctrlKey && zoomOnPinch) {
                          const point = pointer(event);
                          const pinchDelta = wheelDelta(event);
                          const zoom = currentZoom * Math.pow(2, pinchDelta);
                          // @ts-ignore
                          d3Zoom.scaleTo(d3Selection, zoom, point, event);
                          return;
                      }
                      // increase scroll speed in firefox
                      // firefox: deltaMode === 1; chrome: deltaMode === 0
                      const deltaNormalize = event.deltaMode === 1 ? 20 : 1;
                      let deltaX = panOnScrollMode === exports.PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
                      let deltaY = panOnScrollMode === exports.PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;
                      // this enables vertical scrolling with shift + scroll on windows
                      if (!isMacOs() && event.shiftKey && panOnScrollMode !== exports.PanOnScrollMode.Vertical) {
                          deltaX = event.deltaY * deltaNormalize;
                          deltaY = 0;
                      }
                      d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed, 
                      // @ts-ignore
                      { internal: true });
                      const nextViewport = eventToFlowTransform(d3Selection.property('__zoom'));
                      const { onViewportChangeStart, onViewportChange, onViewportChangeEnd } = store.getState();
                      clearTimeout(panScrollTimeout.current);
                      // for pan on scroll we need to handle the event calls on our own
                      // we can't use the start, zoom and end events from d3-zoom
                      // because start and move gets called on every scroll event and not once at the beginning
                      if (!isPanScrolling.current) {
                          isPanScrolling.current = true;
                          onMoveStart?.(event, nextViewport);
                          onViewportChangeStart?.(nextViewport);
                      }
                      if (isPanScrolling.current) {
                          onMove?.(event, nextViewport);
                          onViewportChange?.(nextViewport);
                          panScrollTimeout.current = setTimeout(() => {
                              onMoveEnd?.(event, nextViewport);
                              onViewportChangeEnd?.(nextViewport);
                              isPanScrolling.current = false;
                          }, 150);
                      }
                  }, { passive: false });
              }
              else if (typeof d3ZoomHandler !== 'undefined') {
                  d3Selection.on('wheel.zoom', function (event, d) {
                      // we still want to enable pinch zooming even if preventScrolling is set to false
                      const invalidEvent = !preventScrolling && event.type === 'wheel' && !event.ctrlKey;
                      if (invalidEvent || isWrappedWithClass(event, noWheelClassName)) {
                          return null;
                      }
                      event.preventDefault();
                      d3ZoomHandler.call(this, event, d);
                  }, { passive: false });
              }
          }
      }, [
          userSelectionActive,
          panOnScroll,
          panOnScrollMode,
          d3Selection,
          d3Zoom,
          d3ZoomHandler,
          zoomActivationKeyPressed,
          zoomOnPinch,
          preventScrolling,
          noWheelClassName,
          onMoveStart,
          onMove,
          onMoveEnd,
      ]);
      React.useEffect(() => {
          if (d3Zoom) {
              d3Zoom.on('start', (event) => {
                  if (!event.sourceEvent || event.sourceEvent.internal) {
                      return null;
                  }
                  // we need to remember it here, because it's always 0 in the "zoom" event
                  mouseButton.current = event.sourceEvent?.button;
                  const { onViewportChangeStart } = store.getState();
                  const flowTransform = eventToFlowTransform(event.transform);
                  isZoomingOrPanning.current = true;
                  prevTransform.current = flowTransform;
                  if (event.sourceEvent?.type === 'mousedown') {
                      store.setState({ paneDragging: true });
                  }
                  onViewportChangeStart?.(flowTransform);
                  onMoveStart?.(event.sourceEvent, flowTransform);
              });
          }
      }, [d3Zoom, onMoveStart]);
      React.useEffect(() => {
          if (d3Zoom) {
              if (userSelectionActive && !isZoomingOrPanning.current) {
                  d3Zoom.on('zoom', null);
              }
              else if (!userSelectionActive) {
                  d3Zoom.on('zoom', (event) => {
                      const { onViewportChange } = store.getState();
                      store.setState({ transform: [event.transform.x, event.transform.y, event.transform.k] });
                      zoomedWithRightMouseButton.current = !!(onPaneContextMenu && isRightClickPan(panOnDrag, mouseButton.current ?? 0));
                      if ((onMove || onViewportChange) && !event.sourceEvent?.internal) {
                          const flowTransform = eventToFlowTransform(event.transform);
                          onViewportChange?.(flowTransform);
                          onMove?.(event.sourceEvent, flowTransform);
                      }
                  });
              }
          }
      }, [userSelectionActive, d3Zoom, onMove, panOnDrag, onPaneContextMenu]);
      React.useEffect(() => {
          if (d3Zoom) {
              d3Zoom.on('end', (event) => {
                  if (!event.sourceEvent || event.sourceEvent.internal) {
                      return null;
                  }
                  const { onViewportChangeEnd } = store.getState();
                  isZoomingOrPanning.current = false;
                  store.setState({ paneDragging: false });
                  if (onPaneContextMenu &&
                      isRightClickPan(panOnDrag, mouseButton.current ?? 0) &&
                      !zoomedWithRightMouseButton.current) {
                      onPaneContextMenu(event.sourceEvent);
                  }
                  zoomedWithRightMouseButton.current = false;
                  if ((onMoveEnd || onViewportChangeEnd) && viewChanged(prevTransform.current, event.transform)) {
                      const flowTransform = eventToFlowTransform(event.transform);
                      prevTransform.current = flowTransform;
                      clearTimeout(timerId.current);
                      timerId.current = setTimeout(() => {
                          onViewportChangeEnd?.(flowTransform);
                          onMoveEnd?.(event.sourceEvent, flowTransform);
                      }, panOnScroll ? 150 : 0);
                  }
              });
          }
      }, [d3Zoom, panOnScroll, panOnDrag, onMoveEnd, onPaneContextMenu]);
      React.useEffect(() => {
          if (d3Zoom) {
              d3Zoom.filter((event) => {
                  const zoomScroll = zoomActivationKeyPressed || zoomOnScroll;
                  const pinchZoom = zoomOnPinch && event.ctrlKey;
                  if ((panOnDrag === true || (Array.isArray(panOnDrag) && panOnDrag.includes(1))) &&
                      event.button === 1 &&
                      event.type === 'mousedown' &&
                      (isWrappedWithClass(event, 'react-flow__node') || isWrappedWithClass(event, 'react-flow__edge'))) {
                      return true;
                  }
                  // if all interactions are disabled, we prevent all zoom events
                  if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) {
                      return false;
                  }
                  // during a selection we prevent all other interactions
                  if (userSelectionActive) {
                      return false;
                  }
                  // if zoom on double click is disabled, we prevent the double click event
                  if (!zoomOnDoubleClick && event.type === 'dblclick') {
                      return false;
                  }
                  // if the target element is inside an element with the nowheel class, we prevent zooming
                  if (isWrappedWithClass(event, noWheelClassName) && event.type === 'wheel') {
                      return false;
                  }
                  // if the target element is inside an element with the nopan class, we prevent panning
                  if (isWrappedWithClass(event, noPanClassName) &&
                      (event.type !== 'wheel' || (panOnScroll && event.type === 'wheel' && !zoomActivationKeyPressed))) {
                      return false;
                  }
                  if (!zoomOnPinch && event.ctrlKey && event.type === 'wheel') {
                      return false;
                  }
                  // when there is no scroll handling enabled, we prevent all wheel events
                  if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === 'wheel') {
                      return false;
                  }
                  // if the pane is not movable, we prevent dragging it with mousestart or touchstart
                  if (!panOnDrag && (event.type === 'mousedown' || event.type === 'touchstart')) {
                      return false;
                  }
                  // if the pane is only movable using allowed clicks
                  if (Array.isArray(panOnDrag) && !panOnDrag.includes(event.button) && event.type === 'mousedown') {
                      return false;
                  }
                  // We only allow right clicks if pan on drag is set to right click
                  const buttonAllowed = (Array.isArray(panOnDrag) && panOnDrag.includes(event.button)) || !event.button || event.button <= 1;
                  // default filter for d3-zoom
                  return (!event.ctrlKey || event.type === 'wheel') && buttonAllowed;
              });
          }
      }, [
          userSelectionActive,
          d3Zoom,
          zoomOnScroll,
          zoomOnPinch,
          panOnScroll,
          zoomOnDoubleClick,
          panOnDrag,
          elementsSelectable,
          zoomActivationKeyPressed,
      ]);
      return (React.createElement("div", { className: "react-flow__renderer", ref: zoomPane, style: containerStyle }, children));
  };

  const selector$9 = (s) => ({
      userSelectionActive: s.userSelectionActive,
      userSelectionRect: s.userSelectionRect,
  });
  function UserSelection() {
      const { userSelectionActive, userSelectionRect } = useStore(selector$9, shallow);
      const isActive = userSelectionActive && userSelectionRect;
      if (!isActive) {
          return null;
      }
      return (React.createElement("div", { className: "react-flow__selection react-flow__container", style: {
              width: userSelectionRect.width,
              height: userSelectionRect.height,
              transform: `translate(${userSelectionRect.x}px, ${userSelectionRect.y}px)`,
          } }));
  }

  function handleParentExpand(res, updateItem) {
      const parentId = updateItem.parentNode || updateItem.parentId;
      const parent = res.find((e) => e.id === parentId);
      if (parent) {
          const extendWidth = updateItem.position.x + updateItem.width - parent.width;
          const extendHeight = updateItem.position.y + updateItem.height - parent.height;
          if (extendWidth > 0 || extendHeight > 0 || updateItem.position.x < 0 || updateItem.position.y < 0) {
              parent.style = { ...parent.style } || {};
              parent.style.width = parent.style.width ?? parent.width;
              parent.style.height = parent.style.height ?? parent.height;
              if (extendWidth > 0) {
                  parent.style.width += extendWidth;
              }
              if (extendHeight > 0) {
                  parent.style.height += extendHeight;
              }
              if (updateItem.position.x < 0) {
                  const xDiff = Math.abs(updateItem.position.x);
                  parent.position.x = parent.position.x - xDiff;
                  parent.style.width += xDiff;
                  updateItem.position.x = 0;
              }
              if (updateItem.position.y < 0) {
                  const yDiff = Math.abs(updateItem.position.y);
                  parent.position.y = parent.position.y - yDiff;
                  parent.style.height += yDiff;
                  updateItem.position.y = 0;
              }
              parent.width = parent.style.width;
              parent.height = parent.style.height;
          }
      }
  }
  function applyChanges(changes, elements) {
      // we need this hack to handle the setNodes and setEdges function of the useReactFlow hook for controlled flows
      if (changes.some((c) => c.type === 'reset')) {
          return changes.filter((c) => c.type === 'reset').map((c) => c.item);
      }
      const initElements = changes.filter((c) => c.type === 'add').map((c) => c.item);
      return elements.reduce((res, item) => {
          const currentChanges = changes.filter((c) => c.id === item.id);
          if (currentChanges.length === 0) {
              res.push(item);
              return res;
          }
          const updateItem = { ...item };
          for (const currentChange of currentChanges) {
              if (currentChange) {
                  switch (currentChange.type) {
                      case 'select': {
                          updateItem.selected = currentChange.selected;
                          break;
                      }
                      case 'position': {
                          if (typeof currentChange.position !== 'undefined') {
                              updateItem.position = currentChange.position;
                          }
                          if (typeof currentChange.positionAbsolute !== 'undefined') {
                              updateItem.positionAbsolute = currentChange.positionAbsolute;
                          }
                          if (typeof currentChange.dragging !== 'undefined') {
                              updateItem.dragging = currentChange.dragging;
                          }
                          if (updateItem.expandParent) {
                              handleParentExpand(res, updateItem);
                          }
                          break;
                      }
                      case 'dimensions': {
                          if (typeof currentChange.dimensions !== 'undefined') {
                              updateItem.width = currentChange.dimensions.width;
                              updateItem.height = currentChange.dimensions.height;
                          }
                          if (typeof currentChange.updateStyle !== 'undefined') {
                              updateItem.style = { ...(updateItem.style || {}), ...currentChange.dimensions };
                          }
                          if (typeof currentChange.resizing === 'boolean') {
                              updateItem.resizing = currentChange.resizing;
                          }
                          if (updateItem.expandParent) {
                              handleParentExpand(res, updateItem);
                          }
                          break;
                      }
                      case 'remove': {
                          return res;
                      }
                  }
              }
          }
          res.push(updateItem);
          return res;
      }, initElements);
  }
  function applyNodeChanges(changes, nodes) {
      return applyChanges(changes, nodes);
  }
  function applyEdgeChanges(changes, edges) {
      return applyChanges(changes, edges);
  }
  const createSelectionChange = (id, selected) => ({
      id,
      type: 'select',
      selected,
  });
  function getSelectionChanges(items, selectedIds) {
      return items.reduce((res, item) => {
          const willBeSelected = selectedIds.includes(item.id);
          if (!item.selected && willBeSelected) {
              item.selected = true;
              res.push(createSelectionChange(item.id, true));
          }
          else if (item.selected && !willBeSelected) {
              item.selected = false;
              res.push(createSelectionChange(item.id, false));
          }
          return res;
      }, []);
  }

  /**
   * The user selection rectangle gets displayed when a user drags the mouse while pressing shift
   */
  const wrapHandler = (handler, containerRef) => {
      return (event) => {
          if (event.target !== containerRef.current) {
              return;
          }
          handler?.(event);
      };
  };
  const selector$8 = (s) => ({
      userSelectionActive: s.userSelectionActive,
      elementsSelectable: s.elementsSelectable,
      dragging: s.paneDragging,
  });
  const Pane = React.memo(({ isSelecting, selectionMode = exports.SelectionMode.Full, panOnDrag, onSelectionStart, onSelectionEnd, onPaneClick, onPaneContextMenu, onPaneScroll, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, children, }) => {
      const container = React.useRef(null);
      const store = useStoreApi();
      const prevSelectedNodesCount = React.useRef(0);
      const prevSelectedEdgesCount = React.useRef(0);
      const containerBounds = React.useRef();
      const { userSelectionActive, elementsSelectable, dragging } = useStore(selector$8, shallow);
      const resetUserSelection = () => {
          store.setState({ userSelectionActive: false, userSelectionRect: null });
          prevSelectedNodesCount.current = 0;
          prevSelectedEdgesCount.current = 0;
      };
      const onClick = (event) => {
          onPaneClick?.(event);
          store.getState().resetSelectedElements();
          store.setState({ nodesSelectionActive: false });
      };
      const onContextMenu = (event) => {
          if (Array.isArray(panOnDrag) && panOnDrag?.includes(2)) {
              event.preventDefault();
              return;
          }
          onPaneContextMenu?.(event);
      };
      const onWheel = onPaneScroll ? (event) => onPaneScroll(event) : undefined;
      const onMouseDown = (event) => {
          const { resetSelectedElements, domNode } = store.getState();
          containerBounds.current = domNode?.getBoundingClientRect();
          if (!elementsSelectable ||
              !isSelecting ||
              event.button !== 0 ||
              event.target !== container.current ||
              !containerBounds.current) {
              return;
          }
          const { x, y } = getEventPosition(event, containerBounds.current);
          resetSelectedElements();
          store.setState({
              userSelectionRect: {
                  width: 0,
                  height: 0,
                  startX: x,
                  startY: y,
                  x,
                  y,
              },
          });
          onSelectionStart?.(event);
      };
      const onMouseMove = (event) => {
          const { userSelectionRect, nodeInternals, edges, transform, onNodesChange, onEdgesChange, nodeOrigin, getNodes } = store.getState();
          if (!isSelecting || !containerBounds.current || !userSelectionRect) {
              return;
          }
          store.setState({ userSelectionActive: true, nodesSelectionActive: false });
          const mousePos = getEventPosition(event, containerBounds.current);
          const startX = userSelectionRect.startX ?? 0;
          const startY = userSelectionRect.startY ?? 0;
          const nextUserSelectRect = {
              ...userSelectionRect,
              x: mousePos.x < startX ? mousePos.x : startX,
              y: mousePos.y < startY ? mousePos.y : startY,
              width: Math.abs(mousePos.x - startX),
              height: Math.abs(mousePos.y - startY),
          };
          const nodes = getNodes();
          const selectedNodes = getNodesInside(nodeInternals, nextUserSelectRect, transform, selectionMode === exports.SelectionMode.Partial, true, nodeOrigin);
          const selectedEdgeIds = getConnectedEdges(selectedNodes, edges).map((e) => e.id);
          const selectedNodeIds = selectedNodes.map((n) => n.id);
          if (prevSelectedNodesCount.current !== selectedNodeIds.length) {
              prevSelectedNodesCount.current = selectedNodeIds.length;
              const changes = getSelectionChanges(nodes, selectedNodeIds);
              if (changes.length) {
                  onNodesChange?.(changes);
              }
          }
          if (prevSelectedEdgesCount.current !== selectedEdgeIds.length) {
              prevSelectedEdgesCount.current = selectedEdgeIds.length;
              const changes = getSelectionChanges(edges, selectedEdgeIds);
              if (changes.length) {
                  onEdgesChange?.(changes);
              }
          }
          store.setState({
              userSelectionRect: nextUserSelectRect,
          });
      };
      const onMouseUp = (event) => {
          if (event.button !== 0) {
              return;
          }
          const { userSelectionRect } = store.getState();
          // We only want to trigger click functions when in selection mode if
          // the user did not move the mouse.
          if (!userSelectionActive && userSelectionRect && event.target === container.current) {
              onClick?.(event);
          }
          store.setState({ nodesSelectionActive: prevSelectedNodesCount.current > 0 });
          resetUserSelection();
          onSelectionEnd?.(event);
      };
      const onMouseLeave = (event) => {
          if (userSelectionActive) {
              store.setState({ nodesSelectionActive: prevSelectedNodesCount.current > 0 });
              onSelectionEnd?.(event);
          }
          resetUserSelection();
      };
      const hasActiveSelection = elementsSelectable && (isSelecting || userSelectionActive);
      return (React.createElement("div", { className: cc(['react-flow__pane', { dragging, selection: isSelecting }]), onClick: hasActiveSelection ? undefined : wrapHandler(onClick, container), onContextMenu: wrapHandler(onContextMenu, container), onWheel: wrapHandler(onWheel, container), onMouseEnter: hasActiveSelection ? undefined : onPaneMouseEnter, onMouseDown: hasActiveSelection ? onMouseDown : undefined, onMouseMove: hasActiveSelection ? onMouseMove : onPaneMouseMove, onMouseUp: hasActiveSelection ? onMouseUp : undefined, onMouseLeave: hasActiveSelection ? onMouseLeave : onPaneMouseLeave, ref: container, style: containerStyle },
          children,
          React.createElement(UserSelection, null)));
  });
  Pane.displayName = 'Pane';

  function isParentSelected(node, nodeInternals) {
      const parentId = node.parentNode || node.parentId;
      if (!parentId) {
          return false;
      }
      const parentNode = nodeInternals.get(parentId);
      if (!parentNode) {
          return false;
      }
      if (parentNode.selected) {
          return true;
      }
      return isParentSelected(parentNode, nodeInternals);
  }
  function hasSelector(target, selector, nodeRef) {
      let current = target;
      do {
          if (current?.matches(selector))
              return true;
          if (current === nodeRef.current)
              return false;
          current = current.parentElement;
      } while (current);
      return false;
  }
  // looks for all selected nodes and created a NodeDragItem for each of them
  function getDragItems(nodeInternals, nodesDraggable, mousePos, nodeId) {
      return Array.from(nodeInternals.values())
          .filter((n) => (n.selected || n.id === nodeId) &&
          (!n.parentNode || n.parentId || !isParentSelected(n, nodeInternals)) &&
          (n.draggable || (nodesDraggable && typeof n.draggable === 'undefined')))
          .map((n) => ({
          id: n.id,
          position: n.position || { x: 0, y: 0 },
          positionAbsolute: n.positionAbsolute || { x: 0, y: 0 },
          distance: {
              x: mousePos.x - (n.positionAbsolute?.x ?? 0),
              y: mousePos.y - (n.positionAbsolute?.y ?? 0),
          },
          delta: {
              x: 0,
              y: 0,
          },
          extent: n.extent,
          parentNode: n.parentNode || n.parentId,
          parentId: n.parentNode || n.parentId,
          width: n.width,
          height: n.height,
          expandParent: n.expandParent,
      }));
  }
  function clampNodeExtent(node, extent) {
      if (!extent || extent === 'parent') {
          return extent;
      }
      return [extent[0], [extent[1][0] - (node.width || 0), extent[1][1] - (node.height || 0)]];
  }
  function calcNextPosition(node, nextPosition, nodeInternals, nodeExtent, nodeOrigin = [0, 0], onError) {
      const clampedNodeExtent = clampNodeExtent(node, node.extent || nodeExtent);
      let currentExtent = clampedNodeExtent;
      const parentId = node.parentNode || node.parentId;
      if (node.extent === 'parent' && !node.expandParent) {
          if (parentId && node.width && node.height) {
              const parent = nodeInternals.get(parentId);
              const { x: parentX, y: parentY } = getNodePositionWithOrigin(parent, nodeOrigin).positionAbsolute;
              currentExtent =
                  parent && isNumeric(parentX) && isNumeric(parentY) && isNumeric(parent.width) && isNumeric(parent.height)
                      ? [
                          [parentX + node.width * nodeOrigin[0], parentY + node.height * nodeOrigin[1]],
                          [
                              parentX + parent.width - node.width + node.width * nodeOrigin[0],
                              parentY + parent.height - node.height + node.height * nodeOrigin[1],
                          ],
                      ]
                      : currentExtent;
          }
          else {
              onError?.('005', errorMessages['error005']());
              currentExtent = clampedNodeExtent;
          }
      }
      else if (node.extent && parentId && node.extent !== 'parent') {
          const parent = nodeInternals.get(parentId);
          const { x: parentX, y: parentY } = getNodePositionWithOrigin(parent, nodeOrigin).positionAbsolute;
          currentExtent = [
              [node.extent[0][0] + parentX, node.extent[0][1] + parentY],
              [node.extent[1][0] + parentX, node.extent[1][1] + parentY],
          ];
      }
      let parentPosition = { x: 0, y: 0 };
      if (parentId) {
          const parentNode = nodeInternals.get(parentId);
          parentPosition = getNodePositionWithOrigin(parentNode, nodeOrigin).positionAbsolute;
      }
      const positionAbsolute = currentExtent && currentExtent !== 'parent'
          ? clampPosition(nextPosition, currentExtent)
          : nextPosition;
      return {
          position: {
              x: positionAbsolute.x - parentPosition.x,
              y: positionAbsolute.y - parentPosition.y,
          },
          positionAbsolute,
      };
  }
  // returns two params:
  // 1. the dragged node (or the first of the list, if we are dragging a node selection)
  // 2. array of selected nodes (for multi selections)
  function getEventHandlerParams({ nodeId, dragItems, nodeInternals, }) {
      const extentedDragItems = dragItems.map((n) => {
          const node = nodeInternals.get(n.id);
          return {
              ...node,
              position: n.position,
              positionAbsolute: n.positionAbsolute,
          };
      });
      return [nodeId ? extentedDragItems.find((n) => n.id === nodeId) : extentedDragItems[0], extentedDragItems];
  }

  const getHandleBounds = (selector, nodeElement, zoom, nodeOrigin) => {
      const handles = nodeElement.querySelectorAll(selector);
      if (!handles || !handles.length) {
          return null;
      }
      const handlesArray = Array.from(handles);
      const nodeBounds = nodeElement.getBoundingClientRect();
      const nodeOffset = {
          x: nodeBounds.width * nodeOrigin[0],
          y: nodeBounds.height * nodeOrigin[1],
      };
      return handlesArray.map((handle) => {
          const handleBounds = handle.getBoundingClientRect();
          return {
              id: handle.getAttribute('data-handleid'),
              position: handle.getAttribute('data-handlepos'),
              x: (handleBounds.left - nodeBounds.left - nodeOffset.x) / zoom,
              y: (handleBounds.top - nodeBounds.top - nodeOffset.y) / zoom,
              ...getDimensions(handle),
          };
      });
  };
  function getMouseHandler(id, getState, handler) {
      return handler === undefined
          ? handler
          : (event) => {
              const node = getState().nodeInternals.get(id);
              if (node) {
                  handler(event, { ...node });
              }
          };
  }
  // this handler is called by
  // 1. the click handler when node is not draggable or selectNodesOnDrag = false
  // or
  // 2. the on drag start handler when node is draggable and selectNodesOnDrag = true
  function handleNodeClick({ id, store, unselect = false, nodeRef, }) {
      const { addSelectedNodes, unselectNodesAndEdges, multiSelectionActive, nodeInternals, onError } = store.getState();
      const node = nodeInternals.get(id);
      if (!node) {
          onError?.('012', errorMessages['error012'](id));
          return;
      }
      store.setState({ nodesSelectionActive: false });
      if (!node.selected) {
          addSelectedNodes([id]);
      }
      else if (unselect || (node.selected && multiSelectionActive)) {
          unselectNodesAndEdges({ nodes: [node], edges: [] });
          requestAnimationFrame(() => nodeRef?.current?.blur());
      }
  }

  function useGetPointerPosition() {
      const store = useStoreApi();
      // returns the pointer position projected to the RF coordinate system
      const getPointerPosition = React.useCallback(({ sourceEvent }) => {
          const { transform, snapGrid, snapToGrid } = store.getState();
          const x = sourceEvent.touches ? sourceEvent.touches[0].clientX : sourceEvent.clientX;
          const y = sourceEvent.touches ? sourceEvent.touches[0].clientY : sourceEvent.clientY;
          const pointerPos = {
              x: (x - transform[0]) / transform[2],
              y: (y - transform[1]) / transform[2],
          };
          // we need the snapped position in order to be able to skip unnecessary drag events
          return {
              xSnapped: snapToGrid ? snapGrid[0] * Math.round(pointerPos.x / snapGrid[0]) : pointerPos.x,
              ySnapped: snapToGrid ? snapGrid[1] * Math.round(pointerPos.y / snapGrid[1]) : pointerPos.y,
              ...pointerPos,
          };
      }, []);
      return getPointerPosition;
  }

  function wrapSelectionDragFunc(selectionFunc) {
      return (event, _, nodes) => selectionFunc?.(event, nodes);
  }
  function useDrag({ nodeRef, disabled = false, noDragClassName, handleSelector, nodeId, isSelectable, selectNodesOnDrag, }) {
      const store = useStoreApi();
      const [dragging, setDragging] = React.useState(false);
      const dragItems = React.useRef([]);
      const lastPos = React.useRef({ x: null, y: null });
      const autoPanId = React.useRef(0);
      const containerBounds = React.useRef(null);
      const mousePosition = React.useRef({ x: 0, y: 0 });
      const dragEvent = React.useRef(null);
      const autoPanStarted = React.useRef(false);
      const dragStarted = React.useRef(false);
      const abortDrag = React.useRef(false);
      const getPointerPosition = useGetPointerPosition();
      React.useEffect(() => {
          if (nodeRef?.current) {
              const selection = select(nodeRef.current);
              const updateNodes = ({ x, y }) => {
                  const { nodeInternals, onNodeDrag, onSelectionDrag, updateNodePositions, nodeExtent, snapGrid, snapToGrid, nodeOrigin, onError, } = store.getState();
                  lastPos.current = { x, y };
                  let hasChange = false;
                  let nodesBox = { x: 0, y: 0, x2: 0, y2: 0 };
                  if (dragItems.current.length > 1 && nodeExtent) {
                      const rect = getNodesBounds(dragItems.current, nodeOrigin);
                      nodesBox = rectToBox(rect);
                  }
                  dragItems.current = dragItems.current.map((n) => {
                      const nextPosition = { x: x - n.distance.x, y: y - n.distance.y };
                      if (snapToGrid) {
                          nextPosition.x = snapGrid[0] * Math.round(nextPosition.x / snapGrid[0]);
                          nextPosition.y = snapGrid[1] * Math.round(nextPosition.y / snapGrid[1]);
                      }
                      // if there is selection with multiple nodes and a node extent is set, we need to adjust the node extent for each node
                      // based on its position so that the node stays at it's position relative to the selection.
                      const adjustedNodeExtent = [
                          [nodeExtent[0][0], nodeExtent[0][1]],
                          [nodeExtent[1][0], nodeExtent[1][1]],
                      ];
                      if (dragItems.current.length > 1 && nodeExtent && !n.extent) {
                          adjustedNodeExtent[0][0] = n.positionAbsolute.x - nodesBox.x + nodeExtent[0][0];
                          adjustedNodeExtent[1][0] = n.positionAbsolute.x + (n.width ?? 0) - nodesBox.x2 + nodeExtent[1][0];
                          adjustedNodeExtent[0][1] = n.positionAbsolute.y - nodesBox.y + nodeExtent[0][1];
                          adjustedNodeExtent[1][1] = n.positionAbsolute.y + (n.height ?? 0) - nodesBox.y2 + nodeExtent[1][1];
                      }
                      const updatedPos = calcNextPosition(n, nextPosition, nodeInternals, adjustedNodeExtent, nodeOrigin, onError);
                      // we want to make sure that we only fire a change event when there is a change
                      hasChange = hasChange || n.position.x !== updatedPos.position.x || n.position.y !== updatedPos.position.y;
                      n.position = updatedPos.position;
                      n.positionAbsolute = updatedPos.positionAbsolute;
                      return n;
                  });
                  if (!hasChange) {
                      return;
                  }
                  updateNodePositions(dragItems.current, true, true);
                  setDragging(true);
                  const onDrag = nodeId ? onNodeDrag : wrapSelectionDragFunc(onSelectionDrag);
                  if (onDrag && dragEvent.current) {
                      const [currentNode, nodes] = getEventHandlerParams({
                          nodeId,
                          dragItems: dragItems.current,
                          nodeInternals,
                      });
                      onDrag(dragEvent.current, currentNode, nodes);
                  }
              };
              const autoPan = () => {
                  if (!containerBounds.current) {
                      return;
                  }
                  const [xMovement, yMovement] = calcAutoPan(mousePosition.current, containerBounds.current);
                  if (xMovement !== 0 || yMovement !== 0) {
                      const { transform, panBy } = store.getState();
                      lastPos.current.x = (lastPos.current.x ?? 0) - xMovement / transform[2];
                      lastPos.current.y = (lastPos.current.y ?? 0) - yMovement / transform[2];
                      if (panBy({ x: xMovement, y: yMovement })) {
                          updateNodes(lastPos.current);
                      }
                  }
                  autoPanId.current = requestAnimationFrame(autoPan);
              };
              const startDrag = (event) => {
                  const { nodeInternals, multiSelectionActive, nodesDraggable, unselectNodesAndEdges, onNodeDragStart, onSelectionDragStart, } = store.getState();
                  dragStarted.current = true;
                  const onStart = nodeId ? onNodeDragStart : wrapSelectionDragFunc(onSelectionDragStart);
                  if ((!selectNodesOnDrag || !isSelectable) && !multiSelectionActive && nodeId) {
                      if (!nodeInternals.get(nodeId)?.selected) {
                          // we need to reset selected nodes when selectNodesOnDrag=false
                          unselectNodesAndEdges();
                      }
                  }
                  if (nodeId && isSelectable && selectNodesOnDrag) {
                      handleNodeClick({
                          id: nodeId,
                          store,
                          nodeRef: nodeRef,
                      });
                  }
                  const pointerPos = getPointerPosition(event);
                  lastPos.current = pointerPos;
                  dragItems.current = getDragItems(nodeInternals, nodesDraggable, pointerPos, nodeId);
                  if (onStart && dragItems.current) {
                      const [currentNode, nodes] = getEventHandlerParams({
                          nodeId,
                          dragItems: dragItems.current,
                          nodeInternals,
                      });
                      onStart(event.sourceEvent, currentNode, nodes);
                  }
              };
              if (disabled) {
                  selection.on('.drag', null);
              }
              else {
                  const dragHandler = drag()
                      .on('start', (event) => {
                      const { domNode, nodeDragThreshold } = store.getState();
                      if (nodeDragThreshold === 0) {
                          startDrag(event);
                      }
                      abortDrag.current = false;
                      const pointerPos = getPointerPosition(event);
                      lastPos.current = pointerPos;
                      containerBounds.current = domNode?.getBoundingClientRect() || null;
                      mousePosition.current = getEventPosition(event.sourceEvent, containerBounds.current);
                  })
                      .on('drag', (event) => {
                      const pointerPos = getPointerPosition(event);
                      const { autoPanOnNodeDrag, nodeDragThreshold } = store.getState();
                      if (event.sourceEvent.type === 'touchmove' && event.sourceEvent.touches.length > 1) {
                          abortDrag.current = true;
                      }
                      if (abortDrag.current) {
                          return;
                      }
                      if (!autoPanStarted.current && dragStarted.current && autoPanOnNodeDrag) {
                          autoPanStarted.current = true;
                          autoPan();
                      }
                      if (!dragStarted.current) {
                          const x = pointerPos.xSnapped - (lastPos?.current?.x ?? 0);
                          const y = pointerPos.ySnapped - (lastPos?.current?.y ?? 0);
                          const distance = Math.sqrt(x * x + y * y);
                          if (distance > nodeDragThreshold) {
                              startDrag(event);
                          }
                      }
                      // skip events without movement
                      if ((lastPos.current.x !== pointerPos.xSnapped || lastPos.current.y !== pointerPos.ySnapped) &&
                          dragItems.current &&
                          dragStarted.current) {
                          dragEvent.current = event.sourceEvent;
                          mousePosition.current = getEventPosition(event.sourceEvent, containerBounds.current);
                          updateNodes(pointerPos);
                      }
                  })
                      .on('end', (event) => {
                      if (!dragStarted.current || abortDrag.current) {
                          return;
                      }
                      setDragging(false);
                      autoPanStarted.current = false;
                      dragStarted.current = false;
                      cancelAnimationFrame(autoPanId.current);
                      if (dragItems.current) {
                          const { updateNodePositions, nodeInternals, onNodeDragStop, onSelectionDragStop } = store.getState();
                          const onStop = nodeId ? onNodeDragStop : wrapSelectionDragFunc(onSelectionDragStop);
                          updateNodePositions(dragItems.current, false, false);
                          if (onStop) {
                              const [currentNode, nodes] = getEventHandlerParams({
                                  nodeId,
                                  dragItems: dragItems.current,
                                  nodeInternals,
                              });
                              onStop(event.sourceEvent, currentNode, nodes);
                          }
                      }
                  })
                      .filter((event) => {
                      const target = event.target;
                      const isDraggable = !event.button &&
                          (!noDragClassName || !hasSelector(target, `.${noDragClassName}`, nodeRef)) &&
                          (!handleSelector || hasSelector(target, handleSelector, nodeRef));
                      return isDraggable;
                  });
                  selection.call(dragHandler);
                  return () => {
                      selection.on('.drag', null);
                  };
              }
          }
      }, [
          nodeRef,
          disabled,
          noDragClassName,
          handleSelector,
          isSelectable,
          store,
          nodeId,
          selectNodesOnDrag,
          getPointerPosition,
      ]);
      return dragging;
  }

  function useUpdateNodePositions() {
      const store = useStoreApi();
      const updatePositions = React.useCallback((params) => {
          const { nodeInternals, nodeExtent, updateNodePositions, getNodes, snapToGrid, snapGrid, onError, nodesDraggable } = store.getState();
          const selectedNodes = getNodes().filter((n) => n.selected && (n.draggable || (nodesDraggable && typeof n.draggable === 'undefined')));
          // by default a node moves 5px on each key press, or 20px if shift is pressed
          // if snap grid is enabled, we use that for the velocity.
          const xVelo = snapToGrid ? snapGrid[0] : 5;
          const yVelo = snapToGrid ? snapGrid[1] : 5;
          const factor = params.isShiftPressed ? 4 : 1;
          const positionDiffX = params.x * xVelo * factor;
          const positionDiffY = params.y * yVelo * factor;
          const nodeUpdates = selectedNodes.map((n) => {
              if (n.positionAbsolute) {
                  const nextPosition = { x: n.positionAbsolute.x + positionDiffX, y: n.positionAbsolute.y + positionDiffY };
                  if (snapToGrid) {
                      nextPosition.x = snapGrid[0] * Math.round(nextPosition.x / snapGrid[0]);
                      nextPosition.y = snapGrid[1] * Math.round(nextPosition.y / snapGrid[1]);
                  }
                  const { positionAbsolute, position } = calcNextPosition(n, nextPosition, nodeInternals, nodeExtent, undefined, onError);
                  n.position = position;
                  n.positionAbsolute = positionAbsolute;
              }
              return n;
          });
          updateNodePositions(nodeUpdates, true, false);
      }, []);
      return updatePositions;
  }

  const arrowKeyDiffs = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
  };
  var wrapNode = (NodeComponent) => {
      const NodeWrapper = ({ id, type, data, xPos, yPos, xPosOrigin, yPosOrigin, selected, onClick, onMouseEnter, onMouseMove, onMouseLeave, onContextMenu, onDoubleClick, style, className, isDraggable, isSelectable, isConnectable, isFocusable, selectNodesOnDrag, sourcePosition, targetPosition, hidden, resizeObserver, dragHandle, zIndex, isParent, noDragClassName, noPanClassName, initialized, disableKeyboardA11y, ariaLabel, rfId, hasHandleBounds, }) => {
          const store = useStoreApi();
          const nodeRef = React.useRef(null);
          const prevNodeRef = React.useRef(null);
          const prevSourcePosition = React.useRef(sourcePosition);
          const prevTargetPosition = React.useRef(targetPosition);
          const prevType = React.useRef(type);
          const hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
          const updatePositions = useUpdateNodePositions();
          const onMouseEnterHandler = getMouseHandler(id, store.getState, onMouseEnter);
          const onMouseMoveHandler = getMouseHandler(id, store.getState, onMouseMove);
          const onMouseLeaveHandler = getMouseHandler(id, store.getState, onMouseLeave);
          const onContextMenuHandler = getMouseHandler(id, store.getState, onContextMenu);
          const onDoubleClickHandler = getMouseHandler(id, store.getState, onDoubleClick);
          const onSelectNodeHandler = (event) => {
              const { nodeDragThreshold, preventNodeClick } = store.getState();
              console.log("internal node click", preventNodeClick);
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
          const onKeyDown = (event) => {
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
              }
              else if (isDraggable && selected && Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
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
          React.useEffect(() => {
              return () => {
                  if (prevNodeRef.current) {
                      resizeObserver?.unobserve(prevNodeRef.current);
                      prevNodeRef.current = null;
                  }
              };
          }, []);
          React.useEffect(() => {
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
          React.useEffect(() => {
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
          return (React.createElement("div", { className: cc([
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
              ]), ref: nodeRef, style: {
                  zIndex,
                  transform: `translate(${xPosOrigin}px,${yPosOrigin}px)`,
                  pointerEvents: hasPointerEvents ? 'all' : 'none',
                  visibility: initialized ? 'visible' : 'hidden',
                  ...style,
              }, "data-id": id, "data-testid": `rf__node-${id}`, onMouseEnter: onMouseEnterHandler, onMouseMove: onMouseMoveHandler, onMouseLeave: onMouseLeaveHandler, onContextMenu: onContextMenuHandler, onClick: onSelectNodeHandler, onDoubleClick: onDoubleClickHandler, onKeyDown: isFocusable ? onKeyDown : undefined, tabIndex: isFocusable ? 0 : undefined, role: isFocusable ? 'button' : undefined, "aria-describedby": disableKeyboardA11y ? undefined : `${ARIA_NODE_DESC_KEY}-${rfId}`, "aria-label": ariaLabel },
              React.createElement(Provider, { value: id },
                  React.createElement(NodeComponent, { id: id, data: data, type: type, xPos: xPos, yPos: yPos, selected: selected, isConnectable: isConnectable, sourcePosition: sourcePosition, targetPosition: targetPosition, dragging: dragging, dragHandle: dragHandle, zIndex: zIndex }))));
      };
      NodeWrapper.displayName = 'NodeWrapper';
      return React.memo(NodeWrapper);
  };

  /**
   * The nodes selection rectangle gets displayed when a user
   * made a selection with on or several nodes
   */
  const selector$7 = (s) => {
      const selectedNodes = s.getNodes().filter((n) => n.selected);
      return {
          ...getNodesBounds(selectedNodes, s.nodeOrigin),
          transformString: `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]})`,
          userSelectionActive: s.userSelectionActive,
      };
  };
  function NodesSelection({ onSelectionContextMenu, noPanClassName, disableKeyboardA11y }) {
      const store = useStoreApi();
      const { width, height, x: left, y: top, transformString, userSelectionActive } = useStore(selector$7, shallow);
      const updatePositions = useUpdateNodePositions();
      const nodeRef = React.useRef(null);
      React.useEffect(() => {
          if (!disableKeyboardA11y) {
              nodeRef.current?.focus({
                  preventScroll: true,
              });
          }
      }, [disableKeyboardA11y]);
      useDrag({
          nodeRef,
      });
      if (userSelectionActive || !width || !height) {
          return null;
      }
      const onContextMenu = onSelectionContextMenu
          ? (event) => {
              const selectedNodes = store
                  .getState()
                  .getNodes()
                  .filter((n) => n.selected);
              onSelectionContextMenu(event, selectedNodes);
          }
          : undefined;
      const onKeyDown = (event) => {
          if (Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
              updatePositions({
                  x: arrowKeyDiffs[event.key].x,
                  y: arrowKeyDiffs[event.key].y,
                  isShiftPressed: event.shiftKey,
              });
          }
      };
      return (React.createElement("div", { className: cc(['react-flow__nodesselection', 'react-flow__container', noPanClassName]), style: {
              transform: transformString,
          } },
          React.createElement("div", { ref: nodeRef, className: "react-flow__nodesselection-rect", onContextMenu: onContextMenu, tabIndex: disableKeyboardA11y ? undefined : -1, onKeyDown: disableKeyboardA11y ? undefined : onKeyDown, style: {
                  width,
                  height,
                  top,
                  left,
              } })));
  }
  var NodesSelection$1 = React.memo(NodesSelection);

  const selector$6 = (s) => s.nodesSelectionActive;
  const FlowRenderer = ({ children, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneContextMenu, onPaneScroll, deleteKeyCode, onMove, onMoveStart, onMoveEnd, selectionKeyCode, selectionOnDrag, selectionMode, onSelectionStart, onSelectionEnd, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, elementsSelectable, zoomOnScroll, zoomOnPinch, panOnScroll: _panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag: _panOnDrag, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, onSelectionContextMenu, noWheelClassName, noPanClassName, disableKeyboardA11y, }) => {
      const nodesSelectionActive = useStore(selector$6);
      const selectionKeyPressed = useKeyPress(selectionKeyCode);
      const panActivationKeyPressed = useKeyPress(panActivationKeyCode);
      const panOnDrag = panActivationKeyPressed || _panOnDrag;
      const panOnScroll = panActivationKeyPressed || _panOnScroll;
      const isSelecting = selectionKeyPressed || (selectionOnDrag && panOnDrag !== true);
      useGlobalKeyHandler({ deleteKeyCode, multiSelectionKeyCode });
      return (React.createElement(ZoomPane, { onMove: onMove, onMoveStart: onMoveStart, onMoveEnd: onMoveEnd, onPaneContextMenu: onPaneContextMenu, elementsSelectable: elementsSelectable, zoomOnScroll: zoomOnScroll, zoomOnPinch: zoomOnPinch, panOnScroll: panOnScroll, panOnScrollSpeed: panOnScrollSpeed, panOnScrollMode: panOnScrollMode, zoomOnDoubleClick: zoomOnDoubleClick, panOnDrag: !selectionKeyPressed && panOnDrag, defaultViewport: defaultViewport, translateExtent: translateExtent, minZoom: minZoom, maxZoom: maxZoom, zoomActivationKeyCode: zoomActivationKeyCode, preventScrolling: preventScrolling, noWheelClassName: noWheelClassName, noPanClassName: noPanClassName },
          React.createElement(Pane, { onSelectionStart: onSelectionStart, onSelectionEnd: onSelectionEnd, onPaneClick: onPaneClick, onPaneMouseEnter: onPaneMouseEnter, onPaneMouseMove: onPaneMouseMove, onPaneMouseLeave: onPaneMouseLeave, onPaneContextMenu: onPaneContextMenu, onPaneScroll: onPaneScroll, panOnDrag: panOnDrag, isSelecting: !!isSelecting, selectionMode: selectionMode },
              children,
              nodesSelectionActive && (React.createElement(NodesSelection$1, { onSelectionContextMenu: onSelectionContextMenu, noPanClassName: noPanClassName, disableKeyboardA11y: disableKeyboardA11y })))));
  };
  FlowRenderer.displayName = 'FlowRenderer';
  var FlowRenderer$1 = React.memo(FlowRenderer);

  function useVisibleNodes(onlyRenderVisible) {
      const nodes = useStore(React.useCallback((s) => onlyRenderVisible
          ? getNodesInside(s.nodeInternals, { x: 0, y: 0, width: s.width, height: s.height }, s.transform, true)
          : s.getNodes(), [onlyRenderVisible]));
      return nodes;
  }

  function createNodeTypes(nodeTypes) {
      const standardTypes = {
          input: wrapNode((nodeTypes.input || InputNode$1)),
          default: wrapNode((nodeTypes.default || DefaultNode$1)),
          output: wrapNode((nodeTypes.output || OutputNode$1)),
          group: wrapNode((nodeTypes.group || GroupNode)),
      };
      const wrappedTypes = {};
      const specialTypes = Object.keys(nodeTypes)
          .filter((k) => !['input', 'default', 'output', 'group'].includes(k))
          .reduce((res, key) => {
          res[key] = wrapNode((nodeTypes[key] || DefaultNode$1));
          return res;
      }, wrappedTypes);
      return {
          ...standardTypes,
          ...specialTypes,
      };
  }
  const getPositionWithOrigin = ({ x, y, width, height, origin, }) => {
      if (!width || !height) {
          return { x, y };
      }
      if (origin[0] < 0 || origin[1] < 0 || origin[0] > 1 || origin[1] > 1) {
          return { x, y };
      }
      return {
          x: x - width * origin[0],
          y: y - height * origin[1],
      };
  };

  const selector$5 = (s) => ({
      nodesDraggable: s.nodesDraggable,
      nodesConnectable: s.nodesConnectable,
      nodesFocusable: s.nodesFocusable,
      elementsSelectable: s.elementsSelectable,
      updateNodeDimensions: s.updateNodeDimensions,
      onError: s.onError,
  });
  const NodeRenderer = (props) => {
      const { nodesDraggable, nodesConnectable, nodesFocusable, elementsSelectable, updateNodeDimensions, onError } = useStore(selector$5, shallow);
      const nodes = useVisibleNodes(props.onlyRenderVisibleElements);
      const resizeObserverRef = React.useRef();
      const resizeObserver = React.useMemo(() => {
          if (typeof ResizeObserver === 'undefined') {
              return null;
          }
          const observer = new ResizeObserver((entries) => {
              const updates = entries.map((entry) => ({
                  id: entry.target.getAttribute('data-id'),
                  nodeElement: entry.target,
                  forceUpdate: true,
              }));
              updateNodeDimensions(updates);
          });
          resizeObserverRef.current = observer;
          return observer;
      }, []);
      React.useEffect(() => {
          return () => {
              resizeObserverRef?.current?.disconnect();
          };
      }, []);
      return (React.createElement("div", { className: "react-flow__nodes", style: containerStyle }, nodes.map((node) => {
          let nodeType = node.type || 'default';
          if (!props.nodeTypes[nodeType]) {
              onError?.('003', errorMessages['error003'](nodeType));
              nodeType = 'default';
          }
          const NodeComponent = (props.nodeTypes[nodeType] || props.nodeTypes.default);
          const isDraggable = !!(node.draggable || (nodesDraggable && typeof node.draggable === 'undefined'));
          const isSelectable = !!(node.selectable || (elementsSelectable && typeof node.selectable === 'undefined'));
          const isConnectable = !!(node.connectable || (nodesConnectable && typeof node.connectable === 'undefined'));
          const isFocusable = !!(node.focusable || (nodesFocusable && typeof node.focusable === 'undefined'));
          const clampedPosition = props.nodeExtent
              ? clampPosition(node.positionAbsolute, props.nodeExtent)
              : node.positionAbsolute;
          const posX = clampedPosition?.x ?? 0;
          const posY = clampedPosition?.y ?? 0;
          const posOrigin = getPositionWithOrigin({
              x: posX,
              y: posY,
              width: node.width ?? 0,
              height: node.height ?? 0,
              origin: props.nodeOrigin,
          });
          return (React.createElement(NodeComponent, { key: node.id, id: node.id, className: node.className, style: node.style, type: nodeType, data: node.data, sourcePosition: node.sourcePosition || exports.Position.Bottom, targetPosition: node.targetPosition || exports.Position.Top, hidden: node.hidden, xPos: posX, yPos: posY, xPosOrigin: posOrigin.x, yPosOrigin: posOrigin.y, selectNodesOnDrag: props.selectNodesOnDrag, onClick: props.onNodeClick, onMouseEnter: props.onNodeMouseEnter, onMouseMove: props.onNodeMouseMove, onMouseLeave: props.onNodeMouseLeave, onContextMenu: props.onNodeContextMenu, onDoubleClick: props.onNodeDoubleClick, selected: !!node.selected, isDraggable: isDraggable, isSelectable: isSelectable, isConnectable: isConnectable, isFocusable: isFocusable, resizeObserver: resizeObserver, dragHandle: node.dragHandle, zIndex: node[internalsSymbol]?.z ?? 0, isParent: !!node[internalsSymbol]?.isParent, noDragClassName: props.noDragClassName, noPanClassName: props.noPanClassName, initialized: !!node.width && !!node.height, rfId: props.rfId, disableKeyboardA11y: props.disableKeyboardA11y, ariaLabel: node.ariaLabel, hasHandleBounds: !!node[internalsSymbol]?.handleBounds }));
      })));
  };
  NodeRenderer.displayName = 'NodeRenderer';
  var NodeRenderer$1 = React.memo(NodeRenderer);

  const shiftX = (x, shift, position) => {
      if (position === exports.Position.Left)
          return x - shift;
      if (position === exports.Position.Right)
          return x + shift;
      return x;
  };
  const shiftY = (y, shift, position) => {
      if (position === exports.Position.Top)
          return y - shift;
      if (position === exports.Position.Bottom)
          return y + shift;
      return y;
  };
  const EdgeUpdaterClassName = 'react-flow__edgeupdater';
  const EdgeAnchor = ({ position, centerX, centerY, radius = 10, onMouseDown, onMouseEnter, onMouseOut, type, }) => (React.createElement("circle", { onMouseDown: onMouseDown, onMouseEnter: onMouseEnter, onMouseOut: onMouseOut, className: cc([EdgeUpdaterClassName, `${EdgeUpdaterClassName}-${type}`]), cx: shiftX(centerX, radius, position), cy: shiftY(centerY, radius, position), r: radius, stroke: "transparent", fill: "transparent" }));

  const alwaysValidConnection = () => true;
  var wrapEdge = (EdgeComponent) => {
      const EdgeWrapper = ({ id, className, type, data, onClick, onEdgeDoubleClick, selected, animated, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, elementsSelectable, hidden, sourceHandleId, targetHandleId, onContextMenu, onMouseEnter, onMouseMove, onMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, markerEnd, markerStart, rfId, ariaLabel, isFocusable, isReconnectable, pathOptions, interactionWidth, disableKeyboardA11y, }) => {
          const edgeRef = React.useRef(null);
          const [updateHover, setUpdateHover] = React.useState(false);
          const [updating, setUpdating] = React.useState(false);
          const store = useStoreApi();
          const markerStartUrl = React.useMemo(() => `url('#${getMarkerId(markerStart, rfId)}')`, [markerStart, rfId]);
          const markerEndUrl = React.useMemo(() => `url('#${getMarkerId(markerEnd, rfId)}')`, [markerEnd, rfId]);
          if (hidden) {
              return null;
          }
          const onEdgeClick = (event) => {
              const { edges, addSelectedEdges, unselectNodesAndEdges, multiSelectionActive } = store.getState();
              const edge = edges.find((e) => e.id === id);
              if (!edge) {
                  return;
              }
              if (elementsSelectable) {
                  store.setState({ nodesSelectionActive: false });
                  if (edge.selected && multiSelectionActive) {
                      unselectNodesAndEdges({ nodes: [], edges: [edge] });
                      edgeRef.current?.blur();
                  }
                  else {
                      addSelectedEdges([id]);
                  }
              }
              if (onClick) {
                  onClick(event, edge);
              }
          };
          const onEdgeDoubleClickHandler = getMouseHandler$1(id, store.getState, onEdgeDoubleClick);
          const onEdgeContextMenu = getMouseHandler$1(id, store.getState, onContextMenu);
          const onEdgeMouseEnter = getMouseHandler$1(id, store.getState, onMouseEnter);
          const onEdgeMouseMove = getMouseHandler$1(id, store.getState, onMouseMove);
          const onEdgeMouseLeave = getMouseHandler$1(id, store.getState, onMouseLeave);
          const handleEdgeUpdater = (event, isSourceHandle) => {
              // avoid triggering edge updater if mouse btn is not left
              if (event.button !== 0) {
                  return;
              }
              const { edges, isValidConnection: isValidConnectionStore } = store.getState();
              const nodeId = isSourceHandle ? target : source;
              const handleId = (isSourceHandle ? targetHandleId : sourceHandleId) || null;
              const handleType = isSourceHandle ? 'target' : 'source';
              const isValidConnection = isValidConnectionStore || alwaysValidConnection;
              const isTarget = isSourceHandle;
              const edge = edges.find((e) => e.id === id);
              setUpdating(true);
              onReconnectStart?.(event, edge, handleType);
              const _onReconnectEnd = (evt) => {
                  setUpdating(false);
                  onReconnectEnd?.(evt, edge, handleType);
              };
              const onConnectEdge = (connection) => onReconnect?.(edge, connection);
              handlePointerDown({
                  event,
                  handleId,
                  nodeId,
                  onConnect: onConnectEdge,
                  isTarget,
                  getState: store.getState,
                  setState: store.setState,
                  isValidConnection,
                  edgeUpdaterType: handleType,
                  onReconnectEnd: _onReconnectEnd,
              });
          };
          const onEdgeUpdaterSourceMouseDown = (event) => handleEdgeUpdater(event, true);
          const onEdgeUpdaterTargetMouseDown = (event) => handleEdgeUpdater(event, false);
          const onEdgeUpdaterMouseEnter = () => setUpdateHover(true);
          const onEdgeUpdaterMouseOut = () => setUpdateHover(false);
          const inactive = !elementsSelectable && !onClick;
          const onKeyDown = (event) => {
              if (!disableKeyboardA11y && elementSelectionKeys.includes(event.key) && elementsSelectable) {
                  const { unselectNodesAndEdges, addSelectedEdges, edges } = store.getState();
                  const unselect = event.key === 'Escape';
                  if (unselect) {
                      edgeRef.current?.blur();
                      unselectNodesAndEdges({ edges: [edges.find((e) => e.id === id)] });
                  }
                  else {
                      addSelectedEdges([id]);
                  }
              }
          };
          return (React.createElement("g", { className: cc([
                  'react-flow__edge',
                  `react-flow__edge-${type}`,
                  className,
                  { selected, animated, inactive, updating: updateHover },
              ]), onClick: onEdgeClick, onDoubleClick: onEdgeDoubleClickHandler, onContextMenu: onEdgeContextMenu, onMouseEnter: onEdgeMouseEnter, onMouseMove: onEdgeMouseMove, onMouseLeave: onEdgeMouseLeave, onKeyDown: isFocusable ? onKeyDown : undefined, tabIndex: isFocusable ? 0 : undefined, role: isFocusable ? 'button' : 'img', "data-testid": `rf__edge-${id}`, "aria-label": ariaLabel === null ? undefined : ariaLabel ? ariaLabel : `Edge from ${source} to ${target}`, "aria-describedby": isFocusable ? `${ARIA_EDGE_DESC_KEY}-${rfId}` : undefined, ref: edgeRef },
              !updating && (React.createElement(EdgeComponent, { id: id, source: source, target: target, selected: selected, animated: animated, label: label, labelStyle: labelStyle, labelShowBg: labelShowBg, labelBgStyle: labelBgStyle, labelBgPadding: labelBgPadding, labelBgBorderRadius: labelBgBorderRadius, data: data, style: style, sourceX: sourceX, sourceY: sourceY, targetX: targetX, targetY: targetY, sourcePosition: sourcePosition, targetPosition: targetPosition, sourceHandleId: sourceHandleId, targetHandleId: targetHandleId, markerStart: markerStartUrl, markerEnd: markerEndUrl, pathOptions: pathOptions, interactionWidth: interactionWidth })),
              isReconnectable && (React.createElement(React.Fragment, null,
                  (isReconnectable === 'source' || isReconnectable === true) && (React.createElement(EdgeAnchor, { position: sourcePosition, centerX: sourceX, centerY: sourceY, radius: reconnectRadius, onMouseDown: onEdgeUpdaterSourceMouseDown, onMouseEnter: onEdgeUpdaterMouseEnter, onMouseOut: onEdgeUpdaterMouseOut, type: "source" })),
                  (isReconnectable === 'target' || isReconnectable === true) && (React.createElement(EdgeAnchor, { position: targetPosition, centerX: targetX, centerY: targetY, radius: reconnectRadius, onMouseDown: onEdgeUpdaterTargetMouseDown, onMouseEnter: onEdgeUpdaterMouseEnter, onMouseOut: onEdgeUpdaterMouseOut, type: "target" }))))));
      };
      EdgeWrapper.displayName = 'EdgeWrapper';
      return React.memo(EdgeWrapper);
  };

  function createEdgeTypes(edgeTypes) {
      const standardTypes = {
          default: wrapEdge((edgeTypes.default || BezierEdge)),
          straight: wrapEdge((edgeTypes.bezier || StraightEdge)),
          step: wrapEdge((edgeTypes.step || StepEdge)),
          smoothstep: wrapEdge((edgeTypes.step || SmoothStepEdge)),
          simplebezier: wrapEdge((edgeTypes.simplebezier || SimpleBezierEdge)),
      };
      const wrappedTypes = {};
      const specialTypes = Object.keys(edgeTypes)
          .filter((k) => !['default', 'bezier'].includes(k))
          .reduce((res, key) => {
          res[key] = wrapEdge((edgeTypes[key] || BezierEdge));
          return res;
      }, wrappedTypes);
      return {
          ...standardTypes,
          ...specialTypes,
      };
  }
  function getHandlePosition(position, nodeRect, handle = null) {
      const x = (handle?.x || 0) + nodeRect.x;
      const y = (handle?.y || 0) + nodeRect.y;
      const width = handle?.width || nodeRect.width;
      const height = handle?.height || nodeRect.height;
      switch (position) {
          case exports.Position.Top:
              return {
                  x: x + width / 2,
                  y,
              };
          case exports.Position.Right:
              return {
                  x: x + width,
                  y: y + height / 2,
              };
          case exports.Position.Bottom:
              return {
                  x: x + width / 2,
                  y: y + height,
              };
          case exports.Position.Left:
              return {
                  x,
                  y: y + height / 2,
              };
      }
  }
  function getHandle(bounds, handleId) {
      if (!bounds) {
          return null;
      }
      if (bounds.length === 1 || !handleId) {
          return bounds[0];
      }
      else if (handleId) {
          return bounds.find((d) => d.id === handleId) || null;
      }
      return null;
  }
  const getEdgePositions = (sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition) => {
      const sourceHandlePos = getHandlePosition(sourcePosition, sourceNodeRect, sourceHandle);
      const targetHandlePos = getHandlePosition(targetPosition, targetNodeRect, targetHandle);
      return {
          sourceX: sourceHandlePos.x,
          sourceY: sourceHandlePos.y,
          targetX: targetHandlePos.x,
          targetY: targetHandlePos.y,
      };
  };
  function isEdgeVisible({ sourcePos, targetPos, sourceWidth, sourceHeight, targetWidth, targetHeight, width, height, transform, }) {
      const edgeBox = {
          x: Math.min(sourcePos.x, targetPos.x),
          y: Math.min(sourcePos.y, targetPos.y),
          x2: Math.max(sourcePos.x + sourceWidth, targetPos.x + targetWidth),
          y2: Math.max(sourcePos.y + sourceHeight, targetPos.y + targetHeight),
      };
      if (edgeBox.x === edgeBox.x2) {
          edgeBox.x2 += 1;
      }
      if (edgeBox.y === edgeBox.y2) {
          edgeBox.y2 += 1;
      }
      const viewBox = rectToBox({
          x: (0 - transform[0]) / transform[2],
          y: (0 - transform[1]) / transform[2],
          width: width / transform[2],
          height: height / transform[2],
      });
      const xOverlap = Math.max(0, Math.min(viewBox.x2, edgeBox.x2) - Math.max(viewBox.x, edgeBox.x));
      const yOverlap = Math.max(0, Math.min(viewBox.y2, edgeBox.y2) - Math.max(viewBox.y, edgeBox.y));
      const overlappingArea = Math.ceil(xOverlap * yOverlap);
      return overlappingArea > 0;
  }
  function getNodeData(node) {
      const handleBounds = node?.[internalsSymbol]?.handleBounds || null;
      const isValid = handleBounds &&
          node?.width &&
          node?.height &&
          typeof node?.positionAbsolute?.x !== 'undefined' &&
          typeof node?.positionAbsolute?.y !== 'undefined';
      return [
          {
              x: node?.positionAbsolute?.x || 0,
              y: node?.positionAbsolute?.y || 0,
              width: node?.width || 0,
              height: node?.height || 0,
          },
          handleBounds,
          !!isValid,
      ];
  }

  const defaultEdgeTree = [{ level: 0, isMaxLevel: true, edges: [] }];
  function groupEdgesByZLevel(edges, nodeInternals, elevateEdgesOnSelect = false) {
      let maxLevel = -1;
      const levelLookup = edges.reduce((tree, edge) => {
          const hasZIndex = isNumeric(edge.zIndex);
          let z = hasZIndex ? edge.zIndex : 0;
          if (elevateEdgesOnSelect) {
              const targetNode = nodeInternals.get(edge.target);
              const sourceNode = nodeInternals.get(edge.source);
              const edgeOrConnectedNodeSelected = edge.selected || targetNode?.selected || sourceNode?.selected;
              const selectedZIndex = Math.max(sourceNode?.[internalsSymbol]?.z || 0, targetNode?.[internalsSymbol]?.z || 0, 1000);
              z = (hasZIndex ? edge.zIndex : 0) + (edgeOrConnectedNodeSelected ? selectedZIndex : 0);
          }
          if (tree[z]) {
              tree[z].push(edge);
          }
          else {
              tree[z] = [edge];
          }
          maxLevel = z > maxLevel ? z : maxLevel;
          return tree;
      }, {});
      const edgeTree = Object.entries(levelLookup).map(([key, edges]) => {
          const level = +key;
          return {
              edges,
              level,
              isMaxLevel: level === maxLevel,
          };
      });
      if (edgeTree.length === 0) {
          return defaultEdgeTree;
      }
      return edgeTree;
  }
  function useVisibleEdges(onlyRenderVisible, nodeInternals, elevateEdgesOnSelect) {
      const edges = useStore(React.useCallback((s) => {
          if (!onlyRenderVisible) {
              return s.edges;
          }
          return s.edges.filter((e) => {
              const sourceNode = nodeInternals.get(e.source);
              const targetNode = nodeInternals.get(e.target);
              return (sourceNode?.width &&
                  sourceNode?.height &&
                  targetNode?.width &&
                  targetNode?.height &&
                  isEdgeVisible({
                      sourcePos: sourceNode.positionAbsolute || { x: 0, y: 0 },
                      targetPos: targetNode.positionAbsolute || { x: 0, y: 0 },
                      sourceWidth: sourceNode.width,
                      sourceHeight: sourceNode.height,
                      targetWidth: targetNode.width,
                      targetHeight: targetNode.height,
                      width: s.width,
                      height: s.height,
                      transform: s.transform,
                  }));
          });
      }, [onlyRenderVisible, nodeInternals]));
      return groupEdgesByZLevel(edges, nodeInternals, elevateEdgesOnSelect);
  }

  const ArrowSymbol = ({ color = 'none', strokeWidth = 1 }) => {
      return (React.createElement("polyline", { style: {
              stroke: color,
              strokeWidth,
          }, strokeLinecap: "round", strokeLinejoin: "round", fill: "none", points: "-5,-4 0,0 -5,4" }));
  };
  const ArrowClosedSymbol = ({ color = 'none', strokeWidth = 1 }) => {
      return (React.createElement("polyline", { style: {
              stroke: color,
              fill: color,
              strokeWidth,
          }, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" }));
  };
  const MarkerSymbols = {
      [exports.MarkerType.Arrow]: ArrowSymbol,
      [exports.MarkerType.ArrowClosed]: ArrowClosedSymbol,
  };
  function useMarkerSymbol(type) {
      const store = useStoreApi();
      const symbol = React.useMemo(() => {
          const symbolExists = Object.prototype.hasOwnProperty.call(MarkerSymbols, type);
          if (!symbolExists) {
              store.getState().onError?.('009', errorMessages['error009'](type));
              return null;
          }
          return MarkerSymbols[type];
      }, [type]);
      return symbol;
  }

  const Marker = ({ id, type, color, width = 12.5, height = 12.5, markerUnits = 'strokeWidth', strokeWidth, orient = 'auto-start-reverse', }) => {
      const Symbol = useMarkerSymbol(type);
      if (!Symbol) {
          return null;
      }
      return (React.createElement("marker", { className: "react-flow__arrowhead", id: id, markerWidth: `${width}`, markerHeight: `${height}`, viewBox: "-10 -10 20 20", markerUnits: markerUnits, orient: orient, refX: "0", refY: "0" },
          React.createElement(Symbol, { color: color, strokeWidth: strokeWidth })));
  };
  const markerSelector = ({ defaultColor, rfId }) => (s) => {
      const ids = [];
      return s.edges
          .reduce((markers, edge) => {
          [edge.markerStart, edge.markerEnd].forEach((marker) => {
              if (marker && typeof marker === 'object') {
                  const markerId = getMarkerId(marker, rfId);
                  if (!ids.includes(markerId)) {
                      markers.push({ id: markerId, color: marker.color || defaultColor, ...marker });
                      ids.push(markerId);
                  }
              }
          });
          return markers;
      }, [])
          .sort((a, b) => a.id.localeCompare(b.id));
  };
  // when you have multiple flows on a page and you hide the first one, the other ones have no markers anymore
  // when they do have markers with the same ids. To prevent this the user can pass a unique id to the react flow wrapper
  // that we can then use for creating our unique marker ids
  const MarkerDefinitions = ({ defaultColor, rfId }) => {
      const markers = useStore(React.useCallback(markerSelector({ defaultColor, rfId }), [defaultColor, rfId]), 
      // the id includes all marker options, so we just need to look at that part of the marker
      (a, b) => !(a.length !== b.length || a.some((m, i) => m.id !== b[i].id)));
      return (React.createElement("defs", null, markers.map((marker) => (React.createElement(Marker, { id: marker.id, key: marker.id, type: marker.type, color: marker.color, width: marker.width, height: marker.height, markerUnits: marker.markerUnits, strokeWidth: marker.strokeWidth, orient: marker.orient })))));
  };
  MarkerDefinitions.displayName = 'MarkerDefinitions';
  var MarkerDefinitions$1 = React.memo(MarkerDefinitions);

  const selector$4 = (s) => ({
      nodesConnectable: s.nodesConnectable,
      edgesFocusable: s.edgesFocusable,
      edgesUpdatable: s.edgesUpdatable,
      elementsSelectable: s.elementsSelectable,
      width: s.width,
      height: s.height,
      connectionMode: s.connectionMode,
      nodeInternals: s.nodeInternals,
      onError: s.onError,
  });
  const EdgeRenderer = ({ defaultMarkerColor, onlyRenderVisibleElements, elevateEdgesOnSelect, rfId, edgeTypes, noPanClassName, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onEdgeClick, onEdgeDoubleClick, onReconnect, onReconnectStart, onReconnectEnd, reconnectRadius, children, disableKeyboardA11y, }) => {
      const { edgesFocusable, edgesUpdatable, elementsSelectable, width, height, connectionMode, nodeInternals, onError } = useStore(selector$4, shallow);
      const edgeTree = useVisibleEdges(onlyRenderVisibleElements, nodeInternals, elevateEdgesOnSelect);
      if (!width) {
          return null;
      }
      return (React.createElement(React.Fragment, null,
          edgeTree.map(({ level, edges, isMaxLevel }) => (React.createElement("svg", { key: level, style: { zIndex: level }, width: width, height: height, className: "react-flow__edges react-flow__container" },
              isMaxLevel && React.createElement(MarkerDefinitions$1, { defaultColor: defaultMarkerColor, rfId: rfId }),
              React.createElement("g", null, edges.map((edge) => {
                  const [sourceNodeRect, sourceHandleBounds, sourceIsValid] = getNodeData(nodeInternals.get(edge.source));
                  const [targetNodeRect, targetHandleBounds, targetIsValid] = getNodeData(nodeInternals.get(edge.target));
                  if (!sourceIsValid || !targetIsValid) {
                      return null;
                  }
                  let edgeType = edge.type || 'default';
                  if (!edgeTypes[edgeType]) {
                      onError?.('011', errorMessages['error011'](edgeType));
                      edgeType = 'default';
                  }
                  const EdgeComponent = edgeTypes[edgeType] || edgeTypes.default;
                  // when connection type is loose we can define all handles as sources and connect source -> source
                  const targetNodeHandles = connectionMode === exports.ConnectionMode.Strict
                      ? targetHandleBounds.target
                      : (targetHandleBounds.target ?? []).concat(targetHandleBounds.source ?? []);
                  const sourceHandle = getHandle(sourceHandleBounds.source, edge.sourceHandle);
                  const targetHandle = getHandle(targetNodeHandles, edge.targetHandle);
                  const sourcePosition = sourceHandle?.position || exports.Position.Bottom;
                  const targetPosition = targetHandle?.position || exports.Position.Top;
                  const isFocusable = !!(edge.focusable || (edgesFocusable && typeof edge.focusable === 'undefined'));
                  const edgeReconnectable = edge.reconnectable || edge.updatable;
                  const isReconnectable = typeof onReconnect !== 'undefined' &&
                      (edgeReconnectable || (edgesUpdatable && typeof edgeReconnectable === 'undefined'));
                  if (!sourceHandle || !targetHandle) {
                      onError?.('008', errorMessages['error008'](sourceHandle, edge));
                      return null;
                  }
                  const { sourceX, sourceY, targetX, targetY } = getEdgePositions(sourceNodeRect, sourceHandle, sourcePosition, targetNodeRect, targetHandle, targetPosition);
                  return (React.createElement(EdgeComponent, { key: edge.id, id: edge.id, className: cc([edge.className, noPanClassName]), type: edgeType, data: edge.data, selected: !!edge.selected, animated: !!edge.animated, hidden: !!edge.hidden, label: edge.label, labelStyle: edge.labelStyle, labelShowBg: edge.labelShowBg, labelBgStyle: edge.labelBgStyle, labelBgPadding: edge.labelBgPadding, labelBgBorderRadius: edge.labelBgBorderRadius, style: edge.style, source: edge.source, target: edge.target, sourceHandleId: edge.sourceHandle, targetHandleId: edge.targetHandle, markerEnd: edge.markerEnd, markerStart: edge.markerStart, sourceX: sourceX, sourceY: sourceY, targetX: targetX, targetY: targetY, sourcePosition: sourcePosition, targetPosition: targetPosition, elementsSelectable: elementsSelectable, onContextMenu: onEdgeContextMenu, onMouseEnter: onEdgeMouseEnter, onMouseMove: onEdgeMouseMove, onMouseLeave: onEdgeMouseLeave, onClick: onEdgeClick, onEdgeDoubleClick: onEdgeDoubleClick, onReconnect: onReconnect, onReconnectStart: onReconnectStart, onReconnectEnd: onReconnectEnd, reconnectRadius: reconnectRadius, rfId: rfId, ariaLabel: edge.ariaLabel, isFocusable: isFocusable, isReconnectable: isReconnectable, pathOptions: 'pathOptions' in edge ? edge.pathOptions : undefined, interactionWidth: edge.interactionWidth, disableKeyboardA11y: disableKeyboardA11y }));
              }))))),
          children));
  };
  EdgeRenderer.displayName = 'EdgeRenderer';
  var EdgeRenderer$1 = React.memo(EdgeRenderer);

  const selector$3 = (s) => `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]})`;
  function Viewport({ children }) {
      const transform = useStore(selector$3);
      return (React.createElement("div", { className: "react-flow__viewport react-flow__container", style: { transform } }, children));
  }

  function useOnInitHandler(onInit) {
      const rfInstance = useReactFlow();
      const isInitialized = React.useRef(false);
      React.useEffect(() => {
          if (!isInitialized.current && rfInstance.viewportInitialized && onInit) {
              setTimeout(() => onInit(rfInstance), 1);
              isInitialized.current = true;
          }
      }, [onInit, rfInstance.viewportInitialized]);
  }

  const oppositePosition = {
      [exports.Position.Left]: exports.Position.Right,
      [exports.Position.Right]: exports.Position.Left,
      [exports.Position.Top]: exports.Position.Bottom,
      [exports.Position.Bottom]: exports.Position.Top,
  };
  const ConnectionLine = ({ nodeId, handleType, style, type = exports.ConnectionLineType.Bezier, CustomComponent, connectionStatus, }) => {
      const { fromNode, handleId, toX, toY, connectionMode } = useStore(React.useCallback((s) => ({
          fromNode: s.nodeInternals.get(nodeId),
          handleId: s.connectionHandleId,
          toX: (s.connectionPosition.x - s.transform[0]) / s.transform[2],
          toY: (s.connectionPosition.y - s.transform[1]) / s.transform[2],
          connectionMode: s.connectionMode,
      }), [nodeId]), shallow);
      const fromHandleBounds = fromNode?.[internalsSymbol]?.handleBounds;
      let handleBounds = fromHandleBounds?.[handleType];
      if (connectionMode === exports.ConnectionMode.Loose) {
          handleBounds = handleBounds ? handleBounds : fromHandleBounds?.[handleType === 'source' ? 'target' : 'source'];
      }
      if (!fromNode || !handleBounds) {
          return null;
      }
      const fromHandle = handleId ? handleBounds.find((d) => d.id === handleId) : handleBounds[0];
      const fromHandleX = fromHandle ? fromHandle.x + fromHandle.width / 2 : (fromNode.width ?? 0) / 2;
      const fromHandleY = fromHandle ? fromHandle.y + fromHandle.height / 2 : fromNode.height ?? 0;
      const fromX = (fromNode.positionAbsolute?.x ?? 0) + fromHandleX;
      const fromY = (fromNode.positionAbsolute?.y ?? 0) + fromHandleY;
      const fromPosition = fromHandle?.position;
      const toPosition = fromPosition ? oppositePosition[fromPosition] : null;
      if (!fromPosition || !toPosition) {
          return null;
      }
      if (CustomComponent) {
          return (React.createElement(CustomComponent, { connectionLineType: type, connectionLineStyle: style, fromNode: fromNode, fromHandle: fromHandle, fromX: fromX, fromY: fromY, toX: toX, toY: toY, fromPosition: fromPosition, toPosition: toPosition, connectionStatus: connectionStatus }));
      }
      let dAttr = '';
      const pathParams = {
          sourceX: fromX,
          sourceY: fromY,
          sourcePosition: fromPosition,
          targetX: toX,
          targetY: toY,
          targetPosition: toPosition,
      };
      if (type === exports.ConnectionLineType.Bezier) {
          // we assume the destination position is opposite to the source position
          [dAttr] = getBezierPath(pathParams);
      }
      else if (type === exports.ConnectionLineType.Step) {
          [dAttr] = getSmoothStepPath({
              ...pathParams,
              borderRadius: 0,
          });
      }
      else if (type === exports.ConnectionLineType.SmoothStep) {
          [dAttr] = getSmoothStepPath(pathParams);
      }
      else if (type === exports.ConnectionLineType.SimpleBezier) {
          [dAttr] = getSimpleBezierPath(pathParams);
      }
      else {
          dAttr = `M${fromX},${fromY} ${toX},${toY}`;
      }
      return React.createElement("path", { d: dAttr, fill: "none", className: "react-flow__connection-path", style: style });
  };
  ConnectionLine.displayName = 'ConnectionLine';
  const selector$2 = (s) => ({
      nodeId: s.connectionNodeId,
      handleType: s.connectionHandleType,
      nodesConnectable: s.nodesConnectable,
      connectionStatus: s.connectionStatus,
      width: s.width,
      height: s.height,
  });
  function ConnectionLineWrapper({ containerStyle, style, type, component }) {
      const { nodeId, handleType, nodesConnectable, width, height, connectionStatus } = useStore(selector$2, shallow);
      const isValid = !!(nodeId && handleType && width && nodesConnectable);
      if (!isValid) {
          return null;
      }
      return (React.createElement("svg", { style: containerStyle, width: width, height: height, className: "react-flow__edges react-flow__connectionline react-flow__container" },
          React.createElement("g", { className: cc(['react-flow__connection', connectionStatus]) },
              React.createElement(ConnectionLine, { nodeId: nodeId, handleType: handleType, style: style, type: type, CustomComponent: component, connectionStatus: connectionStatus }))));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function useNodeOrEdgeTypes(nodeOrEdgeTypes, createTypes) {
      React.useRef(null);
      useStoreApi();
      const typesParsed = React.useMemo(() => {
          return createTypes(nodeOrEdgeTypes);
      }, [nodeOrEdgeTypes]);
      return typesParsed;
  }

  const GraphView = ({ nodeTypes, edgeTypes, onMove, onMoveStart, onMoveEnd, onInit, onNodeClick, onEdgeClick, onNodeDoubleClick, onEdgeDoubleClick, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onSelectionContextMenu, onSelectionStart, onSelectionEnd, connectionLineType, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, selectionKeyCode, selectionOnDrag, selectionMode, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, deleteKeyCode, onlyRenderVisibleElements, elementsSelectable, selectNodesOnDrag, defaultViewport, translateExtent, minZoom, maxZoom, preventScrolling, defaultMarkerColor, zoomOnScroll, zoomOnPinch, panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onReconnect, onReconnectStart, onReconnectEnd, reconnectRadius, noDragClassName, noWheelClassName, noPanClassName, elevateEdgesOnSelect, disableKeyboardA11y, nodeOrigin, nodeExtent, rfId, }) => {
      const nodeTypesWrapped = useNodeOrEdgeTypes(nodeTypes, createNodeTypes);
      const edgeTypesWrapped = useNodeOrEdgeTypes(edgeTypes, createEdgeTypes);
      useOnInitHandler(onInit);
      return (React.createElement(FlowRenderer$1, { onPaneClick: onPaneClick, onPaneMouseEnter: onPaneMouseEnter, onPaneMouseMove: onPaneMouseMove, onPaneMouseLeave: onPaneMouseLeave, onPaneContextMenu: onPaneContextMenu, onPaneScroll: onPaneScroll, deleteKeyCode: deleteKeyCode, selectionKeyCode: selectionKeyCode, selectionOnDrag: selectionOnDrag, selectionMode: selectionMode, onSelectionStart: onSelectionStart, onSelectionEnd: onSelectionEnd, multiSelectionKeyCode: multiSelectionKeyCode, panActivationKeyCode: panActivationKeyCode, zoomActivationKeyCode: zoomActivationKeyCode, elementsSelectable: elementsSelectable, onMove: onMove, onMoveStart: onMoveStart, onMoveEnd: onMoveEnd, zoomOnScroll: zoomOnScroll, zoomOnPinch: zoomOnPinch, zoomOnDoubleClick: zoomOnDoubleClick, panOnScroll: panOnScroll, panOnScrollSpeed: panOnScrollSpeed, panOnScrollMode: panOnScrollMode, panOnDrag: panOnDrag, defaultViewport: defaultViewport, translateExtent: translateExtent, minZoom: minZoom, maxZoom: maxZoom, onSelectionContextMenu: onSelectionContextMenu, preventScrolling: preventScrolling, noDragClassName: noDragClassName, noWheelClassName: noWheelClassName, noPanClassName: noPanClassName, disableKeyboardA11y: disableKeyboardA11y },
          React.createElement(Viewport, null,
              React.createElement(EdgeRenderer$1, { edgeTypes: edgeTypesWrapped, onEdgeClick: onEdgeClick, onEdgeDoubleClick: onEdgeDoubleClick, onlyRenderVisibleElements: onlyRenderVisibleElements, onEdgeContextMenu: onEdgeContextMenu, onEdgeMouseEnter: onEdgeMouseEnter, onEdgeMouseMove: onEdgeMouseMove, onEdgeMouseLeave: onEdgeMouseLeave, onReconnect: onReconnect, onReconnectStart: onReconnectStart, onReconnectEnd: onReconnectEnd, reconnectRadius: reconnectRadius, defaultMarkerColor: defaultMarkerColor, noPanClassName: noPanClassName, elevateEdgesOnSelect: !!elevateEdgesOnSelect, disableKeyboardA11y: disableKeyboardA11y, rfId: rfId },
                  React.createElement(ConnectionLineWrapper, { style: connectionLineStyle, type: connectionLineType, component: connectionLineComponent, containerStyle: connectionLineContainerStyle })),
              React.createElement("div", { className: "react-flow__edgelabel-renderer" }),
              React.createElement(NodeRenderer$1, { nodeTypes: nodeTypesWrapped, onNodeClick: onNodeClick, onNodeDoubleClick: onNodeDoubleClick, onNodeMouseEnter: onNodeMouseEnter, onNodeMouseMove: onNodeMouseMove, onNodeMouseLeave: onNodeMouseLeave, onNodeContextMenu: onNodeContextMenu, selectNodesOnDrag: selectNodesOnDrag, onlyRenderVisibleElements: onlyRenderVisibleElements, noPanClassName: noPanClassName, noDragClassName: noDragClassName, disableKeyboardA11y: disableKeyboardA11y, nodeOrigin: nodeOrigin, nodeExtent: nodeExtent, rfId: rfId }))));
  };
  GraphView.displayName = 'GraphView';
  var GraphView$1 = React.memo(GraphView);

  const infiniteExtent = [
      [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ];
  const initialState = {
      preventNodeClick: false,
      rfId: '1',
      width: 0,
      height: 0,
      transform: [0, 0, 1],
      nodeInternals: new Map(),
      edges: [],
      onNodesChange: null,
      onEdgesChange: null,
      hasDefaultNodes: false,
      hasDefaultEdges: false,
      d3Zoom: null,
      d3Selection: null,
      d3ZoomHandler: undefined,
      minZoom: 0.5,
      maxZoom: 2,
      translateExtent: infiniteExtent,
      nodeExtent: infiniteExtent,
      nodesSelectionActive: false,
      userSelectionActive: false,
      userSelectionRect: null,
      connectionNodeId: null,
      connectionHandleId: null,
      connectionHandleType: 'source',
      connectionPosition: { x: 0, y: 0 },
      connectionStatus: null,
      connectionMode: exports.ConnectionMode.Strict,
      domNode: null,
      paneDragging: false,
      noPanClassName: 'nopan',
      nodeOrigin: [0, 0],
      nodeDragThreshold: 0,
      snapGrid: [15, 15],
      snapToGrid: false,
      nodesDraggable: true,
      nodesConnectable: true,
      nodesFocusable: true,
      edgesFocusable: true,
      edgesUpdatable: true,
      elementsSelectable: true,
      elevateNodesOnSelect: true,
      fitViewOnInit: false,
      fitViewOnInitDone: false,
      fitViewOnInitOptions: undefined,
      onSelectionChange: [],
      multiSelectionActive: false,
      connectionStartHandle: null,
      connectionEndHandle: null,
      connectionClickStartHandle: null,
      connectOnClick: true,
      ariaLiveMessage: '',
      autoPanOnConnect: true,
      autoPanOnNodeDrag: true,
      connectionRadius: 20,
      onError: devWarn,
      isValidConnection: undefined,
  };

  const createRFStore = () => createWithEqualityFn((set, get) => ({
      ...initialState,
      setNodes: (nodes) => {
          const { nodeInternals, nodeOrigin, elevateNodesOnSelect } = get();
          set({ nodeInternals: createNodeInternals(nodes, nodeInternals, nodeOrigin, elevateNodesOnSelect) });
      },
      getNodes: () => {
          return Array.from(get().nodeInternals.values());
      },
      setEdges: (edges) => {
          const { defaultEdgeOptions = {} } = get();
          set({ edges: edges.map((e) => ({ ...defaultEdgeOptions, ...e })) });
      },
      setDefaultNodesAndEdges: (nodes, edges) => {
          const hasDefaultNodes = typeof nodes !== 'undefined';
          const hasDefaultEdges = typeof edges !== 'undefined';
          const nodeInternals = hasDefaultNodes
              ? createNodeInternals(nodes, new Map(), get().nodeOrigin, get().elevateNodesOnSelect)
              : new Map();
          const nextEdges = hasDefaultEdges ? edges : [];
          set({ nodeInternals, edges: nextEdges, hasDefaultNodes, hasDefaultEdges });
      },
      updateNodeDimensions: (updates) => {
          const { onNodesChange, nodeInternals, fitViewOnInit, fitViewOnInitDone, fitViewOnInitOptions, domNode, nodeOrigin, } = get();
          const viewportNode = domNode?.querySelector('.react-flow__viewport');
          if (!viewportNode) {
              return;
          }
          const style = window.getComputedStyle(viewportNode);
          const { m22: zoom } = new window.DOMMatrixReadOnly(style.transform);
          const changes = updates.reduce((res, update) => {
              const node = nodeInternals.get(update.id);
              if (node?.hidden) {
                  nodeInternals.set(node.id, {
                      ...node,
                      [internalsSymbol]: {
                          ...node[internalsSymbol],
                          // we need to reset the handle bounds when the node is hidden
                          // in order to force a new observation when the node is shown again
                          handleBounds: undefined,
                      },
                  });
              }
              else if (node) {
                  const dimensions = getDimensions(update.nodeElement);
                  const doUpdate = !!(dimensions.width &&
                      dimensions.height &&
                      (node.width !== dimensions.width || node.height !== dimensions.height || update.forceUpdate));
                  if (doUpdate) {
                      nodeInternals.set(node.id, {
                          ...node,
                          [internalsSymbol]: {
                              ...node[internalsSymbol],
                              handleBounds: {
                                  source: getHandleBounds('.source', update.nodeElement, zoom, nodeOrigin),
                                  target: getHandleBounds('.target', update.nodeElement, zoom, nodeOrigin),
                              },
                          },
                          ...dimensions,
                      });
                      res.push({
                          id: node.id,
                          type: 'dimensions',
                          dimensions,
                      });
                  }
              }
              return res;
          }, []);
          updateAbsoluteNodePositions(nodeInternals, nodeOrigin);
          const nextFitViewOnInitDone = fitViewOnInitDone ||
              (fitViewOnInit && !fitViewOnInitDone && fitView(get, { initial: true, ...fitViewOnInitOptions }));
          set({ nodeInternals: new Map(nodeInternals), fitViewOnInitDone: nextFitViewOnInitDone });
          if (changes?.length > 0) {
              onNodesChange?.(changes);
          }
      },
      updateNodePositions: (nodeDragItems, positionChanged = true, dragging = false) => {
          const { triggerNodeChanges } = get();
          const changes = nodeDragItems.map((node) => {
              const change = {
                  id: node.id,
                  type: 'position',
                  dragging,
              };
              if (positionChanged) {
                  change.positionAbsolute = node.positionAbsolute;
                  change.position = node.position;
              }
              return change;
          });
          triggerNodeChanges(changes);
      },
      triggerNodeChanges: (changes) => {
          const { onNodesChange, nodeInternals, hasDefaultNodes, nodeOrigin, getNodes, elevateNodesOnSelect } = get();
          if (changes?.length) {
              if (hasDefaultNodes) {
                  const nodes = applyNodeChanges(changes, getNodes());
                  const nextNodeInternals = createNodeInternals(nodes, nodeInternals, nodeOrigin, elevateNodesOnSelect);
                  set({ nodeInternals: nextNodeInternals });
              }
              onNodesChange?.(changes);
          }
      },
      addSelectedNodes: (selectedNodeIds) => {
          const { multiSelectionActive, edges, getNodes } = get();
          let changedNodes;
          let changedEdges = null;
          if (multiSelectionActive) {
              changedNodes = selectedNodeIds.map((nodeId) => createSelectionChange(nodeId, true));
          }
          else {
              changedNodes = getSelectionChanges(getNodes(), selectedNodeIds);
              changedEdges = getSelectionChanges(edges, []);
          }
          updateNodesAndEdgesSelections({
              changedNodes,
              changedEdges,
              get,
              set,
          });
      },
      addSelectedEdges: (selectedEdgeIds) => {
          const { multiSelectionActive, edges, getNodes } = get();
          let changedEdges;
          let changedNodes = null;
          if (multiSelectionActive) {
              changedEdges = selectedEdgeIds.map((edgeId) => createSelectionChange(edgeId, true));
          }
          else {
              changedEdges = getSelectionChanges(edges, selectedEdgeIds);
              changedNodes = getSelectionChanges(getNodes(), []);
          }
          updateNodesAndEdgesSelections({
              changedNodes,
              changedEdges,
              get,
              set,
          });
      },
      unselectNodesAndEdges: ({ nodes, edges } = {}) => {
          const { edges: storeEdges, getNodes } = get();
          const nodesToUnselect = nodes ? nodes : getNodes();
          const edgesToUnselect = edges ? edges : storeEdges;
          const changedNodes = nodesToUnselect.map((n) => {
              n.selected = false;
              return createSelectionChange(n.id, false);
          });
          const changedEdges = edgesToUnselect.map((edge) => createSelectionChange(edge.id, false));
          updateNodesAndEdgesSelections({
              changedNodes,
              changedEdges,
              get,
              set,
          });
      },
      setMinZoom: (minZoom) => {
          const { d3Zoom, maxZoom } = get();
          d3Zoom?.scaleExtent([minZoom, maxZoom]);
          set({ minZoom });
      },
      setMaxZoom: (maxZoom) => {
          const { d3Zoom, minZoom } = get();
          d3Zoom?.scaleExtent([minZoom, maxZoom]);
          set({ maxZoom });
      },
      setTranslateExtent: (translateExtent) => {
          get().d3Zoom?.translateExtent(translateExtent);
          set({ translateExtent });
      },
      resetSelectedElements: () => {
          const { edges, getNodes } = get();
          const nodes = getNodes();
          const nodesToUnselect = nodes
              .filter((e) => e.selected)
              .map((n) => createSelectionChange(n.id, false));
          const edgesToUnselect = edges
              .filter((e) => e.selected)
              .map((e) => createSelectionChange(e.id, false));
          updateNodesAndEdgesSelections({
              changedNodes: nodesToUnselect,
              changedEdges: edgesToUnselect,
              get,
              set,
          });
      },
      setNodeExtent: (nodeExtent) => {
          const { nodeInternals } = get();
          nodeInternals.forEach((node) => {
              node.positionAbsolute = clampPosition(node.position, nodeExtent);
          });
          set({
              nodeExtent,
              nodeInternals: new Map(nodeInternals),
          });
      },
      panBy: (delta) => {
          const { transform, width, height, d3Zoom, d3Selection, translateExtent } = get();
          if (!d3Zoom || !d3Selection || (!delta.x && !delta.y)) {
              return false;
          }
          const nextTransform = identity
              .translate(transform[0] + delta.x, transform[1] + delta.y)
              .scale(transform[2]);
          const extent = [
              [0, 0],
              [width, height],
          ];
          const constrainedTransform = d3Zoom?.constrain()(nextTransform, extent, translateExtent);
          d3Zoom.transform(d3Selection, constrainedTransform);
          const transformChanged = transform[0] !== constrainedTransform.x ||
              transform[1] !== constrainedTransform.y ||
              transform[2] !== constrainedTransform.k;
          return transformChanged;
      },
      cancelConnection: () => set({
          connectionNodeId: initialState.connectionNodeId,
          connectionHandleId: initialState.connectionHandleId,
          connectionHandleType: initialState.connectionHandleType,
          connectionStatus: initialState.connectionStatus,
          connectionStartHandle: initialState.connectionStartHandle,
          connectionEndHandle: initialState.connectionEndHandle,
      }),
      reset: () => set({ ...initialState }),
  }), Object.is);

  const ReactFlowProvider = ({ children }) => {
      const storeRef = React.useRef(null);
      if (!storeRef.current) {
          storeRef.current = createRFStore();
      }
      return React.createElement(Provider$1, { value: storeRef.current }, children);
  };
  ReactFlowProvider.displayName = 'ReactFlowProvider';

  const Wrapper = ({ children }) => {
      const isWrapped = React.useContext(StoreContext);
      if (isWrapped) {
          // we need to wrap it with a fragment because it's not allowed for children to be a ReactNode
          // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
          return React.createElement(React.Fragment, null, children);
      }
      return React.createElement(ReactFlowProvider, null, children);
  };
  Wrapper.displayName = 'ReactFlowWrapper';

  const defaultNodeTypes = {
      input: InputNode$1,
      default: DefaultNode$1,
      output: OutputNode$1,
      group: GroupNode,
  };
  const defaultEdgeTypes = {
      default: BezierEdge,
      straight: StraightEdge,
      step: StepEdge,
      smoothstep: SmoothStepEdge,
      simplebezier: SimpleBezierEdge,
  };
  const initNodeOrigin = [0, 0];
  const initSnapGrid = [15, 15];
  const initDefaultViewport = { x: 0, y: 0, zoom: 1 };
  const wrapperStyle = {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 0,
  };
  const ReactFlow = React.forwardRef(({ nodes, edges, defaultNodes, defaultEdges, className, nodeTypes = defaultNodeTypes, edgeTypes = defaultEdgeTypes, onNodeClick, onEdgeClick, onInit, onMove, onMoveStart, onMoveEnd, onConnect, onConnectStart, onConnectEnd, onClickConnectStart, onClickConnectEnd, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onNodeDoubleClick, onNodeDragStart, onNodeDrag, onNodeDragStop, onNodesDelete, onEdgesDelete, onSelectionChange, onSelectionDragStart, onSelectionDrag, onSelectionDragStop, onSelectionContextMenu, onSelectionStart, onSelectionEnd, connectionMode = exports.ConnectionMode.Strict, connectionLineType = exports.ConnectionLineType.Bezier, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, deleteKeyCode = 'Backspace', selectionKeyCode = 'Shift', selectionOnDrag = false, selectionMode = exports.SelectionMode.Full, panActivationKeyCode = 'Space', multiSelectionKeyCode = isMacOs() ? 'Meta' : 'Control', zoomActivationKeyCode = isMacOs() ? 'Meta' : 'Control', snapToGrid = false, snapGrid = initSnapGrid, onlyRenderVisibleElements = false, selectNodesOnDrag = true, nodesDraggable, nodesConnectable, nodesFocusable, nodeOrigin = initNodeOrigin, edgesFocusable, edgesUpdatable, elementsSelectable, defaultViewport = initDefaultViewport, minZoom = 0.5, maxZoom = 2, translateExtent = infiniteExtent, preventScrolling = true, nodeExtent, defaultMarkerColor = '#b1b1b7', zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = 0.5, panOnScrollMode = exports.PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, children, onEdgeContextMenu, onEdgeDoubleClick, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onEdgeUpdate, onEdgeUpdateStart, onEdgeUpdateEnd, onReconnect, onReconnectStart, onReconnectEnd, reconnectRadius = 10, edgeUpdaterRadius = 10, onNodesChange, onEdgesChange, noDragClassName = 'nodrag', noWheelClassName = 'nowheel', noPanClassName = 'nopan', fitView = false, fitViewOptions, connectOnClick = true, attributionPosition, proOptions, defaultEdgeOptions, elevateNodesOnSelect = true, elevateEdgesOnSelect = false, disableKeyboardA11y = false, autoPanOnConnect = true, autoPanOnNodeDrag = true, connectionRadius = 20, isValidConnection, onError, style, id, nodeDragThreshold, ...rest }, ref) => {
      const rfId = id || '1';
      return (React.createElement("div", { ...rest, style: { ...style, ...wrapperStyle }, ref: ref, className: cc(['react-flow', className]), "data-testid": "rf__wrapper", id: id },
          React.createElement(Wrapper, null,
              React.createElement(GraphView$1, { onInit: onInit, onMove: onMove, onMoveStart: onMoveStart, onMoveEnd: onMoveEnd, onNodeClick: onNodeClick, onEdgeClick: onEdgeClick, onNodeMouseEnter: onNodeMouseEnter, onNodeMouseMove: onNodeMouseMove, onNodeMouseLeave: onNodeMouseLeave, onNodeContextMenu: onNodeContextMenu, onNodeDoubleClick: onNodeDoubleClick, nodeTypes: nodeTypes, edgeTypes: edgeTypes, connectionLineType: connectionLineType, connectionLineStyle: connectionLineStyle, connectionLineComponent: connectionLineComponent, connectionLineContainerStyle: connectionLineContainerStyle, selectionKeyCode: selectionKeyCode, selectionOnDrag: selectionOnDrag, selectionMode: selectionMode, deleteKeyCode: deleteKeyCode, multiSelectionKeyCode: multiSelectionKeyCode, panActivationKeyCode: panActivationKeyCode, zoomActivationKeyCode: zoomActivationKeyCode, onlyRenderVisibleElements: onlyRenderVisibleElements, selectNodesOnDrag: selectNodesOnDrag, defaultViewport: defaultViewport, translateExtent: translateExtent, minZoom: minZoom, maxZoom: maxZoom, preventScrolling: preventScrolling, zoomOnScroll: zoomOnScroll, zoomOnPinch: zoomOnPinch, zoomOnDoubleClick: zoomOnDoubleClick, panOnScroll: panOnScroll, panOnScrollSpeed: panOnScrollSpeed, panOnScrollMode: panOnScrollMode, panOnDrag: panOnDrag, onPaneClick: onPaneClick, onPaneMouseEnter: onPaneMouseEnter, onPaneMouseMove: onPaneMouseMove, onPaneMouseLeave: onPaneMouseLeave, onPaneScroll: onPaneScroll, onPaneContextMenu: onPaneContextMenu, onSelectionContextMenu: onSelectionContextMenu, onSelectionStart: onSelectionStart, onSelectionEnd: onSelectionEnd, onEdgeContextMenu: onEdgeContextMenu, onEdgeDoubleClick: onEdgeDoubleClick, onEdgeMouseEnter: onEdgeMouseEnter, onEdgeMouseMove: onEdgeMouseMove, onEdgeMouseLeave: onEdgeMouseLeave, onReconnect: onReconnect ?? onEdgeUpdate, onReconnectStart: onReconnectStart ?? onEdgeUpdateStart, onReconnectEnd: onReconnectEnd ?? onEdgeUpdateEnd, reconnectRadius: reconnectRadius ?? edgeUpdaterRadius, defaultMarkerColor: defaultMarkerColor, noDragClassName: noDragClassName, noWheelClassName: noWheelClassName, noPanClassName: noPanClassName, elevateEdgesOnSelect: elevateEdgesOnSelect, rfId: rfId, disableKeyboardA11y: disableKeyboardA11y, nodeOrigin: nodeOrigin, nodeExtent: nodeExtent }),
              React.createElement(StoreUpdater, { nodes: nodes, edges: edges, defaultNodes: defaultNodes, defaultEdges: defaultEdges, onConnect: onConnect, onConnectStart: onConnectStart, onConnectEnd: onConnectEnd, onClickConnectStart: onClickConnectStart, onClickConnectEnd: onClickConnectEnd, nodesDraggable: nodesDraggable, nodesConnectable: nodesConnectable, nodesFocusable: nodesFocusable, edgesFocusable: edgesFocusable, edgesUpdatable: edgesUpdatable, elementsSelectable: elementsSelectable, elevateNodesOnSelect: elevateNodesOnSelect, minZoom: minZoom, maxZoom: maxZoom, nodeExtent: nodeExtent, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, snapToGrid: snapToGrid, snapGrid: snapGrid, connectionMode: connectionMode, translateExtent: translateExtent, connectOnClick: connectOnClick, defaultEdgeOptions: defaultEdgeOptions, fitView: fitView, fitViewOptions: fitViewOptions, onNodesDelete: onNodesDelete, onEdgesDelete: onEdgesDelete, onNodeDragStart: onNodeDragStart, onNodeDrag: onNodeDrag, onNodeDragStop: onNodeDragStop, onSelectionDrag: onSelectionDrag, onSelectionDragStart: onSelectionDragStart, onSelectionDragStop: onSelectionDragStop, noPanClassName: noPanClassName, nodeOrigin: nodeOrigin, rfId: rfId, autoPanOnConnect: autoPanOnConnect, autoPanOnNodeDrag: autoPanOnNodeDrag, onError: onError, connectionRadius: connectionRadius, isValidConnection: isValidConnection, nodeDragThreshold: nodeDragThreshold }),
              React.createElement(Wrapper$1, { onSelectionChange: onSelectionChange }),
              children,
              React.createElement(Attribution, { proOptions: proOptions, position: attributionPosition }),
              React.createElement(A11yDescriptions, { rfId: rfId, disableKeyboardA11y: disableKeyboardA11y }))));
  });
  ReactFlow.displayName = 'ReactFlow';

  const selector$1 = (s) => s.domNode?.querySelector('.react-flow__edgelabel-renderer');
  function EdgeLabelRenderer({ children }) {
      const edgeLabelRenderer = useStore(selector$1);
      if (!edgeLabelRenderer) {
          return null;
      }
      return reactDom.createPortal(children, edgeLabelRenderer);
  }

  function useUpdateNodeInternals() {
      const store = useStoreApi();
      return React.useCallback((id) => {
          const { domNode, updateNodeDimensions } = store.getState();
          const updateIds = Array.isArray(id) ? id : [id];
          const updates = updateIds.reduce((res, updateId) => {
              const nodeElement = domNode?.querySelector(`.react-flow__node[data-id="${updateId}"]`);
              if (nodeElement) {
                  res.push({ id: updateId, nodeElement, forceUpdate: true });
              }
              return res;
          }, []);
          requestAnimationFrame(() => updateNodeDimensions(updates));
      }, []);
  }

  const nodesSelector = (state) => state.getNodes();
  function useNodes() {
      const nodes = useStore(nodesSelector, shallow);
      return nodes;
  }

  const edgesSelector = (state) => state.edges;
  function useEdges() {
      const edges = useStore(edgesSelector, shallow);
      return edges;
  }

  const viewportSelector = (state) => ({
      x: state.transform[0],
      y: state.transform[1],
      zoom: state.transform[2],
  });
  function useViewport() {
      const viewport = useStore(viewportSelector, shallow);
      return viewport;
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  function createUseItemsState(applyChanges) {
      return (initialItems) => {
          const [items, setItems] = React.useState(initialItems);
          const onItemsChange = React.useCallback((changes) => setItems((items) => applyChanges(changes, items)), []);
          return [items, setItems, onItemsChange];
      };
  }
  const useNodesState = createUseItemsState(applyNodeChanges);
  const useEdgesState = createUseItemsState(applyEdgeChanges);

  function useOnViewportChange({ onStart, onChange, onEnd }) {
      const store = useStoreApi();
      React.useEffect(() => {
          store.setState({ onViewportChangeStart: onStart });
      }, [onStart]);
      React.useEffect(() => {
          store.setState({ onViewportChange: onChange });
      }, [onChange]);
      React.useEffect(() => {
          store.setState({ onViewportChangeEnd: onEnd });
      }, [onEnd]);
  }

  function useOnSelectionChange({ onChange }) {
      const store = useStoreApi();
      React.useEffect(() => {
          const nextSelectionChangeHandlers = [...store.getState().onSelectionChange, onChange];
          store.setState({ onSelectionChange: nextSelectionChangeHandlers });
          return () => {
              const nextHandlers = store.getState().onSelectionChange.filter((fn) => fn !== onChange);
              store.setState({ onSelectionChange: nextHandlers });
          };
      }, [onChange]);
  }

  const selector = (options) => (s) => {
      if (s.nodeInternals.size === 0) {
          return false;
      }
      return s
          .getNodes()
          .filter((n) => (options.includeHiddenNodes ? true : !n.hidden))
          .every((n) => n[internalsSymbol]?.handleBounds !== undefined);
  };
  const defaultOptions = {
      includeHiddenNodes: false,
  };
  function useNodesInitialized(options = defaultOptions) {
      const initialized = useStore(selector(options));
      return initialized;
  }

  exports.BaseEdge = BaseEdge;
  exports.BezierEdge = BezierEdge;
  exports.EdgeLabelRenderer = EdgeLabelRenderer;
  exports.EdgeText = EdgeText$1;
  exports.Handle = Handle$1;
  exports.Panel = Panel;
  exports.ReactFlow = ReactFlow;
  exports.ReactFlowProvider = ReactFlowProvider;
  exports.SimpleBezierEdge = SimpleBezierEdge;
  exports.SmoothStepEdge = SmoothStepEdge;
  exports.StepEdge = StepEdge;
  exports.StraightEdge = StraightEdge;
  exports.addEdge = addEdge;
  exports.applyEdgeChanges = applyEdgeChanges;
  exports.applyNodeChanges = applyNodeChanges;
  exports.boxToRect = boxToRect;
  exports.clamp = clamp;
  exports.getBezierPath = getBezierPath;
  exports.getBoundsOfRects = getBoundsOfRects;
  exports.getConnectedEdges = getConnectedEdges;
  exports.getIncomers = getIncomers;
  exports.getMarkerEnd = getMarkerEnd;
  exports.getNodePositionWithOrigin = getNodePositionWithOrigin;
  exports.getNodesBounds = getNodesBounds;
  exports.getOutgoers = getOutgoers;
  exports.getRectOfNodes = getRectOfNodes;
  exports.getSimpleBezierPath = getSimpleBezierPath;
  exports.getSmoothStepPath = getSmoothStepPath;
  exports.getStraightPath = getStraightPath;
  exports.getTransformForBounds = getTransformForBounds;
  exports.getViewportForBounds = getViewportForBounds;
  exports.handleParentExpand = handleParentExpand;
  exports.internalsSymbol = internalsSymbol;
  exports.isEdge = isEdge;
  exports.isNode = isNode;
  exports.reconnectEdge = reconnectEdge;
  exports.rectToBox = rectToBox;
  exports.updateEdge = updateEdge;
  exports.useEdges = useEdges;
  exports.useEdgesState = useEdgesState;
  exports.useGetPointerPosition = useGetPointerPosition;
  exports.useKeyPress = useKeyPress;
  exports.useNodeId = useNodeId;
  exports.useNodes = useNodes;
  exports.useNodesInitialized = useNodesInitialized;
  exports.useNodesState = useNodesState;
  exports.useOnSelectionChange = useOnSelectionChange;
  exports.useOnViewportChange = useOnViewportChange;
  exports.useReactFlow = useReactFlow;
  exports.useStore = useStore;
  exports.useStoreApi = useStoreApi;
  exports.useUpdateNodeInternals = useUpdateNodeInternals;
  exports.useViewport = useViewport;

}));
