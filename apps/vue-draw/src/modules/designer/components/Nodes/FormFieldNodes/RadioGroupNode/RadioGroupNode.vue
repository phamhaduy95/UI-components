<script setup lang="ts">
	import { computed } from 'vue';
	import { RadioGroup } from '@packages/vue-components';
	import { useVueFlow } from '@vue-flow/core';
	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	export type RadioGroupNodeProps = GenericCanvasNodeProps;

	const props = defineProps<RadioGroupNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
	const { updateNodeData } = useVueFlow();

	const onInput = (value: string) => {
		updateNodeData(props.id, { value });
	};

	const onKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
	};

	const mockOptions = [{ label: 'Option 1', value: 'option-1' }];
</script>

<template>
	<GenericCanvasNode v-bind="props">
		<template #default>
			<RadioGroup
				class="w-full h-full pointer-events-auto"
				:model-value="nodeConfig.value"
				:options="mockOptions"
				@update:model-value="onInput"
				@keydown="onKeyDown"
			/>
		</template>
	</GenericCanvasNode>
</template>
