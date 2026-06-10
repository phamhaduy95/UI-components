import {
	NodeCategory,
	NodeType,
	type IndustrialNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { MotorNode, MotorPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const MotorNodeConfig: Record<NodeType.Motor, NodeConfiguration<IndustrialNodeData>> = {
	[NodeType.Motor]: {
		id: NodeType.Motor,
		category: NodeCategory.Industrial,
		type: NodeType.Motor,
		label: 'Motor',
		paletteComponent: markRaw(MotorPalette),
		nodeComponent: markRaw(MotorNode),
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
