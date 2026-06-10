import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { SparklineNode, SparklinePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const SparklineNodeConfig: Record<
	NodeType.Sparkline,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.Sparkline]: {
		id: NodeType.Sparkline,
		category: NodeCategory.DataDisplay,
		type: NodeType.Sparkline,
		label: 'Sparkline',
		paletteComponent: markRaw(SparklinePalette),
		nodeComponent: markRaw(SparklineNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 160, height: 100 }
			} as DesignGraphNode<BasicShapeNodeData>;
		}
	}
};
