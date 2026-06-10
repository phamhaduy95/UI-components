import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { DownArrowNode, DownArrowPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const DownArrowNodeConfig: Record<
	NodeType.DownArrow,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.DownArrow]: {
		id: NodeType.DownArrow,
		category: NodeCategory.BasicShape,
		type: NodeType.DownArrow,
		label: 'Down Arrow',
		paletteComponent: markRaw(DownArrowPalette),
		nodeComponent: markRaw(DownArrowNode),
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
