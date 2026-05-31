<script setup lang="ts">
	import { Handle, Position } from '@vue-flow/core';
	import { computed } from 'vue';

	export type ConnectorProps = {
		position: Position;
		offsetDistance: string;
	};

	export interface GenericNodeConnectorProps {
		isVisible?: boolean;
		path?: string;
		pathId?: string;
		connectors?: ConnectorProps[];
		shapeWidth: number;
		shapeHeight: number;
	}

	const props = withDefaults(defineProps<GenericNodeConnectorProps>(), {
		isVisible: false,
		path: ''
	});

	const DEFAULT_NO_CONNECTORS = 16;

	const DEFAULT_CONNECTOR_SIZE = '3px';

	const computedConnectors = computed(() => {
		if (props.connectors) return props.connectors;

		const width = props.shapeWidth - 2;
		const height = props.shapeHeight - 2;

		const result: ConnectorProps[] = [];
		const pointsPerSide = DEFAULT_NO_CONNECTORS / 4;

		const sides = [
			{ position: Position.Top, length: width, startOffset: 0 },
			{ position: Position.Right, length: height, startOffset: width },
			{ position: Position.Bottom, length: width, startOffset: width + height },
			{ position: Position.Left, length: height, startOffset: width * 2 + height }
		];

		sides.forEach((side) => {
			for (let i = 0; i < pointsPerSide; i++) {
				const offsetDistance = side.startOffset + (side.length / pointsPerSide) * i;
				result.push({
					position: side.position,
					offsetDistance: offsetDistance + 'px'
				});
			}
		});

		return result;
	});

	const path = computed(() => {
		if (props.pathId) return `url(#${props.pathId})`;
		if (props.path) return props.path;
		return `rect(0px ${props.shapeWidth - 2}px ${props.shapeHeight - 2}px 0px)`;
	});
</script>

<template>
	<div
		class="Connector inset-0 pointer-events-none"
		:style="{
			position: 'absolute',
			offsetPosition: 'center',
			maxWidth: `${shapeWidth}px`,
			minHeight: `${shapeHeight}px`
		}"
	>
		<template
			v-for="(connector, index) in computedConnectors"
			:key="index"
		>
			<Handle
				:id="`source-${index}`"
				type="source"
				:position="connector.position"
				class="pointer-events-auto transition-opacity opacity-0 hover:opacity-100"
				:style="{
					offsetPath: path,
					width: DEFAULT_CONNECTOR_SIZE,
					height: DEFAULT_CONNECTOR_SIZE,
					minWidth: DEFAULT_CONNECTOR_SIZE,
					minHeight: DEFAULT_CONNECTOR_SIZE,
					border: 'none',
					offsetDistance: connector.offsetDistance,
					offsetAnchor: 'center',
					top: 'unset',
					bottom: 'unset',
					left: 'unset',
					right: 'unset',
					transform: 'unset',
					offsetRotate: 'auto'
				}"
			/>
			<Handle
				:id="`target-${index}`"
				type="target"
				:position="connector.position"
				class="pointer-events-auto transition-colors opacity-0"
				:style="{
					offsetPath: path,
					width: DEFAULT_CONNECTOR_SIZE,
					height: DEFAULT_CONNECTOR_SIZE,
					minWidth: DEFAULT_CONNECTOR_SIZE,
					minHeight: DEFAULT_CONNECTOR_SIZE,
					border: 'none',
					offsetDistance: connector.offsetDistance,
					offsetAnchor: 'center',
					top: 'unset',
					bottom: 'unset',
					left: 'unset',
					right: 'unset',
					transform: 'unset',
					offsetRotate: 'auto'
				}"
			/>
		</template>
	</div>
</template>
