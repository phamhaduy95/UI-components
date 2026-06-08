<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { useVueFlow } from '@vue-flow/core';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import type { BitmapNodeData } from '@/modules/designer/types/Node.type';

	export type BitmapNodeProps = BaseCanvasNodeProps;

	const props = defineProps<BitmapNodeProps>();

	const nodeConfig = computed(() => props.data as BitmapNodeData);
	const { updateNodeData } = useVueFlow();

	const fileInputRef = ref<HTMLInputElement | null>(null);

	const triggerUpload = () => {
		fileInputRef.value?.click();
	};

	const onFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const result = event.target?.result as string;
				updateNodeData(props.id, { imageUrl: result });
			};
			reader.readAsDataURL(file);
		}
	};
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default>
			<div
				class="w-full h-full relative overflow-hidden pointer-events-auto flex items-center justify-center bg-gray-50 border border-dashed border-gray-500 group"
				:style="{ borderRadius: `${nodeConfig.borderRadius || 0}px` }"
				@dblclick.stop="triggerUpload"
			>
				<template v-if="nodeConfig.imageUrl">
					<img
						:src="nodeConfig.imageUrl"
						class="w-full h-full object-contain select-none pointer-events-none"
						alt="Bitmap"
					/>
				</template>
				<template v-else>
					<div
						class="flex flex-col items-center justify-center text-gray-400 select-none pointer-events-none w-full h-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-8 h-8 mb-1"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
							/>
						</svg>
						<span class="text-xs font-medium text-center px-2">Double-click to upload</span>
					</div>
				</template>

				<input
					ref="fileInputRef"
					type="file"
					accept="image/*"
					class="hidden"
					@change="onFileChange"
				/>
			</div>
		</template>
	</BaseCanvasNode>
</template>
