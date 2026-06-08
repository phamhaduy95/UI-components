<script setup lang="ts">
	import { computed, ref, nextTick, type CSSProperties } from 'vue';
	import { useKeyModifier, useEventListener } from '@vueuse/core';
	import { useVueFlow, type NodeProps } from '@vue-flow/core';
	import {
		NodeResizer,
		type NodeResizerProps,
		type OnResize,
		type OnResizeEnd,
		type OnResizeStart
	} from '@vue-flow/node-resizer';

	import { Chip } from '@packages/vue-components';

	import { useTagsStore } from '@/modules/designer/composables/useTagsStore';
	import { useRotation } from '@/modules/designer/composables/useRotation';
	import { useResize } from '@/modules/designer/composables/useResize';

	import BaseNodeConnector, { type ConnectorProps } from './BaseNodeConnector.vue';
	import { NodeCategory, type BaseNodeData } from '@/modules/designer/types/Node.type.ts';

	import {
		defaultNodeDimensions,
		resizerHandleStyle,
		resizerLineStyle
	} from '@/modules/designer/constant/default';

	import IconRotate from '@assets/toolbar-icons/rotate.svg';

	export interface BaseCanvasNodeProps extends NodeProps<BaseNodeData> {
		defaultNodeWidth?: number;
		defaultNodeHeight?: number;
		keepAspectRatio?: boolean;
		hideConnector?: boolean;
		connectors?: ConnectorProps[];
		keepDefaultRatio?: boolean;
		dynamicSize?: boolean;
	}

	const props = withDefaults(defineProps<BaseCanvasNodeProps>(), {
		defaultNodeWidth: defaultNodeDimensions.width,
		defaultNodeHeight: defaultNodeDimensions.height,
		keepDefaultRatio: false
	});

	type GenericResizerProps = NodeResizerProps & {
		selected: boolean;
		resizeStart: (event: OnResizeStart) => void;
		resize: (event: OnResize) => void;
		resizeEnd: (event: OnResizeEnd) => void;
		lineStyle?: CSSProperties;
		handleStyle?: CSSProperties;
		minWidth?: number;
		minHeight?: number;
		keepAspectRatio?: boolean;
	};

	export type BaseCanvasNodeSlots = {
		resizer?: (props: GenericResizerProps) => void;
		rotateHandler?: (props: { selected: boolean }) => void;
		connector?: (props: {
			isVisible: boolean;
			shapeWidth: number;
			shapeHeight: number;
			isNodeSelected: boolean;
		}) => void;
		default?: (props: { shapeWidth: number; shapeHeight: number }) => void;
	};

	defineSlots<BaseCanvasNodeSlots>();

	const isShift = useKeyModifier('Shift');

	const computedKeepAspectRatio = computed(() => {
		const isShiftPressed = Boolean(isShift.value);
		if (props.keepDefaultRatio) {
			return props.keepAspectRatio;
		}
		return isShiftPressed;
	});

	const { nodeRef, onRotateMouseDown: onRotateMouseDown, canRotate } = useRotation(props.id);
	const { onResizeStart, onResize, onResizeEnd } = useResize(props.id);

	const shapeWidth = computed(() => props.dimensions.width || props.defaultNodeWidth);
	const shapeHeight = computed(() => props.dimensions.height || props.defaultNodeHeight);

	const tagsStore = useTagsStore();
	const boundTags = computed(() => {
		const tagIds = props.data.tagIds || [];
		return tagsStore.tags.filter((t) => tagIds.includes(t.id));
	});

	const { updateNodeData } = useVueFlow();

	const unbindTag = (tagId: string) => {
		const newTagIds = props.data.tagIds?.filter((id) => id !== tagId) || [];
		updateNodeData(props.id, { tagIds: newTagIds });
	};

	const isEditing = ref(false);
	const textareaRef = ref<HTMLTextAreaElement | null>(null);

	const showLabel = computed(() => {
		return (
			props.data.category === NodeCategory.BasicShape ||
			props.data.category === NodeCategory.Industrial
		);
	});

	useEventListener('keydown', (e: KeyboardEvent) => {
		if (!props.selected || isEditing.value || !showLabel.value) return;

		const target = e.target as HTMLElement;
		if (
			target &&
			(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
		) {
			return;
		}

		if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
			isEditing.value = true;

			const newLabel = (props.data.label || '') + e.key;
			updateNodeData(props.id, { label: newLabel });

			e.preventDefault();

			nextTick(() => {
				if (textareaRef.value) {
					textareaRef.value.focus();
					textareaRef.value.setSelectionRange(
						textareaRef.value.value.length,
						textareaRef.value.value.length
					);
				}
			});
		} else if (e.key === 'Enter') {
			isEditing.value = true;
			e.preventDefault();
			nextTick(() => {
				if (textareaRef.value) {
					textareaRef.value.focus();
					textareaRef.value.setSelectionRange(
						textareaRef.value.value.length,
						textareaRef.value.value.length
					);
				}
			});
		}
	});

	const onDoubleClick = async () => {
		if (!showLabel.value) return;
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
		updateNodeData(props.id, { label: target.value });
	};

	const onLabelKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
		if (e.key === 'Escape') {
			textareaRef.value?.blur();
		}
	};
