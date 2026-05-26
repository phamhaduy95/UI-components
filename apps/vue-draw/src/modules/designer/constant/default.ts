import type { CSSProperties } from 'vue';
import {
	NodeCategory,
	type BasicShapeNodeData,
	type GroupNodeData
} from '@/modules/designer/types/Designer.type';

export const defaultNodeData: BasicShapeNodeData = {
	category: NodeCategory.BasicShape,
	rotation: 0,
	fill: '#ffffff',
	stroke: '#0d0d0d',
	strokeWidth: 1,
	borderRadius: 0
};

export const defaultGroupData: GroupNodeData = {
	category: NodeCategory.Group,
	rotation: 0,
	initialWidth: 200,
	initialHeight: 200
};

export const resizerLineStyle: CSSProperties = {
	borderColor: '#6366F5',
	borderStyle: 'dashed'
};
export const resizerHandleStyle: CSSProperties = {
	width: '8px',
	height: '8px',
	borderRadius: '999px',
	background: '#6366F5',
	border: 'none'
};
