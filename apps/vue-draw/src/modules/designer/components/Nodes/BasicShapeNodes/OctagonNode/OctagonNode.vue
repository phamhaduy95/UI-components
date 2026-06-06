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

	export type OctagonNodeProps = BaseCanvasNodeProps;

	const props = defineProps<OctagonNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		return `polygon(${w * 0.293}px 0px, ${w * 0.707}px 0px, ${w}px ${h * 0.293}px, ${w}px ${h * 0.707}px, ${w * 0.707}px ${h}px, ${w * 0.293}px ${h}px, 0px ${h * 0.707}px, 0px ${h * 0.293}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		const len1 = w * 0.414;
		const len2 = Math.sqrt(Math.pow(w * 0.293, 2) + Math.pow(h * 0.293, 2));
		const len3 = h * 0.414;

		const edges = [
			{ length: len1, pos: Position.Top },
			{ length: len2, pos: Position.Right },
			{ length: len3, pos: Position.Right },
			{ length: len2, pos: Position.Bottom },
			{ length: len1, pos: Position.Bottom },
			{ length: len2, pos: Position.Left },
			{ length: len3, pos: Position.Left },
			{ length: len2, pos: Position.Top }
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
					:points="`${shapeWidth * 0.293} 0 ${shapeWidth * 0.707} 0 ${shapeWidth} ${shapeHeight * 0.293} ${shapeWidth} ${shapeHeight * 0.707} ${shapeWidth * 0.707} ${shapeHeight} ${shapeWidth * 0.293} ${shapeHeight} 0 ${shapeHeight * 0.707} 0 ${shapeHeight * 0.293}`"
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
