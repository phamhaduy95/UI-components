<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconMotor from '@/assets/palettes/AOGs/motor.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.Industrial"
		:type="NodeType.Motor"
	>
		<template #icon>
			<IconMotor />
		</template>
	</GenericNodePalette>
</template>
