<script setup lang="ts">
	import { computed } from 'vue';
	import { DatePicker } from '@packages/vue-components';
	import { useVueFlow } from '@vue-flow/core';

	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';

	export type DatePickerNodeProps = BaseCanvasNodeProps;

	const props = defineProps<DatePickerNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
	const { updateNodeData } = useVueFlow();

	const dateValue = computed(() => {
		if (nodeConfig.value.value) {
			return new Date(nodeConfig.value.value);
		}
		return null;
	});

	const onDateUpdate = (date: Date | null) => {
		updateNodeData(props.id, { value: date ? date.toISOString() : null });
	};
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default>
			<DatePicker
				class="w-full h-full pointer-events-auto"
				:placeholder="nodeConfig.placeholder"
				:model-value="dateValue"
				:disabled="nodeConfig.disabled"
				@update:model-value="onDateUpdate"
			/>
		</template>
	</BaseCanvasNode>
</template>
