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

	export type HeptagonNodeProps = BaseCanvasNodeProps;

	const props = defineProps<HeptagonNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		return `polygon(${w * 0.5}px 0px, ${w * 0.901}px ${h * 0.198}px, ${w}px ${h * 0.643}px, ${w * 0.723}px ${h}px, ${w * 0.277}px ${h}px, 0px ${h * 0.643}px, ${w * 0.099}px ${h * 0.198}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		const len1 = Math.sqrt(Math.pow(w * 0.401, 2) + Math.pow(h * 0.198, 2));
		const len2 = Math.sqrt(Math.pow(w * 0.099, 2) + Math.pow(h * 0.445, 2));
		const len3 = Math.sqrt(Math.pow(w * 0.277, 2) + Math.pow(h * 0.357, 2));
		const len4 = w * 0.446;

		const edges = [
			{ length: len1, pos: Position.Right },
			{ length: len2, pos: Position.Right },
			{ length: len3, pos: Position.Right },
			{ length: len4, pos: Position.Bottom },
			{ length: len3, pos: Position.Left },
			{ length: len2, pos: Position.Left },
			{ length: len1, pos: Position.Left }
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
					:points="`${shapeWidth * 0.5} 0 ${shapeWidth * 0.901} ${shapeHeight * 0.198} ${shapeWidth} ${shapeHeight * 0.643} ${shapeWidth * 0.723} ${shapeHeight} ${shapeWidth * 0.277} ${shapeHeight} 0 ${shapeHeight * 0.643} ${shapeWidth * 0.099} ${shapeHeight * 0.198}`"
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
