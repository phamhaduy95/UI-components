import {
	NodeCategory,
	NodeType,
	type IframeNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { IframeNode, IframePalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';

export const IframeNodeConfig: Record<NodeType.Iframe, NodeConfiguration<IframeNodeData>> = {
	[NodeType.Iframe]: {
		id: NodeType.Iframe,
		category: NodeCategory.DataDisplay,
		type: NodeType.Iframe,
		label: 'Iframe',
		paletteComponent: markRaw(IframePalette),
		nodeComponent: markRaw(IframeNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...data },
				dimensions: dimensions ?? { width: 640, height: 480 }
			} as DesignGraphNode<IframeNodeData>;
		}
	}
};
