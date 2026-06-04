<script setup lang="ts">
	import {
		GenericNodePalette,
		type GenericNodePaletteProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconSlider from '@/assets/palettes/form-fields/slider.svg';

	const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette
		v-bind="props"
		:category="NodeCategory.FormField"
		:type="NodeType.Slider"
	>
		<template #icon>
			<IconSlider />
		</template>
	</GenericNodePalette>
</template>
