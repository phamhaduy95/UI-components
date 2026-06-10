import {
	NodeCategory,
	NodeType,
	type IndustrialNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { PumpNode, PumpPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const PumpNodeConfig: Record<NodeType.Pump, NodeConfiguration<IndustrialNodeData>> = {
	[NodeType.Pump]: {
		id: NodeType.Pump,
		category: NodeCategory.Industrial,
		type: NodeType.Pump,
		label: 'Pump',
		paletteComponent: markRaw(PumpPalette),
		nodeComponent: markRaw(PumpNode),
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
