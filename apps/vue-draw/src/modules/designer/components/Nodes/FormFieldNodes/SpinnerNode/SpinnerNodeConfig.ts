import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { SpinnerNode, SpinnerPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const SpinnerNodeConfig: Record<NodeType.Spinner, NodeConfiguration<FormFieldNodeData>> = {
	[NodeType.Spinner]: {
		id: NodeType.Spinner,
		category: NodeCategory.FormField,
		type: NodeType.Spinner,
		label: 'Spinner',
		paletteComponent: markRaw(SpinnerPalette),
		nodeComponent: markRaw(SpinnerNode),
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
