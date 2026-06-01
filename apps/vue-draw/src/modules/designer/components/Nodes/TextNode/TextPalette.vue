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
		:type="NodeType.Text"
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
				<polyline points="4 7 4 4 20 4 20 7"></polyline>
				<line
					x1="9"
					y1="20"
					x2="15"
					y2="20"
				></line>
				<line
					x1="12"
					y1="4"
					x2="12"
					y2="20"
				></line>
			</svg>
		</template>
	</GenericNodePalette>
</template>
