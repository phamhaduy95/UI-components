<script setup lang="ts">
import { computed } from 'vue';
import type { NodeProps } from '@vue-flow/core';

import { nodeConfigMap } from '@/modules/designer/configs/nodeConfig';
import type { NodeCustomData } from '@/modules/designer/types/Designer.type';

const props = defineProps<NodeProps<NodeCustomData>>();

const nodeComponent = computed(() => {
	return nodeConfigMap[props.data.subType]?.nodeComponent;
});
</script>

<template>
	<div
		class="transition-border group relative flex items-center justify-center rounded-none border border-transparent bg-transparent ease-in-out hover:border-blue-500"
		:class="{ 'border-blue-500': selected }"
	>
		<component :is="nodeComponent" />
	</div>
</template>
