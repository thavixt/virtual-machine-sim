import { Handle, Node, Position, type NodeProps } from "@xyflow/react";

export type HaltNode = Node<
  {
    label?: string;
  },
  "halt"
>;

export function HaltNode({
  data,
}: NodeProps<HaltNode>) {

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <div>
        halt
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
