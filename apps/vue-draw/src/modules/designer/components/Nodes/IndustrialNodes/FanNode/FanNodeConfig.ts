import {
	NodeCategory,
	NodeType,
	type IndustrialNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { FanNode, FanPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const FanNodeConfig: Record<NodeType.Fan, NodeConfiguration<IndustrialNodeData>> = {
	[NodeType.Fan]: {
		id: NodeType.Fan,
		category: NodeCategory.Industrial,
		type: NodeType.Fan,
		label: 'Fan',
		paletteComponent: markRaw(FanPalette),
		nodeComponent: markRaw(FanNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 100, height: 100 }
			} as DesignGraphNode<IndustrialNodeData>;
		}
	}
};
