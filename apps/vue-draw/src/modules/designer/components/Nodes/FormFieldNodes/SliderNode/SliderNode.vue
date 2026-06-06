<script setup lang="ts">
	import { computed } from 'vue';
	import { SingleSlider } from '@packages/vue-components';
	import { useVueFlow } from '@vue-flow/core';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	export type SliderNodeProps = BaseCanvasNodeProps;

	const props = defineProps<SliderNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
	const { updateNodeData } = useVueFlow();

	const onInput = (value: number) => {
		updateNodeData(props.id, { value: value.toString() });
	};

	const onKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
	};

	const sliderValue = computed(() => {
		const val = Number(nodeConfig.value.value);
		return isNaN(val) ? 0 : val;
	});
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default>
			<SingleSlider
				class="w-full h-full pointer-events-auto"
				:model-value="sliderValue"
				:editable="true"
				@update:model-value="onInput"
				@keydown="onKeyDown"
			/>
		</template>
	</BaseCanvasNode>
</template>
