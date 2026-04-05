<script setup lang="ts" generic="TData extends RowData">
	import {
		FlexRender,
		getCoreRowModel,
		useVueTable,
		createColumnHelper,
		type RowData,
		type Header,
		type Cell,
		type RowSelectionState,
		type PaginationState,
		getPaginationRowModel,
		getSortedRowModel,
		type SortingState
	} from '@tanstack/vue-table';
	import { computed, ref, shallowRef, type CSSProperties } from 'vue';

	import { Checkbox } from '@components/Checkbox';

	import type {
		DataTableColumn,
		DataTableEmits,
		DataTableProps,
		DataTableSlots
	} from './DataTable.type';

	import DataTablePagination from './DataTablePagination.vue';
	import DataTableHeader from './DataTableHeader.vue';

	import '@packages/styles/components/DataTable.css';

	type ObjectKey = string | number;

	const props = withDefaults(defineProps<DataTableProps<TData>>(), {
		selectionMode: undefined,
		selectedValue: undefined,
		pagination: undefined,
		dataKey: undefined,
		sorting: undefined,
		defaultSorting: undefined
	});

	const emit = defineEmits<DataTableEmits<TData>>();

	defineSlots<DataTableSlots<TData>>();

	const columnsMap = computed(() => {
		return props.columns.reduce<Record<string, DataTableColumn<TData>>>((acc, column) => {
			acc[column.id as string] = column;
			return acc;
		}, {});
	});

	const columnHelper = createColumnHelper<TData>();

	const columns = computed(() => {
		const columns = [];
		if (props.selectionMode) {
			columns.push(
				columnHelper.display({
					id: 'selection',
					header: 'Selection',
					cell: '',
					maxSize: 50,
					minSize: 50,
					size: 50
				})
			);
		}

		for (const column of props.columns) {
			switch (column.type) {
				case 'data':
					columns.push(
						columnHelper.accessor(column.field, {
							id: column.id,
							header: column.header,
							cell: (cellContext) => {
								const rowData = cellContext.row.original as TData;

								if (typeof column.cell === 'string') return column.cell;
								return column.cell(cellContext.getValue(), rowData);
							},
							maxSize: column.maxWidth,
							minSize: column.minWidth,
							size: column.width,
							enableHiding: column.enableHiding,
							enableSorting: column.enableSorting ?? true,
							sortingFn: column.sortingFnc ?? 'basic'
						})
					);

					break;
				case 'action':
					columns.push(
						columnHelper.display({
							id: column.id ?? '',
							header: column.header,
							cell: (cellContext) => {
								const rowData = cellContext.row.original as TData;

								if (typeof column.cell === 'string') return column.cell;
								return column.cell(cellContext.getValue(), rowData);
							},
							maxSize: column.maxWidth,
							minSize: column.minWidth,
							size: column.width,
							enableHiding: column.enableHiding
						})
					);
					break;
			}
		}

		return columns;
	});

	const innerSelection = shallowRef<RowSelectionState>({});

	const rowSelectionState = computed<RowSelectionState>(() => {
		if (!props.selectedValue) return innerSelection.value;

		return props.selectedValue.reduce<RowSelectionState>((acc, key) => {
			acc[key as ObjectKey] = true;
			return acc;
		}, {});
	});
	const innerVisibility = shallowRef<Record<string, boolean>>({});

	const columnVisibilityState = computed(() => {
		if (!props.visibleHeaders) return innerVisibility.value;

		const visibility: Record<string, boolean> = {};
		columns.value.forEach((col) => {
			const colId = (col as { id?: string }).id;
			if (colId) {
				visibility[colId] = props.visibleHeaders!.includes(colId);
			}
		});
		return visibility;
	});

	const innerPagination = ref<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	});

	const paginationState = computed(() => {
		return props.pagination ?? innerPagination.value;
	});

	const innerSortingState = ref<SortingState>(props.defaultSorting ?? []);

	const sortingState = computed(() => {
		return props.sorting ?? innerSortingState.value;
	});

	const table = useVueTable({
		data: props.data,

		get columns() {
			return columns.value;
		},
		state: {
			get rowSelection() {
				return rowSelectionState.value;
			},
			get columnVisibility() {
				return columnVisibilityState.value;
			},
			get pagination() {
				return paginationState.value;
			},
			get sorting() {
				return sortingState.value;
			}
		},

		getCoreRowModel: getCoreRowModel(),

		get getPaginationRowModel() {
			return props.enablePagination ? getPaginationRowModel() : undefined;
		},
		get getSortedRowModel() {
			return props.enableSort ? getSortedRowModel() : undefined;
		},
		getRowId: (row) => {
			return String(row[props.dataKey as keyof TData]);
		},
		get enableRowSelection() {
			return props.enableRowSelection;
		},
		get enableMultiRowSelection() {
			return props.enableRowSelection && props.selectionMode === 'multiple';
		},
		get enableSorting() {
			return props.enableSort;
		},

		onRowSelectionChange: (updateOrValue) => {
			const newValue =
				typeof updateOrValue === 'function'
					? updateOrValue(rowSelectionState.value)
					: updateOrValue;

			innerSelection.value = newValue;

			const selectedKeys = Object.keys(newValue);
			emit('update:selectedValue', selectedKeys as Array<TData[keyof TData]>);
		},

		onPaginationChange: (updateOrValue) => {
			if (!props.enablePagination) return;
			const newValue =
				typeof updateOrValue === 'function'
					? updateOrValue(paginationState.value ?? { pageIndex: 0, pageSize: 10 })
					: updateOrValue;

			innerPagination.value = newValue;
			emit('update:pagination', newValue);
		},

		onSortingChange: (updaterOrValue) => {
			const newValue =
				typeof updaterOrValue === 'function' ? updaterOrValue(sortingState.value) : updaterOrValue;

			innerSortingState.value = newValue;
			emit('update:sorting', newValue);
		}
	});

	const computeHeaderlStyle = (header: Header<TData, unknown>) => {
		const width = header.getSize();
		const headerId = header.column.columnDef.id;
		const column = columnsMap.value[headerId as string];
		const alignment = column?.align;

		const style: CSSProperties = {};

		if (width !== 0) {
			style.width = width + 'px';
		}
		if (alignment) {
			style.textAlign = alignment;
		}

		return style;
	};

	const computeCellStyle = (cell: Cell<TData, unknown>) => {
		const headerId = cell.column.columnDef.id;
		const column = columnsMap.value[headerId as string];
		const alignment = column?.align;

		const style: CSSProperties = {};

		if (alignment) {
			style.textAlign = alignment;
		}
		return style;
	};

	const handlePageUpdated = (page: number) => {
		// must minus 1 since the pagination component is 1-based and the table is 0-based
		table.setPageIndex(page - 1);
	};
