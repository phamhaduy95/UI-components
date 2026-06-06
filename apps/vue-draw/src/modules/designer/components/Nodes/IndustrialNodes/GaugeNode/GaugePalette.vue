<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconGauge from '@/assets/palettes/AOGs/gauge.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.Industrial"
		:type="NodeType.Gauge"
	>
		<template #icon>
			<IconGauge />
		</template>
	</GenericNodePalette>
</template>
