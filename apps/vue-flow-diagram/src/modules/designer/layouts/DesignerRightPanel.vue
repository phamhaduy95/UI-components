<script setup lang="ts">
import { useNodeCommandFactory } from '@/modules/designer/composables/useCommandFactory';
import { useHistory } from '@/modules/designer/composables/useHistory';
import type { BasicShapeNodeData } from '@/modules/designer/types/Designer.type';
import { useVueFlow } from '@vue-flow/core';
import { useDebounceFn } from '@vueuse/core';
import { computed, toRaw, type ComponentInstance } from 'vue';

import type { NodePositionEntry, NodeSizeEntry } from '@modules/designer/types/Command.type';
import type { NumberInput, SingleSlider } from '@packages/vue-components';

type NumberInputProps = ComponentInstance<typeof NumberInput>['$props'];
type SingleSliderProps = ComponentInstance<typeof SingleSlider>['$props'];

const DEFAULT_TIME_DEBOUNCE = 50;

const { getSelectedNodes, updateNodeData, updateNode } = useVueFlow();
const { commit } = useHistory();
const { createRepositionNodesCommand, createResizeNodesCommand, createUpdateNodeDataCommand } =
	useNodeCommandFactory();

const selectedNode = computed(() => {
	const selected = getSelectedNodes.value;
	return selected.length === 1 ? selected[0] : null;
});

const nodeX = computed(() => String(Math.round(selectedNode.value?.position.x ?? 0)));

const nodeY = computed(() => String(Math.round(selectedNode.value?.position.y ?? 0)));

const nodeWidth = computed(() => String(Math.round(selectedNode.value?.dimensions.width ?? 0)));

const nodeHeight = computed(() => String(Math.round(selectedNode.value?.dimensions.height ?? 0)));

const nodeFill = computed(() => selectedNode.value?.data.fill ?? 'transparent');

const nodeStrokeWidth = computed(() => selectedNode.value?.data?.strokeWidth ?? 1);

const handleXChange: NumberInputProps['onValueChange'] = useDebounceFn(({ value }) => {
	if (!selectedNode.value) return;
	const before = structuredClone(toRaw(selectedNode.value.position));

	updateNode(selectedNode.value.id, {
		position: {
			x: Number(value),
			y: selectedNode.value.position.y
		}
	});

	const entries: NodePositionEntry[] = [
		{
			nodeId: selectedNode.value?.id ?? '',
			before: before,
			after: structuredClone(toRaw(selectedNode.value.position))
		}
	];

	commit(createRepositionNodesCommand(entries));
}, DEFAULT_TIME_DEBOUNCE);

const handleYChange: NumberInputProps['onValueChange'] = useDebounceFn(({ value }) => {
	if (!selectedNode.value) return;
	const before = structuredClone(toRaw(selectedNode.value.position));

	updateNode(selectedNode.value.id, {
		position: {
			x: selectedNode.value.position.x,
			y: Number(value)
		}
	});

	const entries: NodePositionEntry[] = [
		{
			nodeId: selectedNode.value?.id ?? '',
			before: before,
			after: structuredClone(toRaw(selectedNode.value.position))
		}
	];

	commit(createRepositionNodesCommand(entries));
}, DEFAULT_TIME_DEBOUNCE);

const handleWidthChange: NumberInputProps['onValueChange'] = useDebounceFn(({ value }) => {
	if (!selectedNode.value) return;
	const beforeWidth = selectedNode.value.width;
	const beforeHeight = selectedNode.value.height;

	updateNode(selectedNode.value.id, {
		width: Number(value)
	});

	const entries: NodeSizeEntry[] = [
		{
			nodeId: selectedNode.value?.id ?? '',
			beforeStyle: {
				width: `${beforeWidth}px`,
				height: `${beforeHeight} px`
			},
			afterStyle: {
				width: `${selectedNode.value.width}px`,
				height: `${selectedNode.value.height}px`
			}
		}
	];

	commit(createResizeNodesCommand(entries));
}, DEFAULT_TIME_DEBOUNCE);

