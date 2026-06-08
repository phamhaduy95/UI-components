<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconValve from '@/assets/palettes/industrial/valve.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.Industrial"
		:type="NodeType.Valve"
	>
		<template #icon>
			<IconValve />
		</template>
	</BaseNodePalette>
</template>
