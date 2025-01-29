import type { Edge, EdgeTypes } from "@xyflow/react";

export const DEFAULT_EDGES = [
  {
    id: "input->calc",
    source: "input",
    target: "calc",
    animated: true,
  },
  {
    id: "calc->input",
    source: "calc",
    target: "input",
    animated: true,
  },
  {
    id: "calc->halt",
    source: "calc",
    target: "halt",
    animated: true,
  },
] satisfies Edge[];

export const edgeTypes = {
  // add the custom edge types here
} satisfies EdgeTypes;
