<script setup lang="ts">
	import { useGrouping } from '@/modules/designer/composables/useGrouping';
	import { useZoom } from '@/modules/designer/composables/useZoom';
	import { useZindex } from '@/modules/designer/composables/useZindex';
	import { useHistory } from '@/modules/designer/composables/useHistory';
	import { useClipboard } from '@/modules/designer/composables/useClipboard';
	import { useImportExport } from '@/modules/designer/composables/useImportExport';

	import IconBringToFront from '@assets/toolbar-icons/bring-to-front.svg';
	import IconGroup from '@assets/toolbar-icons/group.svg';
	import IconRedo from '@assets/toolbar-icons/redo.svg';
	import IconSendToBack from '@assets/toolbar-icons/send-to-back.svg';
	import IconUndo from '@assets/toolbar-icons/undo.svg';
	import IconUnGroup from '@assets/toolbar-icons/ungroup.svg';
	import IconZoomIn from '@assets/toolbar-icons/zoom-in.svg';
	import IconZoomOut from '@assets/toolbar-icons/zoom-out.svg';
	import IconFitView from '@assets/toolbar-icons/fit-view.svg';
	import IconResetZoom from '@assets/toolbar-icons/reset-zoom.svg';
	import IconCopy from '@assets/toolbar-icons/copy.svg';
	import IconPaste from '@assets/toolbar-icons/paste.svg';

	const { groupSelectedNodes, ungroup, canGroup, canUngroup } = useGrouping();
	const { zoomIn, zoomOut, canZoomIn, canZoomOut, fitView, resetZoom, zoomPercentage } = useZoom();

	const { canCopy, canPaste, copyNodes, pasteNodes } = useClipboard();
	const { bringToFront, sendToBack, canChangeZIndex } = useZindex();
	const { undo, redo, canUndo, canRedo } = useHistory();

	const { exportGraph, importGraph } = useImportExport();
</script>

<template>
	<div class="flex flex-1 items-center justify-between">
		<!-- Left Actions -->
		<div class="flex items-center space-x-1">
			<button
				class="toolbar-btn tooltip-trigger rounded p-1 focus:outline-none"
				:class="
					canUndo
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canUndo"
				title="Undo"
				@click="undo()"
			>
				<IconUndo class="h-4 w-4" />
			</button>
			<button
				class="toolbar-btn tooltip-trigger rounded p-1 focus:outline-none"
				:class="
					canRedo
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canRedo"
				title="Redo"
				@click="redo()"
			>
				<IconRedo class="h-4 w-4" />
			</button>

			<div class="mx-1 h-4 w-px bg-gray-300"></div>

			<!-- Copy/Paste -->
			<button
				class="toolbar-btn tooltip-trigger rounded p-1 focus:outline-none"
				:class="
					canCopy
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canCopy"
				title="Copy"
				@click="copyNodes()"
			>
				<IconCopy class="h-4 w-4" />
			</button>
			<button
				class="toolbar-btn tooltip-trigger rounded p-1 focus:outline-none"
				:class="
					canPaste
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canPaste"
				title="Paste"
				@click="pasteNodes({})"
			>
				<IconPaste class="h-4 w-4" />
			</button>

			<div class="mx-1 h-4 w-px bg-gray-300"></div>

			<!-- Group button -->
			<button
				class="toolbar-btn tooltip-trigger rounded p-1 focus:outline-none"
				:class="canGroup ? 'cursor-pointer' : 'cursor-not-allowed text-gray-300'"
				:disabled="!canGroup"
				title="Grouping"
				@click="groupSelectedNodes"
			>
				<IconGroup class="h-4 w-4" />
			</button>

			<!-- Ungroup button -->
			<button
				class="toolbar-btn tooltip-trigger rounded px-2 py-1 text-xs font-semibold focus:outline-none"
				:class="canUngroup ? 'cursor-pointer' : 'cursor-not-allowed text-gray-300'"
				:disabled="!canUngroup"
				title="Ungrouping"
				@click="ungroup"
			>
				<IconUnGroup class="h-4 w-4" />
			</button>

			<div class="mx-1 h-4 w-px bg-gray-300"></div>

			<button
				class="toolbar-btn tooltip-trigger rounded p-1 focus:outline-none"
				:class="
					canChangeZIndex
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canChangeZIndex"
				title="Bring to Front"
				@click="bringToFront"
			>
				<IconBringToFront class="h-4 w-4" />
			</button>
			<button
				class="toolbar-btn tooltip-trigger rounded p-1 focus:outline-none"
				:class="
					canChangeZIndex
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canChangeZIndex"
				title="Send to Back"
				@click="sendToBack"
			>
				<IconSendToBack class="h-4 w-4" />
			</button>

			<div class="mx-1 h-4 w-px bg-gray-300"></div>

			<button
				class="tooltip-trigger rounded p-1 focus:outline-none"
				:class="
					canZoomIn
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canZoomIn"
				title="Zoom In"
				@click="zoomIn()"
			>
				<IconZoomIn class="h-4 w-4" />
			</button>
			<span class="mx-1 w-10 text-center text-xs font-medium text-gray-600 select-none">
				{{ zoomPercentage }}%
			</span>
			<button
				class="tooltip-trigger rounded p-1 focus:outline-none"
				:class="
					canZoomOut
						? 'cursor-pointer text-gray-600 hover:bg-gray-100'
						: 'cursor-not-allowed text-gray-300'
				"
				:disabled="!canZoomOut"
				title="Zoom Out"
				@click="zoomOut()"
			>
				<IconZoomOut class="h-4 w-4" />
			</button>
			<button
				class="tooltip-trigger cursor-pointer rounded p-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Fit to View"
				@click="fitView()"
			>
				<IconFitView class="h-4 w-4" />
			</button>
			<button
				class="tooltip-trigger cursor-pointer rounded p-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Reset Zoom"
				@click="resetZoom()"
			>
				<IconResetZoom class="h-4 w-4" />
			</button>
		</div>

		<!-- Right Actions -->
		<div class="flex items-center space-x-1">
			<button
				class="toolbar-btn tooltip-trigger flex items-center gap-1 rounded bg-gray-50 text-gray-600 border border-gray-200 px-2 py-1 text-xs font-semibold focus:outline-none hover:bg-gray-100 transition-colors"
				title="Import Graph from JSON"
				@click="importGraph()"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
					<polyline points="17 8 12 3 7 8"></polyline>
					<line
						x1="12"
						y1="3"
						x2="12"
						y2="15"
					></line>
				</svg>
				Import
			</button>
			<button
				class="toolbar-btn tooltip-trigger flex items-center gap-1 rounded bg-indigo-50 text-indigo-600 border border-transparent px-2 py-1 text-xs font-semibold focus:outline-none hover:bg-indigo-100 transition-colors"
				title="Export Graph to JSON"
				@click="exportGraph()"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
					<polyline points="17 21 17 13 7 13 7 21"></polyline>
					<polyline points="7 3 7 8 15 8"></polyline>
				</svg>
				Save
			</button>
		</div>
	</div>
</template>
