import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { NonagonNode, NonagonPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const NonagonNodeConfig: Record<NodeType.Nonagon, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Nonagon]: {
		id: NodeType.Nonagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Nonagon,
		label: 'Nonagon',
		paletteComponent: markRaw(NonagonPalette),
		nodeComponent: markRaw(NonagonNode),
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
