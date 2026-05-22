<script setup lang="ts">
import { NodeResizer } from '@vue-flow/node-resizer';

import {
	GenericCanvasNode,
	type GenericCanvasNodeProps
} from '@/modules/designer/components/GenericNode';

import { resizerHandleStyle, resizerLineStyle } from '@/modules/designer/constant/default';
import type { BasicShapeNodeData } from '../../types/Designer.type';
import { computed } from 'vue';

export type CircleNodeProps = GenericCanvasNodeProps;

const props = defineProps<CircleNodeProps>();

const nodeData = computed(() => props.data as BasicShapeNodeData);
</script>

<template>
	<GenericCanvasNode v-bind="props">
		<template #resizer="{ selected }">
			<NodeResizer
				:is-visible="selected"
				:min-width="24"
				:min-height="24"
				:line-style="resizerLineStyle"
				:handle-style="resizerHandleStyle"
				:keep-aspect-ratio="true"
			/>
		</template>
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
