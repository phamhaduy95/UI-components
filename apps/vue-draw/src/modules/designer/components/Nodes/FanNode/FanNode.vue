<script setup lang="ts">
	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { computed } from 'vue';
	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';

	export type FanNodeProps = GenericCanvasNodeProps;

	const props = defineProps<FanNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);
</script>

<template>
	<GenericCanvasNode
		v-slot="{ shapeHeight, shapeWidth }"
		v-bind="props"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
			:stroke="nodeConfig.stroke"
			:stroke-width="nodeConfig.strokeWidth"
			:fill="nodeConfig.fill"
			stroke-linecap="round"
			stroke-linejoin="round"
			overflow="visible"
		>
			<rect
				:x="shapeWidth * 0.15"
				:y="shapeHeight * 0.15"
				:width="shapeWidth * 0.7"
				:height="shapeHeight * 0.7"
				:rx="Math.min(shapeWidth, shapeHeight) * 0.05"
				style="vector-effect: non-scaling-stroke"
			/>
			<circle
				:cx="shapeWidth * 0.5"
				:cy="shapeHeight * 0.5"
				:r="Math.min(shapeWidth, shapeHeight) * 0.3"
				style="vector-effect: non-scaling-stroke"
			/>
			<path
				:d="`M ${shapeWidth * 0.29} ${shapeHeight * 0.29} L ${shapeWidth * 0.71} ${shapeHeight * 0.71} M ${shapeWidth * 0.29} ${shapeHeight * 0.71} L ${shapeWidth * 0.71} ${shapeHeight * 0.29}`"
				style="vector-effect: non-scaling-stroke"
				fill="none"
			/>
		</svg>
	</GenericCanvasNode>
</template>
