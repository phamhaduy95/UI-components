import type { GraphEdge, XYPosition } from '@vue-flow/core';

export interface EdgeData {
	strokeColor: string;
	strokeWidth: number;
	lineType: 'solid' | 'dashed' | 'dotted';
	curve?: 'smoothstep' | 'straight' | 'default';
	markerStart?: 'none' | 'arrow' | 'circle' | 'diamond';
	markerEnd?: 'none' | 'arrow' | 'circle' | 'diamond';
	labelPosition?: 'center' | 'top' | 'bottom';
	labelColor?: string;
	labelFontSize?: number;
	labelFontWeight?: 'normal' | 'bold';
	labelFontStyle?: 'normal' | 'italic';
	routingPoint?: XYPosition;
}

export type DesignerEdge = GraphEdge<EdgeData>;
