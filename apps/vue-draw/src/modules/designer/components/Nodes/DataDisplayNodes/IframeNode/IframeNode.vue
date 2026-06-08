<script setup lang="ts">
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { computed } from 'vue';
	import type { IframeNodeData } from '@/modules/designer/types/Node.type';

	export type IframeNodeProps = BaseCanvasNodeProps;

	const props = defineProps<IframeNodeProps>();

	const nodeConfig = computed(() => props.data as IframeNodeData);
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default="{ shapeHeight, shapeWidth }">
			<div
				class="pointer-events-auto bg-white border border-gray-300 flex flex-col items-center justify-center overflow-hidden relative shadow-sm"
				:style="{ width: shapeWidth + 'px', height: shapeHeight + 'px' }"
			>
				<!-- Top bar to give it a browser-like feel -->
				<div
					class="w-full h-6 bg-gray-100 border-b border-gray-300 flex items-center px-2 flex-shrink-0"
				>
					<div class="flex space-x-1">
						<div class="w-2 h-2 rounded-full bg-gray-300"></div>
						<div class="w-2 h-2 rounded-full bg-gray-300"></div>
						<div class="w-2 h-2 rounded-full bg-gray-300"></div>
					</div>
				</div>
				<!-- Content area -->
				<div class="flex-1 w-full flex items-center justify-center relative bg-gray-50">
					<iframe
						v-if="nodeConfig.src"
						:src="nodeConfig.src"
						class="w-full h-full border-none pointer-events-none"
					></iframe>
					<div
						v-else
						class="text-gray-400 flex flex-col items-center"
					>
						<span class="text-xs font-medium">Iframe Block</span>
						<span class="text-[10px] opacity-70">No URL configured</span>
					</div>
				</div>
			</div>
		</template>
	</BaseCanvasNode>
</template>
