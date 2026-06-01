<script setup lang="ts">
	import { TextInput } from '@packages/vue-components';
	import { useDnD } from '@/modules/designer/composables/useDnD';
	import { useTagsStore } from '@/modules/designer/composables/useTagsStore';

	const { onPaletteDragStart } = useDnD();
	const tagsStore = useTagsStore();
</script>

<template>
	<div class="flex flex-col h-full">
		<div class="border-b border-gray-100 px-4 py-3 shrink-0">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-800">Value Tags</h2>
		</div>
		<ul class="p-4 flex-1 space-y-3 overflow-y-auto">
			<li
				v-for="tag in tagsStore.tags"
				:key="tag.id"
				class="flex flex-col gap-1 p-2 bg-gray-50 border border-gray-200 rounded cursor-grab active:cursor-grabbing"
				draggable="true"
				@dragstart="onPaletteDragStart($event, { isTag: true, tag } as any)"
			>
				<span class="text-xs font-semibold text-gray-700">{{ tag.label }}</span>
				<TextInput
					v-model="tag.value"
					size="sm"
					@pointerdown.stop
					@mousedown.stop
				/>
			</li>
		</ul>
	</div>
</template>
