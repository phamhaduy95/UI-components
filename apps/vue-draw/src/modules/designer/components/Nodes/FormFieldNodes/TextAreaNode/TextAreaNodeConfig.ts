import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { TextAreaNode, TextAreaPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const TextAreaNodeConfig: Record<NodeType.TextArea, NodeConfiguration<FormFieldNodeData>> = {
	[NodeType.TextArea]: {
		id: NodeType.TextArea,
		category: NodeCategory.FormField,
		type: NodeType.TextArea,
		label: 'Text Area',
		paletteComponent: markRaw(TextAreaPalette),
		nodeComponent: markRaw(TextAreaNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultFormFieldData, ...data },
				dimensions: dimensions ?? { width: 250, height: 100 }
			} as DesignGraphNode<FormFieldNodeData>;
		}
	}
};
