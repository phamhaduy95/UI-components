<script setup lang="ts">
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { computed } from 'vue';
	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';

	export type ArcNodeProps = BaseCanvasNodeProps;

	const props = defineProps<ArcNodeProps>();

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
			<path
				:d="`M 0 ${shapeHeight} A ${shapeWidth} ${shapeHeight} 0 0 1 ${shapeWidth} 0`"
				style="vector-effect: non-scaling-stroke"
			></path>
		</svg>
	</BaseCanvasNode>
</template>
