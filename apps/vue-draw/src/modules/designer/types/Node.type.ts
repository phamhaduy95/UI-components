import type { GraphNode, Node } from '@vue-flow/core';

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
	Diamond = 'diamond',
	Rhombus = 'rhombus',
	Trapezoid = 'trapezoid',
	Parallelogram = 'parallelogram',
	Cross = 'cross',
	RightArrow = 'rightArrow',
	LeftArrow = 'leftArrow',
	UpArrow = 'upArrow',
	DownArrow = 'downArrow',
	Pentagon = 'pentagon',
	Heptagon = 'heptagon',
	Octagon = 'octagon',
	Nonagon = 'nonagon',
	Square = 'square',
	Text = 'text',
	TextField = 'textField',
	DatePicker = 'datePicker',
	Select = 'select',
	Slider = 'slider',
	Button = 'button',
	Spinner = 'spinner',
	Checkbox = 'checkbox',
	RadioGroup = 'radioGroup',
	Table = 'table',
	Group = 'group',
	Fan = 'fan',
	Pump = 'pump',
	Tank = 'tank',
	Valve = 'valve',
	Motor = 'motor',
	Gauge = 'gauge'
}

export interface TagData {
	id: string;
	label: string;
	value: string;
}

export interface BaseNodeData {
	category: NodeCategory;
	label?: string;
	tagIds?: string[];
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

export interface TableNodeData extends BaseNodeData {
	category: NodeCategory.FormField;
	rotation: number;
}

export type DesignerNodeData =
	| BasicShapeNodeData
	| GroupNodeData
	| TextNodeData
	| IndustrialNodeData
	| FormFieldNodeData
	| TableNodeData;

export type DesignGraphNode<T = DesignerNodeData> = Pick<
	GraphNode<T>,
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
	| 'computedPosition'
>;

export type DesignNode<T = DesignerNodeData> = Node<T>;
