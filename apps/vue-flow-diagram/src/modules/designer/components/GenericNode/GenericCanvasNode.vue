<script setup lang="ts">
import { computed } from 'vue';
import type { NodeProps } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer';

import { nodeConfigMap } from '@/modules/designer/configs/nodeConfig';
import type { NodeCustomData } from '@/modules/designer/types/Designer.type';

export type GenericCanvasNodeProps = NodeProps<NodeCustomData>;

const props = defineProps<GenericCanvasNodeProps>();

const NodeComponent = computed(() => {
	return nodeConfigMap[props.data.subType]?.nodeComponent;
});
</script>

<template>
	<div
		class="transition-border group relative flex h-full w-full items-center justify-center rounded-none border border-transparent bg-transparent ease-in-out hover:border-blue-500"
		:class="{ 'border-blue-500': selected }"
	>
		<NodeResizer :is-visible="selected" :min-width="24" :min-height="24" />
		<component :is="NodeComponent" class="h-full w-full" />
	</div>
</template>
