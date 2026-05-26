import { useNodeCreation } from '@/modules/designer/composables/useNodeCreation';
import type { DesignerNode } from '@/modules/designer/types/Node.type';
import { useVueFlow, type XYPosition } from '@vue-flow/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useClipboardStore = defineStore('design-clipboard', () => {
	const savedNodes = ref<Array<DesignerNode>>([]);

	const { cloneNodes } = useNodeCreation();

	const saveNodes = (nodes: Array<DesignerNode>) => {
		savedNodes.value = cloneNodes(nodes);
	};

	const clear = () => {
		savedNodes.value = [];
	};

	const getSavedNodes = (): DesignerNode[] => {
		return savedNodes.value;
	};

	return {
		savedNodes,
		saveNodes,
		clear,
		getSavedNodes
	};
});

const DEFAULT_OFFSET: XYPosition = { x: 10, y: 10 };

export const useClipboard = () => {
	const store = useClipboardStore();
	const { getSelectedNodes } = useVueFlow();
	const { createNodes, removeNodes, cloneNodes } = useNodeCreation();

	const canCopy = computed(() => getSelectedNodes.value.length > 0);

	const canPaste = computed(() => store.savedNodes.length > 0);

	const saveNodes = () => {
		const selectedNodes = getSelectedNodes.value;
		store.saveNodes(selectedNodes);
	};

	const copyNodes = () => {
		saveNodes();
	};

	const cutNodes = () => {
		saveNodes();
		removeNodes(getSelectedNodes.value);
	};

	const pasteNodes = (args: { offset?: XYPosition; position?: XYPosition }) => {
		const offset = args.offset || DEFAULT_OFFSET;

		const nodesToPaste = store.getSavedNodes();
		if (nodesToPaste.length === 0) return;

		const newNodes: DesignerNode[] = cloneNodes(nodesToPaste);

		newNodes.forEach((node) => {
			if (args.position) {
				const minX = Math.min(...nodesToPaste.map((n) => n.position.x));
				const minY = Math.min(...nodesToPaste.map((n) => n.position.y));
				node.position.x += args.position.x - minX;
				node.position.y += args.position.y - minY;
			} else {
				node.position.x += offset.x;
				node.position.y += offset.y;
			}
		});

		createNodes(newNodes);
	};

	const clear = () => {
		store.clear();
	};

	return {
		savedNodes: store.savedNodes,
		copyNodes,
		cutNodes,
		clear,
		canCopy,
		canPaste,
		pasteNodes
	};
};
