<script setup lang="ts">
	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { computed } from 'vue';
	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';

	export type TankNodeProps = GenericCanvasNodeProps;

	const props = defineProps<TankNodeProps>();

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
				:x="shapeWidth * 0.2"
				:y="shapeHeight * 0.1"
				:width="shapeWidth * 0.6"
				:height="shapeHeight * 0.75"
				:rx="Math.min(shapeWidth, shapeHeight) * 0.15"
				style="vector-effect: non-scaling-stroke"
			/>
			<path
				:d="`M ${shapeWidth * 0.35} ${shapeHeight * 0.85} L ${shapeWidth * 0.35} ${shapeHeight * 0.95} M ${shapeWidth * 0.65} ${shapeHeight * 0.85} L ${shapeWidth * 0.65} ${shapeHeight * 0.95}`"
				style="vector-effect: non-scaling-stroke"
				fill="none"
			/>
		</svg>
	</GenericCanvasNode>
</template>
