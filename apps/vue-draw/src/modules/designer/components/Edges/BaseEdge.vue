<script setup lang="ts">
	import { computed, type CSSProperties } from 'vue';
	import {
		BaseEdge,
		EdgeLabelRenderer,
		getBezierPath,
		getSmoothStepPath,
		getStraightPath,
		type EdgeProps
	} from '@vue-flow/core';
	import { defaultEdgeData } from '../../constant/default';

	const props = defineProps<EdgeProps>();

	const edgeData = computed(() => props.data ?? structuredClone(defaultEdgeData));

	const pathDetails = computed(() => {
		const params = {
			sourceX: props.sourceX,
			sourceY: props.sourceY,
			sourcePosition: props.sourcePosition,
			targetX: props.targetX,
			targetY: props.targetY,
			targetPosition: props.targetPosition
		};

		const curve = edgeData.value.curve || 'smoothstep';

		switch (curve) {
			case 'straight':
				return getStraightPath(params);
			case 'default':
				return getBezierPath(params);
			case 'smoothstep':
			default:
				return getSmoothStepPath({ ...params, borderRadius: edgeData.value.borderRadius });
		}
	});

	// Styling configuration maps
	const STYLES = {
		dashArray: { dashed: '5, 5', dotted: '2, 2', solid: 'none' } as Record<string, string>,
		labelPosition: {
			top: 'translate(-50%, -150%)',
			bottom: 'translate(-50%, 50%)',
			center: 'translate(-50%, -50%)'
		} as Record<string, string>
	};

	// Path & Coordinates
	const path = computed(() => pathDetails.value[0]);
	const labelX = computed(() => pathDetails.value[1]);
	const labelY = computed(() => pathDetails.value[2]);

	// Edge Styling
	const strokeWidth = computed<number>(() => edgeData.value.strokeWidth);
	const strokeColor = computed<string>(() => edgeData.value.strokeColor);
	const strokeDasharray = computed(() => STYLES.dashArray[edgeData.value.lineType]);

	const startMarkerURL = computed(() => {
		const markerType = edgeData.value.markerStart;
		if (markerType === 'none') return '';
		return `url(#marker-${markerType}-start)`;
	});

	const markerEndURL = computed(() => {
		const markerType = edgeData.value.markerEnd;
		if (markerType === 'none') return '';
		return `url(#marker-${markerType}-end)`;
	});

	// Label Styling
	const labelStyle = computed<CSSProperties>(() => {
		const pos = edgeData.value.labelPosition;
		const transform = STYLES.labelPosition[pos];

		return {
			position: 'absolute',
			transform: `${transform} translate(${labelX.value}px,${labelY.value}px)`,
			color: edgeData.value.labelColor,
			fontSize: `${edgeData.value.labelFontSize}px`,
			fontWeight: edgeData.value.labelFontWeight,
			fontStyle: edgeData.value.labelFontStyle
		};
	});
</script>

<template>
	<!-- Selection highlight -->
	<BaseEdge
		v-if="selected"
		:id="`${id}-selection`"
		:path="path"
		:style="{
			stroke: '#2141de66',
			strokeWidth: Number(strokeWidth) + 2
		}"
	/>

	<!-- Invisible thick edge for easier interaction -->
	<BaseEdge
		:id="`${id}-interaction`"
		:path="path"
		:style="{
			stroke: 'transparent',
			strokeWidth: Math.max(Number(strokeWidth) + 10, 20)
		}"
		class="cursor-pointer"
	/>
	<BaseEdge
		:id="id"
		:path="path"
		:style="{
			stroke: strokeColor,
			strokeWidth: strokeWidth,
			strokeDasharray: strokeDasharray
		}"
		:marker-start="startMarkerURL"
		:marker-end="markerEndURL"
		class="cursor-pointer"
	/>
	<EdgeLabelRenderer>
		<div
			v-if="label"
			:style="labelStyle"
			class="nodrag nopan bg-white! px-1 rounded-sm border border-transparent cursor-pointer"
		>
			{{ label }}
		</div>
	</EdgeLabelRenderer>
</template>
