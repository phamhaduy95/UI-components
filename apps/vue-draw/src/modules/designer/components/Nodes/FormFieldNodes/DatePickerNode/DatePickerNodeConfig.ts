import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { DatePickerNode, DatePickerPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const DatePickerNodeConfig: Record<
	NodeType.DatePicker,
	NodeConfiguration<FormFieldNodeData>
> = {
	[NodeType.DatePicker]: {
		id: NodeType.DatePicker,
		category: NodeCategory.FormField,
		type: NodeType.DatePicker,
		label: 'Date Picker',
		paletteComponent: markRaw(DatePickerPalette),
		nodeComponent: markRaw(DatePickerNode),
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
