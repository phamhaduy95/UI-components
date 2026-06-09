<script setup lang="ts">
	import { DataTable, type DataTableColumn } from '@packages/vue-components';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';

	export type TableNodeProps = BaseCanvasNodeProps;

	const props = defineProps<TableNodeProps>();

	type RowData = {
		id: string;
		col1: string;
		col2: string;
		col3: string;
	};

	const columns: DataTableColumn<RowData>[] = [
		{
			id: 'col1',
			header: 'Column 1',
			cell: (_, data) => data.col1,
			type: 'data',
			field: 'col1'
		},
		{
			id: 'col2',
			header: 'Column 2',
			cell: (_, data) => data.col2,
			type: 'data',
			field: 'col2'
		},
		{
			id: 'col3',
			header: 'Column 3',
			cell: (_, data) => data.col3,
			type: 'data',
			field: 'col3'
		}
	];

	const defaultData: RowData[] = [
		{ id: '1', col1: '', col2: '', col3: '' },
		{ id: '2', col1: '', col2: '', col3: '' },
		{ id: '3', col1: '', col2: '', col3: '' }
	];

	const onKeyDown = (e: KeyboardEvent) => {
		e.stopPropagation();
	};
</script>

<template>
	<BaseCanvasNode
		v-bind="props"
		dynamic-size
	>
		<template #default>
			<div
				class="w-full h-full pointer-events-auto bg-white overflow-auto border border-gray-200 rounded shadow-sm"
				@keydown="onKeyDown"
			>
				<DataTable
					:columns="columns"
					:data="defaultData"
					data-key="id"
				/>
			</div>
		</template>
	</BaseCanvasNode>
</template>
