import type { DeepKeys, RowData } from '@tanstack/vue-table';
import type { CSSProperties } from 'vue';

export type CellAlignment = 'end' | 'start' | 'center';

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
};

export type PaginationState = {
	pageIndex: number;
	pageSize: number;
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
	 */
	data: TData[];

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
	 * Optional array of currently selected row keys.
	 */
	selectedValue?: Array<TData[Tkey]>;

	/**
	 * Determine row selection mode: single or multiple items.
	 */
	selectionMode?: 'single' | 'multiple';

	/**
	 * Key to identify the row. Required when selectionMode is not enabled.
	 * Object data associated with key must be number, string
	 * For example:
	 * data = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
	 * dataKey = 'id'
	 */
	dataKey?: Tkey;

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
};

export type DataTableEmits<TData extends RowData, Tkey extends keyof TData = keyof TData> = {
	'update:selectedValue': [Array<TData[Tkey]>];
	'update:visibleHeaders': [Array<string>];
	'update:pagination': [PaginationState];
};

/**
 * Slot definitions structure for customized rendering in DataTable.
 */
export type DataTableSlots<TData extends RowData> = {
	// 1. Strongly-typed slots for data keys
	[K in DeepKeys<TData> as `header:${K & string}`]?: (props: { colSpan: number }) => void;
} & {
	[K in DeepKeys<TData> as `cell:${K & string}`]?: (props: { value: unknown; data: TData }) => void;
} & {
	// 2. Specific hardcoded slots
	['header:selection']?: (props: {
		colSpan: number;
		header: string;
		checked: boolean;
		indeterminate: boolean;
		toggleSelected: () => void;
	}) => void;
	['cell:selection']?: (props: {
		value: unknown;
		data: TData;
		checked: boolean;
		toggleSelected: () => void;
	}) => void;
} & {
	// 3. Fallback for any other dynamic column names
	[key: `header:${string}`]: () => void;
	[key: `cell:${string}`]: () => void;
};
