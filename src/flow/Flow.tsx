import { ReactFlow, Background } from "@xyflow/react";

import '@xyflow/react/dist/style.css';

import { DEFAULT_NODES, nodeTypes } from "./nodes";
import { DEFAULT_EDGES, edgeTypes } from "./edges";

export function Flow() {
  return (
    <div className="size-full">
      <ReactFlow
        className="react-flow-custom"
        nodes={DEFAULT_NODES}
        nodeTypes={nodeTypes}
        edges={DEFAULT_EDGES}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}