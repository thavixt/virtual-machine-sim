import { Handle, Node, Position, type NodeProps } from "@xyflow/react";

export type InputStartNode = Node<
  {
    label?: string;
  },
  "inputStart"
>;

export function InputStartNode({
  data,
}: NodeProps<InputStartNode>) {

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <div>
        input start
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
