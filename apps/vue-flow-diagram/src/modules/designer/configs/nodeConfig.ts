import { markRaw, type Component } from 'vue';

import { RectangleNode, RectanglePalette } from '@/modules/designer/components/RectangleNode';
import { CircleNode, CirclePalette } from '@/modules/designer/components/CircleNode';
import { TriangleNode, TrianglePalette } from '@/modules/designer/components/TriangleNode';
import { HexagonNode, HexagonPalette } from '@/modules/designer/components/HexagonNode';
import { StarNode, StarPalette } from '@/modules/designer/components/StarNode';
import { EllipseNode, EllipsePalette } from '@/modules/designer/components/EllipseNode';

export enum NodeCategory {
	Shape = 'shape',
	AOG = 'AOG'
}

type NodeTypeConfig = {
	id: string;
	label: string;
	paletteComponent: Component;
	nodeComponent: Component;
	category: NodeCategory;
	subType: string;
};

// 1. Explicitly mark components raw to keep Vue from tracking internal component overhead
export const nodeConfigMap: Record<string, NodeTypeConfig> = {
	rectangle: {
		id: 'rectangle',
		category: NodeCategory.Shape,
		subType: 'rectangle',
		paletteComponent: markRaw(RectanglePalette),
		nodeComponent: markRaw(RectangleNode),
		label: 'Rectangle'
	},
	circle: {
		id: 'circle',
		category: NodeCategory.Shape,
		subType: 'circle',
		paletteComponent: markRaw(CirclePalette),
		nodeComponent: markRaw(CircleNode),
		label: 'Circle'
	},
	ellipse: {
		id: 'ellipse',
		category: NodeCategory.Shape,
		subType: 'ellipse',
		paletteComponent: markRaw(EllipsePalette),
		nodeComponent: markRaw(EllipseNode),
		label: 'Ellipse'
	},
	triangle: {
		id: 'triangle',
		category: NodeCategory.Shape,
		subType: 'triangle',
		paletteComponent: markRaw(TrianglePalette),
		nodeComponent: markRaw(TriangleNode),
		label: 'Triangle'
	},
	hexagon: {
		id: 'hexagon',
		category: NodeCategory.Shape,
		subType: 'hexagon',
		paletteComponent: markRaw(HexagonPalette),
		nodeComponent: markRaw(HexagonNode),
		label: 'Hexagon'
	},
	star: {
		id: 'star',
		category: NodeCategory.Shape,
		subType: 'star',
		paletteComponent: markRaw(StarPalette),
		nodeComponent: markRaw(StarNode),
		label: 'Star'
	}
};
