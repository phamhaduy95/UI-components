import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { UpArrowNode, UpArrowPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const UpArrowNodeConfig: Record<NodeType.UpArrow, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.UpArrow]: {
		id: NodeType.UpArrow,
		category: NodeCategory.BasicShape,
		type: NodeType.UpArrow,
		label: 'Up Arrow',
		paletteComponent: markRaw(UpArrowPalette),
		nodeComponent: markRaw(UpArrowNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 100, height: 100 }
			} as DesignGraphNode<BasicShapeNodeData>;
		}
	}
};
