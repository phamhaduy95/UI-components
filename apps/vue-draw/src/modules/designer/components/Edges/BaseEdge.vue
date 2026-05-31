<script setup lang="ts">
	import { computed } from 'vue';
	import {
		BaseEdge,
		EdgeLabelRenderer,
		getBezierPath,
		getSmoothStepPath,
		getStraightPath,
		type EdgeProps
	} from '@vue-flow/core';

	const props = defineProps<EdgeProps>();

	const pathDetails = computed(() => {
		const params = {
			sourceX: props.sourceX,
			sourceY: props.sourceY,
			sourcePosition: props.sourcePosition,
			targetX: props.targetX,
			targetY: props.targetY,
			targetPosition: props.targetPosition
		};

		const curve = props.data?.curve || 'smoothstep';

		switch (curve) {
			case 'straight':
				return getStraightPath(params);
			case 'default':
				return getBezierPath(params);
			case 'smoothstep':
			default:
				return getSmoothStepPath({ ...params, borderRadius: props.data?.borderRadius ?? 0 });
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
	const strokeWidth = computed(() => props.data?.strokeWidth ?? 2);
	const strokeColor = computed(() => props.data?.strokeColor ?? '#b1b1b7');
	const strokeDasharray = computed(
		() => STYLES.dashArray[props.data?.lineType ?? 'solid'] ?? 'none'
	);

	// Markers
	const getMarkerUrl = (type?: string, isStart?: boolean) => {
		return !type || type === 'none' ? '' : `url(#marker-${type}${isStart ? '-start' : '-end'})`;
	};
	const markerStartUrl = computed(() => getMarkerUrl(props.data?.markerStart, true));
	const markerEndUrl = computed(() => getMarkerUrl(props.data?.markerEnd, false));

	// Label Styling
	const labelStyle = computed(() => {
		const data = props.data || {};
		const pos = data.labelPosition || 'center';
		const transform = STYLES.labelPosition[pos] ?? STYLES.labelPosition.center;

		return {
			position: 'absolute' as const,
			transform: `${transform} translate(${labelX.value}px,${labelY.value}px)`,
			color: data.labelColor ?? '#000000',
			fontSize: `${data.labelFontSize ?? 12}px`,
			fontWeight: data.labelFontWeight ?? 'normal',
			fontStyle: data.labelFontStyle ?? 'normal',
			pointerEvents: 'all' as const
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
			stroke: '#3b82f6',
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
		:marker-start="markerStartUrl"
		:marker-end="markerEndUrl"
		class="cursor-pointer"
	/>
	<EdgeLabelRenderer>
		<div
			v-if="label"
			:style="labelStyle"
			class="nodrag nopan bg-white px-1 rounded-sm border border-transparent hover:border-gray-300 transition-colors cursor-pointer"
		>
			{{ label }}
		</div>
	</EdgeLabelRenderer>
</template>
