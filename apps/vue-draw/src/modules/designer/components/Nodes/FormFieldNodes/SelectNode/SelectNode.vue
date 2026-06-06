<script setup lang="ts">
	import { computed } from 'vue';
	import { SingleSelect } from '@packages/vue-components';
	import { useVueFlow } from '@vue-flow/core';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	export type SelectNodeProps = BaseCanvasNodeProps;

	const props = defineProps<SelectNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
	const { updateNodeData } = useVueFlow();

	const onInput = (value: string) => {
		updateNodeData(props.id, { value });
	};

	const onKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
	};

	const mockItems = [
		{ label: 'Option 1', value: '1' },
		{ label: 'Option 2', value: '2' },
		{ label: 'Option 3', value: '3' }
	];
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default>
			<SingleSelect
				class="w-full h-full pointer-events-auto"
				:placeholder="nodeConfig.placeholder || 'Select...'"
				:model-value="nodeConfig.value"
				:items="mockItems"
				@update:model-value="onInput"
				@keydown="onKeyDown"
			/>
		</template>
	</BaseCanvasNode>
</template>
