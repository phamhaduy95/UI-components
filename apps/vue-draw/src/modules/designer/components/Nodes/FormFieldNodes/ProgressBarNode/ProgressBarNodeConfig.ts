import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { ProgressBarNode, ProgressBarPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const ProgressBarNodeConfig: Record<
	NodeType.ProgressBar,
	NodeConfiguration<FormFieldNodeData>
> = {
	[NodeType.ProgressBar]: {
		id: NodeType.ProgressBar,
		category: NodeCategory.FormField,
		type: NodeType.ProgressBar,
		label: 'Progress Bar',
		paletteComponent: markRaw(ProgressBarPalette),
		nodeComponent: markRaw(ProgressBarNode),
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
