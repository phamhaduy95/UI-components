<script setup lang="ts">
import {
	GenericNodePalette,
	type GenericNodePaletteProps
} from '@/modules/designer/components/GenericNode';
import { NodeCategory } from '@/modules/designer/types/Designer.type';

import IconRectangle from '@/assets/icons/rectangle.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette v-bind="props" :category="NodeCategory.BasicShape" type="rectangle">
		<template #icon>
			<IconRectangle />
		</template>
	</GenericNodePalette>
</template>
