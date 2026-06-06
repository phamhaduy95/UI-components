<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconDatePicker from '@/assets/palettes/form-fields/date-picker.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.FormField"
		:type="NodeType.DatePicker"
	>
		<template #icon>
			<IconDatePicker />
		</template>
	</BaseNodePalette>
</template>
