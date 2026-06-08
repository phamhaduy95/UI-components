<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconLineChart from '@/assets/palettes/data-display/line-chart.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.DataDisplay"
		:type="NodeType.LineChart"
	>
		<template #icon>
			<IconLineChart />
		</template>
	</BaseNodePalette>
</template>
