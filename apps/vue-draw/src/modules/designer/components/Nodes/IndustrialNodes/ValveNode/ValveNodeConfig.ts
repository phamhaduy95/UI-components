import {
	NodeCategory,
	NodeType,
	type IndustrialNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { ValveNode, ValvePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const ValveNodeConfig: Record<NodeType.Valve, NodeConfiguration<IndustrialNodeData>> = {
	[NodeType.Valve]: {
		id: NodeType.Valve,
		category: NodeCategory.Industrial,
		type: NodeType.Valve,
		label: 'Valve',
		paletteComponent: markRaw(ValvePalette),
		nodeComponent: markRaw(ValveNode),
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
