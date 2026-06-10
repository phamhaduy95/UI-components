import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { SelectNode, SelectPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const SelectNodeConfig: Record<NodeType.Select, NodeConfiguration<FormFieldNodeData>> = {
	[NodeType.Select]: {
		id: NodeType.Select,
		category: NodeCategory.FormField,
		type: NodeType.Select,
		label: 'Select',
		paletteComponent: markRaw(SelectPalette),
		nodeComponent: markRaw(SelectNode),
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
