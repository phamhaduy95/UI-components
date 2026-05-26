<script setup lang="ts" generic="TData">
	import { BarsArrowUpIcon, BarsArrowDownIcon, ArrowsUpDownIcon } from '@heroicons/vue/20/solid';
	import { Checkbox } from '@components/Checkbox';

	import type { DataTableHeaderProps, DataTableHeaderSlots } from './DataTable.type';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<DataTableHeaderProps<TData>>(), {
		headerStyle: undefined,
		selectionMode: undefined
	});

	defineSlots<DataTableHeaderSlots>();

	const isSelection = () => props.header.column.columnDef.id === 'selection';
</script>

<template>
	<template v-if="isSelection()">
		<th
			class="DataTable_Header"
			:col-span="header.colSpan"
			:style="headerStyle"
			:data-selection="isSelection()"
			data-part="data-table_selection-header"
		>
			<slot
				:id="header.column.columnDef.id ?? ''"
				name="selection"
				:header-text="header.column.columnDef.header?.toString() ?? ''"
				:col-span="header.colSpan"
				:checked="table.getIsAllPageRowsSelected()"
				:indeterminate="table.getIsSomePageRowsSelected()"
				:toggle-selected="() => table.toggleAllPageRowsSelected()"
			>
				<Checkbox
					v-if="selectionMode === 'multiple'"
					:checked="table.getIsAllPageRowsSelected()"
					:indeterminate="table.getIsSomePageRowsSelected()"
					@update:checked="table.toggleAllPageRowsSelected()"
				/>
			</slot>
		</th>
	</template>

	<template v-else>
		<th
			class="DataTable_Header"
			:col-span="header.colSpan"
			:style="headerStyle"
			:data-sortable="header.column.getCanSort()"
			:data-sort="header.column.getIsSorted() || 'none'"
			:aria-sort="
				header.column.getIsSorted() === 'asc'
					? 'ascending'
					: header.column.getIsSorted() === 'desc'
						? 'descending'
						: 'none'
			"
			tabindex="-1"
			data-part="data-table_header"
			@click="() => header.column.getCanSort() && header.column.toggleSorting()"
		>
			<slot
				:id="header.column.columnDef.id ?? ''"
				name="regularHeader"
				:col-span="header.colSpan"
				:header-text="header.column.columnDef.header?.toString() ?? ''"
				:is-sortable="header.column.getCanSort()"
				:sorted="header.column.getIsSorted()"
				:toggle-sorting="header.column.toggleSorting"
				:clear-sorting="header.column.clearSorting"
			>
				<div class="DataTable_Header_Content">
					<span>{{ String(header.column.columnDef.header ?? '') }}</span>
					<span
						v-if="header.column.getCanSort()"
						class="DataTable_Header_SortIndicator"
						:data-active="Boolean(header.column.getIsSorted())"
					>
						<BarsArrowUpIcon
							v-if="header.column.getIsSorted() === 'asc'"
							class="DataTable_Header_SortIcon"
						/>
						<BarsArrowDownIcon
							v-else-if="header.column.getIsSorted() === 'desc'"
							class="DataTable_Header_SortIcon"
						/>
						<ArrowsUpDownIcon
							v-else
							class="DataTable_Header_SortIcon"
						/>
					</span>
				</div>
			</slot>
		</th>
	</template>
</template>
