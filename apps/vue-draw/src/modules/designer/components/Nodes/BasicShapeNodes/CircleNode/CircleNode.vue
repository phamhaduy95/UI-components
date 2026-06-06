<script setup lang="ts">
	import { computed } from 'vue';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps,
		BaseNodeConnector,
		type BaseNodeConnectorProps
	} from '@/modules/designer/components/Nodes/BaseNode';

	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';
	import { Position } from '@vue-flow/core';

	export type CircleNodeProps = BaseCanvasNodeProps;

	const props = defineProps<CircleNodeProps>();

	const nodeData = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const width = props.dimensions.width! - 2;
		const height = props.dimensions.height! - 2;

		const radius = Math.min(width, height) / 2;

		return `circle(${radius}px at ${radius}px ${radius}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const TOTAL_CONNECTORS = 12;

	const connectors = computed<ConnectorProps>(() => {
		const radius = Math.min(props.dimensions.width! - 2, props.dimensions.height! - 2) / 2;
		const result: ConnectorProps = [];
		const circumference = Math.PI * radius * 2;

		for (let i = 0; i < TOTAL_CONNECTORS; i++) {
			let position = Position.Top;
			if ([11, 0, 1].includes(i)) {
				position = Position.Right;
			} else if (i >= 2 && i <= 5) {
				position = Position.Bottom;
			} else if (i >= 6 && i <= 8) {
				position = Position.Left;
			}

			const offsetDistance = (i * circumference) / TOTAL_CONNECTORS;
			result.push({
				position,
				offsetDistance: offsetDistance + 'px'
			});
		}

		return result;
	});
</script>

<template>
	<BaseCanvasNode
		v-bind="props"
		:keep-aspect-ratio="true"
		:keep-default-ratio="true"
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
					:id="`circle-${props.id}`"
					:cx="shapeWidth / 2"
					:cy="shapeHeight / 2"
					:r="Math.min(shapeWidth, shapeHeight) / 2"
					style="vector-effect: non-scaling-stroke"
				></circle>
			</svg>
		</template>
		<template #connector="connectorProps">
			<BaseNodeConnector
				:path="path"
				v-bind="connectorProps"
				:connectors="connectors"
				:is-node-selected="selected"
			/>
		</template>
	</BaseCanvasNode>
</template>
