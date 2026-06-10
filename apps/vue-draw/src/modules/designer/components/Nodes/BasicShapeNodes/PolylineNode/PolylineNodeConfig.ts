import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { PolylineNode, PolylinePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const PolylineNodeConfig: Record<
	NodeType.Polyline,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.Polyline]: {
		id: NodeType.Polyline,
		category: NodeCategory.BasicShape,
		type: NodeType.Polyline,
		label: 'Polyline',
		paletteComponent: markRaw(PolylinePalette),
		nodeComponent: markRaw(PolylineNode),
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
