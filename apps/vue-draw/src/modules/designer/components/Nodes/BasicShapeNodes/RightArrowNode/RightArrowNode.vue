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

	export type RightArrowNodeProps = BaseCanvasNodeProps;

	const props = defineProps<RightArrowNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;
		const w2 = w / 2;
		const h4 = h / 4;

		return `polygon(0px ${h4}px, ${w2}px ${h4}px, ${w2}px 0px, ${w}px ${h / 2}px, ${w2}px ${h}px, ${w2}px ${h - h4}px, 0px ${h - h4}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;
		const w2 = w / 2;
		const h4 = h / 4;
		const slant = Math.sqrt(Math.pow(w2, 2) + Math.pow(h / 2, 2));

		const edges = [
			{ length: w2, pos: Position.Top },
			{ length: h4, pos: Position.Left },
			{ length: slant, pos: Position.Top },
			{ length: slant, pos: Position.Bottom },
			{ length: h4, pos: Position.Left },
			{ length: w2, pos: Position.Bottom },
			{ length: h / 2, pos: Position.Left }
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
					:points="`0 ${shapeHeight * 0.25} ${shapeWidth * 0.5} ${shapeHeight * 0.25} ${shapeWidth * 0.5} 0 ${shapeWidth} ${shapeHeight * 0.5} ${shapeWidth * 0.5} ${shapeHeight} ${shapeWidth * 0.5} ${shapeHeight * 0.75} 0 ${shapeHeight * 0.75}`"
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
