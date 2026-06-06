<script setup lang="ts">
	import { computed } from 'vue';
	import { Checkbox } from '@packages/vue-components';
	import { useVueFlow } from '@vue-flow/core';
	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	export type CheckboxNodeProps = GenericCanvasNodeProps;

	const props = defineProps<CheckboxNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
	const { updateNodeData } = useVueFlow();

	const onInput = (checked: boolean) => {
		updateNodeData(props.id, { value: checked ? 'true' : 'false' });
	};

	const onKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
	};

	const isChecked = computed(() => nodeConfig.value.value === 'true');
</script>

<template>
	<GenericCanvasNode v-bind="props">
		<template #default>
			<Checkbox
				class="w-full h-full pointer-events-auto flex items-center justify-center"
				:checked="isChecked"
				@update:checked="onInput"
				@keydown="onKeyDown"
			/>
		</template>
	</GenericCanvasNode>
</template>
