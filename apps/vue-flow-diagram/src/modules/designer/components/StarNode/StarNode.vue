<script setup lang="ts">
import { type NodeProps } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
import type { NodeCustomData } from '@/modules/designer/types/Designer.type';
import { ref, computed } from 'vue';

export type StarNodeProps = NodeProps<NodeCustomData>;

const { selected, dimensions } = defineProps<StarNodeProps>();

const shapeWidth = ref(64);
const shapeHeight = ref(64);

const handleOnResize = () => {
	shapeWidth.value = dimensions.width;
	shapeHeight.value = dimensions.height;
};

const starPoints = computed(() => {
	const w = shapeWidth.value;
	const h = shapeHeight.value;
	return `${w * 0.5} 0 ${w * 0.63} ${h * 0.35} ${w} ${h * 0.35} ${w * 0.7} ${h * 0.57} ${w * 0.81} ${h * 0.95} ${w * 0.5} ${h * 0.72} ${w * 0.19} ${h * 0.95} ${w * 0.3} ${h * 0.57} 0 ${h * 0.35} ${w * 0.37} ${h * 0.35}`;
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
			:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
			fill="none"
			stroke="currentColor"
			stroke-width="1"
			stroke-linejoin="miter"
			overflow="visible"
		>
			<polygon :points="starPoints" style="vector-effect: non-scaling-stroke"></polygon>
		</svg>
	</div>
</template>
