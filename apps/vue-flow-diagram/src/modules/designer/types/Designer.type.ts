import type { Node } from '@vue-flow/core';

export interface NodeCustomData {
	subType: string;
}

export type DesignerNode = Node<NodeCustomData>;
