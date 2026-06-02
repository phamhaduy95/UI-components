<script setup lang="ts">
	import { useEdgeConfig } from '@/modules/designer/composables/useEdgeConfig';
	import { useDebounceFn } from '@vueuse/core';
	import { computed } from 'vue';
	import type { DesignerEdge } from '@/modules/designer/types/Edge.type';

	import { SingleSlider, ColorPicker, TextInput, SingleSelect } from '@packages/vue-components';
	import { defaultEdgeData } from '@/modules/designer/constant/default';

	const DEFAULT_TIME_DEBOUNCE = 100;

	const { selectedEdge, updateEdgeBasicProps, updateEdgeData } = useEdgeConfig();

	const edgeData = computed(() => selectedEdge.value?.data ?? structuredClone(defaultEdgeData));

	const edgeLabel = computed(() => selectedEdge.value?.label || '');

	const curveOptions = [
		{ label: 'Bezier', value: 'default' },
		{ label: 'Straight', value: 'straight' },
		{ label: 'Smooth', value: 'smoothstep' }
	];

	const lineTypeOptions = [
		{ label: 'Solid', value: 'solid' },
		{ label: 'Dashed', value: 'dashed' },
		{ label: 'Dotted', value: 'dotted' }
	];

	const markerOptions = [
		{ label: 'None', value: 'none' },
		{ label: 'Arrow', value: 'arrow' },
		{ label: 'Circle', value: 'circle' },
		{ label: 'Diamond', value: 'diamond' }
	];

	const labelPositionOptions = [
		{ label: 'Center', value: 'center' },
		{ label: 'Top', value: 'top' },
		{ label: 'Bottom', value: 'bottom' }
	];

	const fontWeightOptions = [
		{ label: 'Normal', value: 'normal' },
		{ label: 'Bold', value: 'bold' }
	];

	const fontStyleOptions = [
		{ label: 'Normal', value: 'normal' },
		{ label: 'Italic', value: 'italic' }
	];

	const handleEdgeLabelChange = useDebounceFn((value: string) => {
		updateEdgeBasicProps({ label: value });
	}, DEFAULT_TIME_DEBOUNCE);

	const handleEdgeDataChange = useDebounceFn(
		<K extends keyof DesignerEdge['data']>(key: K, value: DesignerEdge['data'][K]) => {
			updateEdgeData({ [key]: value });
		},
		DEFAULT_TIME_DEBOUNCE
	);
</script>

<template>
	<div class="flex-1 space-y-4 overflow-y-auto px-4 py-2">
		<div class="space-y-4">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Edge Properties</h3>
			<SingleSelect
				label="Edge Curve"
				size="xs"
				:items="curveOptions"
				:model-value="edgeData.curve"
				@update:model-value="(val) => handleEdgeDataChange('curve', val)"
			/>
			<SingleSelect
				label="Line Type"
				size="xs"
				:items="lineTypeOptions"
				:model-value="edgeData.lineType"
				@update:model-value="(val) => handleEdgeDataChange('lineType', val)"
			/>
			<SingleSelect
				label="Marker Start"
				size="xs"
				:items="markerOptions"
				:model-value="edgeData.markerStart"
				@update:model-value="(val) => handleEdgeDataChange('markerStart', val)"
			/>
			<SingleSelect
				label="Marker End"
				size="xs"
				:items="markerOptions"
				:model-value="edgeData.markerEnd"
				@update:model-value="(val) => handleEdgeDataChange('markerEnd', val)"
			/>
		</div>

		<div class="space-y-4 pt-2">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Appearance</h3>
			<ColorPicker
				label="Color"
				:model-value="edgeData.strokeColor"
				format="hex"
				size="xs"
				@update:model-value="(val) => handleEdgeDataChange('strokeColor', val)"
			/>
			<div class="space-y-4 pt-1">
				<SingleSlider
					label="Width"
					size="sm"
					:model-value="edgeData.strokeWidth"
					:min="1"
					:max="10"
					:step="0.5"
					editable
					@update:model-value="(val) => handleEdgeDataChange('strokeWidth', val)"
				/>
			</div>
		</div>

		<div class="space-y-4 pt-2">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Label</h3>
			<TextInput
				label="Content"
				size="xs"
				:model-value="edgeLabel"
				@update:model-value="handleEdgeLabelChange"
			/>
			<SingleSelect
				label="Position"
				size="xs"
				:items="labelPositionOptions"
				:model-value="edgeData.labelPosition"
				@update:model-value="(val) => handleEdgeDataChange('labelPosition', val)"
			/>
			<ColorPicker
				label="Text Color"
				:model-value="edgeData.labelColor"
				format="hex"
				size="xs"
				@update:model-value="(val) => handleEdgeDataChange('labelColor', val)"
			/>
			<div class="space-y-4 pt-1">
				<SingleSlider
					label="Font Size"
					size="sm"
					:model-value="edgeData.labelFontSize"
					:min="8"
					:max="72"
					:step="1"
					editable
					@update:model-value="(val) => handleEdgeDataChange('labelFontSize', val)"
				/>
			</div>
			<SingleSelect
				label="Font Weight"
				size="xs"
				:items="fontWeightOptions"
				:model-value="edgeData.labelFontWeight"
				@update:model-value="(val) => handleEdgeDataChange('labelFontWeight', val)"
			/>
			<SingleSelect
				label="Font Style"
				size="xs"
				:items="fontStyleOptions"
				:model-value="edgeData.labelFontStyle"
				@update:model-value="(val) => handleEdgeDataChange('labelFontStyle', val)"
			/>
		</div>
	</div>
</template>
