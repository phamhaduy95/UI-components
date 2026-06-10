import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { CheckboxNode, CheckboxPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const CheckboxNodeConfig: Record<NodeType.Checkbox, NodeConfiguration<FormFieldNodeData>> = {
	[NodeType.Checkbox]: {
		id: NodeType.Checkbox,
		category: NodeCategory.FormField,
		type: NodeType.Checkbox,
		label: 'Checkbox',
		paletteComponent: markRaw(CheckboxPalette),
		nodeComponent: markRaw(CheckboxNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultFormFieldData, ...data },
				dimensions: dimensions ?? { width: 30, height: 30 }
			} as DesignGraphNode<FormFieldNodeData>;
		}
	}
};
