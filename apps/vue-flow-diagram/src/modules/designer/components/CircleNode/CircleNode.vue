<script setup lang="ts">
import { type NodeProps } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
import { ref } from 'vue';

export type CircleNodeProps = NodeProps;

const { selected, dimensions } = defineProps<CircleNodeProps>();

const shapeWidth = ref(64);
const shapeHeight = ref(64);

const handleOnResize = () => {
	shapeWidth.value = dimensions.width;
	shapeHeight.value = dimensions.height;
};
</script>

<template>
	<div
		class="relative flex items-center justify-center overflow-visible rounded-none border border-dashed border-transparent bg-transparent"
		:style="{ width: `${shapeWidth}px`, height: `${shapeHeight}px` }"
	>
		<NodeResizer
			:is-visible="selected"
			:min-width="24"
			:min-height="24"
			:line-style="{ borderStyle: 'dashed' }"
			:keep-aspect-ratio="true"
			@resize="handleOnResize"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
			fill="none"
			stroke="currentColor"
			stroke-width="1"
			overflow="visible"
		>
			<circle
				:cx="shapeWidth / 2"
				:cy="shapeHeight / 2"
				:r="Math.min(shapeWidth, shapeHeight) / 2"
				style="vector-effect: non-scaling-stroke"
			></circle>
		</svg>
	</div>
</template>
