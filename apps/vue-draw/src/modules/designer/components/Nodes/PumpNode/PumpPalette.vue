<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconPump from '@/assets/palettes/AOGs/pump.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.Industrial"
		:type="NodeType.Pump"
	>
		<template #icon>
			<IconPump />
		</template>
	</GenericNodePalette>
</template>
