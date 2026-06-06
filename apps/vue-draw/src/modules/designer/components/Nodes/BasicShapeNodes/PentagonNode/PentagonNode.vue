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

	export type PentagonNodeProps = BaseCanvasNodeProps;

	const props = defineProps<PentagonNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		return `polygon(${w * 0.5}px 0px, ${w}px ${h * 0.382}px, ${w * 0.809}px ${h}px, ${w * 0.191}px ${h}px, 0px ${h * 0.382}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		const edge1 = Math.sqrt(Math.pow(w * 0.5, 2) + Math.pow(h * 0.382, 2));
		const edge2 = Math.sqrt(Math.pow(w * (1 - 0.809), 2) + Math.pow(h * (1 - 0.382), 2));
		const edge3 = w * (0.809 - 0.191);

		const edges = [
			{ length: edge1, pos: Position.Right },
			{ length: edge2, pos: Position.Right },
			{ length: edge3, pos: Position.Bottom },
			{ length: edge2, pos: Position.Left },
			{ length: edge1, pos: Position.Left }
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
					:points="`${shapeWidth * 0.5} 0 ${shapeWidth} ${shapeHeight * 0.382} ${shapeWidth * 0.809} ${shapeHeight} ${shapeWidth * 0.191} ${shapeHeight} 0 ${shapeHeight * 0.382}`"
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
