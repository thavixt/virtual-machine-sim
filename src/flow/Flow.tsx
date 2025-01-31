import { ReactFlow, Background } from "@xyflow/react";

import '@xyflow/react/dist/style.css';

import { DEFAULT_NODES, nodeTypes } from "./nodes";
import { DEFAULT_EDGES, edgeTypes } from "./edges";

export function Flow() {
  return (
    <div className="size-full">
      <ReactFlow
        className="react-flow-custom"
        fitView
        edgeTypes={edgeTypes}
        edges={DEFAULT_EDGES}
        nodeTypes={nodeTypes}
        nodes={DEFAULT_NODES}
        // disable interactions
        draggable={false}
        edgesFocusable={false}
        elementsSelectable={false}
        nodesConnectable={false}
        nodesDraggable={false}
        nodesFocusable={false}
        panOnDrag={false}
        zoomOnScroll={false}
      >
        <Background/>
      </ReactFlow>
    </div>
  );
}