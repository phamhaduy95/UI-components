import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { LineNode, LinePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const LineNodeConfig: Record<NodeType.Line, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Line]: {
		id: NodeType.Line,
		category: NodeCategory.BasicShape,
		type: NodeType.Line,
		label: 'Line',
		paletteComponent: markRaw(LinePalette),
		nodeComponent: markRaw(LineNode),
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
