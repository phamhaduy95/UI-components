<script setup lang="ts">
import {
	GenericNodePalette,
	type GenericNodePaletteProps
} from '@/modules/designer/components/GenericNode';

import IconRectangle from '@/assets/icons/rectangle.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette :id="props.id" :type="props.type" :label="props.label">
		<template #icon>
			<IconRectangle />
		</template>
	</GenericNodePalette>
</template>
