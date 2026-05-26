<script setup lang="ts">
	import { computed } from 'vue';
	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';

	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';

	export type CircleNodeProps = GenericCanvasNodeProps;

	const props = defineProps<CircleNodeProps>();

	const nodeData = computed(() => props.data as BasicShapeNodeData);
</script>

<template>
	<GenericCanvasNode
		v-bind="props"
		:keep-aspect-ratio="true"
	>
		<template #default="{ shapeHeight, shapeWidth }">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
				:fill="nodeData.fill"
				:stroke="nodeData.stroke"
				:stroke-width="nodeData.strokeWidth"
				overflow="visible"
			>
				<circle
					:cx="shapeWidth / 2"
					:cy="shapeHeight / 2"
					:r="Math.min(shapeWidth, shapeHeight) / 2"
					style="vector-effect: non-scaling-stroke"
				></circle>
			</svg>
		</template>
	</GenericCanvasNode>
</template>
