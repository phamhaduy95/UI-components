<script setup lang="ts">
	import { computed } from 'vue';
	import { Button } from '@packages/vue-components';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	export type ButtonNodeProps = BaseCanvasNodeProps;

	const props = defineProps<ButtonNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default>
			<Button
				class="w-full h-full pointer-events-auto"
				variant="contained"
				color="primary"
			>
				{{ nodeConfig.label || 'Button' }}
			</Button>
		</template>
	</BaseCanvasNode>
</template>
