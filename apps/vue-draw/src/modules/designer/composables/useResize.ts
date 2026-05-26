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

		const beforeA = resizeBefore.value.get(nodeId);
		if (!beforeA) return;

		const scaleX = width / beforeA.width;
		const scaleY = height / beforeA.height;

		for (const [id, before] of resizeBefore.value.entries()) {
			if (id === nodeId) continue;

			const newWidth = before.width * scaleX;
			const newHeight = before.height * scaleY;

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
		const scaleX = width / beforeDimension.width;
		const scaleY = height / beforeDimension.height;

		for (const [id, before] of resizeBefore.value.entries()) {
			let newWidth = width;
			let newHeight = height;

			if (id !== nodeId) {
				newWidth = Math.max(1, before.width * scaleX);
				newHeight = Math.max(1, before.height * scaleY);
			}

			entries.push({
				nodeId: id,
				before: { dimensions: beforeDimension },
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
