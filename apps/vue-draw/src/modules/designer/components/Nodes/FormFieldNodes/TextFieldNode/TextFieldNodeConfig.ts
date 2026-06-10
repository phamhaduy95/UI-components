import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { TextFieldNode, TextFieldPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const TextFieldNodeConfig: Record<
	NodeType.TextField,
	NodeConfiguration<FormFieldNodeData>
> = {
	[NodeType.TextField]: {
		id: NodeType.TextField,
		category: NodeCategory.FormField,
		type: NodeType.TextField,
		label: 'Text Field',
		paletteComponent: markRaw(TextFieldPalette),
		nodeComponent: markRaw(TextFieldNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultFormFieldData, ...data },
				dimensions: dimensions ?? { width: 200, height: 40 }
			} as DesignGraphNode<FormFieldNodeData>;
		}
	}
};
