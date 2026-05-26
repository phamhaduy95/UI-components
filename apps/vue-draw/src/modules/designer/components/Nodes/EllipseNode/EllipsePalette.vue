<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory } from '@/modules/designer/types/Node.type';

	import IconEllipse from '@/assets/icons/ellipse.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.BasicShape"
		type="ellipse"
	>
		<template #icon>
			<IconEllipse />
		</template>
	</GenericNodePalette>
</template>
