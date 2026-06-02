import type { GraphEdge } from '@vue-flow/core';

export type LineType = 'solid' | 'dashed' | 'dotted';
export type CurveType = 'smoothstep' | 'straight' | 'default';
export type MarkerType = 'none' | 'arrow' | 'circle' | 'diamond';
export type LabelPositionType = 'center' | 'top' | 'bottom';
export type LabelFontWeightType = 'normal' | 'bold';
export type LabelFontStyleType = 'normal' | 'italic';

export interface EdgeData {
	strokeColor: string;
	strokeWidth: number;
	lineType: LineType;
	curve: CurveType;
	markerStart: MarkerType;
	markerEnd: MarkerType;
	labelPosition: LabelPositionType;
	labelColor: string;
	labelFontSize: number;
	labelFontWeight: LabelFontWeightType;
	labelFontStyle: LabelFontStyleType;
}

export type DesignerEdge = GraphEdge<EdgeData>;
