import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { HeptagonNode, HeptagonPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';

export const HeptagonNodeConfig: Record<
	NodeType.Heptagon,
	NodeConfiguration<BasicShapeNodeData>
> = {
	[NodeType.Heptagon]: {
		id: NodeType.Heptagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Heptagon,
		label: 'Heptagon',
		paletteComponent: markRaw(HeptagonPalette),
		nodeComponent: markRaw(HeptagonNode),
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
