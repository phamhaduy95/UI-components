<script setup lang="ts">
import { GenericNodePalette } from '@/modules/designer/components';
import type { GenericNodePaletteProps } from '@/modules/designer/components/GenericNode';
import { NodeCategory } from '@/modules/designer/types/Designer.type';

import IconCircle from '@/assets/icons/circle.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette v-bind="props" type="circle" :category="NodeCategory.BasicShape">
		<template #icon>
			<IconCircle />
		</template>
	</GenericNodePalette>
</template>
