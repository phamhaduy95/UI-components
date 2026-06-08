<script setup lang="ts">
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { computed } from 'vue';
	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';

	export type PolylineNodeProps = BaseCanvasNodeProps;

	const props = defineProps<PolylineNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);
</script>

<template>
	<BaseCanvasNode
		v-slot="{ shapeHeight, shapeWidth }"
		v-bind="props"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
			:stroke="nodeConfig.stroke"
			:stroke-width="nodeConfig.strokeWidth"
			:fill="nodeConfig.fill"
			stroke-linejoin="miter"
			overflow="visible"
		>
			<polyline
				:points="`0,${shapeHeight} ${shapeWidth * 0.4},${shapeHeight * 0.4} ${shapeWidth * 0.7},${shapeHeight * 0.8} ${shapeWidth},0`"
				style="vector-effect: non-scaling-stroke"
			></polyline>
		</svg>
	</BaseCanvasNode>
</template>
