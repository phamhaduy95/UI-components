<script setup lang="ts">
import {
	GenericNodePalette,
	type GenericNodePaletteProps
} from '@/modules/designer/components/GenericNode';

import IconHexagon from '@/assets/icons/hexagon.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette :id="props.id" :type="props.type" :label="props.label">
		<template #icon>
			<IconHexagon />
		</template>
	</GenericNodePalette>
</template>

<style scoped></style>
