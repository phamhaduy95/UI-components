<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconMotor from '@/assets/palettes/industrial/motor.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.Industrial"
		:type="NodeType.Motor"
	>
		<template #icon>
			<IconMotor />
		</template>
	</BaseNodePalette>
</template>
