import { Handle, Node, Position, type NodeProps } from "@xyflow/react";

export type CalcNode = Node<
  {
    label?: string;
  },
  "calc"
>;

export function CalcNode({
  data,
}: NodeProps<CalcNode>) {

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <div>
        calc
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
