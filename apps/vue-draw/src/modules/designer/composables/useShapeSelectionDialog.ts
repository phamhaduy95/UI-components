import { reactive } from 'vue';
import type { TagData } from '@/modules/designer/types/Node.type';
import type { XYPosition } from '@vue-flow/core';

interface ShapeSelectorState {
	visible: boolean;
	x: number;
	y: number;
	tag: TagData | null;
	flowPosition: XYPosition | null;
}

const state = reactive<ShapeSelectorState>({
	visible: false,
	x: 0,
	y: 0,
	tag: null,
	flowPosition: null
});

export const useShapeSelectionDialog = () => {
	const openShapeSelection = (x: number, y: number, flowPosition: XYPosition, tag: TagData) => {
		state.visible = true;
		state.x = x;
		state.y = y;
		state.flowPosition = flowPosition;
		state.tag = tag;
	};

	const closeShapeSelection = () => {
		state.visible = false;
		state.tag = null;
		state.flowPosition = null;
	};

	return {
		shapeSelectorState: state,
		openShapeSelection,
		closeShapeSelection
	};
};
