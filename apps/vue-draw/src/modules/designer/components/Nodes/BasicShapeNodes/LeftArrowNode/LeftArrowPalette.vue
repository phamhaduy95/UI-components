<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconLeftArrow from '@assets/palettes/basic-shapes/left-arrow.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.LeftArrow"
	>
		<template #icon>
			<IconLeftArrow />
		</template>
	</BaseNodePalette>
</template>
