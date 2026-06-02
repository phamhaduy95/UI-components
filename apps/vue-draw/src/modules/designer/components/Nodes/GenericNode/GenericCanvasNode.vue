<script setup lang="ts">
	import type { NodeProps } from '@vue-flow/core';
	import {
		NodeResizer,
		type NodeResizerProps,
		type OnResize,
		type OnResizeEnd,
		type OnResizeStart
	} from '@vue-flow/node-resizer';
	import { computed, type CSSProperties } from 'vue';

	import { useResize } from '@/modules/designer/composables/useResize';
	import { useRotation } from '@/modules/designer/composables/useRotation';
	import GenericNodeConnector, { type ConnectorProps } from './GenericNodeConnector.vue';

	import type { DesignerNodeData } from '@/modules/designer/types/Node.type.ts';

	import IconRotate from '@/assets/icons/rotate.svg';
	import {
		defaultNodeDimensions,
		resizerHandleStyle,
		resizerLineStyle
	} from '@/modules/designer/constant/default';
	import { useTagsStore } from '@/modules/designer/composables/useTagsStore';
	import { useKeyModifier } from '@vueuse/core';

	export interface GenericCanvasNodeProps extends NodeProps<DesignerNodeData> {
		defaultNodeWidth?: number;
		defaultNodeHeight?: number;
		keepAspectRatio?: boolean;
		hideConnector?: boolean;
		connectors?: ConnectorProps[];
		keepDefaultRatio?: boolean;
	}

	const props = withDefaults(defineProps<GenericCanvasNodeProps>(), {
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

	export type GenericCanvasNodeSlots = {
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

	defineSlots<GenericCanvasNodeSlots>();

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
</script>

<template>
	<div
		ref="nodeRef"
		class="generic-shape-container relative overflow-visible rounded-none border border-dashed border-transparent bg-transparent"
		:style="{
			transform: `rotate(${props.data.rotation || 0}deg)`,
			width: `${shapeWidth}px`,
			height: `${shapeHeight}px`,
			top: '0px',
			left: '0px'
		}"
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
			<GenericNodeConnector
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

		<!-- Tag Display -->
		<div
			v-if="boundTags.length > 0 && props.data.showTag"
			class="absolute -right-1 translate-x-full top-0 translate-y-2 pointer-events-none z-10 flex flex-col gap-1"
		>
			<span
				v-for="boundTag in boundTags"
				:key="boundTag.id"
				class="px-2 py-0.5 w-max rounded text-xs font-medium text-gray-700 bg-purple-100 border border-purple-200 pointer-events-auto"
			>
				{{ boundTag.value }}
			</span>
		</div>
	</div>
</template>
