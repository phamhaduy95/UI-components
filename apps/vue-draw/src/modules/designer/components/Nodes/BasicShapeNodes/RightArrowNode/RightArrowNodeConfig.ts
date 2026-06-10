import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { RightArrowNode, RightArrowPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const RightArrowNodeConfig: Record<
	NodeType.RightArrow,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.RightArrow]: {
		id: NodeType.RightArrow,
		category: NodeCategory.BasicShape,
		type: NodeType.RightArrow,
		label: 'Right Arrow',
		paletteComponent: markRaw(RightArrowPalette),
		nodeComponent: markRaw(RightArrowNode),
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
