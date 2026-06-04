<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconButton from '@/assets/palettes/form-fields/button.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.FormField"
		:type="NodeType.Button"
	>
		<template #icon>
			<IconButton />
		</template>
	</GenericNodePalette>
</template>
