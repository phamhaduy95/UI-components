import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { RadioGroupNode, RadioGroupPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const RadioGroupNodeConfig: Record<
	NodeType.RadioGroup,
	NodeConfiguration<FormFieldNodeData>
> = {
	[NodeType.RadioGroup]: {
		id: NodeType.RadioGroup,
		category: NodeCategory.FormField,
		type: NodeType.RadioGroup,
		label: 'Radio Group',
		paletteComponent: markRaw(RadioGroupPalette),
		nodeComponent: markRaw(RadioGroupNode),
		createNode: ({ data, dimensions, ...rest }) => {
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultFormFieldData, ...data },
				dimensions: dimensions ?? { width: 150, height: 60 }
			} as DesignGraphNode<FormFieldNodeData>;
		}
	}
};
