<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconProgressBar from '@/assets/palettes/form-fields/progress-bar.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.FormField"
		:type="NodeType.ProgressBar"
	>
		<template #icon>
			<IconProgressBar />
		</template>
	</BaseNodePalette>
</template>
