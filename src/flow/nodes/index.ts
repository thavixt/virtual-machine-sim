import type { NodeTypes, BuiltInNode } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { HaltNode } from "./HaltNode";
import { InputStartNode } from "./InputStartNode";
import { CalcNode } from "./CalcNode";

export type AppNode = BuiltInNode
  | PositionLoggerNode
  | InputStartNode
  | CalcNode
  | HaltNode;

export const initialNodes: AppNode[] = [
  { id: "a", type: 'inputStart', position: { x: 0, y: 0 }, data: {} },
  { id: "b", type: 'calc', position: { x: 100, y: 100 }, data: {} },
  { id: "c", type: 'halt', position: { x: 200, y: 0 }, data: {} },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "inputStart": InputStartNode,
  "calc": CalcNode,
  "halt": HaltNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
