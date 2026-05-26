import type {
	DeepKeys,
	RowData,
	SortingState,
	SortingFn,
	BuiltInSortingFn,
	Header,
	Table
} from '@tanstack/vue-table';
import type { CSSProperties } from 'vue';

export type CellAlignment = 'end' | 'start' | 'center';

export type DataTableSortingState = SortingState;

export type PaginationState = {
	pageIndex: number;
	pageSize: number;
};

type BaseColumnDef<TData extends RowData> = {
	/**
	 * Unique identifier for the column. Can be a key from the data or a custom string.
	 */
	id: DeepKeys<TData> | ({} & string);
	/**
	 * The text to display in the column header.
	 */
	header: string;
	/**
	 * How to render the cell content. Can be a string key or a function that returns a string.
	 */
	cell: string | ((value: unknown, data: TData) => string);
	/**
	 * Minimum width of the column in pixels.
	 */
	minWidth?: number;
	/**
	 * Maximum width of the column in pixels.
	 */
	maxWidth?: number;
	/**
	 * Fixed width of the column in pixels.
	 */
	width?: number;
	/**
	 * Text alignment for the column cells ('start', 'center', or 'end').
	 */
	align?: CellAlignment;

	/**
	 * Enable column hiding.
	 */
	enableHiding?: boolean;
	/**
	 * Enable column sorting.
	 */
	enableSorting?: boolean;

	sortingFnc?: SortingFn<TData> | BuiltInSortingFn;
};

/**
 * Column definition for displaying data fields.
 */
export type ColumnDef<TData extends RowData> = BaseColumnDef<TData> & {
	/**
	 * The data field key from the row data to display.
	 */
	field: DeepKeys<TData>;
	/**
	 * Identifies this column as a standard data column.
	 */
	type: 'data';
};

/**
 * Column definition for displaying actions (e.g., buttons, row operations).
 */
export type ActionColumnDef<TData extends RowData> = BaseColumnDef<TData> & {
	/**
	 * Identifies this column as an action column.
	 */
	type: 'action';
};

export type DataTableColumn<TData extends RowData> = ColumnDef<TData> | ActionColumnDef<TData>;

/**
 * Properties for the DataTable component.
 */
export type DataTableProps<TData extends RowData, Tkey extends keyof TData = keyof TData> = {
	/**
	 * Array of column definitions for the table.
	 */
	columns: DataTableColumn<TData>[];
	/**
	 * The array of data items to populate the table rows.
	 * Since underlined tansack-table would wrap data with shallowRef,you need to pass a new array instance to update data value.
	 * Read this guide https://tanstack.com/table/latest/docs/framework/vue/guide/table-state#using-reactive-data to learn more
	 */
	data: TData[];

	/**
	 * Key to identify the row. Required when selectionMode is not enabled.
	 * Object data associated with key must be number, string
	 * For example:
	 * data = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
	 * dataKey = 'id'
	 */
	dataKey?: Tkey;

	/**
	 * Optional function to dynamically apply CSS style to a row based on its data.
	 */
	rowStyle?: (data: TData) => CSSProperties;
	/**
	 * Optional function to dynamically apply a CSS class to a row based on its data.
	 */
	rowClass?: (data: TData) => string;
	/**
	 * Optional flag to fix the table header at the top during scrolling.
	 */
	fixHeader?: boolean;

	/**
	 * Enable row selection.
	 */
	enableRowSelection?: boolean;

	/**
	 * Determine row selection mode: single or multiple items.
	 */
	selectionMode?: 'single' | 'multiple';

	/**
	 * Optional array of currently selected row keys.
	 */
	selectedValue?: Array<TData[Tkey]>;

	/**
	 * Array of visible headers.
	 */
	visibleHeaders?: Array<string>;

	/**
	 * Enable pagination.
	 */
	enablePagination?: boolean;

	/**
	 * Pagination state.
	 */
	pagination?: PaginationState;

	/**
	 * Enable sorting.
	 */
	enableSort?: boolean;
	/**
	 * Sorting state.
	 */
	sorting?: DataTableSortingState;

	/**
	 * Default sorting state.
	 */
	defaultSorting?: DataTableSortingState;
};

export type DataTableEmits<TData extends RowData, Tkey extends keyof TData = keyof TData> = {
	'update:selectedValue': [Array<TData[Tkey]>];
	'update:visibleHeaders': [Array<string>];
	'update:pagination': [PaginationState];
	'update:sorting': [DataTableSortingState];
};

export interface HeaderSlotProps {
	id: string;
	colSpan: number;
	headerText: string;
	isSortable?: boolean;
	sorted?: 'asc' | 'desc' | false;
	toggleSorting?: () => void;
	clearSorting?: () => void;
}

export interface HeaderSelectionSlotProps {
	id: string;
	colSpan: number;
	headerText: string;
	checked: boolean;
	indeterminate: boolean;
	toggleSelected: () => void;
}

export interface CellSelectionSlotProps<TData extends RowData> {
	value: unknown;
	data: TData;
	checked: boolean;
	toggleSelected: () => void;
}

export interface CellSlotProps<TData extends RowData> {
	value: unknown;
	data: TData;
}

/**
 * Slot definitions structure for customized rendering in DataTable.
 */
export type DataTableSlots<TData extends RowData> = {
	// 1. Strongly-typed slots for data keys
	[K in DeepKeys<TData> as `header:${K & string}`]?: (props: HeaderSlotProps) => void;
} & {
	[K in DeepKeys<TData> as `cell:${K & string}`]?: (props: CellSlotProps<TData>) => void;
} & {
	// 2. Specific hardcoded slots
	['header:selection']?: (props: HeaderSelectionSlotProps) => void;
	['cell:selection']?: (props: CellSelectionSlotProps<TData>) => void;
} & {
	// 3. Fallback for any other dynamic column names
	[key: `header:${string}`]: () => void;
	[key: `cell:${string}`]: () => void;
};

export interface DataTableHeaderProps<TData> {
	header: Header<TData, unknown>;
	table: Table<TData>;
	headerStyle?: CSSProperties;
	selectionMode?: 'single' | 'multiple';
}

export interface DataTableHeaderSlots {
	selection?(props: HeaderSelectionSlotProps): void;
	regularHeader?(props: HeaderSlotProps): void;
}
