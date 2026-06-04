<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconRhombus from '@assets/palettes/basic-shapes/rhombus.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Rhombus"
	>
		<template #icon>
			<IconRhombus />
		</template>
	</GenericNodePalette>
</template>
