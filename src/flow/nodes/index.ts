import type { NodeTypes } from "@xyflow/react";
import { VirtualNode } from "./VirtualNode";
import type { VirtualNode as VirtualNodeType } from "./VirtualNode";

export type AppNode = VirtualNodeType;

export const DEFAULT_NODES: AppNode[] = [
  {
    id: 'input',
    type: 'virtualNode',
    position: { x: 0, y: 0 },
    data: { type: 'input' },
  },
  {
    id: 'calc',
    type: 'virtualNode',
    position: { x: 300, y: 0 },
    data: { type: 'calc' },
  },
  {
    id: 'halt',
    type: 'virtualNode',
    position: { x: 100, y: 200 },
    data: { type: 'halt' },
  },
];

export const nodeTypes = {
  "virtualNode": VirtualNode,
  // add the custom nodes here
} satisfies NodeTypes;
