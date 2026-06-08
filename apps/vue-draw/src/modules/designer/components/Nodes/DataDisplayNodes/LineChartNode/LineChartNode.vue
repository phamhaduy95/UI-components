<script setup lang="ts">
	import { LineChart } from 'echarts/charts';
	import { GridComponent, TooltipComponent } from 'echarts/components';
	import { use } from 'echarts/core';
	import { CanvasRenderer } from 'echarts/renderers';
	import { provide, ref } from 'vue';
	import VChart, { THEME_KEY } from 'vue-echarts';

	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';

	use([GridComponent, TooltipComponent, LineChart, CanvasRenderer]);

	provide(THEME_KEY, 'light');

	export type LineChartNodeProps = BaseCanvasNodeProps;

	const props = defineProps<LineChartNodeProps>();

	const generateMockData = () => {
		const baseTime = new Date('2024-01-01T00:00:00Z').getTime();
		const data: [number, number][] = [];
		for (let i = 0; i < 60; i++) {
			// Smooth upward curve using linear progression and a gentle sine wave
			const value = 20 + i + Math.sin(i / 4) * 8;
			data.push([baseTime + i * 1000, Math.round(value)]);
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
			type: 'time',
			interval: 1000,
			axisLine: {
				show: true,
				symbol: ['none', 'arrow']
			},
			axisLabel: {
				show: false
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			type: 'value',
			max: 100,
			interval: 10,
			axisLine: {
				show: true,
				symbol: ['none', 'arrow']
			},
			axisLabel: {
				show: false
			},
			axisTick: {
				show: false
			}
		},
		series: [
			{
				data: generateMockData(),
				type: 'line',
				smooth: true,
				showSymbol: false
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
