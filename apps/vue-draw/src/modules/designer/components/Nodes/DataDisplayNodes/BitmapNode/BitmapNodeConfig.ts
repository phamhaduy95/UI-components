import {
	NodeCategory,
	NodeType,
	type BitmapNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { BitmapNode, BitmapPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const BitmapNodeConfig: Record<NodeType.Bitmap, NodeConfiguration<BitmapNodeData>> = {
	[NodeType.Bitmap]: {
		id: NodeType.Bitmap,
		category: NodeCategory.DataDisplay,
		type: NodeType.Bitmap,
		label: 'Bitmap',
		paletteComponent: markRaw(BitmapPalette),
		nodeComponent: markRaw(BitmapNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultBasicShapeNodeData, ...data },
				dimensions: dimensions ?? { width: 240, height: 160 }
			} as DesignGraphNode<BitmapNodeData>;
		}
	}
};
