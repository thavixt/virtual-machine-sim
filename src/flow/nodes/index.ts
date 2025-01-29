import type { NodeTypes } from "@xyflow/react";
import { TuringNode } from "./TuringNode";
import type { TuringNode as TuringNodeType } from "./TuringNode";

export type AppNode = TuringNodeType;

export const DEFAULT_NODES: AppNode[] = [
  {
    id: 'input',
    type: 'turingNode',
    position: { x: 0, y: 0 },
    data: { type: 'input' },
  },
  {
    id: 'calc',
    type: 'turingNode',
    position: { x: 200, y: 0 },
    data: { type: 'calc' },
  },
  {
    id: 'halt',
    type: 'turingNode',
    position: { x: 100, y: 150 },
    data: { type: 'halt' },
  },
];

export const nodeTypes = {
  "turingNode": TuringNode,
  // add the custom nodes here
} satisfies NodeTypes;
