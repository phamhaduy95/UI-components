<script setup lang="ts">
	import { BaseNodePalette } from '@/modules/designer/components';
	import type { BaseNodePaletteProps } from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconCircle from '@assets/palettes/basic-shapes/circle.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Circle"
	>
		<template #icon>
			<IconCircle />
		</template>
	</BaseNodePalette>
</template>
