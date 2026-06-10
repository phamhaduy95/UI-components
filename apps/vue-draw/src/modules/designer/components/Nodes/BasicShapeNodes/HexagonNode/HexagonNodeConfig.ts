import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { HexagonNode, HexagonPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const HexagonNodeConfig: Record<NodeType.Hexagon, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Hexagon]: {
		id: NodeType.Hexagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Hexagon,
		label: 'Hexagon',
		paletteComponent: markRaw(HexagonPalette),
		nodeComponent: markRaw(HexagonNode),
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
