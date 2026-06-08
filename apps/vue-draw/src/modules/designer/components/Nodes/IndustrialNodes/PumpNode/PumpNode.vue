<script setup lang="ts">
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { computed } from 'vue';
	import type { IndustrialNodeData } from '@/modules/designer/types/Node.type';
	import IconPump from '@/assets/palettes/industrial/pump.svg';

	export type PumpNodeProps = BaseCanvasNodeProps;

	const props = defineProps<PumpNodeProps>();

	const nodeConfig = computed(() => props.data as IndustrialNodeData);
</script>

<template>
	<BaseCanvasNode
		v-slot="{ shapeHeight, shapeWidth }"
		v-bind="props"
	>
		<IconPump
			:style="{
				width: shapeWidth + 'px',
				height: shapeHeight + 'px',
				color: nodeConfig.stroke
			}"
			:stroke="nodeConfig.stroke"
			:stroke-width="nodeConfig.strokeWidth"
			:fill="nodeConfig.fill"
		/>
	</BaseCanvasNode>
</template>
