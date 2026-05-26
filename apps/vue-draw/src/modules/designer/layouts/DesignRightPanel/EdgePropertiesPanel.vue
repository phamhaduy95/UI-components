<script setup lang="ts">
	import { useEdgeConfig } from '@/modules/designer/composables/useEdgeConfig';
	import { useDebounceFn } from '@vueuse/core';
	import { computed } from 'vue';

	import { SingleSlider, ColorPicker, TextInput, SingleSelect } from '@packages/vue-components';

	const DEFAULT_TIME_DEBOUNCE = 1;

	const { selectedEdge, updateEdgeBasicProps, updateEdgeData } = useEdgeConfig();

	const edgeLabel = computed(() => selectedEdge.value?.label || '');
	const edgeType = computed(() => selectedEdge.value?.type || 'default');
	const edgeStroke = computed(() => selectedEdge.value?.data?.strokeColor || '#b1b1b7');
	const edgeStrokeWidth = computed(() => selectedEdge.value?.data?.strokeWidth ?? 2);

	const edgeTypeOptions = [
		{ label: 'Bezier (Default)', value: 'default' },
		{ label: 'Step', value: 'step' },
		{ label: 'Smooth Step', value: 'smoothstep' }
	];

	const handleEdgeLabelChange = useDebounceFn((value: string) => {
		updateEdgeBasicProps({ label: value });
	}, DEFAULT_TIME_DEBOUNCE);

	const handleEdgeTypeChange = (value: string) => {
		updateEdgeBasicProps({ type: value });
	};

	const handleEdgeStrokeChange = useDebounceFn((value: string) => {
		updateEdgeData({ strokeColor: value });
	}, 0);

	const handleEdgeWidthChange = useDebounceFn((val: number) => {
		updateEdgeData({ strokeWidth: val });
	}, DEFAULT_TIME_DEBOUNCE);
</script>

<template>
	<div class="flex-1 space-y-4 overflow-y-auto px-4 py-2">
		<div class="space-y-4">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Edge Properties</h3>
			<TextInput
				label="Label"
				size="xs"
				:model-value="edgeLabel"
				@update:model-value="handleEdgeLabelChange"
			/>
			<SingleSelect
				label="Routing Algorithm"
				size="xs"
				:items="edgeTypeOptions"
				:model-value="edgeType"
				@update:model-value="handleEdgeTypeChange"
			/>
		</div>

		<div class="space-y-4 pt-2">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Appearance</h3>
			<ColorPicker
				label="Color"
				:model-value="edgeStroke"
				format="hex"
				size="xs"
				@update:model-value="handleEdgeStrokeChange"
			/>
			<div class="space-y-4 pt-1">
				<SingleSlider
					label="Width"
					size="sm"
					:model-value="edgeStrokeWidth"
					:min="1"
					:max="10"
					:step="0.5"
					editable
					@update:model-value="handleEdgeWidthChange"
				/>
			</div>
		</div>
	</div>
</template>
