import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { DiamondNode, DiamondPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const DiamondNodeConfig: Record<NodeType.Diamond, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Diamond]: {
		id: NodeType.Diamond,
		category: NodeCategory.BasicShape,
		type: NodeType.Diamond,
		label: 'Diamond',
		paletteComponent: markRaw(DiamondPalette),
		nodeComponent: markRaw(DiamondNode),
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
