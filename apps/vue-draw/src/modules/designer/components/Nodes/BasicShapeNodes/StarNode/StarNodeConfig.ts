import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { StarNode, StarPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const StarNodeConfig: Record<NodeType.Star, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Star]: {
		id: NodeType.Star,
		category: NodeCategory.BasicShape,
		type: NodeType.Star,
		label: 'Star',
		paletteComponent: markRaw(StarPalette),
		nodeComponent: markRaw(StarNode),
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
