<script setup lang="ts">
import { type NodeProps } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
import type { NodeCustomData } from '@/modules/designer/types/Designer.type';
import { ref, computed } from 'vue';

export type HexagonNodeProps = NodeProps<NodeCustomData>;

const { selected, dimensions } = defineProps<HexagonNodeProps>();

const shapeWidth = ref(64);
const shapeHeight = ref(64);

const handleOnResize = () => {
	shapeWidth.value = dimensions.width;
	shapeHeight.value = dimensions.height;
};

const hexagonPoints = computed(() => {
	const w = shapeWidth.value;
	const h = shapeHeight.value;
	return `${w * 0.25} 0 ${w * 0.75} 0 ${w} ${h * 0.5} ${w * 0.75} ${h} ${w * 0.25} ${h} 0 ${h * 0.5}`;
});
</script>

<template>
	<div
		class="relative flex items-center justify-center overflow-visible rounded-none border border-dashed border-transparent bg-transparent"
		:style="{ width: `${shapeWidth}px`, height: `${shapeHeight}px` }"
	>
		<NodeResizer
			:is-visible="selected"
			:line-style="{ borderStyle: 'dashed' }"
			:min-width="24"
			:min-height="24"
			@resize="handleOnResize"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
			fill="none"
			stroke="currentColor"
			stroke-width="1"
			stroke-linejoin="miter"
			overflow="visible"
		>
			<polygon :points="hexagonPoints" style="vector-effect: non-scaling-stroke"></polygon>
		</svg>
	</div>
</template>
