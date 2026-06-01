<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { TextInput, VirtualList } from '@packages/vue-components';
	import { useVueFlow, type GraphNode } from '@vue-flow/core';

	const { nodes, removeSelectedNodes, getSelectedNodes, addSelectedNodes, fitView } = useVueFlow();

	const searchQuery = ref('');

	const getNodeLabel = (node: GraphNode) => {
		return node.data?.label ?? node.id;
	};

	const selectNode = (node: GraphNode) => {
		removeSelectedNodes(getSelectedNodes.value);
		addSelectedNodes([node]);
		fitView({ nodes: [node.id], duration: 100, maxZoom: 1 });
	};

	const filteredNodes = computed(() => {
		const query = searchQuery.value.toLowerCase().trim();
		if (!query) return nodes.value;

		return nodes.value.filter((node: GraphNode) => {
			const label = getNodeLabel(node).toLowerCase();
			return label.includes(query);
		});
	});
</script>

<template>
	<div class="flex flex-col h-full">
		<div class="border-b border-gray-100 px-4 py-3 shrink-0 flex flex-col gap-3">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-800">Node List</h2>
			<TextInput
				v-model="searchQuery"
				placeholder="Search nodes..."
				size="sm"
			/>
		</div>
		<VirtualList
			v-if="filteredNodes && filteredNodes.length > 0"
			class="p-4 flex-1 overflow-y-auto"
			:items="filteredNodes"
			:estimate-size="() => 46"
		>
			<template #itemContent="{ itemData: node }">
				<div
					class="flex items-center gap-2 p-2 bg-gray-50 border rounded cursor-pointer hover:bg-blue-50 transition-colors"
					:class="node.selected ? 'border-blue-500' : 'border-gray-200'"
					@click="selectNode(node)"
				>
					<span
						class="text-xs font-semibold text-gray-700 truncate"
						:title="getNodeLabel(node)"
					>
						{{ getNodeLabel(node) }}
					</span>
					<span class="text-[10px] text-gray-500 ml-auto whitespace-nowrap">{{ node.type }}</span>
				</div>
			</template>
		</VirtualList>
		<div
			v-else
			class="text-xs text-gray-500 text-center py-4"
		>
			No nodes found.
		</div>
	</div>
</template>
