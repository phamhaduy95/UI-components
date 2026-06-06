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

	export type CrossNodeProps = BaseCanvasNodeProps;

	const props = defineProps<CrossNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;
		const w3 = w / 3;
		const h3 = h / 3;

		return `polygon(${w3}px 0px, ${w3 * 2}px 0px, ${w3 * 2}px ${h3}px, ${w}px ${h3}px, ${w}px ${h3 * 2}px, ${w3 * 2}px ${h3 * 2}px, ${w3 * 2}px ${h}px, ${w3}px ${h}px, ${w3}px ${h3 * 2}px, 0px ${h3 * 2}px, 0px ${h3}px, ${w3}px ${h3}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;
		const w3 = w / 3;
		const h3 = h / 3;

		const edges = [
			{ length: w3, pos: Position.Top },
			{ length: h3, pos: Position.Right },
			{ length: w3, pos: Position.Top },
			{ length: h3, pos: Position.Right },
			{ length: w3, pos: Position.Bottom },
			{ length: h3, pos: Position.Right },
			{ length: w3, pos: Position.Bottom },
			{ length: h3, pos: Position.Left },
			{ length: w3, pos: Position.Bottom },
			{ length: h3, pos: Position.Left },
			{ length: w3, pos: Position.Top },
			{ length: h3, pos: Position.Left }
		];

		const result: ConnectorProps = [];
		let currentOffset = 0;

		edges.forEach((edge) => {
			result.push({
				position: edge.pos,
				offsetDistance: currentOffset + edge.length / 2 + 'px'
			});
			currentOffset += edge.length;
		});

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
					:points="`${shapeWidth / 3} 0 ${(shapeWidth * 2) / 3} 0 ${(shapeWidth * 2) / 3} ${shapeHeight / 3} ${shapeWidth} ${shapeHeight / 3} ${shapeWidth} ${(shapeHeight * 2) / 3} ${(shapeWidth * 2) / 3} ${(shapeHeight * 2) / 3} ${(shapeWidth * 2) / 3} ${shapeHeight} ${shapeWidth / 3} ${shapeHeight} ${shapeWidth / 3} ${(shapeHeight * 2) / 3} 0 ${(shapeHeight * 2) / 3} 0 ${shapeHeight / 3} ${shapeWidth / 3} ${shapeHeight / 3}`"
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
