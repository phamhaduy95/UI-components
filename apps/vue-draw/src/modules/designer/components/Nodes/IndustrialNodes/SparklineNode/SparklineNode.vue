<script setup lang="ts">
	import { provide, ref } from 'vue';
	import VChart, { THEME_KEY } from 'vue-echarts';
	import { use } from 'echarts/core';
	import { LineChart } from 'echarts/charts';
	import { GridComponent, TooltipComponent } from 'echarts/components';
	import { CanvasRenderer } from 'echarts/renderers';

	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';

	use([GridComponent, TooltipComponent, LineChart, CanvasRenderer]);

	provide(THEME_KEY, 'light');

	export type SparklineNodeProps = BaseCanvasNodeProps;

	const props = defineProps<SparklineNodeProps>();

	const generateMockData = () => {
		const baseTime = new Date('2024-01-01T00:00:00Z').getTime();
		const data: [number, number][] = [];
		for (let i = 0; i < 30; i++) {
			const value = 20 + i + Math.sin(i / 2) * 15;
			data.push([baseTime + i * 1000, Math.round(value)]);
		}
		return data;
	};

	const option = ref({
		animation: false,
		grid: {
			top: 2,
			right: 0,
			bottom: 2,
			left: 0
		},
		xAxis: {
			type: 'time',
			show: false
		},
		yAxis: {
			type: 'value',
			show: false,
			min: 'dataMin',
			max: 'dataMax'
		},
		series: [
			{
				data: generateMockData(),
				type: 'line',
				smooth: true,
				showSymbol: false,
				lineStyle: {
					width: 2,
					color: '#3b82f6'
				}
			}
		]
	});
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default>
			<div
				class="w-full h-full pointer-events-auto bg-white flex items-center justify-center border border-gray-200 overflow-hidden"
			>
				<v-chart
					class="w-full h-full"
					:option="option"
					autoresize
				/>
			</div>
		</template>
	</BaseCanvasNode>
</template>
