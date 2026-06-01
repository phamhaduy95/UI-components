import {
	NodeCategory,
	type BasicShapeNodeData,
	type DesignerNode,
	type DesignerNodeData,
	type GroupNodeData,
	type TextNodeData,
	type TextFieldNodeData,
	type DatePickerNodeData
} from '@/modules/designer/types/Node.type';
import {
	defaultNodeData,
	defaultGroupData,
	defaultTextData,
	defaultTextFieldData,
	defaultDatePickerData
} from '@/modules/designer/constant/default';
import type { Dimensions } from '@vue-flow/core';

export const generateNodeId = () => `node_${crypto.randomUUID()}`;

type GenerateNodeArg = Omit<DesignerNode, 'id' | 'data' | 'dimensions'> & {
	data?: Partial<DesignerNodeData>;
	dimensions?: Dimensions;
};

const basicShapeDimensions: Dimensions = { width: 100, height: 100 };
const textFieldDimensions: Dimensions = { width: 200, height: 40 };
const textDimensions: Dimensions = { width: 150, height: 40 };

export const generateNode = ({ data, dimensions, ...rest }: GenerateNodeArg) => {
	switch (data?.category) {
		case NodeCategory.BasicShape:
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultNodeData, ...data } as BasicShapeNodeData,
				dimensions: dimensions ?? structuredClone(basicShapeDimensions)
			} as DesignerNode;
		case NodeCategory.Group:
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultGroupData, ...data } as GroupNodeData
			} as DesignerNode;
		case NodeCategory.FormField:
			if (rest.type === 'datePicker') {
				return {
					...rest,
					id: generateNodeId(),
					data: { ...defaultDatePickerData, ...data } as DatePickerNodeData,
					dimensions: dimensions ?? structuredClone(textFieldDimensions)
				} as DesignerNode;
			}
			if (rest.type === 'text') {
				return {
					...rest,
					id: generateNodeId(),
					data: { ...defaultTextData, ...data } as TextNodeData,
					dimensions: dimensions ?? structuredClone(textDimensions)
				} as DesignerNode;
			}
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultTextFieldData, ...data } as TextFieldNodeData,
				dimensions: dimensions ?? structuredClone(textFieldDimensions)
			} as DesignerNode;
		default:
			throw new Error(`Unknown node category: ${data?.category}`);
	}
};
