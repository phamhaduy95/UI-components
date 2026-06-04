<script setup lang="ts">
	import { computed } from 'vue';
	import { NumberInput } from '@packages/vue-components';
	import { useVueFlow } from '@vue-flow/core';
	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	export type SpinnerNodeProps = GenericCanvasNodeProps;

	const props = defineProps<SpinnerNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
	const { updateNodeData } = useVueFlow();

	const onInput = (value: number | null) => {
		updateNodeData(props.id, { value: value === null ? '' : value.toString() });
	};

	const onKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
	};

	const spinnerValue = computed(() => {
		const val = Number(nodeConfig.value.value);
		return isNaN(val) ? 0 : val;
	});
</script>

<template>
	<GenericCanvasNode v-bind="props">
		<template #default>
			<NumberInput
				class="w-full h-full pointer-events-auto"
				:model-value="spinnerValue"
				@update:model-value="onInput"
				@keydown="onKeyDown"
			/>
		</template>
	</GenericCanvasNode>
</template>
