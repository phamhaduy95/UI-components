<script setup lang="ts">
import {
	GenericNodePalette,
	type GenericNodePaletteProps
} from '@/modules/designer/components/GenericNode';

import IconStar from '@/assets/icons/star.svg';

const props = defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette :id="props.id" :type="props.type" :label="props.label">
		<template #icon>
			<IconStar />
		</template>
	</GenericNodePalette>
</template>
