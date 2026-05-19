<script setup lang="ts">
import { type NodeProps } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';

import type { NodeCustomData } from '@/modules/designer/types/Designer.type';
import { ref } from 'vue';

export type RectangleNodeProps = NodeProps<NodeCustomData>;

const { selected, dimensions } = defineProps<RectangleNodeProps>();

const recWidth = ref(64);
const recHeight = ref(64);

const handleOnResize = () => {
	recWidth.value = dimensions.width;
	recHeight.value = dimensions.height;
};
</script>

<template>
	<div
		class="relative flex items-center justify-center overflow-visible rounded-none border border-dashed border-transparent bg-transparent"
		:style="{ width: `${recWidth}px`, height: `${recHeight}px` }"
	>
		<NodeResizer
			:is-visible="selected"
			:line-style="{ borderStyle: 'dashed' }"
			@resize="handleOnResize"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			:viewBox="`0 0 ${recWidth} ${recHeight}`"
			fill="none"
			stroke="currentColor"
			stroke-width="1"
			stroke-linejoin="miter"
			overflow="visible"
		>
			<rect
				x="0"
				y="0"
				:width="recWidth"
				:height="recHeight"
				style="vector-effect: non-scaling-stroke"
			></rect>
		</svg>
	</div>
</template>
