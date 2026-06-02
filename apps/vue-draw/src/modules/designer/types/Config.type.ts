export type GridVariant = 'dots' | 'lines';
export interface CanvasConfig {
	gridVisible: boolean;
	snapToGrid: boolean;
	gridVariant: GridVariant;
	gridGap: number;
	gridSize: number;
	gridPatternColor: string;
}
