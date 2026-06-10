import {
	NodeCategory,
	NodeType,
	type TextNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { TextNode, TextPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultTextData } from '@/modules/designer/constant/default';

export const TextNodeConfig: Record<NodeType.Text, NodeConfiguration<TextNodeData>> = {
	[NodeType.Text]: {
		id: NodeType.Text,
		category: NodeCategory.FormField,
		type: NodeType.Text,
		label: 'Text',
		paletteComponent: markRaw(TextPalette),
		nodeComponent: markRaw(TextNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultTextData, ...data },
				dimensions: dimensions ?? { width: 150, height: 40 }
			} as DesignGraphNode<TextNodeData>;
		}
	}
};
