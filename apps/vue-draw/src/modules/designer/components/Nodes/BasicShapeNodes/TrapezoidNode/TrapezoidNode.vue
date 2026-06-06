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

	export type TrapezoidNodeProps = BaseCanvasNodeProps;

	const props = defineProps<TrapezoidNodeProps>();

	const nodeConfig = computed(() => props.data as BasicShapeNodeData);

	const path = computed(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;
		const offset = w * 0.25;

		return `polygon(${offset}px 0px, ${w - offset}px 0px, ${w}px ${h}px, 0px ${h}px)`;
	});

	type ConnectorProps = BaseNodeConnectorProps['connectors'];

	const connectors = computed<ConnectorProps>(() => {
		const w = (props.dimensions.width || 50) - 2;
		const h = (props.dimensions.height || 50) - 2;
		const offset = w * 0.25;

		const topEdge = w - 2 * offset;
		const bottomEdge = w;
		const slantedEdge = Math.sqrt(Math.pow(offset, 2) + Math.pow(h, 2));

		const edges = [
			{ length: topEdge },
			{ length: slantedEdge },
			{ length: bottomEdge },
			{ length: slantedEdge }
		];

		const result: ConnectorProps = [];
		const pointsPerEdge = 2;

		let currentOffset = 0;
		let index = 0;

		edges.forEach((edge) => {
			for (let i = 0; i < pointsPerEdge; i++) {
				let position = Position.Top;
				if ([2, 3].includes(index)) {
					position = Position.Right;
				} else if ([4, 5].includes(index)) {
					position = Position.Bottom;
				} else if ([6, 7].includes(index)) {
					position = Position.Left;
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
					:points="`${shapeWidth * 0.25} 0 ${shapeWidth * 0.75} 0 ${shapeWidth} ${shapeHeight} 0 ${shapeHeight}`"
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
