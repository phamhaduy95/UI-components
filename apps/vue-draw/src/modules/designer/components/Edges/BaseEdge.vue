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

		if (props.data?.routingPoint) {
			const { x, y } = props.data.routingPoint;
			if (curve === 'default') {
				return [
					`M ${props.sourceX} ${props.sourceY} Q ${x} ${y} ${props.targetX} ${props.targetY}`,
					x,
					y
				];
			}
			return [
				`M ${props.sourceX} ${props.sourceY} L ${x} ${y} L ${props.targetX} ${props.targetY}`,
				x,
				y
			];
		}

		if (curve === 'straight') {
			return getStraightPath(params);
		}
		if (curve === 'default') {
			return getBezierPath(params);
		}
		return getSmoothStepPath({ ...params, borderRadius: 0 }); // smoothstep
	});

	const path = computed(() => pathDetails.value[0]);
	const labelX = computed(() => pathDetails.value[1]);
	const labelY = computed(() => pathDetails.value[2]);

	const strokeWidth = computed(() => props.data?.strokeWidth ?? 2);
	const strokeColor = computed(() => props.data?.strokeColor ?? '#b1b1b7');
	const lineType = computed(() => props.data?.lineType ?? 'solid');

	const strokeDasharray = computed(() => {
		if (lineType.value === 'dashed') return '5, 5';
		if (lineType.value === 'dotted') return '2, 2';
		return 'none';
	});

	const getMarkerUrl = (type: string | undefined, isStart: boolean) => {
		if (!type || type === 'none') return '';
		return `url(#marker-${type}${isStart ? '-start' : '-end'})`;
	};

	const markerStartUrl = computed(() => getMarkerUrl(props.data?.markerStart, true));
	const markerEndUrl = computed(() => getMarkerUrl(props.data?.markerEnd, false));

	const labelPositionTranslate = computed(() => {
		const pos = props.data?.labelPosition || 'center';
		if (pos === 'top') return 'translate(-50%, -150%)';
		if (pos === 'bottom') return 'translate(-50%, 50%)';
		return 'translate(-50%, -50%)';
	});

	const labelStyle = computed(() => ({
		position: 'absolute' as const,
		transform: `${labelPositionTranslate.value} translate(${labelX.value}px,${labelY.value}px)`,
		color: props.data?.labelColor ?? '#000000',
		fontSize: `${props.data?.labelFontSize ?? 12}px`,
		fontWeight: props.data?.labelFontWeight ?? 'normal',
		fontStyle: props.data?.labelFontStyle ?? 'normal',
		pointerEvents: 'all' as const
	}));
</script>

<template>
	<!-- Selection highlight -->
	<BaseEdge
		v-if="selected"
		:id="`${id}-selection`"
		:path="path"
		:style="{
			stroke: '#3b82f6',
			strokeWidth: Number(strokeWidth) + 4,
			opacity: 0.5
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
