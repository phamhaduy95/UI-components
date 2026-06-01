import { useNodeCreation } from '@/modules/designer/composables/useNodeCreation';
import { NodeCategory, type DesignGraphNode } from '@/modules/designer/types/Node.type';
import { useVueFlow, type XYPosition } from '@vue-flow/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useClipboardStore = defineStore('design-clipboard', () => {
	const savedNodes = ref<Array<DesignGraphNode>>([]);

	const { cloneNodes } = useNodeCreation();

	const saveNodes = (nodes: Array<DesignGraphNode>) => {
		savedNodes.value = cloneNodes(nodes);
	};

	const clear = () => {
		savedNodes.value = [];
	};

	const getSavedNodes = () => {
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
	const { getSelectedNodes, getNodes } = useVueFlow();
	const { createNodes, removeNodes, cloneNodes } = useNodeCreation();

	const canCopy = computed(() => getSelectedNodes.value.length > 0);

	const canPaste = computed(() => store.savedNodes.length > 0);

	const saveNodes = () => {
		const selectedNodes = getSelectedNodes.value as DesignGraphNode[];

		const allNodes = getNodes.value as DesignGraphNode[];

		const nodesToSaveMap = new Map<string, DesignGraphNode>();

		selectedNodes.forEach((node) => {
			nodesToSaveMap.set(node.id, node);
			if (node.data.category === NodeCategory.Group) {
				const children = allNodes.filter((n) => n.parentNode === node.id);

				children.forEach((child) => {
					nodesToSaveMap.set(child.id, child);
				});
			}
		});

		store.saveNodes(Array.from(nodesToSaveMap.values()));
	};

	const copyNodes = () => {
		saveNodes();
	};

	const cutNodes = () => {
		saveNodes();
		removeNodes(getSelectedNodes.value);
	};

	const pasteNodes = (args: { offset?: XYPosition; position?: XYPosition }) => {
		const nodesToPaste = store.getSavedNodes();
		if (nodesToPaste.length === 0) return;

		const newNodes: DesignGraphNode[] = cloneNodes(nodesToPaste) as DesignGraphNode[];

		let deltaX = 0;
		let deltaY = 0;

		if (args.position) {
			const minX = Math.min(...nodesToPaste.map((n) => n.position.x));
			const minY = Math.min(...nodesToPaste.map((n) => n.position.y));
			deltaX = args.position.x - minX;
			deltaY = args.position.y - minY;
		} else {
			const offset = args.offset || DEFAULT_OFFSET;
			deltaX = offset.x;
			deltaY = offset.y;
		}

		newNodes.forEach((node) => {
			node.position.x += deltaX;
			node.position.y += deltaY;
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
