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

	export type NonagonNodeProps = BaseCanvasNodeProps;

	const props = defineProps<NonagonNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		return `polygon(${w * 0.5}px 0px, ${w * 0.826}px ${h * 0.121}px, ${w}px ${h * 0.426}px, ${w * 0.94}px ${h * 0.773}px, ${w * 0.674}px ${h}px, ${w * 0.326}px ${h}px, ${w * 0.06}px ${h * 0.773}px, 0px ${h * 0.426}px, ${w * 0.174}px ${h * 0.121}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		const len1 = Math.sqrt(Math.pow(w * 0.326, 2) + Math.pow(h * 0.121, 2));
		const len2 = Math.sqrt(Math.pow(w * 0.174, 2) + Math.pow(h * 0.305, 2));
		const len3 = Math.sqrt(Math.pow(w * 0.06, 2) + Math.pow(h * 0.347, 2));
		const len4 = Math.sqrt(Math.pow(w * 0.266, 2) + Math.pow(h * 0.227, 2));
		const len5 = w * 0.348;

		const edges = [
			{ length: len1, pos: Position.Right },
			{ length: len2, pos: Position.Right },
			{ length: len3, pos: Position.Right },
			{ length: len4, pos: Position.Right },
			{ length: len5, pos: Position.Bottom },
			{ length: len4, pos: Position.Left },
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
					:points="`${shapeWidth * 0.5} 0 ${shapeWidth * 0.826} ${shapeHeight * 0.121} ${shapeWidth} ${shapeHeight * 0.426} ${shapeWidth * 0.94} ${shapeHeight * 0.773} ${shapeWidth * 0.674} ${shapeHeight} ${shapeWidth * 0.326} ${shapeHeight} ${shapeWidth * 0.06} ${shapeHeight * 0.773} 0 ${shapeHeight * 0.426} ${shapeWidth * 0.174} ${shapeHeight * 0.121}`"
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
