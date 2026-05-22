<script setup lang="ts">
import {
	GenericNodePalette,
	type GenericNodePaletteProps
} from '@/modules/designer/components/GenericNode';
import { NodeCategory } from '@/modules/designer/types/Designer.type';

import IconHexagon from '@/assets/icons/hexagon.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette v-bind="props" :category="NodeCategory.BasicShape" type="hexagon">
		<template #icon>
			<IconHexagon />
		</template>
	</GenericNodePalette>
</template>
