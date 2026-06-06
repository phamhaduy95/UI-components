<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconEllipse from '@/assets/palettes/basic-shapes/ellipse.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		:type="NodeType.Ellipse"
	>
		<template #icon>
			<IconEllipse />
		</template>
	</BaseNodePalette>
</template>
