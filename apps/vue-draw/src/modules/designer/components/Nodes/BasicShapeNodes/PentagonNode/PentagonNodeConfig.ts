import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { PentagonNode, PentagonPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const PentagonNodeConfig: Record<
	NodeType.Pentagon,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.Pentagon]: {
		id: NodeType.Pentagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Pentagon,
		label: 'Pentagon',
		paletteComponent: markRaw(PentagonPalette),
		nodeComponent: markRaw(PentagonNode),
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
