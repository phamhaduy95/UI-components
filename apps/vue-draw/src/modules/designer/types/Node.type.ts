import type { GraphNode } from '@vue-flow/core';

export enum NodeCategory {
	BasicShape = 'basic-shape',
	Group = 'group',
	FormField = 'form-field',
	Industrial = 'industrial'
}

export enum NodeType {
	Rectangle = 'rectangle',
	Circle = 'circle',
	Ellipse = 'ellipse',
	Triangle = 'triangle',
	Hexagon = 'hexagon',
	Star = 'star',
	Text = 'text',
	TextField = 'textField',
	DatePicker = 'datePicker',
	Group = 'group',
	Fan = 'fan',
	Pump = 'pump',
	Tank = 'tank'
}

export interface TagData {
	id: string;
	label: string;
	value: string;
}

export interface BaseNodeData {
	category: NodeCategory;
	label?: string;
	tagId?: string;
	showTag?: boolean;
}

export interface BasicShapeNodeData extends BaseNodeData {
	category: NodeCategory.BasicShape;
	rotation: number;
	fill: string;
	stroke: string;
	strokeWidth: number;
	borderRadius: number;
}

export interface IndustrialNodeData extends BaseNodeData {
	category: NodeCategory.Industrial;
	rotation: number;
	fill: string;
	stroke: string;
	strokeWidth: number;
	borderRadius: number;
}

export interface GroupNodeData extends BaseNodeData {
	category: NodeCategory.Group;
	rotation: number;
	initialWidth: number;
	initialHeight: number;
}

export interface TextNodeData extends BaseNodeData {
	category: NodeCategory.FormField;
	rotation: number;
	content: string;
	color?: string;
	fontSize?: number;
	fontWeight?: string;
	textAlign?: 'left' | 'center' | 'right';
}

export interface FormFieldNodeData extends BaseNodeData {
	category: NodeCategory.FormField;
	rotation: number;
	placeholder: string;
	value: string;
	disabled?: boolean;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
	borderRadius?: number;
	color?: string;
	fontSize?: number;
}

export type DesignerNodeData =
	| BasicShapeNodeData
	| GroupNodeData
	| TextNodeData
	| IndustrialNodeData
	| FormFieldNodeData;

export type DesignerNode<T = DesignerNodeData> = Pick<
	Partial<GraphNode<T>>,
	| 'style'
	| 'width'
	| 'height'
	| 'parentNode'
	| 'position'
	| 'zIndex'
	| 'hidden'
	| 'dimensions'
	| 'data'
	| 'type'
	| 'id'
	| 'isParent'
	| 'selected'
> & {
	id: string;
};
