import {
	NodeCategory,
	NodeType,
	type BasicShapeNodeData,
	type DesignGraphNode,
	type GroupNodeData,
	type TextNodeData,
	type FormFieldNodeData,
	type BitmapNodeData,
	type TableNodeData,
	type BaseNodeData
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
	data?: Partial<BaseNodeData>;
};

const basicShapeDimensions: Dimensions = { width: 100, height: 100 };
const textFieldDimensions: Dimensions = { width: 200, height: 40 };
const textDimensions: Dimensions = { width: 150, height: 40 };

export const generateNode = ({ data, dimensions, ...rest }: GenerateNodeArg) => {
	switch (data?.category) {
		case NodeCategory.BasicShape: {
			let shapeDimensions: Dimensions;
			switch (rest.type) {
				case NodeType.Rectangle:
					shapeDimensions = { width: 100, height: 60 };
					break;
				case NodeType.Ellipse:
					shapeDimensions = { width: 100, height: 50 };
					break;
				case NodeType.Parallelogram:
					shapeDimensions = { width: 100, height: 50 };
					break;
				default:
					shapeDimensions = structuredClone(basicShapeDimensions);
					break;
			}
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultNodeData, ...data } as BasicShapeNodeData,
				dimensions: dimensions ?? shapeDimensions
			} as DesignGraphNode;
		}
		case NodeCategory.Group:
			return {
				...rest,
				id: generateNodeId(),
				data: { ...defaultGroupData, ...data } as GroupNodeData,
				dimensions: dimensions ?? structuredClone(basicShapeDimensions)
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

				case 'button':
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultFormFieldData, ...data } as FormFieldNodeData,
						dimensions: dimensions ?? { width: 100, height: 40 }
					} as DesignGraphNode;
				case 'checkbox':
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultFormFieldData, ...data } as FormFieldNodeData,
						dimensions: dimensions ?? { width: 30, height: 30 }
					} as DesignGraphNode;
				case NodeType.RadioGroup:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultFormFieldData, ...data } as FormFieldNodeData,
						dimensions: dimensions ?? { width: 150, height: 60 }
					} as DesignGraphNode;
				default:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultFormFieldData, ...data } as FormFieldNodeData,
						dimensions: dimensions ?? structuredClone(textFieldDimensions)
					} as DesignGraphNode;
			}
		case NodeCategory.DataDisplay:
			switch (rest.type) {
				case NodeType.Table:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultNodeData, ...data } as TableNodeData,
						dimensions: dimensions ?? {
							width: 400,
							height: 0
						},
						style: {
							width: 'max-content',
							height: 'max-content'
						}
					} as DesignGraphNode;
				case NodeType.Bitmap:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultNodeData, ...data } as BitmapNodeData,
						dimensions: dimensions ?? { width: 240, height: 160 }
					} as DesignGraphNode;
				case NodeType.LineChart:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultNodeData, ...data },
						dimensions: dimensions ?? { width: 400, height: 240 }
					} as DesignGraphNode;
				case NodeType.Sparkline:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultNodeData, ...data },
						dimensions: dimensions ?? { width: 160, height: 100 }
					} as DesignGraphNode;
				case NodeType.ScatterPlot:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultNodeData, ...data },
						dimensions: dimensions ?? { width: 400, height: 240 }
					} as DesignGraphNode;
				case NodeType.Iframe:
					return {
						...rest,
						id: generateNodeId(),
						dimensions: dimensions ?? { width: 640, height: 480 }
					} as DesignGraphNode;
				default:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultNodeData, ...data },
						dimensions: dimensions ?? { width: 200, height: 200 }
					} as DesignGraphNode;
			}
		case NodeCategory.Industrial:
			switch (rest.type) {
				default:
					return {
						...rest,
						id: generateNodeId(),
						data: { ...defaultNodeData, ...data } as BasicShapeNodeData,
						dimensions: dimensions ?? structuredClone(basicShapeDimensions)
					} as DesignGraphNode;
			}
		default:
			throw new Error(`Unknown node category: ${data?.category}`);
	}
};
