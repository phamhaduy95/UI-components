<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconLine from '@/assets/palettes/basic-shapes/line.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Line"
	>
		<template #icon>
			<IconLine />
		</template>
	</BaseNodePalette>
</template>
