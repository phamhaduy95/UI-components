<script setup lang="ts">
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';
	import { computed } from 'vue';
	import type { IndustrialNodeData } from '@/modules/designer/types/Node.type';
	import IconMotor from '@/assets/palettes/industrial/motor.svg';

	export type MotorNodeProps = BaseCanvasNodeProps;

	const props = defineProps<MotorNodeProps>();

	const nodeConfig = computed(() => props.data as IndustrialNodeData);
</script>

<template>
	<BaseCanvasNode
		v-slot="{ shapeHeight, shapeWidth }"
		v-bind="props"
	>
		<IconMotor
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
