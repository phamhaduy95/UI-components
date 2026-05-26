<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory } from '@/modules/designer/types/Node.type';

	import IconTriangle from '@/assets/icons/triangle.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		type="triangle"
	>
		<template #icon>
			<IconTriangle />
		</template>
	</GenericNodePalette>
</template>
