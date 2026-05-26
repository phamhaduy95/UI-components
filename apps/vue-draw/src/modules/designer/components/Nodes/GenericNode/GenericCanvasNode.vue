<script setup lang="ts">
	import { computed, type CSSProperties } from 'vue';
	import type { NodeProps } from '@vue-flow/core';
	import {
		NodeResizer,
		type NodeResizerProps,
		type OnResize,
		type OnResizeEnd,
		type OnResizeStart
	} from '@vue-flow/node-resizer';

	import { useRotation } from '@/modules/designer/composables/useRotation';
	import { useResize } from '@/modules/designer/composables/useResize';
	import GenericNodeConnector from './GenericNodeConnector.vue';

	import type { BasicShapeNodeData, GroupNodeData } from '@/modules/designer/types/Node.type.ts';

	import IconRotate from '@/assets/icons/rotate.svg';
	import { resizerHandleStyle, resizerLineStyle } from '@/modules/designer/constant/default';

	const DEFAULT_NODE_WIDTH = 64;
	const DEFAULT_NODE_HEIGHT = 64;

	export interface GenericCanvasNodeProps extends NodeProps<BasicShapeNodeData | GroupNodeData> {
		defaultNodeWidth?: number;
		defaultNodeHeight?: number;
		keepAspectRatio?: boolean;
	}

	const props = withDefaults(defineProps<GenericCanvasNodeProps>(), {
		defaultNodeWidth: DEFAULT_NODE_WIDTH,
		defaultNodeHeight: DEFAULT_NODE_HEIGHT,
		keepAspectRatio: false
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
		connector?: (props: { isVisible: boolean }) => void;
		default?: (props: { shapeWidth: number; shapeHeight: number }) => void;
	};

	defineSlots<GenericCanvasNodeSlots>();

	const { nodeRef, onRotateMouseDown: onRotateMouseDown, canRotate } = useRotation(props.id);
	const { onResizeStart, onResize, onResizeEnd } = useResize(props.id);

	const shapeWidth = computed(() => props.dimensions.width || props.defaultNodeWidth);
	const shapeHeight = computed(() => props.dimensions.height || props.defaultNodeHeight);
</script>

<template>
	<div
		ref="nodeRef"
		class="generic-shape-container relative flex items-center justify-center overflow-visible rounded-none border border-dashed border-transparent bg-transparent"
		:style="{
			transform: `rotate(${props.data.rotation || 0}deg)`,
			width: `${shapeWidth}px`,
			height: `${shapeHeight}px`
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
			:keep-aspect-ratio="keepAspectRatio"
		>
			<NodeResizer
				:is-visible="selected"
				:line-style="resizerLineStyle"
				:handle-style="resizerHandleStyle"
				:min-width="24"
				:min-height="24"
				:keep-aspect-ratio="keepAspectRatio"
				@resize-start="onResizeStart"
				@resize="onResize"
				@resize-end="onResizeEnd"
			/>
		</slot>
		<slot
			name="connector"
			:is-visible="selected"
		>
			<GenericNodeConnector :is-visible="selected" />
		</slot>
		<slot
			name="default"
			:shape-width="shapeWidth"
			:shape-height="shapeHeight"
		>
		</slot>
	</div>
</template>
