import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Node } from "@xyflow/react";
import { useMemo } from "react";
import { useVirtualStore } from "../../state";
import { ProcessType } from "../../types";

export type VirtualNode = Node<
  {
    type: ProcessType
  },
  "virtualNode"
>;

const LABELS = {
  input: 'Input processing',
  calc: 'Calculating',
  halt: 'Halting...',
}

const DESCRIPTIONS = {
  input: 'Retrieve the current integer from the tape',
  halt: 'Process exited, tape stopped',
}

export function VirtualNode({ data: { type } }: NodeProps<VirtualNode>) {
  const calculations = useVirtualStore(state => state.calculations);
  const position = useVirtualStore(state => state.position);
  const tape = useVirtualStore(state => state.tape);
  const current = useVirtualStore(state => state.currentProcess);
  const calculation = useVirtualStore(state => state.calculation);
  const status = current === type ? 'active' : 'default';

  const description = useMemo(() => {
    if (type === 'calc') {
      return calculations[calculation].description;
    }
    return DESCRIPTIONS[type];
  }, [calculation, calculations, type])

  return (
    <div className={`react-flow__node-default rf-node rf-node_${type} rf-node_${status}`}>
      <p>{LABELS[type]}</p>
      <small className="whitespace-pre-wrap">{description}</small>
      <p>
        <b>{type === 'input' ? tape[position] ?? 0 : null}</b>
      </p>
      {type === 'input' ? (
        <>
          <Handle
            type={'target'}
            position={Position.Bottom}
          />
          <Handle
            type={'source'}
            position={Position.Right}
          />
        </>
      ) : null}
      {type === 'calc' ? (
        <>
          <Handle
            type={'target'}
            position={Position.Left}
          />
          <Handle
            type={'source'}
            position={Position.Left}
          />
        </>
      ) : null}
      {type === 'halt' ? (
        <>
          <Handle
            type={'target'}
            position={Position.Top}
          />
          <Handle
            type={'source'}
            position={Position.Top}
          />
        </>
      ) : null}
    </div>
  );
}
