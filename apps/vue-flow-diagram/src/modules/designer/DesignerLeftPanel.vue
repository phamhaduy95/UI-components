<script setup lang="ts">
import IconPump from '@icons/pump.svg';

const onDragStart = (event: DragEvent, nodeType: string) => {
	if (event.dataTransfer) {
		event.dataTransfer.setData('application/vueflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	}
};
</script>

<template>
	<aside
		class="z-10 flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
	>
		<div class="border-b border-gray-100 px-4 py-3">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-800">Asset Library</h2>
		</div>
		<div class="flex-1 space-y-4 overflow-y-auto p-4">
			<!-- Basic Shapes -->
			<div class="space-y-2">
				<h3 class="text-xs font-medium uppercase text-gray-500">Basic Shapes</h3>
				<div
					class="flex w-full cursor-grab items-center rounded border border-gray-200 p-3 transition-colors hover:bg-gray-50 active:cursor-grabbing"
					draggable="true"
					@dragstart="onDragStart($event, 'rectangle')"
				>
					<div class="mr-3 h-4 w-6 rounded-sm border-2 border-gray-400"></div>
					<span class="text-sm font-medium text-gray-700">Rectangle</span>
				</div>

				<div
					class="flex w-full cursor-grab items-center rounded border border-gray-200 p-3 transition-colors hover:bg-gray-50 active:cursor-grabbing"
					draggable="true"
					@dragstart="onDragStart($event, 'circle')"
				>
					<div class="mr-3 h-5 w-5 rounded-full border-2 border-gray-400"></div>
					<span class="text-sm font-medium text-gray-700">Circle</span>
				</div>
			</div>

			<!-- Industrial Components -->
			<div class="space-y-2">
				<h3 class="text-xs font-medium uppercase text-gray-500">Industrial Components</h3>
				<div
					class="flex w-full cursor-grab items-center rounded border border-gray-200 p-3 transition-colors hover:bg-gray-50 active:cursor-grabbing"
					draggable="true"
					@dragstart="onDragStart($event, 'pump')"
				>
					<IconPump class="mr-3 h-5 w-5 text-gray-500" />
					<span class="text-sm font-medium text-gray-700">Pump</span>
				</div>
			</div>
		</div>
	</aside>
</template>
