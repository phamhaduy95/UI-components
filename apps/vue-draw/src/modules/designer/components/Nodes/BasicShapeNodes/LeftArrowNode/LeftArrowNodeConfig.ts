import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { LeftArrowNode, LeftArrowPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const LeftArrowNodeConfig: Record<
	NodeType.LeftArrow,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.LeftArrow]: {
		id: NodeType.LeftArrow,
		category: NodeCategory.BasicShape,
		type: NodeType.LeftArrow,
		label: 'Left Arrow',
		paletteComponent: markRaw(LeftArrowPalette),
		nodeComponent: markRaw(LeftArrowNode),
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
