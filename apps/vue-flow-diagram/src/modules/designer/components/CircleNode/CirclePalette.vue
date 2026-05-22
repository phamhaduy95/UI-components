<script setup lang="ts">
import { GenericNodePalette } from '@/modules/designer/components';
import type { GenericNodePaletteProps } from '@/modules/designer/components/GenericNode';

import IconCircle from '@/assets/icons/circle.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette :id="props.id" :type="props.type" :label="props.label">
		<template #icon>
			<IconCircle />
		</template>
	</GenericNodePalette>
</template>
