import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { ButtonNode, ButtonPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const ButtonNodeConfig: Record<NodeType.Button, NodeConfiguration<FormFieldNodeData>> = {
	[NodeType.Button]: {
		id: NodeType.Button,
		category: NodeCategory.FormField,
		type: NodeType.Button,
		label: 'Button',
		paletteComponent: markRaw(ButtonPalette),
		nodeComponent: markRaw(ButtonNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultFormFieldData, ...data },
				dimensions: dimensions ?? { width: 100, height: 40 }
			} as DesignGraphNode<FormFieldNodeData>;
		}
	}
};
