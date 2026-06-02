<script setup lang="ts">
	import { computed } from 'vue';

	import { nodeConfigMap } from '@/modules/designer/constant/nodeConfig';
	import { useDnD } from '@/modules/designer/composables/useDnD';
	import type { NodeCategory } from '@/modules/designer/types/Node.type';

	export interface GenericNodePaletteProps {
		id: string;
		category: NodeCategory;
		type: string;
		label: string;
	}

	const props = defineProps<GenericNodePaletteProps>();

	const { onPaletteDragStart } = useDnD();

	const IconComponent = computed(() => {
		const nodeConfig = nodeConfigMap[props.type];
		return nodeConfig?.paletteComponent;
	});
</script>

<template>
	<div
		class="tooltip-trigger flex aspect-square cursor-grab items-center justify-center border border-transparent bg-transparent p-1 text-gray-500 transition-all duration-200 hover:text-gray-900 active:cursor-grabbing"
		draggable="true"
		:title="label"
		@dragstart="(event) => onPaletteDragStart(event, { category, type })"
	>
		<slot name="icon">
			<component :is="IconComponent" />
		</slot>
	</div>
</template>
