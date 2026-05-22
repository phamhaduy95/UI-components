<script setup lang="ts">
import { computed } from 'vue';
import {
	GenericCanvasNode,
	type GenericCanvasNodeProps
} from '@/modules/designer/components/GenericNode';
import type { BasicShapeNodeData } from '@/modules/designer/types/Designer.type';

export type HexagonNodeProps = GenericCanvasNodeProps;

const props = defineProps<HexagonNodeProps>();

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
					:points="`${shapeWidth * 0.25} 0 ${shapeWidth * 0.75} 0 ${shapeWidth} ${shapeHeight * 0.5} ${shapeWidth * 0.75} ${shapeHeight} ${shapeWidth * 0.25} ${shapeHeight} 0 ${shapeHeight * 0.5}`"
					style="vector-effect: non-scaling-stroke"
				></polygon>
			</svg>
		</template>
	</GenericCanvasNode>
</template>
