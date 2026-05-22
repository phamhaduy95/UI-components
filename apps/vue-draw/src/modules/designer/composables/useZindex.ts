import { computed } from 'vue';
import { useVueFlow } from '@vue-flow/core';

export const useZindex = () => {
	const { getNodes, getSelectedNodes, updateNode } = useVueFlow();

	const canChangeZIndex = computed(() => getSelectedNodes.value.length > 0);

	const bringToFront = () => {
		const nodes = getNodes.value;
		const selected = getSelectedNodes.value;
		if (selected.length === 0) return;

		let maxZ = 0;
		nodes.forEach((node) => {
			if (!node.selected) {
				const z = typeof node.zIndex === 'number' ? node.zIndex : 0;
				if (z > maxZ) maxZ = z;
			}
		});

		// Maintain relative order of selected nodes if possible, or just stack them
		const sortedSelected = [...selected].sort((a, b) => {
			const aZ = typeof a.zIndex === 'number' ? a.zIndex : 0;
			const bZ = typeof b.zIndex === 'number' ? b.zIndex : 0;
			return aZ - bZ;
		});

		sortedSelected.forEach((node, index) => {
			updateNode(node.id, { zIndex: maxZ + index + 1 });
		});
	};

	const sendToBack = () => {
		const nodes = getNodes.value;
		const selected = getSelectedNodes.value;
		if (selected.length === 0) return;

		let minZ = 0;
		nodes.forEach((node) => {
			if (!node.selected) {
				const z = typeof node.zIndex === 'number' ? node.zIndex : 0;
				if (z < minZ) minZ = z;
			}
		});

		const sortedSelected = [...selected].sort((a, b) => {
			const aZ = typeof a.zIndex === 'number' ? a.zIndex : 0;
			const bZ = typeof b.zIndex === 'number' ? b.zIndex : 0;
			return aZ - bZ;
		});

		sortedSelected.forEach((node, index) => {
			// Lowest zIndex should be assigned to the one that was previously lowest
			updateNode(node.id, { zIndex: minZ - (sortedSelected.length - index) });
		});
	};

	return {
		bringToFront,
		sendToBack,
		canChangeZIndex
	};
};
