import { ref } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import type { OnResize, OnResizeStart } from '@vue-flow/node-resizer';
import { useHistory } from '@/modules/designer/composables/useHistory';
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';

export const useResize = (nodeId: string) => {
	const { commit } = useHistory();
	const { findNode } = useVueFlow();
	const { createResizeNodesCommand } = useNodeCommandFactory();

	// Single-node resize: capture before-state on start, commit ResizeNodesCommand on end
	const resizeBefore = ref<{ width: string; height: string; x: number; y: number } | null>(null);

	const onResizeStart = () => {
		const node = findNode(nodeId);
		if (!node) return;
		resizeBefore.value = {
			width: `${node.dimensions.width}px`,
			height: `${node.dimensions.height}px`,
			x: node.position.x,
			y: node.position.y
		};
	};

	const onResizeEnd = (event: OnResizeStart) => {
		const { params } = event as unknown as OnResize;
		const { width, height } = params;
		if (!resizeBefore.value) return;
		const node = findNode(nodeId);
		commit(
			createResizeNodesCommand([
				{
					nodeId,
					beforeStyle: { width: resizeBefore.value.width, height: resizeBefore.value.height },
					afterStyle: { width: `${width}px`, height: `${height}px` },
					beforePosition: { x: resizeBefore.value.x, y: resizeBefore.value.y },
					...(node ? { afterPosition: { x: node.position.x, y: node.position.y } } : {})
				}
			])
		);
		resizeBefore.value = null;
	};

	return {
		onResizeStart,
		onResizeEnd
	};
};
