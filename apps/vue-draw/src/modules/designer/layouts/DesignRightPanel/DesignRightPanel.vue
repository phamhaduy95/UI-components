<script setup lang="ts">
	import { useVueFlow } from '@vue-flow/core';
	import { computed } from 'vue';

	import NodePropertiesPanel from './NodePropertiesPanel.vue';
	import EdgePropertiesPanel from './EdgePropertiesPanel.vue';
	import CanvasPropertiesPanel from './CanvasPropertiesPanel.vue';

	const { getSelectedNodes, getSelectedEdges } = useVueFlow();

	const selectedNode = computed(() => {
		const selected = getSelectedNodes.value;
		return selected.length === 1 ? selected[0] : null;
	});

	const selectedEdge = computed(() => {
		const selected = getSelectedEdges.value;
		return selected.length === 1 ? selected[0] : null;
	});
</script>

<template>
	<aside
		class="w-64 z-10 flex shrink-0 flex-col border-l border-gray-200 bg-white shadow-[-2px_0_5px_rgba(0,0,0,0.02)]"
	>
		<NodePropertiesPanel v-if="selectedNode" />
		<EdgePropertiesPanel v-else-if="selectedEdge" />
		<CanvasPropertiesPanel v-else />
	</aside>
</template>
