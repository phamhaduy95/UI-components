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

	export type UpArrowNodeProps = BaseCanvasNodeProps;

	const props = defineProps<UpArrowNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;
		const w4 = w / 4;
		const h2 = h / 2;

		return `polygon(${w / 2}px 0px, ${w}px ${h2}px, ${w - w4}px ${h2}px, ${w - w4}px ${h}px, ${w4}px ${h}px, ${w4}px ${h2}px, 0px ${h2}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;
		const w2 = w / 2;
		const w4 = w / 4;
		const h2 = h / 2;
		const slant = Math.sqrt(Math.pow(w2, 2) + Math.pow(h2, 2));

		const edges = [
			{ length: slant, pos: Position.Right },
			{ length: w4, pos: Position.Right },
			{ length: h2, pos: Position.Right },
			{ length: w2, pos: Position.Bottom },
			{ length: h2, pos: Position.Left },
			{ length: w4, pos: Position.Left },
			{ length: slant, pos: Position.Left }
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
					:points="`${shapeWidth * 0.5} 0 ${shapeWidth} ${shapeHeight * 0.5} ${shapeWidth * 0.75} ${shapeHeight * 0.5} ${shapeWidth * 0.75} ${shapeHeight} ${shapeWidth * 0.25} ${shapeHeight} ${shapeWidth * 0.25} ${shapeHeight * 0.5} 0 ${shapeHeight * 0.5}`"
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
