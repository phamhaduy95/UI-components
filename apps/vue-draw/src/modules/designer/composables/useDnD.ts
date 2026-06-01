import { useVueFlow } from '@vue-flow/core';

import { useNodeCreation } from '@/modules/designer/composables/useNodeCreation';
import { generateNode } from '@/modules/designer/utils/node.utils';

import type { NodeCategory } from '@/modules/designer/types/Node.type';

interface DragPayload {
	category: NodeCategory;
	type: string;
}

export const useDnD = () => {
	const { screenToFlowCoordinate } = useVueFlow();
	const { createNodes } = useNodeCreation();

	const onPaletteDragStart = (event: DragEvent, payload: DragPayload) => {
		if (event.dataTransfer) {
			event.dataTransfer.setData('application/vueflow', JSON.stringify(payload));
			event.dataTransfer.effectAllowed = 'move';
		}
	};

	const onPaletteDragOver = (event: DragEvent) => {
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	};

	const onPaletteDrop = (event: DragEvent) => {
		event.preventDefault();

		if (!event.dataTransfer) return;

		const payload: DragPayload = JSON.parse(event.dataTransfer.getData('application/vueflow'));

		if (!payload) return;

		const position = screenToFlowCoordinate({
			x: event.clientX,
			y: event.clientY
		});

		const node = generateNode({
			type: payload.type,
			position,
			data: {
				category: payload.category
			}
		});

		createNodes([node]);
	};

	return {
		onPaletteDrop,
		onPaletteDragStart,
		onPaletteDragOver
	};
};
