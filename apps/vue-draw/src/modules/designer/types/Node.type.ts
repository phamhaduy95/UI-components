import type { Dimensions, GraphNode, Node } from '@vue-flow/core';
import type { Component } from 'vue';

export enum NodeCategory {
	BasicShape = 'basic-shape',
	Group = 'group',
	FormField = 'form-field',
	Industrial = 'industrial',
	DataDisplay = 'data-display'
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
	TextArea = 'textArea',
	DatePicker = 'datePicker',
	Select = 'select',
	Slider = 'slider',
	Button = 'button',
	Spinner = 'spinner',
	Checkbox = 'checkbox',
	RadioGroup = 'radioGroup',
	ProgressBar = 'progressBar',
	Table = 'table',
	Group = 'group',
	Fan = 'fan',
	Pump = 'pump',
	Tank = 'tank',
	Valve = 'valve',
	Motor = 'motor',
	Gauge = 'gauge',
	Bitmap = 'bitmap',
	LineChart = 'lineChart',
	Sparkline = 'sparkline',
	ScatterPlot = 'scatterPlot',
	Line = 'line',
	Polyline = 'polyline',
	Curve = 'curve',
	Arc = 'arc',
	Iframe = 'iframe'
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
	rotation: number;
}

export interface BasicShapeNodeData extends BaseNodeData {
	category: NodeCategory.BasicShape;
	fill: string;
	stroke: string;
	strokeWidth: number;
	borderRadius: number;
}

export interface IndustrialNodeData extends BaseNodeData {
	category: NodeCategory.Industrial;
	fill: string;
	stroke: string;
	strokeWidth: number;
	borderRadius: number;
}

export interface GroupNodeData extends BaseNodeData {
	category: NodeCategory.Group;
	initialWidth: number;
	initialHeight: number;
}

export interface IframeNodeData extends BaseNodeData {
	src?: string;
}

export interface TextNodeData extends BaseNodeData {
	category: NodeCategory.FormField;
	content: string;
	color?: string;
	fontSize?: number;
	fontWeight?: string;
	textAlign?: 'left' | 'center' | 'right';
}

export interface FormFieldNodeData extends BaseNodeData {
	category: NodeCategory.FormField;
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
	category: NodeCategory.DataDisplay;
	rotation: number;
}

export interface BitmapNodeData extends BaseNodeData {
	category: NodeCategory.DataDisplay;
	imageUrl?: string;
	borderRadius?: number;
}

export type DesignGraphNode<T extends BaseNodeData = BaseNodeData> = Pick<
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

export type DesignNode<T extends BaseNodeData = BaseNodeData> = Node<T>;

export type GenerateNodeArg<T extends BaseNodeData = BaseNodeData> = Omit<
	Partial<DesignGraphNode<T>>,
	'id' | 'data' | 'dimensions'
> & {
	dimensions?: Dimensions;
	data?: Partial<T>;
};

export type NodeConfiguration<T extends BaseNodeData = BaseNodeData> = {
	id: string;
	category: NodeCategory;
	type: string;
	label: string;
	paletteComponent?: Component;
	nodeComponent: Component;
	createNode: (arg: GenerateNodeArg<T>) => DesignGraphNode<T>;
};
