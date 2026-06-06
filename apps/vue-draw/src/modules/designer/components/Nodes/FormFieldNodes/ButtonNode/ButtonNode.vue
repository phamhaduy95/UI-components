<script setup lang="ts">
	import { computed } from 'vue';
	import { Button } from '@packages/vue-components';
	import {
		GenericCanvasNode,
		type GenericCanvasNodeProps
	} from '@/modules/designer/components/Nodes/GenericNode';
	import type { FormFieldNodeData } from '@/modules/designer/types/Node.type';

	export type ButtonNodeProps = GenericCanvasNodeProps;

	const props = defineProps<ButtonNodeProps>();

	const nodeConfig = computed(() => props.data as FormFieldNodeData);
</script>

<template>
	<GenericCanvasNode v-bind="props">
		<template #default>
			<Button
				class="w-full h-full pointer-events-auto"
				variant="contained"
				color="primary"
			>
				{{ nodeConfig.label || 'Button' }}
			</Button>
		</template>
	</GenericCanvasNode>
</template>