const handleHeightChange: NumberInputProps['onValueChange'] = useDebounceFn(({ value }) => {
	if (!selectedNode.value) return;
	const beforeWidth = selectedNode.value.width;
	const beforeHeight = selectedNode.value.height;

	updateNode(selectedNode.value.id, {
		height: Number(value)
	});

	const entries: NodeSizeEntry[] = [
		{
			nodeId: selectedNode.value?.id ?? '',
			beforeStyle: {
				width: `${beforeWidth}px`,
				height: `${beforeHeight} px`
			},
			afterStyle: {
				width: `${selectedNode.value.width}px`,
				height: `${selectedNode.value.height}px`
			}
		}
	];

	commit(createResizeNodesCommand(entries));
}, DEFAULT_TIME_DEBOUNCE);

const handleFillChange = useDebounceFn((e: Event) => {
	const beforeData = structuredClone(toRaw(selectedNode.value?.data)) as BasicShapeNodeData;

	if (selectedNode.value) {
		updateNodeData(selectedNode.value.id, { fill: (e.target as HTMLInputElement).value });
	}

	const afterData = structuredClone(toRaw(selectedNode.value?.data)) as BasicShapeNodeData;

	commit(
		createUpdateNodeDataCommand([
			{
				nodeId: selectedNode.value?.id ?? '',
				beforeData,
				afterData
			}
		])
	);
}, DEFAULT_TIME_DEBOUNCE);

const hanldeStrokeWidthChange: SingleSliderProps['onUpdate:modelValue'] = useDebounceFn(
	(val: number) => {
		if (selectedNode.value) {
			updateNodeData(selectedNode.value.id, { strokeWidth: val });
		}
	},
	DEFAULT_TIME_DEBOUNCE
);
</script>

<template>
	<aside
		class="w-75 z-10 flex shrink-0 flex-col border-l border-gray-200 bg-white shadow-[-2px_0_5px_rgba(0,0,0,0.02)]"
	>
		<div class="border-b border-gray-100 px-4 py-3">
			<h2 class="text-md font-semibold uppercase tracking-wider text-gray-800">Properties</h2>
		</div>
		<div class="flex-1 space-y-6 overflow-y-auto p-4" v-if="selectedNode">
			<div class="space-y-3">
				<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Layout</h3>
				<div class="grid grid-cols-2 gap-3">
					<div>
						<NumberInput
							class="w-full"
							label="X"
							size="small"
							:model-value="nodeX"
							@value-change="handleXChange"
						/>
					</div>
					<div>
						<NumberInput
							class="w-full"
							label="Y"
							size="small"
							:model-value="nodeY"
							@value-change="handleYChange"
						/>
					</div>
					<div>
						<NumberInput
							class="w-full"
							label="width"
							size="small"
							:model-value="nodeWidth"
							@value-change="handleWidthChange"
						/>
					</div>
					<div>
						<NumberInput
							class="w-full"
							label="height"
							size="small"
							:model-value="nodeHeight"
							@value-change="handleHeightChange"
						/>
					</div>
				</div>
			</div>

			<!-- Appearance -->
			<div class="space-y-3">
				<h3 class="text-sm font-semibold uppercase tracking-wide text-gray-800">Appearance</h3>
				<div class="space-y-1">
					<label class="mb-1 text-sm text-gray-800">Background</label>

					<div class="flex items-center space-x-2">
						<div
							class="h-8 w-8 rounded border border-gray-300"
							:style="{ backgroundColor: nodeFill }"
						></div>
						<input
							type="text"
							:value="nodeFill"
							@change="handleFillChange"
							class="flex-1 rounded border border-gray-300 px-2 py-1.5 text-sm uppercase focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
				</div>
				<div class="space-y-4 pt-1">
					<SingleSlider
						label="Border Size"
						size="small"
						:model-value="nodeStrokeWidth"
						:min="0"
						:max="20"
						:step="1"
						editable
						@update:model-value="hanldeStrokeWidthChange"
					/>
				</div>
			</div>
		</div>

		<div v-else class="flex-1 p-4 text-center text-sm text-gray-500">
			Select a node to edit its properties
		</div>
	</aside>
</template>
