import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { TriangleNode, TrianglePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const TriangleNodeConfig: Record<
	NodeType.Triangle,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.Triangle]: {
		id: NodeType.Triangle,
		category: NodeCategory.BasicShape,
		type: NodeType.Triangle,
		label: 'Triangle',
		paletteComponent: markRaw(TrianglePalette),
		nodeComponent: markRaw(TriangleNode),
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
