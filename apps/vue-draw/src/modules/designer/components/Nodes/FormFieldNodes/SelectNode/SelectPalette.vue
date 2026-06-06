<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconSelect from '@/assets/palettes/form-fields/select.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.FormField"
		:type="NodeType.Select"
	>
		<template #icon>
			<IconSelect />
		</template>
	</BaseNodePalette>
</template>
