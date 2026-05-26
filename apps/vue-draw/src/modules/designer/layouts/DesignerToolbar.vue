<script setup lang="ts">
	import { useGrouping } from '@/modules/designer/composables/useGrouping';
	import { useZoom } from '@/modules/designer/composables/useZoom';
	import { useZindex } from '@/modules/designer/composables/useZindex';
	import { useHistory } from '@/modules/designer/composables/useHistory';
	import { useClipboard } from '@/modules/designer/composables/useClipboard';

	import IconBringToFront from '@icons/bring-to-front.svg';
	import IconGroup from '@icons/group.svg';
	import IconRedo from '@icons/redo.svg';
	import IconSendToBack from '@icons/send-to-back.svg';
	import IconUndo from '@icons/undo.svg';
	import IconUnGroup from '@icons/ungroup.svg';
	import IconZoomIn from '@icons/zoom-in.svg';
	import IconZoomOut from '@icons/zoom-out.svg';
	import IconFitView from '@icons/fit-view.svg';
	import IconResetZoom from '@icons/reset-zoom.svg';
	import IconCopy from '@icons/copy.svg';
	import IconPaste from '@icons/paste.svg';

	const { groupSelectedNodes, ungroup, canGroup, canUngroup } = useGrouping();
	const { zoomIn, zoomOut, canZoomIn, canZoomOut, fitView, resetZoom, zoomPercentage } = useZoom();

	const { canCopy, canPaste, copyNodes, pasteNodes } = useClipboard();
	const { bringToFront, sendToBack, canChangeZIndex } = useZindex();
	const { undo, redo, canUndo, canRedo } = useHistory();
</script>

<template>
	<div class="flex flex-1 items-center justify-between">
		<!-- Left Actions -->
		<div class="flex items-center space-x-2">
			<button
				class="toolbar-btn tooltip-trigger rounded p-1.5 focus:outline-none"
				:class="
					canUndo
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canUndo"
				title="Undo"
				@click="undo()"
			>
				<IconUndo class="h-[18px] w-[18px]" />
			</button>
			<button
				class="toolbar-btn tooltip-trigger rounded p-1.5 focus:outline-none"
				:class="
					canRedo
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canRedo"
				title="Redo"
				@click="redo()"
			>
				<IconRedo class="h-[18px] w-[18px]" />
			</button>

			<div class="mx-2 h-5 w-px bg-gray-300"></div>

			<!-- Copy/Paste -->
			<button
				class="toolbar-btn tooltip-trigger rounded p-1.5 focus:outline-none"
				:class="
					canCopy
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canCopy"
				title="Copy"
				@click="copyNodes()"
			>
				<IconCopy class="h-[18px] w-[18px]" />
			</button>
			<button
				class="toolbar-btn tooltip-trigger rounded p-1.5 focus:outline-none"
				:class="
					canPaste
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canPaste"
				title="Paste"
				@click="pasteNodes({})"
			>
				<IconPaste class="h-[18px] w-[18px]" />
			</button>

			<div class="mx-2 h-5 w-px bg-gray-300"></div>

			<!-- Group button -->
			<button
				class="toolbar-btn tooltip-trigger rounded p-1.5 focus:outline-none"
				:class="canGroup ? 'cursor-pointer' : 'cursor-not-allowed text-gray-300'"
				:disabled="!canGroup"
				title="Grouping"
				@click="groupSelectedNodes"
			>
				<IconGroup class="h-[18px] w-[18px]" />
			</button>

			<!-- Ungroup button -->
			<button
				class="toolbar-btn tooltip-trigger rounded px-2 py-1 text-xs font-semibold focus:outline-none"
				:class="canUngroup ? 'cursor-pointer' : 'cursor-not-allowed text-gray-300'"
				:disabled="!canUngroup"
				title="Ungrouping"
				@click="ungroup"
			>
				<IconUnGroup class="h-[18px] w-[18px]" />
			</button>

			<div class="mx-2 h-5 w-px bg-gray-300"></div>

			<button
				class="toolbar-btn tooltip-trigger rounded p-1.5 focus:outline-none"
				:class="
					canChangeZIndex
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canChangeZIndex"
				title="Bring to Front"
				@click="bringToFront"
			>
				<IconBringToFront class="h-[18px] w-[18px]" />
			</button>
			<button
				class="toolbar-btn tooltip-trigger rounded p-1.5 focus:outline-none"
				:class="
					canChangeZIndex
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canChangeZIndex"
				title="Send to Back"
				@click="sendToBack"
			>
				<IconSendToBack class="h-[18px] w-[18px]" />
			</button>

			<div class="mx-2 h-5 w-px bg-gray-300"></div>

			<button
				class="tooltip-trigger rounded p-1.5 focus:outline-none"
				:class="
					canZoomIn
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canZoomIn"
				title="Zoom In"
				@click="zoomIn()"
			>
				<IconZoomIn class="h-[18px] w-[18px]" />
			</button>
			<span class="mx-1 w-10 text-center text-xs font-medium text-gray-600 select-none">
				{{ zoomPercentage }}%
			</span>
			<button
				class="tooltip-trigger rounded p-1.5 focus:outline-none"
				:class="
					canZoomOut
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canZoomOut"
				title="Zoom Out"
				@click="zoomOut()"
			>
				<IconZoomOut class="h-[18px] w-[18px]" />
			</button>
			<button
				class="tooltip-trigger cursor-pointer rounded p-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Fit to View"
				@click="fitView()"
			>
				<IconFitView class="h-[18px] w-[18px]" />
			</button>
			<button
				class="tooltip-trigger cursor-pointer rounded p-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Reset Zoom"
				@click="resetZoom()"
			>
				<IconResetZoom class="h-[18px] w-[18px]" />
			</button>
		</div>
	</div>
</template>
