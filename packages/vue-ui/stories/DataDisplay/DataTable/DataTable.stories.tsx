import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, fn, within } from 'storybook/test';
import { ref } from 'vue';
import ConcreteDataTable, { type Person } from './ConcreteDataTable.vue';
import { Button } from '@components/Button';
import { Checkbox } from '@components/Checkbox';
import { faker } from '@faker-js/faker';
import type { DataTableColumn } from '@components/DataTable';

const mockedUpdateSelectedValue = fn();
const mockedUpdateVisibleHeaders = fn();
const mockedUpdatePagination = fn();
const mockedUpdateSorting = fn();

const paginationPanelTestid = 'data-table-pagination';
// Deterministic seed so interaction UI tests are stable
faker.seed(1234);

const generateData = (length: number) => {
	return Array.from({ length }, (_, i) => ({
		id: String(i + 1),
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		age: faker.number.int({ min: 18, max: 80 }),
		visits: faker.number.int({ min: 0, max: 500 }),
		status: faker.helpers.arrayElement(['Single', 'Complicated', 'In Relationship']),
		progress: faker.number.int({ min: 0, max: 100 })
	}));
};

const baseColumns: DataTableColumn<Person>[] = [
	{
		id: 'firstName',
		field: 'firstName' as const,
		header: 'First Name',
		type: 'data' as const,
		cell: (val: unknown) => String(val)
	},
	{
		id: 'lastName',
		field: 'lastName' as const,
		header: 'Last Name',
		type: 'data' as const,
		cell: (val: unknown) => String(val)
	},
	{
		id: 'age',
		field: 'age' as const,
		header: 'Age',
		type: 'data' as const,
		cell: (val) => String(val)
	},
	{
		id: 'status',
		field: 'status' as const,
		header: 'Status',
		type: 'data' as const,
		cell: (_, data: Person) => data.status,
		sortingFnc: 'textCaseSensitive'
	},
	{
		id: 'action-zone',
		header: 'Actions',
		type: 'action' as const,
		cell: () => 'Edit'
	}
];

const alignedColumns: DataTableColumn<Person>[] = [
	{
		id: 'firstName',
		field: 'firstName' as const,
		header: 'Left Aligned (start)',
		type: 'data' as const,
		align: 'start',
		cell: (val) => String(val)
	},
	{
		id: 'age',
		field: 'age' as const,
		header: 'Center Aligned',
		type: 'data' as const,
		align: 'center',
		cell: (val) => String(val)
	},
	{
		id: 'visits',
		field: 'visits' as const,
		header: 'Right Aligned (end)',
		type: 'data' as const,
		align: 'end',
		cell: (val) => String(val)
	}
];

const meta = {
	title: 'Components/DataDisplay/DataTable',
	component: ConcreteDataTable,

	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		'onUpdate:selectedValue': {
			description: 'Fired when the row selection changes',
			action: 'update:selectedValue'
		},
		'onUpdate:visibleHeaders': {
			description: 'Fired when the column visibility changes',
			action: 'update:visibleHeaders'
		},
		'onUpdate:pagination': {
			description: 'Fired when page or page size changes',
			action: 'update:pagination'
		},
		'onUpdate:sorting': {
			description: 'Fired when the sort state changes',
			action: 'update:sorting'
		}
	},
	args: {
		data: generateData(5),
		columns: baseColumns,
		dataKey: 'id',
		'onUpdate:selectedValue': mockedUpdateSelectedValue,
		'onUpdate:visibleHeaders': mockedUpdateVisibleHeaders,
		'onUpdate:pagination': mockedUpdatePagination,
		'onUpdate:sorting': mockedUpdateSorting
	},
	beforeEach: () => {
		mockedUpdateSelectedValue.mockClear();
		mockedUpdateVisibleHeaders.mockClear();
		mockedUpdatePagination.mockClear();
		mockedUpdateSorting.mockClear();
	}
} satisfies Meta<typeof ConcreteDataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, step, args }) => {
		const { data } = args;
		await step('Table is rendered', async () => {
			expect(canvas.getByRole('table')).toBeInTheDocument();
		});

		await step('All column headers are rendered', async () => {
			const headers = ['First Name', 'Last Name', 'Age', 'Status', 'Actions'];

			headers.forEach((header) => {
				expect(canvas.getByRole('columnheader', { name: header })).toBeInTheDocument();
			});
		});

		await step('Data rows are rendered', async () => {
			const rows = canvas.getAllByRole('row');
			expect(rows).toHaveLength(data.length + 1);

			rows.forEach((row, index) => {
				const rowData = data[index - 1];
				if (!rowData) return;
				expect(within(row).getByText(rowData.firstName)).toBeInTheDocument();
				expect(within(row).getByText(rowData.lastName)).toBeInTheDocument();
				expect(within(row).getByText(String(rowData.age))).toBeInTheDocument();
				expect(within(row).getByText(rowData.status)).toBeInTheDocument();
			});
		});

		await step('Action column cells are rendered', async () => {
			const editButtons = canvas.getAllByRole('cell', { name: 'Edit' });
			expect(editButtons).toHaveLength(data.length);
		});
	}
};

