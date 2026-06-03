import {
	NodeCategory,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type DesignerNodeData,
	type GroupNodeData,
	type TextNodeData,
	type FormFieldNodeData
} from '@/modules/designer/types/Node.type';
import {
	defaultNodeData,
	defaultGroupData,
	defaultTextData,
	defaultFormFieldData
} from '@/modules/designer/constant/default';
import type { Dimensions } from '@vue-flow/core';

export const generateNodeId = () => `node_${crypto.randomUUID()}`;

type GenerateNodeArg = Omit<Partial<DesignGraphNode>, 'id' | 'data' | 'dimensions'> & {
	dimensions?: Dimensions;
	data?: Partial<DesignerNodeData>;
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
			} as DesignGraphNode;
		case NodeCategory.Group:
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultGroupData, ...data } as GroupNodeData
			} as DesignGraphNode;
		case NodeCategory.FormField:
			switch (rest.type) {
				case 'text':
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultTextData, ...data } as TextNodeData,
						dimensions: dimensions ?? structuredClone(textDimensions)
					} as DesignGraphNode;
				case 'table':
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultFormFieldData, ...data },
						dimensions: {
							width: 400,
							height: 0
						},
						style: {
							width: 'max-content',
							height: 'max-content'
						}
					} as DesignGraphNode;
				default:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultFormFieldData, ...data } as FormFieldNodeData,
						dimensions: dimensions ?? structuredClone(textFieldDimensions)
					} as DesignGraphNode;
			}
		case NodeCategory.Industrial:
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultNodeData, ...data } as BasicShapeNodeData,
				dimensions: dimensions ?? structuredClone(basicShapeDimensions)
			} as DesignGraphNode;
		default:
			throw new Error(`Unknown node category: ${data?.category}`);
	}
};
