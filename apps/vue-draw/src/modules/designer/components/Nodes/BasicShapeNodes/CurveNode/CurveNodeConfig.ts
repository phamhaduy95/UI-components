import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { CurveNode, CurvePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const CurveNodeConfig: Record<NodeType.Curve, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Curve]: {
		id: NodeType.Curve,
		category: NodeCategory.BasicShape,
		type: NodeType.Curve,
		label: 'Curve',
		paletteComponent: markRaw(CurvePalette),
		nodeComponent: markRaw(CurveNode),
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