export const CustomHeaderAndCellSlots: Story = {
	render: (args) => ({
		components: { ConcreteDataTable, Button },
		setup() {
			return { args };
		},
		template: `
			<ConcreteDataTable v-bind="args">
				<template #header:age>
					<span>Custom Age</span>
				</template>
				<template #cell:age="{ value }">
					<span>{{ value }} <strong>yrs</strong></span>
				</template>
				<template #header:action-zone>
					<span>Manage</span>
				</template>
				<template #cell:action-zone>
					<Button>Action</Button>
				</template>
			</ConcreteDataTable>
		`
	}),
	play: async ({ canvas, step, args }) => {
		const { data } = args;
		await step('Check if custom age header renders', async () => {
			const ageHeader = canvas.getByRole('columnheader', { name: 'Custom Age' });
			expect(ageHeader).toBeInTheDocument();
		});

		await step('Check if custom age cells append "yrs" suffix', async () => {
			const ageCells = canvas.getAllByRole('cell', { name: /yrs/ });
			expect(ageCells).toHaveLength(data.length);
		});

		await step('Check if custom action header is rendered', async () => {
			expect(canvas.getByRole('columnheader', { name: 'Manage' })).toBeInTheDocument();
		});

		await step('Check if custom action cells render buttons', async () => {
			const deleteButtons = canvas.getAllByRole('button', { name: 'Action' });
			expect(deleteButtons).toHaveLength(data.length);
		});
	}
};

export const SingleSelection: Story = {
	args: {
		selectionMode: 'single',
		dataKey: 'id',
		enableRowSelection: true
	},
	render: (args) => ({
		components: { ConcreteDataTable, Button },
		setup() {
			const { 'onUpdate:selectedValue': onUpdateSelectedValue } = args;
			const selected = ref<(string | number)[]>([]);
			const isControlled = ref(true);

			const toggleMode = () => {
				isControlled.value = !isControlled.value;
				selected.value = [];
			};

			const handleSelectionUpdate = (val: (string | number)[]) => {
				if (isControlled.value) {
					selected.value = val;
				}

				onUpdateSelectedValue?.(val);
			};

			return { args, selected, isControlled, toggleMode, handleSelectionUpdate };
		},
		template: `
			<div class="flex flex-col gap-4">
				<div class="flex items-center gap-4">
					<div
						role="status"
						aria-label="selected-output"
						class="text-sm font-semibold text-slate-700"
					>
						Selected DataKey (id):
						<span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
							{{ selected.join(', ') || 'None' }}
						</span>
					</div>
				</div>
				<ConcreteDataTable
					v-bind="args"
					:selectedValue="selected"
					@update:selectedValue="handleSelectionUpdate"
				/>
			</div>
		`
	}),
	play: async ({ canvas, step, args }) => {
		const { data } = args;

		const output = canvas.getByRole('status', { name: 'selected-output' });

		await step('Clicking first row checkbox', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');
			const firstRowCheckbox = checkboxes[0];

			await userEvent.click(firstRowCheckbox!);
			const value = data[0]!.id;

			expect(output).toHaveTextContent(`Selected DataKey (id): ${value}`);
			expect(mockedUpdateSelectedValue).toHaveBeenCalledWith([value]);
		});

		await step('Selecting a different row replaces the previous selection', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');
			const thirdRowCheckbox = checkboxes[2];

			await userEvent.click(thirdRowCheckbox!);
			const value = data[2]!.id;

			expect(output).toHaveTextContent(`Selected DataKey (id): ${value}`);
			expect(mockedUpdateSelectedValue).toHaveBeenCalledWith([value]);
		});

		await step('Click on selected row to unselect it', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');
			const thirdRowCheckbox = checkboxes[2];

			await userEvent.click(thirdRowCheckbox!);

			expect(output).toHaveTextContent(`Selected DataKey (id): None`);
			expect(mockedUpdateSelectedValue).toHaveBeenCalledWith([]);
		});
	}
};

