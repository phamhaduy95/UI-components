import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { RectangleNode, RectanglePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const RectangleNodeConfig: Record<
	NodeType.Rectangle,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.Rectangle]: {
		id: NodeType.Rectangle,
		category: NodeCategory.BasicShape,
		type: NodeType.Rectangle,
		label: 'Rectangle',
		paletteComponent: markRaw(RectanglePalette),
		nodeComponent: markRaw(RectangleNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 100, height: 60 }
			} as DesignGraphNode<BasicShapeNodeData>;
		}
	}
};
