<script setup lang="ts">
	import {
		BaseNodePalette,
		type BaseNodePaletteProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';

	import IconIframe from '@/assets/palettes/data-display/iframe.svg';

	const props = defineProps<BaseNodePaletteProps>();
</script>

<template>
	<BaseNodePalette
		v-bind="props"
		:category="NodeCategory.DataDisplay"
		:type="NodeType.Iframe"
	>
		<template #icon>
			<IconIframe />
		</template>
	</BaseNodePalette>
</template>
