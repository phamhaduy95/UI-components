<script setup lang="ts">
import {
	GenericCanvasNode,
	type GenericCanvasNodeProps
} from '@/modules/designer/components/GenericNode';
import { computed } from 'vue';
import type { BasicShapeNodeData } from '../../types/Designer.type';

export type RectangleNodeProps = GenericCanvasNodeProps;

const props = defineProps<RectangleNodeProps>();

const nodeConfig = computed(() => props.data as BasicShapeNodeData);
</script>

<template>
	<GenericCanvasNode v-bind="props" v-slot="{ shapeHeight, shapeWidth }">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
			:stroke="nodeConfig.stroke"
			:stroke-width="nodeConfig.strokeWidth"
			:fill="nodeConfig.fill"
			stroke-linejoin="miter"
			overflow="visible"
		>
			<rect
				x="0"
				y="0"
				:width="shapeWidth"
				:height="shapeHeight"
				style="vector-effect: non-scaling-stroke"
			></rect>
		</svg>
	</GenericCanvasNode>
</template>