export const MultiSelection: Story = {
	args: {
		selectionMode: 'multiple',
		dataKey: 'id',
		enableRowSelection: true
	},
	render: (args) => ({
		components: { ConcreteDataTable },
		setup() {
			const { 'onUpdate:selectedValue': onUpdateSelectedValue } = args;
			const selected = ref<(string | number)[]>([]);

			return () => (
				<div class="flex flex-col gap-4">
					<div
						role="status"
						aria-label="selected-output"
						class="text-sm font-semibold text-slate-700"
					>
						Selected DataKeys (ids):
						<span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
							{selected.value.join(', ') || 'None'}
						</span>
					</div>
					<ConcreteDataTable
						{...args}
						selectedValue={selected.value}
						onUpdate:selectedValue={(val: (string | number)[]) => {
							selected.value = val;
							onUpdateSelectedValue?.(val);
						}}
					/>
				</div>
			);
		}
	}),
	play: async ({ canvas, step, args }) => {
		const { data } = args;

		const diplayedOutput = canvas.getByRole('status', { name: 'selected-output' });

		await step('Selecting a row adds it to the selection model', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');

			// checkboxes[0] is the select-all header, checkboxes[1] is the first row (id: 1)
			const firstRowCheckbox = checkboxes[1];
			expect(firstRowCheckbox).toBeDefined();
			await userEvent.click(firstRowCheckbox!);

			const value = data[0]!.id;

			expect(diplayedOutput).toHaveTextContent(value);
			expect(mockedUpdateSelectedValue).toHaveBeenCalledWith(expect.arrayContaining([value]));
		});

		await step('Selecting a different row adds to the existing selection', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');

			const secondRowCheckbox = checkboxes[2];
			expect(secondRowCheckbox).toBeDefined();
			await userEvent.click(secondRowCheckbox!);

			const value = data.slice(0, 2).map((row) => row.id);

			expect(diplayedOutput).toHaveTextContent(value.join(', '));
			expect(mockedUpdateSelectedValue).toHaveBeenCalledWith(expect.arrayContaining(value));
		});

		await step('Clicking select-all header checkbox modifies all rows', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');

			const selectAllCheckbox = checkboxes[0];
			expect(selectAllCheckbox).toBeDefined();

			await userEvent.click(selectAllCheckbox!);

			const value = data.map((row) => row.id);

			expect(diplayedOutput).toHaveTextContent(value.join(', '));
			expect(mockedUpdateSelectedValue).toHaveBeenCalledWith(expect.arrayContaining(value));
		});
	}
};

