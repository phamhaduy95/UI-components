import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { ArcNode, ArcPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const ArcNodeConfig: Record<NodeType.Arc, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Arc]: {
		id: NodeType.Arc,
		category: NodeCategory.BasicShape,
		type: NodeType.Arc,
		label: 'Arc',
		paletteComponent: markRaw(ArcPalette),
		nodeComponent: markRaw(ArcNode),
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
