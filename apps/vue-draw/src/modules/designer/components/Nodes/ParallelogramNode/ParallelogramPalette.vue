<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconParallelogram from '@assets/palettes/basic-shapes/parallelogram.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Parallelogram"
	>
		<template #icon>
			<IconParallelogram />
		</template>
	</GenericNodePalette>
</template>
