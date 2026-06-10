import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { TrapezoidNode, TrapezoidPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const TrapezoidNodeConfig: Record<
	NodeType.Trapezoid,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.Trapezoid]: {
		id: NodeType.Trapezoid,
		category: NodeCategory.BasicShape,
		type: NodeType.Trapezoid,
		label: 'Trapezoid',
		paletteComponent: markRaw(TrapezoidPalette),
		nodeComponent: markRaw(TrapezoidNode),
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
