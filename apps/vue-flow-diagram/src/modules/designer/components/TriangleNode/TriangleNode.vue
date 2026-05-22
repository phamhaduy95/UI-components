<script setup lang="ts">
import {
	GenericCanvasNode,
	type GenericCanvasNodeProps
} from '@/modules/designer/components/GenericNode';
import { computed } from 'vue';
import type { BasicShapeNodeData } from '@/modules/designer/types/Designer.type';

export type TriangleNodeProps = GenericCanvasNodeProps;

const props = defineProps<TriangleNodeProps>();

const nodeConfig = computed(() => props.data as BasicShapeNodeData);
</script>

<template>
	<GenericCanvasNode v-bind="props">
		<template #default="{ shapeHeight, shapeWidth }">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
				:stroke="nodeConfig.stroke"
				:stroke-width="nodeConfig.strokeWidth"
				:fill="nodeConfig.fill"
				stroke-linejoin="miter"
				overflow="visible"
			>
				<polygon
					:points="`${shapeWidth / 2} 0 0 ${shapeHeight} ${shapeWidth} ${shapeHeight}`"
					style="vector-effect: non-scaling-stroke"
				></polygon>
			</svg>
		</template>
	</GenericCanvasNode>
</template>
