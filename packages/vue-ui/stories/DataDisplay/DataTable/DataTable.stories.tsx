import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, userEvent, fn, waitFor } from 'storybook/test';
import { ref } from 'vue';
import ConcreteDataTable, { type Person } from './ConcreteDataTable.vue';
import { Button } from '@components/Button';
import { Checkbox } from '@components/Checkbox';
import type { DataTableColumn } from '@components/DataTable';

const mockedUpdateSelectedValue = fn();
const mockedUpdateVisibleHeaders = fn();

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
		}
	},
	args: {
		'onUpdate:selectedValue': mockedUpdateSelectedValue,
		'onUpdate:visibleHeaders': mockedUpdateVisibleHeaders
	},
	beforeEach: () => {
		mockedUpdateSelectedValue.mockClear();
		mockedUpdateVisibleHeaders.mockClear();
	}
} satisfies Meta<typeof ConcreteDataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const data: Person[] = [
	{
		id: '1',
		firstName: 'tanner',
		lastName: 'linsley',
		age: 24,
		visits: 100,
		status: 'In Relationship',
		progress: 50
	},
	{
		id: '2',
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80
	},
	{
		id: '3',
		firstName: 'joe',
		lastName: 'dirte',
		age: 45,
		visits: 20,
		status: 'Complicated',
		progress: 10
	}
];

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
		cell: (_, data: Person) => data.status
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

export const Default: Story = {
	args: {
		data,
		columns: baseColumns
	},
	play: async ({ canvas, step }) => {
		await step('Table is rendered', async () => {
			expect(canvas.getByRole('table')).toBeInTheDocument();
		});

		await step('All column headers are rendered', async () => {
			expect(canvas.getByRole('columnheader', { name: 'First Name' })).toBeInTheDocument();
			expect(canvas.getByRole('columnheader', { name: 'Last Name' })).toBeInTheDocument();
			expect(canvas.getByRole('columnheader', { name: 'Age' })).toBeInTheDocument();
			expect(canvas.getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
			expect(canvas.getByRole('columnheader', { name: 'Actions' })).toBeInTheDocument();
		});

		await step('Data rows are rendered', async () => {
			const rows = canvas.getAllByRole('row');
			expect(rows).toHaveLength(data.length + 1);

			expect(canvas.getByRole('cell', { name: 'tanner' })).toBeInTheDocument();
			expect(canvas.getByRole('cell', { name: 'linsley' })).toBeInTheDocument();
			expect(canvas.getByRole('cell', { name: 'joe' })).toBeInTheDocument();
		});

		await step('Action column cells are rendered', async () => {
			const editButtons = canvas.getAllByRole('cell', { name: 'Edit' });
			expect(editButtons).toHaveLength(data.length);
		});
	}
};

export const CustomHeaderAndCellSlots: Story = {
	args: {
		data,
		columns: baseColumns
	},
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
	play: async ({ canvas, step }) => {
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
		data,
		columns: baseColumns,
		selectionMode: 'single',
		dataKey: 'id'
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
						Selected DataKey (id):
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
		await step('Clicking first row checkbox', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');

			const firstRowCheckbox = checkboxes[0];

			await userEvent.click(firstRowCheckbox!);

			const value = data[0]!.id;

			const output = canvas.getByRole('status', { name: 'selected-output' });
			expect(output).toHaveTextContent(`Selected DataKey (id):${value}`);

			expect(args['onUpdate:selectedValue']).toHaveBeenCalledWith([value]);
		});

		await step('Selecting a different row replaces the previous selection', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');

			const secondRowCheckbox = checkboxes[2];
			expect(secondRowCheckbox).toBeDefined();
			await userEvent.click(secondRowCheckbox!);

			const value = data[2]!.id;

			const output = canvas.getByRole('status', { name: 'selected-output' });

			expect(output).toHaveTextContent(`Selected DataKey (id):${value}`);

			expect(args['onUpdate:selectedValue']).toHaveBeenCalledWith([value]);
		});
	}
};

/**
 * When `modelSelection` is **not** provided (i.e. `undefined`), the DataTable manages
 * row selection state internally (uncontrolled). The `update:modelSelection` event is
 * still emitted so consumers can react to changes without owning the state.
 */
export const UncontrolledSingleSelection: Story = {
	args: {
		data,
		columns: baseColumns,
		selectionMode: 'single',
		dataKey: 'id'
	},
	play: async ({ canvas, step, args }) => {
		await step('Clicking first row checkbox', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');
			const firstRowCheckbox = checkboxes[0];

			await userEvent.click(firstRowCheckbox!);

			await waitFor(() => {
				expect(firstRowCheckbox).toBeChecked();

				const value = data[0]!.id;
				expect(args['onUpdate:selectedValue']).toHaveBeenCalledWith([value]);
			});
		});

		await step('Clicking second row checkbox', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');
			const secondRowCheckbox = checkboxes[1];
			await userEvent.click(secondRowCheckbox!);

			await waitFor(() => {
				expect(secondRowCheckbox).toBeChecked();

				const value = data[1]!.id;
				expect(args['onUpdate:selectedValue']).toHaveBeenLastCalledWith([value]);
			});
		});
	}
};

