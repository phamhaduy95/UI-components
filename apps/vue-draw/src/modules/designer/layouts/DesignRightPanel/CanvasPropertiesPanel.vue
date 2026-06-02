<script setup lang="ts">
	import { useCanvasConfig } from '@/modules/designer/composables/useCanvasConfig';
	import { ColorPicker, SingleSelect, SingleSlider, Switch } from '@packages/vue-components';

	const { canvasConfig } = useCanvasConfig();

	const gridVariantOptions = [
		{ label: 'Dots', value: 'dots' },
		{ label: 'Lines', value: 'lines' }
	];
</script>

<template>
	<div class="flex-1 space-y-6 overflow-y-auto px-4 py-4">
		<div class="space-y-4">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Canvas Properties</h3>

			<div class="flex items-center justify-between">
				<span class="text-sm font-medium text-gray-700">Show Grid</span>
				<Switch v-model:checked="canvasConfig.gridVisible" />
			</div>

			<div class="flex items-center justify-between">
				<span class="text-sm font-medium text-gray-700">Snap to Grid</span>
				<Switch v-model:checked="canvasConfig.snapToGrid" />
			</div>

			<template v-if="canvasConfig.gridVisible">
				<SingleSelect
					v-model="canvasConfig.gridVariant"
					label="Grid Style"
					size="xs"
					:items="gridVariantOptions"
				/>
				<ColorPicker
					v-model="canvasConfig.gridPatternColor"
					label="Grid Color"
					format="hex"
					size="xs"
				/>

				<div class="space-y-4 pt-1">
					<SingleSlider
						v-model="canvasConfig.gridGap"
						label="Grid Gap"
						size="sm"
						:min="10"
						:max="100"
						:step="1"
						editable
					/>
					<SingleSlider
						v-model="canvasConfig.gridSize"
						label="Grid Size"
						size="sm"
						:min="0.5"
						:max="10"
						:step="0.5"
						editable
					/>
				</div>
			</template>
		</div>
	</div>
</template>
