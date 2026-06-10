import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { SquareNode, SquarePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const SquareNodeConfig: Record<NodeType.Square, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Square]: {
		id: NodeType.Square,
		category: NodeCategory.BasicShape,
		type: NodeType.Square,
		label: 'Square',
		paletteComponent: markRaw(SquarePalette),
		nodeComponent: markRaw(SquareNode),
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
