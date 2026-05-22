import { computed, ref, toRaw } from 'vue';
import { defineStore } from 'pinia';
import { useVueFlow } from '@vue-flow/core';
import type { DesignerNode } from '@/modules/designer/types/Designer.type';
import { generateNodeId } from '@/modules/designer/utils/node.utils';

const useClipboardStore = defineStore('design-clipboard', () => {
	const savedNodes = ref<Array<DesignerNode>>([]);

	const saveNodes = (nodes: Array<DesignerNode>) => {
		savedNodes.value = nodes.map((node) => {
			return {
				id: node.id,
				type: node.type,
				position: node.position,
				data: structuredClone(toRaw(node.data)),
				style: structuredClone(toRaw(node.style)),
				zIndex: node.zIndex,
				parentNode: node.parentNode,
				hidden: node.hidden,
				height: node.height,
				width: node.width
			};
		});
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

export const useClipboard = () => {
	const store = useClipboardStore();
	const { getSelectedNodes, removeNodes, addNodes } = useVueFlow();

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

	const pasteNodes = (args: { position: { x: number; y: number } }) => {
		const { position } = args;

		const nodesToPaste = store.getSavedNodes();
		if (nodesToPaste.length === 0) return;

		const newNodes: DesignerNode[] = nodesToPaste.map((node) => {
			return {
				id: generateNodeId(),
				type: node.type,
				position: {
					x: position.x + (node.position.x - position.x),
					y: position.y + (node.position.y - position.y)
				},
				data: structuredClone(toRaw(node.data)),
				style: structuredClone(toRaw(node.style)),
				parentNode: node.parentNode,
				zIndex: node.zIndex,
				height: node.height,
				width: node.width,
				hidden: node.hidden
			};
		});

		addNodes(newNodes);
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
