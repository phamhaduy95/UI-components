<script setup lang="ts">
import { VueFlow } from '@vue-flow/core';
import { shallowRef } from 'vue';

import DesignerToolbar from './DesignerToolbar.vue';
import DesignerLeftPanel from './DesignerLeftPanel.vue';
import DesignerRightPanel from './DesignerRightPanel.vue';

const nodes = shallowRef([
	{
		id: '1',
		type: 'input',
		label: 'Tank 1',
		position: { x: 250, y: 50 },
		style: { background: '#fff', border: '1px solid #777', borderRadius: '4px', padding: '10px' }
	}
]);

const edges = shallowRef([]);

const onDrop = (event: DragEvent) => {
	event.preventDefault();

	if (!event.dataTransfer) return;

	const type = event.dataTransfer.getData('application/vueflow');
	if (!type) return;
};
</script>

<template>
	<div class="flex h-full w-full flex-col overflow-hidden bg-gray-50">
		<!-- Top Toolbar -->
		<div
			class="z-10 flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm"
		>
			<DesignerToolbar />
		</div>

		<div class="flex flex-1 overflow-hidden">
			<!-- Left Panel: Asset Library -->
			<DesignerLeftPanel />

			<!-- Center Canvas -->
			<main class="relative flex-1" @drop="onDrop" @dragover.prevent>
				<VueFlow
					v-model:nodes="nodes"
					v-model:edges="edges"
					class="vue-flow-wrapper bg-gray-50"
					:default-zoom="1"
					:min-zoom="0.2"
					:max-zoom="4"
					fit-view-on-init
				/>
			</main>

			<!-- Right Panel: Properties -->
			<DesignerRightPanel />
		</div>
	</div>
</template>

<style scoped>
/* Optional custom CSS if Tailwind is not enough */
.tooltip-trigger {
	position: relative;
}
</style>
