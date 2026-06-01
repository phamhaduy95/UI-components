<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.FormField"
		:type="NodeType.TextField"
	>
		<template #icon>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect
					x="3"
					y="6"
					width="18"
					height="12"
					rx="2"
					ry="2"
				></rect>
				<line
					x1="6"
					y1="12"
					x2="6"
					y2="12"
				></line>
			</svg>
		</template>
	</GenericNodePalette>
</template>
