<script setup lang="ts">
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { computed } from 'vue';
	import type { IndustrialNodeData } from '@/modules/designer/types/Node.type';
	import IconTank from '@/assets/palettes/industrial/tank.svg';

	export type TankNodeProps = BaseCanvasNodeProps;

	const props = defineProps<TankNodeProps>();

	const nodeConfig = computed(() => props.data as IndustrialNodeData);
</script>

<template>
	<BaseCanvasNode
		v-slot="{ shapeHeight, shapeWidth }"
		v-bind="props"
	>
		<IconTank
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
