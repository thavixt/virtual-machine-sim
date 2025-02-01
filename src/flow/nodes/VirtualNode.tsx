import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Node } from "@xyflow/react";
import { useEffect, useMemo } from "react";
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

  useEffect(() => {
    console.log('-----');
    console.log('calculations', calculations);
    console.log('calculation', calculation);
  }, [calculation, calculations])

  const description = useMemo(() => {
    if (type === 'calc') {
      return calculations[calculation].description;
    }
    return DESCRIPTIONS[type];
  }, [calculation, calculations, type])

  return (
    <div className={`react-flow__node-default rf-node rf-node_${type} rf-node_${status}`}>
      <p>{LABELS[type]}</p>
      <small>{description}</small>
      <p>
        <b>{type === 'input' ? tape[position] ?? 0 : null}</b>
      </p>
      <Handle
        type={type === 'input' ? 'source' : 'target'}
        position={Position.Top}
      />
      {(type !== 'halt') ? (
        <Handle
          type={type === 'input' ? 'target' : 'source'}
          position={Position.Bottom}
        />
      ) : null}
    </div>
  );
}
