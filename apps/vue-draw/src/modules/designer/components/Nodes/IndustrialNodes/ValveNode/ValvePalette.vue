<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconValve from '@/assets/palettes/AOGs/valve.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.Industrial"
		:type="NodeType.Valve"
	>
		<template #icon>
			<IconValve />
		</template>
	</GenericNodePalette>
</template>
