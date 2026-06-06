<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconTextField from '@/assets/palettes/form-fields/text-field.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.FormField"
		:type="NodeType.TextField"
	>
		<template #icon>
			<IconTextField />
		</template>
	</BaseNodePalette>
</template>
