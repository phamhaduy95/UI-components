<script setup lang="ts" generic="TData extends RowData">
	import {
		FlexRender,
		getCoreRowModel,
		useVueTable,
		createColumnHelper,
		type RowData,
		type Header,
		type Cell,
		type RowSelectionState
	} from '@tanstack/vue-table';
	import { computed, shallowRef, type CSSProperties } from 'vue';

	import type {
		DataTableColumn,
		DataTableEmit,
		DataTableProps,
		DataTableSlots
	} from './DataTable.type';

	import { Checkbox } from '@components/Checkbox';

	import '@packages/styles/components/DataTable.css';

	type ObjectKey = string | number;

	const props = withDefaults(defineProps<DataTableProps<TData>>(), {
		selectionMode: undefined,
		selectedValue: undefined,
		dataKey: undefined
	});

	const emit = defineEmits<DataTableEmit<TData>>();

	defineSlots<DataTableSlots<TData>>();

	const columnsMap = computed(() => {
		return props.columns.reduce<Record<string, DataTableColumn<TData>>>((acc, column) => {
			acc[column.id as string] = column;
			return acc;
		}, {});
	});

	const columnHelper = createColumnHelper<TData>();

	const innerSelection = shallowRef<RowSelectionState>({});

	const rowSelectionState = computed<RowSelectionState>(() => {
		if (!props.selectedValue) return innerSelection.value;

		return props.selectedValue.reduce<RowSelectionState>((acc, key) => {
			acc[key as ObjectKey] = true;
			return acc;
		}, {});
	});

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
							enableHiding: column.enableHiding
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

	const table = useVueTable({
		get data() {
			return props.data;
		},
		get columns() {
			return columns.value;
		},
		state: {
			get rowSelection() {
				return rowSelectionState.value;
			},
			get columnVisibility() {
				return columnVisibilityState.value;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => {
			return String(row[props.dataKey as keyof TData]);
		},
		get enableRowSelection() {
			return Boolean(props.selectionMode);
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
		onColumnVisibilityChange: (updateOrValue) => {
			const newValue =
				typeof updateOrValue === 'function'
					? updateOrValue(columnVisibilityState.value)
					: updateOrValue;

			innerVisibility.value = newValue;

			const visibleKeys = Object.keys(newValue);
			emit('update:visibleHeaders', visibleKeys);
		},
		get enableMultiRowSelection() {
			return props.selectionMode === 'multiple';
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
</script>

<template>
	<div class="DataTable">
		<div class="DataTable_Container">
			<table class="DataTable_Table">
				<thead class="DataTable_Head">
					<tr
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
						class="DataTable_HeadRow"
						:class="{ 'DataTable_HeadRow--sticky': fixHeader }"
					>
						<th
							v-for="header in headerGroup.headers"
							:key="header.id"
							:colSpan="header.colSpan"
							:style="computeHeaderlStyle(header)"
							class="DataTable_HeadCell"
							:class="{
								'DataTable_HeadCell--selection': header.column.columnDef.id === 'selection'
							}"
						>
							<template v-if="header.column.columnDef.id === 'selection'">
								<slot
									:name="`header:selection`"
									:col-span="header.colSpan"
									:header="header.column.columnDef.header"
									:checked="table.getIsAllPageRowsSelected()"
									:indeterminate="table.getIsSomePageRowsSelected()"
								>
									<Checkbox
										v-if="selectionMode === 'multiple'"
										:checked="table.getIsAllPageRowsSelected()"
										:indeterminate="table.getIsSomePageRowsSelected()"
										@update:checked="table.toggleAllPageRowsSelected()"
									/>
								</slot>
							</template>
							<template v-else>
								<slot
									:name="`header:${header.column.columnDef.id}`"
									:col-span="header.colSpan"
									:header="header.column.columnDef.header"
								>
									<FlexRender
										v-if="!header.isPlaceholder"
										:render="header.column.columnDef.header"
										:props="header.getContext()"
									/>
								</slot>
							</template>
						</th>
					</tr>
				</thead>
				<tbody class="DataTable_Body">
					<tr
						v-for="row in table.getRowModel().rows"
						:key="row.id"
						class="DataTable_Row"
						:class="{ 'DataTable_Row--selected': row.getIsSelected() }"
						:style="rowStyle ? rowStyle(row.original) : undefined"
						:data-selected="row.getIsSelected()"
					>
						<td
							v-for="cell in row.getVisibleCells()"
							:key="cell.id"
							:style="computeCellStyle(cell)"
							class="DataTable_Cell"
							:class="{ 'DataTable_Cell--selection': cell.column.columnDef.id === 'selection' }"
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
		</div>
	</div>
</template>
