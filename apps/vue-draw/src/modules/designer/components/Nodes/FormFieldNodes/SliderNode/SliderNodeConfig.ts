import {
	NodeCategory,
	NodeType,
	type FormFieldNodeData,
	type DesignGraphNode,
	type NodeConfiguration
} from '@/modules/designer/types/Node.type';
import { markRaw } from 'vue';
import { SliderNode, SliderPalette } from '.';
import { generateNodeId } from '@/modules/designer/utils/node.utils';
import { defaultFormFieldData } from '@/modules/designer/constant/default';

export const SliderNodeConfig: Record<NodeType.Slider, NodeConfiguration<FormFieldNodeData>> = {
	[NodeType.Slider]: {
		id: NodeType.Slider,
		category: NodeCategory.FormField,
		type: NodeType.Slider,
		label: 'Slider',
		paletteComponent: markRaw(SliderPalette),
		nodeComponent: markRaw(SliderNode),
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