export const CustomSelectionSlot: Story = {
	args: {
		selectionMode: 'single',
		selectedValue: [],
		enableRowSelection: true
	},
	render: (args) => ({
		components: { ConcreteDataTable },
		setup() {
			const { 'onUpdate:selectedValue': onUpdateSelectedValue } = args;
			const selected = ref<(string | number)[]>([]);

			const onUpdate = (val: (string | number)[]) => {
				selected.value = val;
				if (onUpdateSelectedValue) {
					onUpdateSelectedValue(val);
				}
			};

			return { args, selected, onUpdate };
		},
		template: `
			<div class="flex flex-col gap-4">
				<div role="status" aria-label="selected-output" class="text-sm font-semibold text-slate-700">
					Selected DataKey (id): <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{{ selected.join(', ') || 'None' }}</span>
				</div>
				<ConcreteDataTable 
					v-bind="args" 
					:selectedValue="selected"
					@update:selectedValue="onUpdate"
				>
					<template #header:selection>
						<span>Select</span>
					</template>
					<template #cell:selection="{ checked, toggleSelected }">
						<input 
							type="radio" 
							name="table-radio-group"
							aria-label="Select row"
							:checked="checked" 
							@change="toggleSelected()"
						/>
					</template>
				</ConcreteDataTable>
			</div>
		`
	}),
	play: async ({ canvas, step, args }) => {
		const { data } = args;
		await step('Custom radio header is rendered', async () => {
			expect(canvas.getByRole('columnheader', { name: 'Select' })).toBeInTheDocument();
		});

		await step('Custom radio cells are rendered', async () => {
			const radios = canvas.getAllByRole('radio');
			expect(radios).toHaveLength(data.length);
		});

		await step('Selecting a radio button updates the selection', async () => {
			const radios = canvas.getAllByRole('radio');

			const firstRowRadio = radios[0];
			expect(firstRowRadio).toBeDefined();
			await userEvent.click(firstRowRadio!);

			const value = data[0]!.id;

			const output = canvas.getByRole('status', { name: 'selected-output' });
			expect(output).toHaveTextContent(value.toString());
			expect(mockedUpdateSelectedValue).toHaveBeenCalledWith([value]);
		});

		await step('Selecting another radio clears the previous and selects the new one', async () => {
			const radios = canvas.getAllByRole('radio');
			const secondRowRadio = radios[1];
			expect(secondRowRadio).toBeDefined();
			await userEvent.click(secondRowRadio!);

			const value = data[1]!.id;

			const output = canvas.getByRole('status', { name: 'selected-output' });
			expect(output).toHaveTextContent(value.toString());
			expect(mockedUpdateSelectedValue).toHaveBeenCalledWith([value]);
		});
	}
};

export const CellAlignment: Story = {
	args: {
		columns: alignedColumns,
		dataKey: 'id'
	},
	play: async ({ canvas, step, args }) => {
		const { data = [] } = args;
		await step('Headers receive proper text-align styles', async () => {
			const startHeader = canvas.getByRole('columnheader', { name: 'Left Aligned (start)' });
			const centerHeader = canvas.getByRole('columnheader', { name: 'Center Aligned' });
			const endHeader = canvas.getByRole('columnheader', { name: 'Right Aligned (end)' });

			expect(startHeader).toHaveStyle({ textAlign: 'start' });
			expect(centerHeader).toHaveStyle({ textAlign: 'center' });
			expect(endHeader).toHaveStyle({ textAlign: 'end' });
		});

		await step('Cells receive proper text-align styles', async () => {
			const firstRowData = data![0] as Person;
			const startCell = canvas.getByRole('cell', { name: firstRowData.firstName });
			const centerCell = canvas.getByRole('cell', { name: firstRowData.age.toString() });
			const endCell = canvas.getByRole('cell', { name: firstRowData.visits.toString() });

			expect(startCell).toHaveStyle({ textAlign: 'start' });
			expect(centerCell).toHaveStyle({ textAlign: 'center' });
			expect(endCell).toHaveStyle({ textAlign: 'end' });
		});
	}
};

