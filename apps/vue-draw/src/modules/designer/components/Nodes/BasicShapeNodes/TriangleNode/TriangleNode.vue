<script setup lang="ts">
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps,
		BaseNodeConnector,
		type BaseNodeConnectorProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { computed } from 'vue';
	import type { BasicShapeNodeData } from '@/modules/designer/types/Node.type';
	import { Position } from '@vue-flow/core';

	export type TriangleNodeProps = BaseCanvasNodeProps;

	const props = defineProps<TriangleNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		return `polygon(${w * 0.5}px 0px, 0px ${h}px, ${w}px ${h}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;

		const slantEdge = Math.sqrt(Math.pow(w * 0.5, 2) + Math.pow(h, 2));
		const bottomEdge = w;

		const edges = [
			{ length: slantEdge }, // Top to Bottom-Left
			{ length: bottomEdge }, // Bottom-Left to Bottom-Right
			{ length: slantEdge } // Bottom-Right to Top
		];

		const result: ConnectorProps = [];
		const pointsPerEdge = 4; // 12 total points

		let currentOffset = 0;
		let index = 0;

		edges.forEach((edge) => {
			for (let i = 0; i < pointsPerEdge; i++) {
				let position = Position.Top;
				if ([1, 2, 3, 4].includes(index)) {
					position = Position.Left;
				} else if ([5, 6, 7].includes(index)) {
					position = Position.Bottom;
				} else if ([8, 9, 10, 11].includes(index)) {
					position = Position.Right;
				}

				result.push({
					position,
					offsetDistance: currentOffset + (edge.length / pointsPerEdge) * i + 'px'
				});
				index++;
			}
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
					:points="`${shapeWidth / 2} 0 0 ${shapeHeight} ${shapeWidth} ${shapeHeight}`"
					style="vector-effect: non-scaling-stroke"
				></polygon>
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
