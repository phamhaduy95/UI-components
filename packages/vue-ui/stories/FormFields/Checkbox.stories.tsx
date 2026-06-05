import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Checkbox } from '@components/Checkbox';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';
import { Button } from '@components/Button';

const mockedOnCheckedChange = fn();
const mockedOnUpdateChecked = fn();

const meta = {
	title: 'Components/FormField/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		'onUpdate:checked': { action: 'update:checked' },
		onCheckedChange: { action: 'checkedChange' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		checked: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		},
		readonly: {
			control: 'boolean'
		},
		indeterminate: {
			control: 'boolean'
		}
	},
	args: {
		dataTestid: 'checkbox',
		onCheckedChange: mockedOnCheckedChange,
		'onUpdate:checked': mockedOnUpdateChecked
	},
	render: (args) => ({
		components: { Checkbox },
		setup() {
			return { args };
		},
		template: '<Checkbox v-bind="args" />'
	}),
	beforeEach() {
		mockedOnCheckedChange.mockClear();
		mockedOnUpdateChecked.mockClear();
	}
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Accept terms and conditions'
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if label exists', async () => {
			const labelElement = within(container).getByText(label!);
			expect(labelElement).toBeInTheDocument();
		});

		await step('Check if checkbox is unchecked', async () => {
			const checkbox = within(container).getByRole('checkbox');
			expect(checkbox).not.toBeChecked();
		});

		await step('Click checkbox', async () => {
			const checkbox = within(container).getByRole('checkbox');
			await userEvent.click(checkbox);
			expect(checkbox).toBeChecked();
		});
	}
};

export const DefaultChecked: Story = {
	args: {
		label: 'Checked Checkbox',
		defaultChecked: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if checkbox is checked', async () => {
			const checkbox = within(container).getByRole('checkbox');
			expect(checkbox).toBeChecked();
		});
	}
};

export const Indeterminate: Story = {
	render: () => ({
		components: { Checkbox },
		setup() {
			const state = ref<boolean[]>([false, false]);

			return () => {
				const allChecked = state.value.every(Boolean);
				const isIndeterminate = state.value.some(Boolean) && !allChecked;

				return (
					<div style="display: flex; flex-direction: column; gap: 16px;">
						<Checkbox
							label="Select All"
							checked={allChecked}
							indeterminate={isIndeterminate}
							onCheckedChange={(checked: boolean) => {
								state.value = state.value.map(() => checked);
							}}
							dataTestid="parent-checkbox"
						/>
						<div style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;">
							<Checkbox
								label="Option 1"
								checked={state.value[0]}
								onCheckedChange={(checked: boolean) => {
									state.value = [checked, state.value[1]!];
								}}
								dataTestid="child-checkbox-1"
							/>
							<Checkbox
								label="Option 2"
								checked={state.value[1]}
								onCheckedChange={(checked: boolean) => {
									state.value = [state.value[0]!, checked];
								}}
								dataTestid="child-checkbox-2"
							/>
						</div>
					</div>
				);
			};
		}
	}),
	play: async ({ canvas, step }) => {
		const parentCheckbox = canvas.getByRole('checkbox', { name: 'Select All' });
		const child1 = canvas.getByRole('checkbox', { name: 'Option 1' });
		const child2 = canvas.getByRole('checkbox', { name: 'Option 2' });

		await step('Check if parent checkbox is unchecked', async () => {
			expect(parentCheckbox).not.toBeChecked();
			const parentRoot = canvas.getByTestId('parent-checkbox');

			const checkboxInput = within(parentRoot).getByRole('checkbox');
			expect(checkboxInput).not.toBeChecked();
		});

		await step('Click on option 1', async () => {
			await userEvent.click(child1);
			expect(parentCheckbox).not.toBeChecked();
		});

		await step('Click on option 2', async () => {
			await userEvent.click(child2);
			expect(parentCheckbox).toBeChecked();
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Controlled Checkbox',
		checked: true,
		value: 'Hello'
	},
	render: (args) => ({
		components: { Checkbox, Button },
		setup() {
			const checked = ref(args.checked);

			const handleCheckedChange = (isChecked: boolean, value?: string) => {
				if (args.onCheckedChange) args.onCheckedChange(isChecked, value);
				checked.value = isChecked;
			};

			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Checkbox
						{...args}
						checked={checked.value}
						onCheckedChange={handleCheckedChange}
						label="Test"
					/>
					<div style="display: flex; gap: 8px;">
						<Button
							color="secondary"
							size="sm"
							onClick={() => {
								checked.value = !checked.value;
							}}
						>
							Toggle
						</Button>
					</div>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', value = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const checkbox = within(container).getByRole('checkbox', { name: 'Test' });

		await step('Test if checkbox is checked initially', async () => {
			expect(checkbox).toBeChecked();
		});

		await step('Toggle checkbox by clicking it', async () => {
			await userEvent.click(checkbox);
		});

		await step('Test if checkbox is checked after clicking it', async () => {
			expect(checkbox).not.toBeChecked();
			expect(mockedOnCheckedChange).toHaveBeenCalledWith(false, value);
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Checkbox',
		disabled: true,
		defaultChecked: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if checkbox is disabled', async () => {
			const checkbox = within(container).getByRole('checkbox');
			expect(checkbox).toBeDisabled();
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Required Checkbox',
		required: true
	},
	render: (args) => ({
		components: { Checkbox },
		setup() {
			return { args };
		},
		template: '<Checkbox v-bind="args" />'
	}),
	play: async ({ canvas, step }) => {
		await step('Check if checkbox is required', async () => {
			const checkbox = canvas.getByRole('checkbox');
			expect(checkbox).toBeRequired();
		});
	}
};

export const Sizes: Story = {
	render: () => ({
		components: { Checkbox },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Checkbox label="Small Checkbox" size="sm" defaultChecked />
					<Checkbox label="Medium Checkbox" size="md" defaultChecked />
					<Checkbox label="Large Checkbox" size="lg" defaultChecked />
				</div>
			);
		}
	})
};

export const Statuses: Story = {
	render: () => ({
		components: { Checkbox },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Checkbox label="Error Status" status="error" defaultChecked />
					<Checkbox label="Warning Status" status="warning" defaultChecked />
					<Checkbox label="Success Status" status="success" defaultChecked />
				</div>
			);
		}
	})
};
