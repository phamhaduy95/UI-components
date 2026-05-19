import IconRectangle from '@icons/rectangle.svg';
import IconCircle from '@icons/circle.svg';
import IconEllipse from '@icons/ellipse.svg';
import IconTriangle from '@icons/triangle.svg';
import IconHexagon from '@icons/hexagon.svg';
import IconStar from '@icons/star.svg';

export enum NodeCategory {
	Shape = 'shape',
	AOG = 'AOG'
}

type NodeTypeConfig = {
	id: string;
	label: string;
	iconComponent: string;
	nodeComponent: string;
	category: NodeCategory;
	subType: string;
};

export const nodeConfigMap: Record<string, NodeTypeConfig> = {
	rectangle: {
		id: 'rectangle',
		category: NodeCategory.Shape,
		subType: 'rectangle',
		iconComponent: IconRectangle,
		nodeComponent: IconRectangle,
		label: 'Rectangle'
	},
	circle: {
		id: 'circle',
		category: NodeCategory.Shape,
		subType: 'circle',
		iconComponent: IconCircle,
		nodeComponent: IconCircle,
		label: 'Circle'
	},
	ellipse: {
		id: 'ellipse',
		category: NodeCategory.Shape,
		subType: 'ellipse',
		iconComponent: IconEllipse,
		nodeComponent: IconEllipse,
		label: 'Ellipse'
	},
	triangle: {
		id: 'triangle',
		category: NodeCategory.Shape,
		subType: 'triangle',
		iconComponent: IconTriangle,
		nodeComponent: IconTriangle,
		label: 'Triangle'
	},
	hexagon: {
		id: 'hexagon',
		category: NodeCategory.Shape,
		subType: 'hexagon',
		iconComponent: IconHexagon,
		nodeComponent: IconHexagon,
		label: 'Hexagon'
	},
	star: {
		id: 'star',
		category: NodeCategory.Shape,
		subType: 'star',
		iconComponent: IconStar,
		nodeComponent: IconStar,
		label: 'Star'
	}
};
