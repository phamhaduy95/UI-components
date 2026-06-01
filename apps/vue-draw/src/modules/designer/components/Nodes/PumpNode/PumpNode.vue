<script setup lang="ts">
	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { computed } from 'vue';
	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';

	export type PumpNodeProps = GenericCanvasNodeProps;

	const props = defineProps<PumpNodeProps>();

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
			<circle
				:cx="shapeWidth * 0.5"
				:cy="shapeHeight * 0.55"
				:r="Math.min(shapeWidth, shapeHeight) * 0.25"
				style="vector-effect: non-scaling-stroke"
			/>
			<path
				:d="`M ${shapeWidth * 0.5} ${shapeHeight * 0.3} L ${shapeWidth * 0.5} ${shapeHeight * 0.15} L ${shapeWidth * 0.75} ${shapeHeight * 0.15} L ${shapeWidth * 0.75} ${shapeHeight * 0.55}`"
				style="vector-effect: non-scaling-stroke"
				fill="none"
			/>
			<path
				:d="`M ${shapeWidth * 0.25} ${shapeHeight * 0.55} L ${shapeWidth * 0.1} ${shapeHeight * 0.55}`"
				style="vector-effect: non-scaling-stroke"
				fill="none"
			/>
			<path
				:d="`M ${shapeWidth * 0.35} ${shapeHeight * 0.8} L ${shapeWidth * 0.65} ${shapeHeight * 0.8}`"
				style="vector-effect: non-scaling-stroke"
				fill="none"
			/>
		</svg>
	</GenericCanvasNode>
</template>
