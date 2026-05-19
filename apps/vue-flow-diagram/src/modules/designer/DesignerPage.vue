<script setup lang="ts">
import { VueFlow, useVueFlow, type Edge } from '@vue-flow/core';
import { DesignerToolbar, DesignerLeftPanel, DesignerRightPanel } from './layouts';
import { DesignerShapeNode } from './components';
import type { DesignerNode } from './types/Designer.type';

// We let vue-flow manage state of nodes and edges internally to reduce memory usage
const initialNodes: Array<DesignerNode> = [];
const initialEdges: Array<Edge> = [];

const { screenToFlowCoordinate, addNodes } = useVueFlow();

const handleAssetDrop = (event: DragEvent) => {
	event.preventDefault();
	if (!event.dataTransfer) return;

	const transeredMessage = event.dataTransfer.getData('application/vueflow');
	const object = JSON.parse(transeredMessage);

	const { type } = object;

	if (!type) return;

	const position = screenToFlowCoordinate({
		x: event.clientX,
		y: event.clientY
	});

	const nodeId = `dndnode_${crypto.randomUUID()}`;

	const newNode: DesignerNode = {
		id: nodeId,
		type: 'shape',
		position,
		data: { subType: type }
	};

	addNodes(newNode);
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
			<main class="relative flex-1" @drop="handleAssetDrop" @dragover.prevent>
				<VueFlow
					:nodes="initialNodes"
					:edges="initialEdges"
					class="vue-flow-wrapper bg-gray-50"
					:default-zoom="1"
					:min-zoom="0.2"
					:max-zoom="4"
				>
					<template #node-shape="props">
						<DesignerShapeNode v-bind="props" />
					</template>
				</VueFlow>
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
