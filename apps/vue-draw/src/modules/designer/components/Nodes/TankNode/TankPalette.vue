<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconTank from '@/assets/palettes/AOGs/tank.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.Industrial"
		:type="NodeType.Tank"
	>
		<template #icon>
			<IconTank />
		</template>
	</GenericNodePalette>
</template>
