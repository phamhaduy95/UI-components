<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconStar from '@/assets/icons/star.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Star"
	>
		<template #icon>
			<IconStar />
		</template>
	</GenericNodePalette>
</template>
