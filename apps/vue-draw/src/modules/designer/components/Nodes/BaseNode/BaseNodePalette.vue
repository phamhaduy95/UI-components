<script setup lang="ts">
	import { computed } from 'vue';

	import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';
	import { useDnD } from '@/modules/designer/composables/useDnD';
	import type { NodeCategory } from '@/modules/designer/types/Node.type';

	export interface BaseNodePaletteProps {
		id: string;
		category: NodeCategory;
		type: string;
		label: string;
	}

	const props = defineProps<BaseNodePaletteProps>();

	const { onPaletteDragStart } = useDnD();

	const IconComponent = computed(() => {
		const nodeConfig = nodeConfigMap[props.type];
		return nodeConfig?.paletteComponent;
	});
</script>

<template>
	<div
		class="tooltip-trigger flex h-8 w-8 aspect-square cursor-grab items-center justify-center border border-transparent bg-transparent transition-all duration-200 hover:bg-gray-50 active:cursor-grabbing"
		draggable="true"
		:title="label"
		@dragstart="(event) => onPaletteDragStart(event, { category, type })"
	>
		<slot name="icon">
			<component :is="IconComponent" />
		</slot>
	</div>
</template>
