<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { useVueFlow } from '@vue-flow/core';
	import { useClipboard } from '@/modules/designer/composables/useClipboard';
	import { useNodeCreation } from '@/modules/designer/composables/useNodeCreation';
	import { Popover } from '@packages/vue-components';

	const props = defineProps<{
		nodeId: string;
		x: number;
		y: number;
	}>();

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const { findNode } = useVueFlow();
	const { copyNodes, pasteNodes, canPaste } = useClipboard();
	const { removeNodes } = useNodeCreation();

	const open = ref(true);

	const positioningProps = computed(() => ({
		getAnchorRect: () => new DOMRect(props.x, props.y, 0, 0),
		placement: 'bottom-start' as const,
		offset: { mainAxis: 2 }
	}));

	const handleCopy = () => {
		const node = findNode(props.nodeId);
		if (node) {
			node.selected = true;
			copyNodes();
		}
		open.value = false;
		emit('close');
	};

	const handlePaste = () => {
		pasteNodes({});
		open.value = false;
		emit('close');
	};

	const handleDuplicate = () => {
		const node = findNode(props.nodeId);
		if (node) {
			copyNodes();
			pasteNodes({});
		}
		open.value = false;
		emit('close');
	};

	const handleDelete = () => {
		const node = findNode(props.nodeId);
		if (node) {
			removeNodes([node]);
		}
		open.value = false;
		emit('close');
	};
</script>

<template>
	<Popover
		:open="open"
		:positioning="positioningProps"
		@update:open="(val: boolean) => !val && emit('close')"
	>
		<template #default>
			<div
				class="z-50 min-w-[160px] rounded-md border border-gray-200 bg-white py-1 shadow-lg focus:outline-none"
				@contextmenu.prevent
			>
				<button
					class="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
					@click="handleCopy"
				>
					Copy
				</button>
				<button
					class="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
					:disabled="!canPaste"
					@click="handlePaste"
				>
					Paste
				</button>
				<button
					class="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
					@click="handleDuplicate"
				>
					Duplicate
				</button>
				<div class="my-1 border-t border-gray-200"></div>
				<button
					class="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
					@click="handleDelete"
				>
					Delete
				</button>
			</div>
		</template>
	</Popover>
</template>
