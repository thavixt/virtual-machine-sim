import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Node } from "@xyflow/react";
import { useTuringStore } from "../../state/store";
import { useMemo } from "react";
import { CALCULATIONS } from "../../Calculations";

export type ProcessType = 'input' | 'calc' | 'halt';

export type TuringNode = Node<
  {
    type: ProcessType
  },
  "turingNode"
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

export function TuringNode({ data: { type } }: NodeProps<TuringNode>) {
  const position = useTuringStore(state => state.position);
  const tape = useTuringStore(state => state.tape);
  const value = useTuringStore(state => state.value);
  const current = useTuringStore(state => state.current);
  const calculation = useTuringStore(state => state.calculation);
  const status = current === type ? 'active' : 'default';

  const description = useMemo(() => {
    if (type === 'calc') {
      return CALCULATIONS[calculation].description;
    }
    return DESCRIPTIONS[type];
  }, [])

  return (
    <div className={`react-flow__node-default rf-node rf-node_${type} rf-node_${status}`}>
      <p>{LABELS[type]}</p>
      <small>{description}</small>
      <p><b>
        {type === 'input' ? tape[position] ?? 0 : null}
        {type === 'calc' ? (
          <span>{value} + {tape[position] ?? 0}</span>
        ) : null}
      </b></p>
      <Handle type={type === 'input' ? 'source' : 'target'} position={Position.Top} />
      <Handle type={type === 'input' ? 'target' : 'source'} position={Position.Bottom} />
    </div>
  );
}
