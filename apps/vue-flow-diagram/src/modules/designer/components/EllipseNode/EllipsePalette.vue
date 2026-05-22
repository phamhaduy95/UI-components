<script setup lang="ts">
import {
	GenericNodePalette,
	type GenericNodePaletteProps
} from '@/modules/designer/components/GenericNode';

import IconEllipse from '@/assets/icons/ellipse.svg';

defineProps<GenericNodePaletteProps>();
</script>

<template>
	<GenericNodePalette :id="id" :type="type" :label="label">
		<template #icon>
			<IconEllipse />
		</template>
	</GenericNodePalette>
</template>
