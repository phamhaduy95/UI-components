<script setup lang="ts">
	import { computed } from 'vue';
	import { TextInput } from '@packages/vue-components';
	import { useVueFlow } from '@vue-flow/core';
	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import type { TextFieldNodeData } from '@/modules/designer/types/Node.type';

	export type TextFieldNodeProps = GenericCanvasNodeProps;

	const props = defineProps<TextFieldNodeProps>();

	const nodeConfig = computed(() => props.data as TextFieldNodeData);
	const { updateNodeData } = useVueFlow();

	const onInput = (value: string) => {
		updateNodeData(props.id, { value });
	};

	const onKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
	};
</script>

<template>
	<GenericCanvasNode v-bind="props">
		<template #default>
			<TextInput
				class="w-full h-full pointer-events-auto"
				:placeholder="nodeConfig.placeholder"
				@update:model-value="onInput"
				@keydown="onKeyDown"
			/>
		</template>
	</GenericCanvasNode>
</template>
