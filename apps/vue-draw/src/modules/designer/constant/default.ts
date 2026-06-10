import type { CSSProperties } from 'vue';
import { type Dimensions } from '@vue-flow/core';

import {
	NodeCategory,
	type BasicShapeNodeData,
	type GroupNodeData,
	type TextNodeData,
	type FormFieldNodeData
} from '@/modules/designer/types/Node.type';
import type { EdgeData } from '@/modules/designer/types/Edge.type';

export const defaultNodeDimensions: Readonly<Dimensions> = {
	width: 64,
	height: 64
};

export const defaultBasicShapeNodeData: Readonly<BasicShapeNodeData> = {
	category: NodeCategory.BasicShape,
	rotation: 0,
	fill: '#ffffff',
	stroke: '#0d0d0d',
	strokeWidth: 1,
	borderRadius: 0
};

export const defaultGroupData: Readonly<GroupNodeData> = {
	category: NodeCategory.Group,
	rotation: 0,
	initialWidth: 200,
	initialHeight: 200
};

export const defaultTextData: Readonly<TextNodeData> = {
	category: NodeCategory.FormField,
	rotation: 0,
	content: 'Double click to edit',
	color: '#000000',
	fontSize: 16,
	fontWeight: 'normal',
	textAlign: 'center'
};

export const defaultFormFieldData: Readonly<FormFieldNodeData> = {
	category: NodeCategory.FormField,
	rotation: 0,
	placeholder: 'Enter text...',
	value: '',
	disabled: false,
	fill: '#ffffff',
	stroke: '#d1d5db',
	strokeWidth: 1,
	borderRadius: 4,
	color: '#000000',
	fontSize: 14
};

export const defaultEdgeData: Readonly<EdgeData> = {
	strokeColor: '#0d0d0d',
	strokeWidth: 1,
	lineType: 'solid',
	curve: 'smoothstep',
	markerStart: 'arrow',
	markerEnd: 'none',
	labelPosition: 'center',
	labelColor: '#000000',
	labelFontSize: 12,
	labelFontWeight: 'normal',
	labelFontStyle: 'normal'
};

export const resizerLineStyle: Readonly<CSSProperties> = {
	borderColor: '#6366F5',
	borderStyle: 'dashed',
	zIndex: 100
};

export const resizerHandleStyle: Readonly<CSSProperties> = {
	width: '8px',
	height: '8px',
	borderRadius: '999px',
	background: '#6366F5',
	zIndex: 100,
	border: 'none'
};
