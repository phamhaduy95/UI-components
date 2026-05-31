import { ref } from 'vue';
import { useVueFlow, type Dimensions } from '@vue-flow/core';
import type { OnResize, OnResizeStart } from '@vue-flow/node-resizer';

import { useHistory } from '@/modules/designer/composables/useHistory';
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';

import type { NodeUpdateEntry } from '@/modules/designer/types/Command.type';

export const useResize = (nodeId: string) => {
	const { commit } = useHistory();
	const { getSelectedNodes, updateNode } = useVueFlow();
	const { createUpdateNodesCommand } = useNodeCommandFactory();

	// Multi-node resize: capture before-state on start for all selected, scale in onResize, commit on end
	const resizeBefore = ref<Map<string, Dimensions>>(new Map());

	const onResizeStart = () => {
		const selectedNodes = getSelectedNodes.value;
		resizeBefore.value.clear();
		for (const node of selectedNodes) {
			resizeBefore.value.set(node.id, {
				width: node.dimensions.width,
				height: node.dimensions.height
			});
		}
	};

	const onResize = (event: OnResize) => {
		const { params } = event;
		const { width, height } = params;

		const before = resizeBefore.value.get(nodeId);
		if (!before) return;

		// Guard against division by zero
		const scaleX = width / (before.width || 1);
		const scaleY = height / (before.height || 1);

		for (const [id, before] of resizeBefore.value.entries()) {
			if (id === nodeId) continue;

			// Clamp minimum size to prevent SVG rendering bugs and round to nearest pixel
			const newWidth = Math.max(1, Math.round(before.width * scaleX));
			const newHeight = Math.max(1, Math.round(before.height * scaleY));

			updateNode(id, {
				style: { width: `${newWidth}px`, height: `${newHeight}px` },
				width: newWidth,
				height: newHeight
			});
		}
	};

	const onResizeEnd = (event: OnResizeStart) => {
		const { params } = event;
		const { width, height } = params;

		const beforeDimension = resizeBefore.value.get(nodeId);
		if (!beforeDimension) return;

		const entries: NodeUpdateEntry[] = [];
		const scaleX = width / (beforeDimension.width || 1);
		const scaleY = height / (beforeDimension.height || 1);

		for (const [id, before] of resizeBefore.value.entries()) {
			let newWidth = width;
			let newHeight = height;

			if (id !== nodeId) {
				newWidth = Math.max(1, Math.round(before.width * scaleX));
				newHeight = Math.max(1, Math.round(before.height * scaleY));
			}

			entries.push({
				nodeId: id,
				before: { dimensions: { ...before } },
				after: {
					dimensions: {
						width: newWidth,
						height: newHeight
					}
				}
			});
		}

		commit(createUpdateNodesCommand(entries));
		resizeBefore.value.clear();
	};

	return {
		onResizeStart,
		onResize,
		onResizeEnd
	};
};
