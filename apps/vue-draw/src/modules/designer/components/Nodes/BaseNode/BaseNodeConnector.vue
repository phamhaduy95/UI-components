<script setup lang="ts">
	import { useZoom } from '@/modules/designer/composables/useZoom';
	import { Handle, Position } from '@vue-flow/core';
	import { computed } from 'vue';

	export type ConnectorProps = {
		position: Position;
		offsetDistance: string;
	};

	export interface BaseNodeConnectorProps {
		isVisible?: boolean;
		path?: string;
		pathId?: string;
		connectors?: ConnectorProps[];
		shapeWidth: number;
		shapeHeight: number;
		isNodeSelected?: boolean;
	}

	const DEFAULT_NO_CONNECTORS = 16;

	const DEFAULT_CONNECTOR_SIZE = 3; // in px

	const props = withDefaults(defineProps<BaseNodeConnectorProps>(), {
		isVisible: false,
		path: ''
	});

	const { currentZoom } = useZoom();

	const connectorSize = computed(() => {
		const value = Math.max(DEFAULT_CONNECTOR_SIZE / currentZoom.value, DEFAULT_CONNECTOR_SIZE);
		return `${value}px`;
	});

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
		class="Connector inset-0"
		:style="{
			position: 'absolute',
			offsetPosition: 'center',
			width: `${shapeWidth}px`,
			height: `${shapeHeight}px`
		}"
		:data-selected="isNodeSelected"
	>
		<template
			v-for="(connector, index) in computedConnectors"
			:key="index"
		>
			<Handle
				:id="`source-${index}`"
				type="source"
				:position="connector.position"
				class="SourceHandle pointer-events-auto"
				:style="{
					offsetPath: path,
					width: connectorSize,
					height: connectorSize,
					minWidth: connectorSize,
					minHeight: connectorSize,
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
				class="TargetHandle pointer-events-auto"
				:style="{
					offsetPath: path,
					width: connectorSize,
					height: connectorSize,
					minWidth: connectorSize,
					minHeight: connectorSize,
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

<style scoped lang="css">
	.Connector {
		position: relative;
	}

	.TargetHandle,
	.SourceHandle {
		opacity: 0;
		z-index: 2;
		&::before {
			content: '';
			border-radius: 999px;
			position: absolute;
			background-color: #2141de66;
			top: -2px;
			left: -2px;
			right: -2px;
			bottom: -2px;
		}
	}

	.Connector:where(:hover) {
		> .SourceHandle {
			opacity: 1;
		}
	}

	.Connector:where([data-selected='true']) {
		> .SourceHandle {
			opacity: 0;
			pointer-events: none;
		}
		> .TargetHandle {
			opacity: 0;
			pointer-events: none;
		}
	}
</style>
