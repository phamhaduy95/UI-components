<script setup lang="ts">
import { type NodeProps } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';
import type { NodeCustomData } from '@/modules/designer/types/Designer.type';
import { ref } from 'vue';

export type EllipseNodeProps = NodeProps<NodeCustomData>;

const { selected, dimensions } = defineProps<EllipseNodeProps>();

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
			style="vector-effect: non-scaling-stroke"
		>
			<ellipse
				:cx="shapeWidth / 2"
				:cy="shapeHeight / 2"
				:rx="shapeWidth / 2"
				:ry="shapeHeight / 2"
			></ellipse>
		</svg>
	</div>
</template>
