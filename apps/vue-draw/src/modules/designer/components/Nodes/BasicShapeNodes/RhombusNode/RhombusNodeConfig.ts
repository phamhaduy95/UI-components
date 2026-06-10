import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { RhombusNode, RhombusPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const RhombusNodeConfig: Record<NodeType.Rhombus, NodeConfiguration<BasicShapeNodeData>> = {
	[NodeType.Rhombus]: {
		id: NodeType.Rhombus,
		category: NodeCategory.BasicShape,
		type: NodeType.Rhombus,
		label: 'Rhombus',
		paletteComponent: markRaw(RhombusPalette),
		nodeComponent: markRaw(RhombusNode),
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
