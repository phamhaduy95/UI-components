import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { CrossNode, CrossPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const CrossNodeConfig: Record<NodeType.Cross, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Cross]: {
		id: NodeType.Cross,
		category: NodeCategory.BasicShape,
		type: NodeType.Cross,
		label: 'Cross',
		paletteComponent: markRaw(CrossPalette),
		nodeComponent: markRaw(CrossNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 64, height: 64 }
			} as DesignGraphNode<BasicShapeNodeData>;
		}
	}
};
