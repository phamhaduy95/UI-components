<script setup lang="ts">
	import { computed } from 'vue';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	export type ProgressBarNodeProps = BaseCanvasNodeProps;

	const props = defineProps<ProgressBarNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
	const progressBarValue = computed(() => {
		const val = Number(nodeConfig.value.value);
		return Math.max(0, Math.min(100, isNaN(val) ? 0 : val));
	});
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default>
			<div
				class="w-full h-full pointer-events-auto flex items-center justify-center relative overflow-hidden bg-white border border-gray-300"
			>
				<svg
					width="100%"
					height="100%"
					preserveAspectRatio="none"
				>
					<rect
						x="0"
						y="0"
						width="100%"
						height="100%"
						fill="#e5e7eb"
					/>
					<rect
						x="0"
						y="0"
						:width="`${progressBarValue}%`"
						height="100%"
						fill="#3b82f6"
					/>
				</svg>
			</div>
		</template>
	</BaseCanvasNode>
</template>
