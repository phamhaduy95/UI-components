<script setup lang="ts">
import IconUndo from '@icons/undo.svg';
import IconRedo from '@icons/redo.svg';
import IconGroup from '@icons/group.svg';
import IconBringToFront from '@icons/bring-to-front.svg';
import IconSendToBack from '@icons/send-to-back.svg';
import IconZoomIn from '@icons/zoom-in.svg';
import IconZoomOut from '@icons/zoom-out.svg';

defineEmits<{
	(e: 'undo'): void;
	(e: 'redo'): void;
	(e: 'group'): void;
	(e: 'bring-to-front'): void;
	(e: 'send-to-back'): void;
	(e: 'zoom-in'): void;
	(e: 'zoom-out'): void;
	(e: 'load'): void;
	(e: 'save'): void;
}>();
</script>

<template>
	<div class="flex flex-1 items-center justify-between">
		<!-- Left Actions -->
		<div class="flex items-center space-x-2">
			<button
				class="tooltip-trigger rounded p-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Undo"
				@click="$emit('undo')"
			>
				<IconUndo class="h-[18px] w-[18px]" />
			</button>
			<button
				class="tooltip-trigger rounded p-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Redo"
				@click="$emit('redo')"
			>
				<IconRedo class="h-[18px] w-[18px]" />
			</button>

			<div class="mx-2 h-5 w-px bg-gray-300"></div>

			<button
				class="tooltip-trigger rounded p-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Group"
				@click="$emit('group')"
			>
				<IconGroup class="h-[18px] w-[18px]" />
			</button>

			<div class="mx-2 h-5 w-px bg-gray-300"></div>

			<button
				class="tooltip-trigger rounded p-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Bring to Front"
				@click="$emit('bring-to-front')"
			>
				<IconBringToFront class="h-[18px] w-[18px]" />
			</button>
			<button
				class="tooltip-trigger rounded p-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Send to Back"
				@click="$emit('send-to-back')"
			>
				<IconSendToBack class="h-[18px] w-[18px]" />
			</button>

			<div class="mx-2 h-5 w-px bg-gray-300"></div>

			<button
				class="tooltip-trigger rounded p-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Zoom In"
				@click="$emit('zoom-in')"
			>
				<IconZoomIn class="h-[18px] w-[18px]" />
			</button>
			<button
				class="tooltip-trigger rounded p-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none"
				title="Zoom Out"
				@click="$emit('zoom-out')"
			>
				<IconZoomOut class="h-[18px] w-[18px]" />
			</button>
		</div>

		<!-- Right Actions -->
		<div class="flex items-center space-x-2">
			<button
				class="rounded border border-gray-300 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none"
				@click="$emit('load')"
			>
				Load
			</button>
			<button
				class="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none"
				@click="$emit('save')"
			>
				Save
			</button>
		</div>
	</div>
</template>