</script>

<template>
	<div
		ref="nodeRef"
		class="generic-shape-container relative overflow-visible rounded-none border border-dashed border-transparent bg-transparent"
		:style="{
			transform: `rotate(${props.data.rotation || 0}deg)`,
			width: dynamicSize ? 'max-content' : `${shapeWidth}px`,
			height: dynamicSize ? 'max-content' : `${shapeHeight}px`,
			top: '0px',
			left: '0px'
		}"
		@dblclick="onDoubleClick"
	>
		<slot
			name="rotateHandler"
			:selected="selected"
		>
			<div
				v-if="canRotate && selected"
				class="absolute left-1/2 top-0 flex h-6 w-6 -translate-x-1/2 -translate-y-full cursor-pointer items-center justify-center"
				@mousedown="onRotateMouseDown"
			>
				<IconRotate class="h-3 w-3 text-gray-500" />
			</div>
		</slot>
		<slot
			name="resizer"
			:selected="selected"
			:resize-start="onResizeStart"
			:resize="onResize"
			:resize-end="onResizeEnd"
			:line-style="resizerLineStyle"
			:handle-style="resizerHandleStyle"
			:min-width="24"
			:min-height="24"
			:keep-aspect-ratio="computedKeepAspectRatio"
		>
			<NodeResizer
				:is-visible="selected"
				:line-style="resizerLineStyle"
				:handle-style="resizerHandleStyle"
				:min-width="24"
				:min-height="24"
				:keep-aspect-ratio="computedKeepAspectRatio"
				@resize-start="onResizeStart"
				@resize="onResize"
				@resize-end="onResizeEnd"
			/>
		</slot>
		<slot
			v-if="!hideConnector"
			name="connector"
			:is-visible="selected"
			:shape-width="shapeWidth"
			:shape-height="shapeHeight"
			:is-node-selected="selected"
		>
			<BaseNodeConnector
				:is-visible="selected"
				:shape-width="shapeWidth"
				:shape-height="shapeHeight"
				:connectors="connectors"
				:is-node-selected="selected"
			/>
		</slot>
		<slot
			name="default"
			:shape-width="shapeWidth"
			:shape-height="shapeHeight"
		>
		</slot>

		<!-- Label Display -->
		<div
			v-if="showLabel"
			class="absolute inset-0 flex items-center justify-center pointer-events-none"
		>
			<textarea
				v-if="isEditing"
				ref="textareaRef"
				class="w-full h-full bg-transparent border-none outline-none resize-none overflow-hidden text-center pointer-events-auto p-2"
				:value="props.data.label"
				@input="onInput"
				@blur="onBlur"
				@keydown="onLabelKeyDown"
			/>
			<div
				v-else-if="props.data.label"
				class="w-full h-full whitespace-pre-wrap wrap-break-word flex flex-col justify-center text-center p-2"
			>
				{{ props.data.label }}
			</div>
		</div>

		<!-- Tag Display -->
		<div
			v-if="boundTags.length > 0 && props.data.showTag"
			class="absolute -right-1 translate-x-full top-0 translate-y-2 pointer-events-none z-10 flex flex-col gap-1"
		>
			<Chip
				v-for="boundTag in boundTags"
				:key="boundTag.id"
				:label="boundTag.value"
				removable
				color="primary"
				size="sm"
				class="pointer-events-auto w-min"
				@remove="unbindTag(boundTag.id)"
			/>
		</div>
	</div>
</template>
