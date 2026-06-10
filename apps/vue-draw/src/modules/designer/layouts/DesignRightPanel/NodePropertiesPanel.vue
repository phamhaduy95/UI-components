<script setup lang="ts">
	import { computed, type ComponentInstance } from 'vue';
	import type { Dimensions, XYPosition } from '@vue-flow/core';

	import {
		SingleSlider,
		NumberInput,
		ColorPicker,
		Switch,
		TextInput
	} from '@packages/vue-components';
	import { useNodeConfig } from '@/modules/designer/composables/useNodeConfig';
	import { defaultBasicShapeNodeData } from '@/modules/designer/constant/default';
	import { useTagsStore } from '@/modules/designer/composables/useTagsStore';
	import {
		type BasicShapeNodeData,
		type FormFieldNodeData,
		NodeType
	} from '@/modules/designer/types/Node.type';

	type NumberInputProps = ComponentInstance<typeof NumberInput>['$props'];
	type SingleSliderProps = ComponentInstance<typeof SingleSlider>['$props'];

	const tagsStore = useTagsStore();
	const { selectedNode, updateNodeBasicProps, updateNodeData } = useNodeConfig();

	const boundTags = computed(() => {
		const tagIds = nodeConfigurableData.value.tagIds || [];
		return tagsStore.tags.filter((t) => tagIds.includes(t.id));
	});

	const nodePosition = computed<XYPosition>(() => ({
		x: Math.round(selectedNode.value?.position?.x ?? 0),
		y: Math.round(selectedNode.value?.position?.y ?? 0)
	}));
	const nodeDimensions = computed<Dimensions>(() => ({
		width: Math.round(selectedNode.value?.dimensions?.width ?? 0),
		height: Math.round(selectedNode.value?.dimensions?.height ?? 0)
	}));

	const nodeConfigurableData = computed(
		() => selectedNode.value?.data || defaultBasicShapeNodeData
	);

	const handleXChange: NumberInputProps['onValueChange'] = (value) => {
		updateNodeBasicProps({
			position: { x: value ?? 0, y: nodePosition.value?.y ?? 0 }
		});
	};

	const handleYChange: NumberInputProps['onValueChange'] = (value) => {
		updateNodeBasicProps({
			position: { x: nodePosition.value?.x ?? 0, y: value ?? 0 }
		});
	};

	const handleWidthChange: NumberInputProps['onValueChange'] = (value) => {
		updateNodeBasicProps({
			dimensions: {
				width: value ?? 0,
				height: nodeDimensions.value?.height ?? 0
			}
		});
	};

	const handleHeightChange: NumberInputProps['onValueChange'] = (value) => {
		updateNodeBasicProps({
			dimensions: {
				width: nodeDimensions.value?.width ?? 0,
				height: value ?? 0
			}
		});
	};

	const handleFillChange = (value: string) => {
		updateNodeData<BasicShapeNodeData>({ fill: value });
	};

	const handleStrokeChange = (value: string) => {
		updateNodeData<BasicShapeNodeData>({ stroke: value });
	};

	const hanldeStrokeWidthChange: SingleSliderProps['onUpdate:modelValue'] = (value: number) => {
		updateNodeData<BasicShapeNodeData>({ strokeWidth: value });
	};

	const handleShowTagChange = (value: boolean) => {
		updateNodeData<BasicShapeNodeData>({ showTag: value });
	};

	const nodeHidden = computed(() => selectedNode.value?.hidden ?? false);
	const nodeZIndex = computed(() => selectedNode.value?.zIndex ?? 0);

	const handleHiddenChange = (value: boolean) => {
		updateNodeBasicProps({ hidden: value ?? false });
	};

	const handleZIndexChange: NumberInputProps['onValueChange'] = (value) => {
		updateNodeBasicProps({ zIndex: value ?? 0 });
	};

	const progressBarValue = computed(() => {
		const data = nodeConfigurableData.value as unknown as FormFieldNodeData;
		return Number(data.value) || 0;
	});

	const handleProgressBarValueChange = (value: number) => {
		updateNodeData<FormFieldNodeData>({ value: value.toString() });
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
						:model-value="nodePosition?.x"
						@value-change="handleXChange"
					/>
				</div>
				<div>
					<NumberInput
						class="w-full"
						label="Y"
						size="xs"
						:min="0"
						:model-value="nodePosition?.y"
						@value-change="handleYChange"
					/>
				</div>
				<div>
					<NumberInput
						class="w-full"
						label="width"
						size="xs"
						:min="0"
						:model-value="nodeDimensions?.width"
						@value-change="handleWidthChange"
					/>
				</div>
				<div>
					<NumberInput
						class="w-full"
						label="height"
						size="xs"
						:min="0"
						:model-value="nodeDimensions?.height"
						@value-change="handleHeightChange"
					/>
				</div>
			</div>
		</div>

		<!-- Appearance -->
		<div class="space-y-2">
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Appearance</h3>
			<Switch
				name="hidden"
				label="Hidden Component"
				:checked="nodeHidden"
				size="xs"
				@update:checked="handleHiddenChange"
			/>
			<NumberInput
				class="w-full"
				label="Z-Index"
				size="xs"
				:model-value="nodeZIndex"
				@value-change="handleZIndexChange"
			/>
			<ColorPicker
				label="Background"
				:model-value="nodeConfigurableData.fill"
				format="hex"
				size="xs"
				@update:model-value="handleFillChange"
			/>
			<ColorPicker
				label="Stroke Color"
				:model-value="nodeConfigurableData.stroke"
				format="hex"
				size="xs"
				@update:model-value="handleStrokeChange"
			/>
			<div class="space-y-4 pt-1">
				<SingleSlider
					label="Border Size"
					:model-value="nodeConfigurableData.strokeWidth"
					:min="0"
					:max="5"
					:step="0.1"
					editable
					@update:model-value="hanldeStrokeWidthChange"
				/>
			</div>
		</div>

		<!-- Progress Bar Settings -->
		<div
			v-if="selectedNode?.type === NodeType.ProgressBar"
			class="space-y-4"
		>
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Progress Bar</h3>
			<SingleSlider
				label="Progress Level"
				:model-value="progressBarValue"
				:min="0"
				:max="100"
				:step="1"
				editable
				@update:model-value="handleProgressBarValueChange"
			/>
		</div>

		<!-- Bound Tag -->
		<div
			v-if="boundTags.length > 0"
			class="space-y-4"
		>
			<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Data Binding</h3>
			<Switch
				name="show-tag"
				label="Show Bound Data"
				:checked="nodeConfigurableData.showTag"
				@update:checked="handleShowTagChange"
			/>
			<div class="space-y-2">
				<TextInput
					v-for="boundTag in boundTags"
					:key="boundTag.id"
					:label="boundTag.label"
					:model-value="boundTag.value"
					@update:model-value="tagsStore.updateTagValue(boundTag.id, $event)"
				/>
			</div>
		</div>
	</div>
</template>
