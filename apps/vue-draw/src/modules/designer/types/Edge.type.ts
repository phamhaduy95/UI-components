import type { Edge } from '@vue-flow/core';

export interface EdgeConfig {
	strokeColor: string;
	strokeWidth: number;
}

export type DesignerEdge = Edge<EdgeConfig>;
