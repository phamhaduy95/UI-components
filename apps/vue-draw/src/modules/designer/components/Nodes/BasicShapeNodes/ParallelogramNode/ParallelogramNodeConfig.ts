import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { ParallelogramNode, ParallelogramPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const ParallelogramNodeConfig: Record<
	NodeType.Parallelogram,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.Parallelogram]: {
		id: NodeType.Parallelogram,
		category: NodeCategory.BasicShape,
		type: NodeType.Parallelogram,
		label: 'Parallelogram',
		paletteComponent: markRaw(ParallelogramPalette),
		nodeComponent: markRaw(ParallelogramNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 100, height: 50 }
			} as DesignGraphNode<BasicShapeNodeData>;
		}
	}
};
