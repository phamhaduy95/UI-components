<script setup lang="ts">
import { computed } from 'vue';

import {
	GenericCanvasNode,
	type GenericCanvasNodeProps
} from '@/modules/designer/components/GenericNode';
import type { BasicShapeNodeData } from '@/modules/designer/types/Designer.type';

export type StarNodeProps = GenericCanvasNodeProps;

const props = defineProps<StarNodeProps>();

const nodeConfig = computed(() => props.data as BasicShapeNodeData);
</script>

<template>
	<GenericCanvasNode v-bind="props">
		<template #default="{ shapeHeight, shapeWidth }"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
				:stroke="nodeConfig.stroke"
				:stroke-width="nodeConfig.strokeWidth"
				:fill="nodeConfig.fill"
				stroke-linejoin="miter"
				overflow="visible"
			>
				<polygon
					:points="`${shapeWidth * 0.5} 0 ${shapeWidth * 0.63} ${shapeHeight * 0.35} ${shapeWidth} ${shapeHeight * 0.35} ${shapeWidth * 0.7} ${shapeHeight * 0.57} ${shapeWidth * 0.81} ${shapeHeight * 0.95} ${shapeWidth * 0.5} ${shapeHeight * 0.72} ${shapeWidth * 0.19} ${shapeHeight * 0.95} ${shapeWidth * 0.3} ${shapeHeight * 0.57} 0 ${shapeHeight * 0.35} ${shapeWidth * 0.37} ${shapeHeight * 0.35}`"
					style="vector-effect: non-scaling-stroke"
				></polygon>
			</svg>
		</template>
	</GenericCanvasNode>
</template>
