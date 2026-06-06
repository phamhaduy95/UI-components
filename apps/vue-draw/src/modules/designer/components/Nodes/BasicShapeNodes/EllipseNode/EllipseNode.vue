<script setup lang="ts">
	import { computed } from 'vue';
	import { NodeResizer } from '@vue-flow/node-resizer';

	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps,
		BaseNodeConnector,
		type BaseNodeConnectorProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { resizerHandleStyle, resizerLineStyle } from '@/modules/designer/constant/default';
	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';
	import { Position } from '@vue-flow/core';

	const DEFAULT_ELLIPSE_HEIGHT = 50;

	export type EllipseNodeProps = BaseCanvasNodeProps;

	const props = defineProps<EllipseNodeProps>();

	const nodeData = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const width = props.dimensions.width! - 2;
		const height = (props.dimensions.height || DEFAULT_ELLIPSE_HEIGHT) - 2;

		const rx = width / 2;
		const ry = height / 2;

		return `ellipse(${rx}px ${ry}px at ${rx}px ${ry}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const result: ConnectorProps = [];
		const totalPoints = 16;

		for (let i = 0; i < totalPoints; i++) {
			let position = Position.Top;
			if ([14, 15, 0, 1].includes(i)) {
				position = Position.Right;
			} else if (i >= 2 && i <= 5) {
				position = Position.Bottom;
			} else if (i >= 6 && i <= 9) {
				position = Position.Left;
			}

			result.push({
				position,
				offsetDistance: (i * 100) / totalPoints + '%'
			});
		}

		return result;
	});
</script>

<template>
	<BaseCanvasNode
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
		<template #connector="connectorProps">
			<BaseNodeConnector
				:path="path"
				v-bind="connectorProps"
				:connectors="connectors"
			/>
		</template>
	</BaseCanvasNode>
</template>
