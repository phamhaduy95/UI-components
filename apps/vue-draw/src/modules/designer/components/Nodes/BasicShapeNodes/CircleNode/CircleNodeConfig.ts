import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { CircleNode, CirclePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const CircleNodeConfig: Record<NodeType.Circle, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Circle]: {
		id: NodeType.Circle,
		category: NodeCategory.BasicShape,
		type: NodeType.Circle,
		label: 'Circle',
		paletteComponent: markRaw(CirclePalette),
		nodeComponent: markRaw(CircleNode),
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