export const MultiSelection: Story = {
	args: {
		data,
		columns: baseColumns,
		selectionMode: 'multiple',
		dataKey: 'id'
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
		await step('Selecting a row adds it to the selection model', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');

			// checkboxes[0] is the select-all header, checkboxes[1] is the first row (id: 1)
			const firstRowCheckbox = checkboxes[1];
			expect(firstRowCheckbox).toBeDefined();
			await userEvent.click(firstRowCheckbox!);

			await waitFor(() => {
				const output = canvas.getByRole('status', { name: 'selected-output' });
				expect(output).toHaveTextContent('1');
				expect(args['onUpdate:selectedValue']).toHaveBeenCalledWith(expect.arrayContaining(['1']));
			});
		});

		await step('Selecting a different row adds to the existing selection', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');

			// checkboxes[2] is the second row (id: 2)
			const secondRowCheckbox = checkboxes[2];
			expect(secondRowCheckbox).toBeDefined();
			await userEvent.click(secondRowCheckbox!);

			await waitFor(() => {
				const output = canvas.getByRole('status', { name: 'selected-output' });
				expect(output).toHaveTextContent('1, 2');
				expect(args['onUpdate:selectedValue']).toHaveBeenCalledWith(
					expect.arrayContaining(['1', '2'])
				);
			});
		});

		await step('Clicking select-all header checkbox modifies all rows', async () => {
			const checkboxes = canvas.getAllByRole('checkbox');
			const selectAllCheckbox = checkboxes[0];
			expect(selectAllCheckbox).toBeDefined();

			await userEvent.click(selectAllCheckbox!);

			await waitFor(() => {
				const output = canvas.getByRole('status', { name: 'selected-output' });
				expect(output).toHaveTextContent('1, 2, 3');
				expect(args['onUpdate:selectedValue']).toHaveBeenCalledWith(
					expect.arrayContaining(['1', '2', '3'])
				);
			});
		});
	}
};

export const CustomSelectionSlot: Story = {
	args: {
		data,
		columns: baseColumns,
		selectionMode: 'single',
		dataKey: 'id'
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
		await step('Custom radio header is rendered', async () => {
			expect(canvas.getByRole('columnheader', { name: 'Select' })).toBeInTheDocument();
		});

		await step('Custom radio cells are rendered', async () => {
			const radios = canvas.getAllByRole('radio');
			expect(radios).toHaveLength(data.length);
		});

		await step('Selecting a radio button updates the selection', async () => {
			const radios = canvas.getAllByRole('radio');
			// index 0 corresponds to the first row (no header radio button)
			const firstRowRadio = radios[0];
			expect(firstRowRadio).toBeDefined();
			await userEvent.click(firstRowRadio!);

			await waitFor(() => {
				const output = canvas.getByRole('status', { name: 'selected-output' });
				expect(output).toHaveTextContent('1');
				expect(args['onUpdate:selectedValue']).toHaveBeenCalledWith(expect.arrayContaining(['1']));
			});
		});

		await step('Selecting another radio clears the previous and selects the new one', async () => {
			const radios = canvas.getAllByRole('radio');
			const secondRowRadio = radios[1];
			expect(secondRowRadio).toBeDefined();
			await userEvent.click(secondRowRadio!);

			await waitFor(() => {
				const output = canvas.getByRole('status', { name: 'selected-output' });
				expect(output).toHaveTextContent('2');
				expect(args['onUpdate:selectedValue']).toHaveBeenCalledWith(expect.arrayContaining(['2']));
			});
		});
	}
};

export const CellAlignment: Story = {
	args: {
		data,
		columns: alignedColumns,
		dataKey: 'id'
	},
	play: async ({ canvas, step }) => {
		await step('Headers receive proper text-align styles', async () => {
			const startHeader = canvas.getByRole('columnheader', { name: 'Left Aligned (start)' });
			const centerHeader = canvas.getByRole('columnheader', { name: 'Center Aligned' });
			const endHeader = canvas.getByRole('columnheader', { name: 'Right Aligned (end)' });

			expect(startHeader).toHaveStyle({ textAlign: 'start' });
			expect(centerHeader).toHaveStyle({ textAlign: 'center' });
			expect(endHeader).toHaveStyle({ textAlign: 'end' });
		});

		await step('Cells receive proper text-align styles', async () => {
			// Find the cells in the first row
			const startCell = canvas.getByRole('cell', { name: 'tanner' });
			const centerCell = canvas.getByRole('cell', { name: '24' });
			const endCell = canvas.getByRole('cell', { name: '100' });

			expect(startCell).toHaveStyle({ textAlign: 'start' });
			expect(centerCell).toHaveStyle({ textAlign: 'center' });
			expect(endCell).toHaveStyle({ textAlign: 'end' });
		});
	}
};

export const ControllableColumnVisibility: Story = {
	args: {
		data,
		columns: baseColumns,
		visibleHeaders: ['firstName', 'lastName'] // start with only 2 columns visible
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
			expect(canvas.getByRole('columnheader', { name: 'First Name' })).toBeInTheDocument();
			expect(canvas.getByRole('columnheader', { name: 'Last Name' })).toBeInTheDocument();

			expect(canvas.queryByRole('columnheader', { name: 'Age' })).not.toBeInTheDocument();
		});

		await step('Toggling the Age checkbox shows the Age column', async () => {
			const ageToggle = canvas.getByRole('checkbox', { name: 'Age' });
			await userEvent.click(ageToggle);

			expect(canvas.getByRole('columnheader', { name: 'Age' })).toBeInTheDocument();

			expect(canvas.getByRole('cell', { name: '24' })).toBeInTheDocument();
		});

		await step('Toggling the First Name checkbox hides the column', async () => {
			const firstNameToggle = canvas.getByRole('checkbox', { name: 'First Name' });
			await userEvent.click(firstNameToggle);

			expect(canvas.queryByRole('columnheader', { name: 'First Name' })).not.toBeInTheDocument();
		});
	}
};
