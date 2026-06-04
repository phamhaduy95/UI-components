<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconNonagon from '@assets/palettes/basic-shapes/nonagon.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Nonagon"
	>
		<template #icon>
			<IconNonagon />
		</template>
	</GenericNodePalette>
</template>
