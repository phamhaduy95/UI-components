<script setup lang="ts">
import {
	GenericNodePalette,
	type GenericNodePaletteProps
} from '@/modules/designer/components/GenericNode';
import { NodeCategory } from '@/modules/designer/types/Designer.type';

import IconStar from '@/assets/icons/star.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette v-bind="props" :category="NodeCategory.BasicShape" type="star">
		<template #icon>
			<IconStar />
		</template>
	</GenericNodePalette>
</template>
