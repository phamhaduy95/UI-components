import type { Node } from '@vue-flow/core';

export enum NodeCategory {
	BasicShape = 'basic-shape',
	Group = 'group'
}

export interface BasicShapeNodeData {
	category: NodeCategory.BasicShape;
	rotation: number;
	fill: string;
	stroke: string;
	strokeWidth: number;
	borderRadius: number;
}

export interface GroupNodeData {
	category: NodeCategory.Group;
	rotation: number;
	initialWidth: number;
	initialHeight: number;
}

export type DesignerNodeData = BasicShapeNodeData | GroupNodeData;

export interface DesignerNode
	extends Pick<
		Node,
		'id' | 'type' | 'style' | 'width' | 'height' | 'parentNode' | 'position' | 'zIndex' | 'hidden'
	> {
	data?: DesignerNodeData;
}
