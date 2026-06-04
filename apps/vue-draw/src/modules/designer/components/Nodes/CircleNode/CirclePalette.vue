<script setup lang="ts">
	import { GenericNodePalette } from '@/modules/designer/components';
	import type { GenericNodePaletteProps } from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconCircle from '@/assets/palettes/basic-shapes/circle.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Circle"
	>
		<template #icon>
			<IconCircle />
		</template>
	</GenericNodePalette>
</template>
