<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconHeptagon from '@assets/palettes/basic-shapes/heptagon.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Heptagon"
	>
		<template #icon>
			<IconHeptagon />
		</template>
	</BaseNodePalette>
</template>
