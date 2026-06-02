import { useVueFlow } from '@vue-flow/core';

import { useNodeCreation } from '@/modules/designer/composables/useNodeCreation';
import { generateNode } from '@/modules/designer/utils/node.utils';
import { useShapeSelectionDialog } from '@/modules/designer/composables/useShapeSelectionDialog';

import type { NodeCategory, TagData } from '@/modules/designer/types/Node.type';

interface NodeDragPayload {
	isTag?: false;
	category: NodeCategory;
	type: string;
}

interface TagDragPayload {
	isTag: true;
	tag: TagData;
}

export type DragPayload = NodeDragPayload | TagDragPayload;

export const useDnD = () => {
	const { screenToFlowCoordinate, findNode, updateNodeData } = useVueFlow();
	const { createNodes } = useNodeCreation();
	const { openShapeSelection: openShapeSelector } = useShapeSelectionDialog();

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

	const onTagDrop = (event: DragEvent, payload: TagDragPayload) => {
		const targetEl = document.elementFromPoint(event.clientX, event.clientY);
		const nodeEl = targetEl?.closest('.vue-flow__node');

		const position = screenToFlowCoordinate({
			x: event.clientX,
			y: event.clientY
		});

		if (!nodeEl) {
			openShapeSelector(event.clientX, event.clientY, position, payload.tag);
			return;
		}

		const nodeId = nodeEl.getAttribute('data-id');
		if (!nodeId) return;

		const node = findNode(nodeId);
		if (!node) return;

		updateNodeData(nodeId, {
			tagId: payload.tag.id
		});
		return;
	};

	const onPaletteDrop = (event: DragEvent) => {
		event.preventDefault();

		if (!event.dataTransfer) return;

		const payload: DragPayload = JSON.parse(event.dataTransfer.getData('application/vueflow'));

		if (!payload) return;

		if (payload.isTag) {
			return onTagDrop(event, payload);
		}

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
