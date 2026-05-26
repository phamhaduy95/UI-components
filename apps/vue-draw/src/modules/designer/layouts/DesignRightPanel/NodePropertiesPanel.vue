<script setup lang="ts">
	import { computed, type ComponentInstance } from 'vue';

	import { SingleSlider, NumberInput, ColorPicker } from '@packages/vue-components';
	import { useNodeConfig } from '@/modules/designer/composables/useNodeConfig';

	type NumberInputProps = ComponentInstance<typeof NumberInput>['$props'];
	type SingleSliderProps = ComponentInstance<typeof SingleSlider>['$props'];

	const { selectedNode, updateNodeBasicProps, updateNodeData } = useNodeConfig();

	const nodeX = computed(() => String(Math.round(selectedNode.value?.position.x ?? 0)));
	const nodeY = computed(() => String(Math.round(selectedNode.value?.position.y ?? 0)));
	const nodeWidth = computed(() => String(Math.round(selectedNode.value?.dimensions.width ?? 0)));
	const nodeHeight = computed(() => String(Math.round(selectedNode.value?.dimensions.height ?? 0)));
	const nodeFill = computed(() => selectedNode.value?.data?.fill ?? '#ffffff');
	const nodeStroke = computed(() => selectedNode.value?.data?.stroke ?? '#000000');
	const nodeStrokeWidth = computed(() => selectedNode.value?.data?.strokeWidth ?? 1);

	const handleXChange: NumberInputProps['onValueChange'] = (details) => {
		updateNodeBasicProps({
			position: { x: details.valueAsNumber, y: selectedNode.value?.position.y ?? 0 }
		});
	};

	const handleYChange: NumberInputProps['onValueChange'] = (details) => {
		updateNodeBasicProps({
			position: { x: selectedNode.value?.position.x ?? 0, y: details.valueAsNumber }
		});
	};

	const handleWidthChange: NumberInputProps['onValueChange'] = (details) => {
		updateNodeBasicProps({
			dimensions: {
				width: details.valueAsNumber,
				height: selectedNode.value?.dimensions.height ?? 0
			}
		});
	};

	const handleHeightChange: NumberInputProps['onValueChange'] = (details) => {
		updateNodeBasicProps({
			dimensions: {
				width: selectedNode.value?.dimensions.width ?? 0,
				height: details.valueAsNumber
			}
		});
	};

	const handleFillChange = (value: string) => {
		updateNodeData({ fill: value });
	};

	const handleStrokeChange = (value: string) => {
		updateNodeData({ stroke: value });
	};

	const hanldeStrokeWidthChange: SingleSliderProps['onUpdate:modelValue'] = (val: number) => {
		updateNodeData({ strokeWidth: val });
	};
</script>

<template>
	<div class="flex-1 space-y-4 overflow-y-auto px-4 py-2">
		<div class="space-y-2">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Layout</h3>
			<div class="grid grid-cols-2 gap-3">
				<div>
					<NumberInput
						class="w-full"
						label="X"
						size="xs"
						:min="0"
						:model-value="nodeX"
						@value-change="handleXChange"
					/>
				</div>
				<div>
					<NumberInput
						class="w-full"
						label="Y"
						size="xs"
						:min="0"
						:model-value="nodeY"
						@value-change="handleYChange"
					/>
				</div>
				<div>
					<NumberInput
						class="w-full"
						label="width"
						size="xs"
						:min="0"
						:model-value="nodeWidth"
						@value-change="handleWidthChange"
					/>
				</div>
				<div>
					<NumberInput
						class="w-full"
						label="height"
						size="xs"
						:min="0"
						:model-value="nodeHeight"
						@value-change="handleHeightChange"
					/>
				</div>
			</div>
		</div>

		<!-- Appearance -->
		<div class="space-y-2">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Appearance</h3>
			<ColorPicker
				label="Background"
				:model-value="nodeFill"
				format="hex"
				size="xs"
				@change="handleFillChange"
			/>
			<ColorPicker
				label="Stroke Color"
				:model-value="nodeStroke"
				format="hex"
				size="xs"
				@update:model-value="handleStrokeChange"
			/>
			<div class="space-y-4 pt-1">
				<SingleSlider
					label="Border Size"
					size="sm"
					:model-value="nodeStrokeWidth"
					:min="0"
					:max="5"
					:step="0.1"
					editable
					@update:model-value="hanldeStrokeWidthChange"
				/>
			</div>
		</div>
	</div>
</template>
