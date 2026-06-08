<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconTank from '@/assets/palettes/industrial/tank.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.Industrial"
		:type="NodeType.Tank"
	>
		<template #icon>
			<IconTank />
		</template>
	</BaseNodePalette>
</template>
