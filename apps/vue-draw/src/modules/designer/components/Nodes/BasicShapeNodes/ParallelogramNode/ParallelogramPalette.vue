<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconParallelogram from '@assets/palettes/basic-shapes/parallelogram.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Parallelogram"
	>
		<template #icon>
			<IconParallelogram />
		</template>
	</BaseNodePalette>
</template>
