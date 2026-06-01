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

	export interface GenericCanvasNodeProps extends NodeProps<DesignerNodeData> {
		defaultNodeWidth?: number;
		defaultNodeHeight?: number;
		keepAspectRatio?: boolean;
		hideConnector?: boolean;
		connectors?: ConnectorProps[];
	}

	const props = withDefaults(defineProps<GenericCanvasNodeProps>(), {
		defaultNodeWidth: defaultNodeDimensions.width,
		defaultNodeHeight: defaultNodeDimensions.height,
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
		connector?: (props: {
			isVisible: boolean;
			shapeWidth: number;
			shapeHeight: number;
			isNodeSelected: boolean;
		}) => void;
		default?: (props: { shapeWidth: number; shapeHeight: number }) => void;
	};

	defineSlots<GenericCanvasNodeSlots>();

	const { nodeRef, onRotateMouseDown: onRotateMouseDown, canRotate } = useRotation(props.id);
	const { onResizeStart, onResize, onResizeEnd } = useResize(props.id);

	const shapeWidth = computed(() => props.dimensions.width || props.defaultNodeWidth);
	const shapeHeight = computed(() => props.dimensions.height || props.defaultNodeHeight);

	const tagsStore = useTagsStore();
	const boundTag = computed(() => tagsStore.tags.find((t) => t.id === props.data.tagId));
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
			v-if="boundTag && props.data.showTag"
			class="absolute left-0 -top-2 -translate-y-full pointer-events-none z-10"
		>
			<span
				class="px-2 py-0.5 rounded text-[10px] font-medium text-purple-700 bg-purple-100 border border-purple-200 shadow-sm pointer-events-auto flex items-center gap-1"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="10"
					height="10"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
					/>
					<circle
						cx="7.5"
						cy="7.5"
						r=".5"
						fill="currentColor"
					/>
				</svg>
				{{ boundTag.label }}: {{ boundTag.value }}
			</span>
		</div>
	</div>
</template>
