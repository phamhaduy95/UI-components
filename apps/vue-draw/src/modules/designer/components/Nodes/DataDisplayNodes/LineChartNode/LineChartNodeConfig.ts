import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { LineChartNode, LineChartPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const LineChartNodeConfig: Record<
	NodeType.LineChart,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.LineChart]: {
		id: NodeType.LineChart,
		category: NodeCategory.DataDisplay,
		type: NodeType.LineChart,
		label: 'Line Chart',
		paletteComponent: markRaw(LineChartPalette),
		nodeComponent: markRaw(LineChartNode),
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
