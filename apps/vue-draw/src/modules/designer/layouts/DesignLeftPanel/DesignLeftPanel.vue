<script setup lang="ts">
	import { Tabs } from '@packages/vue-components';
	import NodeSelectionTab from './PaletteSelectionTab.vue';
	import TagTreeTab from './TagTreeTab.vue';
	import NodeListTab from './NodeListTab.vue';

	const tabItems = [
		{ value: 'assets', title: 'Assets' },
		{ value: 'nodes', title: 'Nodes' },
		{ value: 'tags', title: 'Tags' }
	];
</script>

<template>
	<aside
		class="z-10 flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
	>
		<Tabs
			class="flex-1 flex flex-col overflow-hidden"
			:items="tabItems"
			default-value="assets"
		>
			<template #content-assets>
				<NodeSelectionTab />
			</template>
			<template #content-nodes>
				<NodeListTab />
			</template>
			<template #content-tags>
				<TagTreeTab />
			</template>
		</Tabs>
	</aside>
</template>
