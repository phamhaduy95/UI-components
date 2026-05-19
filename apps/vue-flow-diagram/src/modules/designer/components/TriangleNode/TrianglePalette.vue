<script setup lang="ts">
import {
	GenericNodePalette,
	type GenericNodePaletteProps
} from '@/modules/designer/components/GenericNode';

import IconTriangle from '@/assets/icons/triangle.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette :id="props.id" :type="props.type" :label="props.label">
		<template #icon>
			<IconTriangle />
		</template>
	</GenericNodePalette>
</template>

<style scoped></style>
