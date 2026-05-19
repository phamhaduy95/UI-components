<script setup lang="ts">
import { computed, toRaw } from 'vue';

import { nodeConfigMap } from '@modules/designer/configs/nodeConfig';

export interface DesignerAssetItem {
	id: string;
	type: string;
	label: string;
}

const props = defineProps<DesignerAssetItem>();

const onDragStart = (event: DragEvent) => {
	const element = event.target as HTMLDivElement;
	const rect = element.getBoundingClientRect();

	const ratios = {
		x: parseFloat((event.offsetX / rect.width).toFixed(2)),
		y: parseFloat((event.offsetY / rect.height).toFixed(2))
	};

	if (event.dataTransfer) {
		event.dataTransfer.setData(
			'application/vueflow',
			JSON.stringify({ type: toRaw(props.type), ratios })
		);
		event.dataTransfer.effectAllowed = 'move';
	}
};

const iconComponent = computed(() => {
	const config = nodeConfigMap[props.type];
	return config?.iconComponent;
});
</script>

<template>
	<div
		class="tooltip-trigger flex aspect-square cursor-grab items-center justify-center border border-transparent bg-transparent p-2.5 text-gray-500 transition-all duration-200 hover:text-gray-900 active:cursor-grabbing"
		draggable="true"
		@dragstart="onDragStart"
		:title="label"
	>
		<component :is="iconComponent" />
	</div>
</template>
