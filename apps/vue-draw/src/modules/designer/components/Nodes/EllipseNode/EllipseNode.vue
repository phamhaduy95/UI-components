<script setup lang="ts">
	import { computed } from 'vue';
	import { NodeResizer } from '@vue-flow/node-resizer';

	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { resizerHandleStyle, resizerLineStyle } from '@/modules/designer/constant/default';
	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';

	const DEFAULT_ELLIPSE_HEIGHT = 32;

	export type EllipseNodeProps = GenericCanvasNodeProps;

	const props = defineProps<EllipseNodeProps>();

	const nodeData = computed(() => props.data as BasicShapeNodeData);
</script>

<template>
	<GenericCanvasNode
		v-bind="props"
		:default-node-height="DEFAULT_ELLIPSE_HEIGHT"
	>
		<template #resizer="{ selected }">
			<NodeResizer
				:is-visible="selected"
				:line-style="resizerLineStyle"
				:handle-style="resizerHandleStyle"
				:min-width="24"
				:min-height="24"
			/>
		</template>
		<template #default="{ shapeHeight, shapeWidth }">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				:viewBox="`0 0 ${shapeWidth} ${shapeHeight}`"
				:fill="nodeData.fill"
				:stroke="nodeData.stroke"
				:stroke-width="nodeData.strokeWidth"
				stroke-linejoin="miter"
				overflow="visible"
				style="vector-effect: non-scaling-stroke"
			>
				<ellipse
					:cx="shapeWidth / 2"
					:cy="shapeHeight / 2"
					:rx="shapeWidth / 2"
					:ry="shapeHeight / 2"
				></ellipse>
			</svg>
		</template>
	</GenericCanvasNode>
</template>