export const ControllableColumnVisibility: Story = {
	args: {
		visibleHeaders: ['firstName', 'lastName']
	},
	render: (args) => ({
		components: { ConcreteDataTable, Checkbox },
		setup() {
			const { 'onUpdate:visibleHeaders': onUpdateVisibleHeaders } = args;
			const visibleKeys = ref<string[]>(args.visibleHeaders ?? []);

			const toggleColumn = (colId: string) => {
				if (visibleKeys.value.includes(colId)) {
					visibleKeys.value = visibleKeys.value.filter((id) => id !== colId);
				} else {
					visibleKeys.value = [...visibleKeys.value, colId];
				}
			};

			return () => (
				<div class="flex flex-col gap-4">
					<div class="flex gap-2 flex-wrap mb-4">
						{(args.columns as { id: string; header: string }[]).map((col) => (
							<Checkbox
								key={col.id}
								label={col.header}
								checked={visibleKeys.value.includes(col.id)}
								onUpdate:checked={() => toggleColumn(col.id)}
								dataTestid={`toggle-${col.id}`}
							/>
						))}
					</div>

					<ConcreteDataTable
						{...args}
						visibleHeaders={visibleKeys.value}
						onUpdate:visibleHeaders={(val: string[]) => {
							visibleKeys.value = val;
							onUpdateVisibleHeaders?.(val);
						}}
					/>
				</div>
			);
		}
	}),
	play: async ({ canvas, step }) => {
		await step('Only explicitly visible columns are rendered initially', async () => {
			const firstNameHeader = canvas.getByRole('columnheader', { name: 'First Name' });
			const lastNameHeader = canvas.getByRole('columnheader', { name: 'Last Name' });

			expect(firstNameHeader).toBeInTheDocument();
			expect(lastNameHeader).toBeInTheDocument();
		});

		await step('Toggling the Age checkbox shows the Age column', async () => {
			const ageToggle = canvas.getByRole('checkbox', { name: 'Age' });
			await userEvent.click(ageToggle);

			expect(canvas.getByRole('columnheader', { name: 'Age' })).toBeInTheDocument();
		});

		await step('Toggling the First Name checkbox hides the column', async () => {
			const firstNameToggle = canvas.getByRole('checkbox', { name: 'First Name' });
			await userEvent.click(firstNameToggle);

			expect(canvas.queryByRole('columnheader', { name: 'First Name' })).not.toBeInTheDocument();
		});
	}
};

export const WithPagination: Story = {
	args: {
		data: generateData(200),
		dataKey: 'id'
	},
	render: (args) => ({
		components: { ConcreteDataTable, Button },
		setup() {
			const isPaginationEnabled = ref(false);

			const togglePagination = () => {
				isPaginationEnabled.value = !isPaginationEnabled.value;
			};

			return { args, isPaginationEnabled, togglePagination };
		},
		template: `
			<div class="flex flex-col gap-4">
				<div>
					<Button @click="togglePagination">
						{{ isPaginationEnabled ? 'Disable Pagination' : 'Enable Pagination' }}
					</Button>
				</div>
				<ConcreteDataTable
					v-bind="args"
					:enablePagination="isPaginationEnabled"
				/>
			</div>
		`
	}),
	play: async ({ canvas, args, step }) => {
		const { data } = args;

		await step(
			'Check if pagination panel is not rendered when pagination is disabled',
			async () => {
				expect(canvas.queryByTestId(paginationPanelTestid)).not.toBeInTheDocument();
			}
		);

		await step('Check if all rows are displayed', async () => {
			const rows = canvas.getAllByRole('row');
			expect(rows).toHaveLength(data.length + 1);
		});

		await step('Toggle pagination on', async () => {
			const toggleBtn = canvas.getByRole('button', { name: 'Enable Pagination' });
			await userEvent.click(toggleBtn);

			expect(canvas.getByTestId(paginationPanelTestid)).toBeInTheDocument();
		});

		await step('Check if PaginationPanel is rendered', async () => {
			const panel = canvas.getByTestId(paginationPanelTestid);
			expect(panel).toBeInTheDocument();
		});

		await step('Check if only the first 10 rows are visible on page 1', async () => {
			const first10RowData = data.slice(0, 10);

			first10RowData.forEach((rowData) => {
				expect(canvas.getByRole('cell', { name: rowData.firstName })).toBeInTheDocument();
			});
		});

		await step('Navigate to page 2 via the next-page button', async () => {
			const nextBtn = canvas.getByRole('button', { name: 'next page' });
			await userEvent.click(nextBtn);
		});

		await step('Check if page 2 rows are now visible', async () => {
			const page2RowData = data.slice(10, 20);

			page2RowData.forEach((rowData) => {
				expect(canvas.getByRole('cell', { name: rowData.firstName })).toBeInTheDocument();
			});
		});

		await step('Check if update:pagination callback fired with correct page index', async () => {
			expect(args['onUpdate:pagination']).toHaveBeenLastCalledWith(
				expect.objectContaining({ pageIndex: 1, pageSize: 10 })
			);
		});

		await step('Navigate back to page 1 via the prev-page button', async () => {
			const prevBtn = canvas.getByRole('button', { name: 'previous page' });
			await userEvent.click(prevBtn);

			expect(canvas.getByRole('cell', { name: data[0]!.firstName })).toBeInTheDocument();
		});
	}
};

