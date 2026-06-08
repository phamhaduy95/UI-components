<script setup lang="ts">
	import { ScatterChart } from 'echarts/charts';
	import { GridComponent, TooltipComponent } from 'echarts/components';
	import { use } from 'echarts/core';
	import { CanvasRenderer } from 'echarts/renderers';
	import { provide, ref } from 'vue';
	import VChart, { THEME_KEY } from 'vue-echarts';

	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';

	use([GridComponent, TooltipComponent, ScatterChart, CanvasRenderer]);

	provide(THEME_KEY, 'light');

	export type ScatterPlotNodeProps = BaseCanvasNodeProps;

	const props = defineProps<ScatterPlotNodeProps>();

	const generateMockData = () => {
		const data: [number, number][] = [];
		for (let i = 0; i < 40; i++) {
			// Generate scattered data points with a loose positive correlation
			const x = Math.random() * 80 + 10;
			const y = x * 0.8 + Math.random() * 30 - 15;
			data.push([Math.round(x), Math.round(y)]);
		}
		return data;
	};

	const option = ref({
		animation: false,
		grid: {
			top: 10,
			right: 20,
			bottom: 20,
			left: 30
		},
		xAxis: {
			type: 'value',
			axisLine: {
				show: true,
				symbol: ['none', 'arrow']
			},
			axisLabel: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			}
		},
		yAxis: {
			type: 'value',
			axisLine: {
				show: true,
				symbol: ['none', 'arrow']
			},
			axisLabel: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			}
		},
		series: [
			{
				data: generateMockData(),
				type: 'scatter',
				symbolSize: 6,
				itemStyle: {
					color: '#5470c6'
				}
			}
		]
	});
</script>

<template>
	<BaseCanvasNode v-bind="props">
		<template #default="{ shapeHeight, shapeWidth }">
			<div
				class="pointer-events-auto bg-white border border-gray-300 flex items-center justify-center p-2 relative"
				:style="{ width: shapeWidth + 'px', height: shapeHeight + 'px' }"
			>
				<v-chart
					:style="{ width: shapeWidth + 'px', height: shapeHeight + 'px' }"
					:option="option"
					autoresize
				/>
			</div>
		</template>
	</BaseCanvasNode>
</template>
