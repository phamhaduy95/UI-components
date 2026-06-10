import {
	NodeCategory,
	NodeType,
	type IndustrialNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { GaugeNode, GaugePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const GaugeNodeConfig: Record<NodeType.Gauge, NodeConfiguration<IndustrialNodeData>> = {
	[NodeType.Gauge]: {
		id: NodeType.Gauge,
		category: NodeCategory.Industrial,
		type: NodeType.Gauge,
		label: 'Gauge',
		paletteComponent: markRaw(GaugePalette),
		nodeComponent: markRaw(GaugeNode),
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
