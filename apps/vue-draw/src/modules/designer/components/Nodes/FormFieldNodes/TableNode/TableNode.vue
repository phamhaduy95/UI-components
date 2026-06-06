<script setup lang="ts">
	import { DataTable, type DataTableColumn } from '@packages/vue-components';
	import {
		BaseCanvasNode,
		type BaseCanvasNodeProps
	} from '@/modules/designer/components/Nodes/BaseNode';

	export type TableNodeProps = BaseCanvasNodeProps;

	const props = defineProps<TableNodeProps>();

	type MockData = {
		id: number;
		name: string;
		status: string;
	};

	const mockColumns: DataTableColumn<MockData>[] = [
		{
			id: 'id',
			header: 'ID',
			cell: (_, data: MockData) => String(data.id),
			type: 'data',
			field: 'id'
		},
		{
			id: 'name',
			header: 'Name',
			cell: (_, data: MockData) => String(data.name),
			type: 'data',
			field: 'name'
		},
		{
			id: 'status',
			header: 'Status',
			cell: (_, data: MockData) => String(data.status),
			type: 'data',
			field: 'status'
		}
	];

	const mockData: MockData[] = [
		{ id: 1, name: 'Item 1', status: 'Active' },
		{ id: 2, name: 'Item 2', status: 'Inactive' },
		{ id: 3, name: 'Item 3', status: 'Pending' }
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
					:columns="mockColumns"
					:data="mockData"
					data-key="id"
				/>
			</div>
		</template>
	</BaseCanvasNode>
</template>
