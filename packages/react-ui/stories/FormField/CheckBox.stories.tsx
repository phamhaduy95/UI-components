import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from '@components/Checkbox';
import Button from '@components/Button';
import { useState } from 'react';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnCheckedChange = fn();

const meta = {
	title: 'Components/FormField/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		onCheckedChange: { action: 'onCheckedChange' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		size: {
			control: 'select',
			options: ['small', 'medium']
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
	beforeEach() {
		mockedOnCheckedChange.mockClear();
	}
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Accept terms and conditions',
		'data-testid': 'checkbox'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if label exists', async () => {
			const labelElement = within(container).getByText(label);
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
		defaultChecked: true,
		'data-testid': 'checkbox-checked'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if checkbox is checked', async () => {
			const checkbox = within(container).getByRole('checkbox');
			expect(checkbox).toBeChecked();
		});
	}
};

export const Indeterminate: Story = {
	render: () => {
		const [state, setState] = useState<boolean[]>([false, false]);

		const allChecked = state.every(Boolean);
		const isIndeterminate = state.some(Boolean) && !allChecked;

		return (
			<div className="flex flex-col gap-4">
				<Checkbox
					label="Select All"
					checked={allChecked}
					indeterminate={isIndeterminate}
					onCheckedChange={(checked) => setState(state.map(() => checked))}
					data-testid="parent-checkbox"
				/>
				<div className="ml-6 flex flex-col gap-2">
					<Checkbox
						label="Option 1"
						checked={state[0]}
						onCheckedChange={(checked) => setState([checked, state[1]])}
						data-testid="child-checkbox-1"
					/>
					<Checkbox
						label="Option 2"
						checked={state[1]}
						onCheckedChange={(checked) => setState([state[0], checked])}
						data-testid="child-checkbox-2"
					/>
				</div>
			</div>
		);
	},
	play: async ({ canvas, step }) => {
		const parentCheckbox = canvas.getByRole('checkbox', { name: 'Select All' });
		const child1 = canvas.getByRole('checkbox', { name: 'Option 1' });
		const child2 = canvas.getByRole('checkbox', { name: 'Option 2' });

		await step('Check if parent checkbox is unchecked', async () => {
			expect(parentCheckbox).not.toBeChecked();
			expect(parentCheckbox).toHaveAttribute('data-checked', 'false');
		});

		await step('Click on option 1', async () => {
			await userEvent.click(child1);
			expect(parentCheckbox).not.toBeChecked();
			expect(parentCheckbox).toHaveAttribute('data-checked', 'indeterminate');
		});

		await step('Click on option 2', async () => {
			await userEvent.click(child2);
			expect(parentCheckbox).toBeChecked();
			expect(parentCheckbox).toHaveAttribute('data-checked', 'true');
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Controlled Checkbox',
		checked: true,
		value: 'Hello',
		onCheckedChange: mockedOnCheckedChange,
		'data-testid': 'checkbox-controlled'
	},
	render: (args) => {
		const { onCheckedChange } = args;
		const [checked, setChecked] = useState(args.checked);

		const handleCheckedChange = (checked: boolean, value?: string) => {
			if (onCheckedChange) onCheckedChange(checked, value);
			setChecked(checked);
		};

		return (
			<div className="flex flex-col gap-4">
				<Checkbox {...args} checked={checked} onCheckedChange={handleCheckedChange} label="Test" />
				<div className="flex gap-2">
					<Button
						className="rounded border px-2 py-1 text-sm hover:bg-gray-100"
						onClick={() => setChecked(!checked)}
					>
						Toggle
					</Button>
				</div>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', value = '' } = args;
		const container = canvas.getByTestId(testId);
		const checkbox = within(container).getByRole('checkbox', { name: 'Test' });

		await step('Test if checkbox is checked initially ', async () => {
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
		defaultChecked: true,
		'data-testid': 'checkbox-disabled'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if checkbox is disabled', async () => {
			const checkbox = within(container).getByRole('checkbox');
			expect(checkbox).toBeDisabled();
		});
	}
};

export const Readonly: Story = {
	args: {
		label: 'Readonly Checkbox',
		readonly: true,
		defaultChecked: true,
		'data-testid': 'checkbox-readonly'
	},
	play: async ({ canvas, step }) => {
		await step('Check if checkbox is readonly', async () => {
			const checkbox = canvas.getByRole('checkbox');
			expect(checkbox).toHaveAttribute('readonly');
		});

		await step('Clicking readonly checkbox does not change state', async () => {
			const checkbox = canvas.getByRole('checkbox');
			await userEvent.click(checkbox);
			expect(checkbox).toBeChecked();
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Required Checkbox',
		required: true,
		'data-testid': 'checkbox-required'
	},
	play: async ({ canvas, step }) => {
		await step('Check if checkbox is required', async () => {
			const checkbox = canvas.getByRole('checkbox');
			expect(checkbox).toBeRequired();
		});
	}
};

export const Sizes: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-4">
				<Checkbox label="Small Checkbox" size="small" defaultChecked />
				<Checkbox label="Medium Checkbox" size="medium" defaultChecked />
			</div>
		);
	}
};

export const Statuses: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-4">
				<Checkbox label="Error Status" status="error" defaultChecked />
				<Checkbox label="Warning Status" status="warning" defaultChecked />
				<Checkbox label="Success Status" status="success" defaultChecked />
			</div>
		);
	}
};
