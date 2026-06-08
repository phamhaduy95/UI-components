<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconFan from '@/assets/palettes/industrial/blower.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.Industrial"
		:type="NodeType.Fan"
	>
		<template #icon>
			<IconFan />
		</template>
	</BaseNodePalette>
</template>
