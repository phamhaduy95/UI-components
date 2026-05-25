<script setup lang="ts">
	import { Pagination } from '@components/Pagination';
	import { SingleSelect } from '@components/SingleSelect';
	import { computed } from 'vue';

	interface DataTablePaginationProps {
		total: number;
		page: number;
		pageSize: number;
	}

	const pageSizeOption = [
		{ label: '10', value: '10' },
		{ label: '20', value: '20' },
		{ label: '30', value: '30' },
		{ label: '40', value: '40' },
		{ label: '50', value: '50' }
	];

	type DataTablePaginationEmits = {
		'update:pageSize': [value: number];
		'update:page': [value: number];
	};

	defineEmits<DataTablePaginationEmits>();

	const props = defineProps<DataTablePaginationProps>();

	// must plus 1 for page Value since pagination component start at 1 while the table is 0-based
	const pageIndex = computed(() => {
		return props.page + 1;
	});

	const lowerBound = computed(() => {
		return (pageIndex.value - 1) * props.pageSize + 1;
	});

	const upperBound = computed(() => {
		const upperBound = pageIndex.value * props.pageSize;
		return upperBound > props.total ? props.total : upperBound;
	});
</script>

<template>
	<div
		class="DataTable_PaginationPanel"
		data-testid="data-table-pagination"
	>
		<div class="DataTable_DisplayRange">
			<p>Showing {{ lowerBound }} to {{ upperBound }} of {{ total }}</p>
		</div>

		<Pagination
			class="DataTable_Pagination"
			:count="total"
			:page="pageIndex"
			:page-size="pageSize"
			@update:page="(value) => $emit('update:page', value)"
		/>

		<div class="DataTable_PageSize">
			<p>Rows per page</p>
			<SingleSelect
				class="DataTable_PageSizeSelect"
				:items="pageSizeOption"
				:size="'sm'"
				aria-label="Rows per page"
				:model-value="pageSize.toString()"
				@update:model-value="(value) => $emit('update:pageSize', Number(value))"
			/>
		</div>
	</div>
</template>
