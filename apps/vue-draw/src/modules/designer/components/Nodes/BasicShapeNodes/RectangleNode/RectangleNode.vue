<script setup lang="ts">
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { computed } from 'vue';
	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';

	export type RectangleNodeProps = BaseCanvasNodeProps;

	const props = defineProps<RectangleNodeProps>();

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
			<rect
				x="0"
				y="0"
				:width="shapeWidth"
				:height="shapeHeight"
				style="vector-effect: non-scaling-stroke"
			></rect>
		</svg>
	</BaseCanvasNode>
</template>
