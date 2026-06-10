import {
	NodeCategory,
	NodeType,
	type IndustrialNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { TankNode, TankPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const TankNodeConfig: Record<NodeType.Tank, NodeConfiguration<IndustrialNodeData>> = {
	[NodeType.Tank]: {
		id: NodeType.Tank,
		category: NodeCategory.Industrial,
		type: NodeType.Tank,
		label: 'Tank',
		paletteComponent: markRaw(TankPalette),
		nodeComponent: markRaw(TankNode),
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
