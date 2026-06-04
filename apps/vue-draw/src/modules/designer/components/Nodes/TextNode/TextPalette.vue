<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconText from '@/assets/palettes/form-fields/text.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.FormField"
		:type="NodeType.Text"
	>
		<template #icon>
			<IconText />
		</template>
	</GenericNodePalette>
</template>
