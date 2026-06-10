import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { ScatterPlotNode, ScatterPlotPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const ScatterPlotNodeConfig: Record<
	NodeType.ScatterPlot,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.ScatterPlot]: {
		id: NodeType.ScatterPlot,
		category: NodeCategory.DataDisplay,
		type: NodeType.ScatterPlot,
		label: 'Scatter Plot',
		paletteComponent: markRaw(ScatterPlotPalette),
		nodeComponent: markRaw(ScatterPlotNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 400, height: 240 }
			} as DesignGraphNode<BasicShapeNodeData>;
		}
	}
};
