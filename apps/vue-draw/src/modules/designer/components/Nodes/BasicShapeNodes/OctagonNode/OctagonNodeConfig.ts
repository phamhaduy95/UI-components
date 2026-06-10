import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { OctagonNode, OctagonPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const OctagonNodeConfig: Record<NodeType.Octagon, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Octagon]: {
		id: NodeType.Octagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Octagon,
		label: 'Octagon',
		paletteComponent: markRaw(OctagonPalette),
		nodeComponent: markRaw(OctagonNode),
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