const sortableColumns: DataTableColumn<Person>[] = [
	{
		id: 'firstName',
		field: 'firstName' as const,
		header: 'First Name',
		type: 'data' as const,
		cell: (val: unknown) => String(val),
		enableSorting: true
	},
	{
		id: 'lastName',
		field: 'lastName' as const,
		header: 'Last Name',
		type: 'data' as const,
		cell: (val: unknown) => String(val),
		enableSorting: true
	},
	{
		id: 'age',
		field: 'age' as const,
		header: 'Age',
		type: 'data' as const,
		cell: (val) => String(val),
		enableSorting: true
	},
	{
		id: 'status',
		field: 'status' as const,
		header: 'Status',
		type: 'data' as const,
		cell: (_, data: Person) => data.status,
		enableSorting: true,
		sortingFnc: 'textCaseSensitive'
	},
	{
		id: 'action-zone',
		header: 'Actions',
		type: 'action' as const,
		cell: () => 'Edit'
	}
];

/**
 * Single-column sort. Clicking a sortable column header cycles through
 * asc → desc → none. Non-sortable columns (Actions) show no sort button.
 */
export const SingleSort: Story = {
	args: {
		data: generateData(8),
		columns: sortableColumns,
		dataKey: 'id',
		enableSort: true
	},
	play: async ({ canvas, step }) => {
		const firstNameHeader = canvas.getByRole('columnheader', { name: 'First Name' });

		await step('Sortable header has appropriate attributes', async () => {
			expect(firstNameHeader).toHaveAttribute('data-sortable', 'true');
			expect(firstNameHeader).toHaveAttribute('aria-sort', 'none');
		});

		await step('Non-sortable header (Actions) is not sortable', async () => {
			const actionsHeader = canvas.getByRole('columnheader', { name: 'Actions' });
			expect(actionsHeader).toHaveAttribute('data-sortable', 'false');
		});

		await step('Clicking header once sorts ascending', async () => {
			await userEvent.click(firstNameHeader);
			expect(firstNameHeader).toHaveAttribute('aria-sort', 'ascending');
			expect(mockedUpdateSorting).toHaveBeenLastCalledWith([{ id: 'firstName', desc: false }]);
		});

		await step('Clicking header again sorts descending', async () => {
			await userEvent.click(firstNameHeader);
			expect(firstNameHeader).toHaveAttribute('aria-sort', 'descending');
			expect(mockedUpdateSorting).toHaveBeenLastCalledWith([{ id: 'firstName', desc: true }]);
		});

		await step('Clicking header a third time clears the sort', async () => {
			await userEvent.click(firstNameHeader);
			expect(firstNameHeader).toHaveAttribute('aria-sort', 'none');
			expect(mockedUpdateSorting).toHaveBeenLastCalledWith([]);
		});
	}
};

/**
 * Fixed header table. The `fixHeader` prop makes the `<thead>` sticky,
 * allowing the user to scroll through a large dataset while keeping the headers visible.
 * Note: The external container or the table root itself must have a constrained height and `overflow-y: auto` for this to work.
 */
export const FixedHeader: Story = {
	args: {
		data: generateData(50),
		columns: baseColumns,
		dataKey: 'id',
		fixHeader: true
	},
	render: (args) => ({
		components: { ConcreteDataTable },
		setup() {
			return { args };
		},
		template: `
			<ConcreteDataTable
				v-bind="args"
				style="max-height: 400px; overflow-y: auto;"
			/>
		`
	}),
	play: async ({ canvas, step }) => {
		await step('Check if header has data-fixed-header attribute', async () => {
			const table = canvas.getByRole('table');
			// get the thead element directly since role maps aren't easily nested
			const thead = table.querySelector('thead');
			expect(thead).toBeInTheDocument();
			expect(thead).toHaveAttribute('data-fixed-header', 'true');
		});
	}
};
