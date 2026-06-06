<script setup lang="ts">
	import { computed } from 'vue';
	import { TextInput } from '@packages/vue-components';
	import { useVueFlow } from '@vue-flow/core';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	export type TextFieldNodeProps = BaseCanvasNodeProps;

	const props = defineProps<TextFieldNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
	const { updateNodeData } = useVueFlow();

	const onInput = (value: string) => {
		updateNodeData(props.id, { value });
	};

	const onKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
	};
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default>
			<TextInput
				class="w-full h-full pointer-events-auto"
				:placeholder="nodeConfig.placeholder"
				@update:model-value="onInput"
				@keydown="onKeyDown"
			/>
		</template>
	</BaseCanvasNode>
</template>