</script>

<template>
	<div
		class="DataTable_Root"
		data-part="data-table_root"
	>
		<table
			class="DataTable_Table"
			:data-selection="enableRowSelection"
			:data-sortable="enableSort"
			:data-pagination="enablePagination"
			:data-fixed-header="fixHeader"
		>
			<thead
				class="DataTable_Head"
				:data-fixed-header="fixHeader"
			>
				<tr
					v-for="headerGroup in table.getHeaderGroups()"
					:key="headerGroup.id"
					class="DataTable_HeadRow"
					data-part="data-table_head-row"
				>
					<DataTableHeader
						v-for="header in headerGroup.headers"
						:key="header.id"
						:header="header"
						:table="table"
						:header-style="computeHeaderlStyle(header)"
						:selection-mode="selectionMode"
					>
						<template #selection="slotProps">
							<slot
								name="header:selection"
								v-bind="slotProps"
							/>
						</template>
						<template #regularHeader="slotProps">
							<slot
								:name="`header:${header.column.columnDef.id}`"
								v-bind="slotProps"
							/>
						</template>
					</DataTableHeader>
				</tr>
			</thead>
			<tbody
				class="DataTable_Body"
				data-part="data-table_body"
			>
				<tr
					v-for="row in table.getRowModel().rows"
					:key="row.id"
					class="DataTable_Row"
					:style="rowStyle ? rowStyle(row.original) : undefined"
					:data-selected="row.getIsSelected()"
					data-part="data-table_row"
				>
					<td
						v-for="cell in row.getVisibleCells()"
						:key="cell.id"
						:style="computeCellStyle(cell)"
						class="DataTable_Cell"
						:data-selection="cell.column.columnDef.id === 'selection'"
						data-part="data-table_cell"
					>
						<template v-if="cell.column.columnDef.id === 'selection'">
							<slot
								:name="`cell:selection`"
								:value="cell.getValue()"
								:data="cell.row.original"
								:checked="cell.row.getIsSelected()"
								:toggle-selected="cell.row.toggleSelected"
							>
								<Checkbox
									:checked="cell.row.getIsSelected()"
									@update:checked="cell.row.toggleSelected()"
								/>
							</slot>
						</template>
						<template v-else>
							<slot
								:name="`cell:${cell.column.columnDef.id}`"
								:value="cell.getValue()"
								:data="cell.row.original"
							>
								<FlexRender
									:render="cell.column.columnDef.cell"
									:props="cell.getContext()"
								/>
							</slot>
						</template>
					</td>
				</tr>
			</tbody>
		</table>

		<DataTablePagination
			v-if="enablePagination"
			:total="table.getRowCount()"
			:page="paginationState.pageIndex"
			:page-size="paginationState.pageSize"
			@update:page="handlePageUpdated"
			@update:page-size="table.setPageSize"
		/>
	</div>
</template>
