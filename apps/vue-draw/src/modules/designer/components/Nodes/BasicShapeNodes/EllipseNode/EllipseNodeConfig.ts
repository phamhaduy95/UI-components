import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { EllipseNode, EllipsePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const EllipseNodeConfig: Record<NodeType.Ellipse, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Ellipse]: {
		id: NodeType.Ellipse,
		category: NodeCategory.BasicShape,
		type: NodeType.Ellipse,
		label: 'Ellipse',
		paletteComponent: markRaw(EllipsePalette),
		nodeComponent: markRaw(EllipseNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 100, height: 50 }
			} as DesignGraphNode<BasicShapeNodeData>;
		}
	}
};
