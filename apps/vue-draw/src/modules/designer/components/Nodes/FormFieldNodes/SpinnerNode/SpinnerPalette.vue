<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconSpinner from '@/assets/palettes/form-fields/spinner.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.FormField"
		:type="NodeType.Spinner"
	>
		<template #icon>
			<IconSpinner />
		</template>
	</BaseNodePalette>
</template>
