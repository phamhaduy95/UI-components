<script setup lang="ts">
	import { computed, ref, nextTick } from 'vue';
	import { useVueFlow } from '@vue-flow/core';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import type { TextNodeData } from '@/modules/designer/types/Node.type';

	export type TextNodeProps = BaseCanvasNodeProps;

	const props = defineProps<TextNodeProps>();

	const nodeConfig = computed(() => props.data as TextNodeData);
	const { updateNodeData } = useVueFlow();

	const isEditing = ref(false);
	const textareaRef = ref<HTMLTextAreaElement | null>(null);

	const onDoubleClick = async () => {
		isEditing.value = true;
		await nextTick();
		if (textareaRef.value) {
			textareaRef.value.focus();
			textareaRef.value.setSelectionRange(
				textareaRef.value.value.length,
				textareaRef.value.value.length
			);
		}
	};

	const onBlur = () => {
		isEditing.value = false;
	};

	const onInput = (e: Event) => {
		const target = e.target as HTMLTextAreaElement;
		updateNodeData(props.id, { content: target.value });
	};

	const onKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
	};
</script>

<template>
	<BaseCanvasNode
		v-bind="props"
		@dblclick="onDoubleClick"
	>
		<div
			class="h-full w-full flex items-center justify-center p-2"
			:style="{
				color: nodeConfig.color || '#000000',
				fontSize: `${nodeConfig.fontSize || 16}px`,
				fontWeight: nodeConfig.fontWeight || 'normal',
				textAlign: nodeConfig.textAlign || 'center'
			}"
		>
			<textarea
				v-if="isEditing"
				ref="textareaRef"
				class="w-full h-full bg-transparent border-none outline-none resize-none overflow-hidden text-inherit font-inherit text-center"
				:style="{
					textAlign: nodeConfig.textAlign || 'center'
				}"
				:value="nodeConfig.content"
				@input="onInput"
				@blur="onBlur"
				@keydown="onKeyDown"
			/>
			<div
				v-else
				class="w-full h-full whitespace-pre-wrap wrap-break-word select-none pointer-events-none flex flex-col justify-center"
				:style="{
					textAlign: nodeConfig.textAlign || 'center'
				}"
			>
				{{ nodeConfig.content || 'Double click to edit' }}
			</div>
		</div>
	</BaseCanvasNode>
</template>
