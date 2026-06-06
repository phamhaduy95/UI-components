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

	export type StarNodeProps = BaseCanvasNodeProps;

	const props = defineProps<StarNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = props.dimensions.width! - 2;
		const h = props.dimensions.height! - 2;

		return `polygon(${w * 0.5}px 0px, ${w * 0.618}px ${h * 0.382}px, ${w}px ${h * 0.382}px, ${w * 0.691}px ${h * 0.618}px, ${w * 0.809}px ${h}px, ${w * 0.5}px ${h * 0.764}px, ${w * 0.191}px ${h}px, ${w * 0.309}px ${h * 0.618}px, 0px ${h * 0.382}px, ${w * 0.382}px ${h * 0.382}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	// the tip at very top is index zero
	const connectors = computed<ConnectorProps>(() => {
		const result: ConnectorProps = [];
		const totalPoints = 10;

		for (let i = 0; i < totalPoints; i++) {
			let position = Position.Top;
			if ([2, 3].includes(i)) {
				position = Position.Right;
			} else if ([4, 5, 6].includes(i)) {
				position = Position.Bottom;
			} else if ([7, 8].includes(i)) {
				position = Position.Left;
			}

			result.push({
				position,
				offsetDistance: i * 10 + '%'
			});
		}

		return result;
	});
</script>

<template>
	<BaseCanvasNode v-bind="props">
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
					:points="`${shapeWidth * 0.5} 0 ${shapeWidth * 0.618} ${shapeHeight * 0.382} ${shapeWidth} ${shapeHeight * 0.382} ${shapeWidth * 0.691} ${shapeHeight * 0.618} ${shapeWidth * 0.809} ${shapeHeight} ${shapeWidth * 0.5} ${shapeHeight * 0.764} ${shapeWidth * 0.191} ${shapeHeight} ${shapeWidth * 0.309} ${shapeHeight * 0.618} 0 ${shapeHeight * 0.382} ${shapeWidth * 0.382} ${shapeHeight * 0.382}`"
					style="vector-effect: non-scaling-stroke"
				></polygon>
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
