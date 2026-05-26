import { markRaw, type Component } from 'vue';

import { NodeCategory } from '@/modules/designer/types/Node.type';
import {
	RectangleNode,
	CircleNode,
	EllipseNode,
	HexagonNode,
	StarNode,
	TriangleNode,
	GroupNode,
	RectanglePalette,
	CirclePalette,
	EllipsePalette,
	HexagonPalette,
	StarPalette,
	TrianglePalette
} from '@/modules/designer/components';

type NodeTypeConfig = {
	id: string;
	label: string;
	paletteComponent?: Component;
	nodeComponent: Component;
	category: NodeCategory;
	type: string;
};

// 1. Explicitly mark components raw to keep Vue from tracking internal component overhead
export const nodeConfigMap: Record<string, NodeTypeConfig> = {
	rectangle: {
		id: 'rectangle',
		category: NodeCategory.BasicShape,
		type: 'rectangle',
		paletteComponent: markRaw(RectanglePalette),
		nodeComponent: markRaw(RectangleNode),
		label: 'Rectangle'
	},
	circle: {
		id: 'circle',
		category: NodeCategory.BasicShape,
		type: 'circle',
		paletteComponent: markRaw(CirclePalette),
		nodeComponent: markRaw(CircleNode),
		label: 'Circle'
	},
	ellipse: {
		id: 'ellipse',
		category: NodeCategory.BasicShape,
		type: 'ellipse',
		paletteComponent: markRaw(EllipsePalette),
		nodeComponent: markRaw(EllipseNode),
		label: 'Ellipse'
	},
	triangle: {
		id: 'triangle',
		category: NodeCategory.BasicShape,
		type: 'triangle',
		paletteComponent: markRaw(TrianglePalette),
		nodeComponent: markRaw(TriangleNode),
		label: 'Triangle'
	},
	hexagon: {
		id: 'hexagon',
		category: NodeCategory.BasicShape,
		type: 'hexagon',
		paletteComponent: markRaw(HexagonPalette),
		nodeComponent: markRaw(HexagonNode),
		label: 'Hexagon'
	},
	star: {
		id: 'star',
		category: NodeCategory.BasicShape,
		type: 'star',
		paletteComponent: markRaw(StarPalette),
		nodeComponent: markRaw(StarNode),
		label: 'Star'
	},
	group: {
		id: 'group',
		category: NodeCategory.Group,
		type: 'group',
		nodeComponent: markRaw(GroupNode),
		label: 'Group'
	}
};
