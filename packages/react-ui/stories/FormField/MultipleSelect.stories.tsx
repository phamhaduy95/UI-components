import type { Meta, StoryObj } from '@storybook/react-vite';
import MultipleSelect from '@components/MultipleSelect';
import { useState } from 'react';
import { expect, within, userEvent, screen, fn } from 'storybook/test';

const mockedOnValueChange = fn();

const items = [
	{ label: 'React', value: 'react' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Svelte', value: 'svelte' }
];

const clearButtonLabel = 'Clear value';
const selectIndicatorLabel = 'select indicator';

const meta: Meta<typeof MultipleSelect> = {
	title: 'Components/FormField/MultipleSelect',
	component: MultipleSelect,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'onValueChange' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		clearable: { control: 'boolean' },
		disabled: { control: 'boolean' },
		supportingText: { control: 'text' }
	},
	args: {
		items,
		supportingText: 'Please select at least one item.'
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Frameworks',
		placeholder: 'Select frameworks',
		supportingText: 'Please select at least one framework.',
		'data-testId': 'multiple-select-default'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if label exists', async () => {
			const labelElement = within(container).getByText(label);
			expect(labelElement).toBeInTheDocument();
		});

		await step('Check if trigger exists', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toBeInTheDocument();
		});

		await step('Check if Select has placeholder', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			const placeholder = within(trigger).getByText(args.placeholder as string);
			expect(placeholder).toBeInTheDocument();
		});

		await step('Check if Select has supporting text', async () => {
			const supportingText = within(container).getByText(args.supportingText as string);
			expect(supportingText).toBeInTheDocument();
			expect(supportingText).toHaveAttribute('id');

			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveAttribute('aria-describedby', supportingText.id);
		});

		await step('Check if indicator is displayed', async () => {
			const indicator = within(container).getByLabelText(selectIndicatorLabel);
			expect(indicator).toBeInTheDocument();
		});

		await step('Check if hidden select is rendered', async () => {
			const hiddenSelect = within(container).getByLabelText(label, { selector: 'select' });
			expect(hiddenSelect).toBeInTheDocument();
		});
	}
};

export const SelectItemFlow: Story = {
	args: {
		label: 'Frameworks',
		'data-testId': 'multiple-select-select-item-flow'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Open menu', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if menu popup is displayed', async () => {
			expect(menuPopup).toBeVisible();
		});

		await step('Check if menu popup consists all options from the item list', async () => {
			items.forEach((item) => {
				const option = within(menuPopup).getByRole('option', { name: item.label });
				expect(option).toBeInTheDocument();
			});
		});

		await step('Select multiple options', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			await userEvent.click(firstOption);
			const secondOption = within(menuPopup).getByRole('option', { name: items[1].label });
			await userEvent.click(secondOption);
		});

		await step('Check if trigger shows the selected values', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent(items[0].label);
			expect(trigger).toHaveTextContent(items[1].label);
		});

		await step('Check if menu popup is still visible (multiple select behavior)', async () => {
			expect(menuPopup).toBeVisible();
		});

		await step('Close menu popup', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
			expect(menuPopup).not.toBeVisible();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Frameworks',
		'data-testId': 'multiple-select-with-default-value',
		defaultValue: [items[0].value, items[1].value],
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if the trigger shows the default values', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent(items[0].label);
			expect(trigger).toHaveTextContent(items[1].label);
		});

		await step('Check if the clear icon is showed', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeVisible();
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Frameworks',
		clearable: true,
		'data-testId': 'multiple-select-clearable'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if the clear icon is hidden when there is no selected value', async () => {
			const clearButton = within(container).queryByRole('button', { name: clearButtonLabel });
			expect(clearButton).not.toBeInTheDocument();
		});

		await step('Select items', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			await userEvent.click(firstOption);
			const secondOption = within(menuPopup).getByRole('option', { name: items[1].label });
			await userEvent.click(secondOption);
		});

		await step('Check if close Icon is showed', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeVisible();
		});

		await step('Clear the selected value', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent('');
		});

		await step('Check if the clear button is hidden', async () => {
			const clearButton = within(container).queryByRole('button', { name: clearButtonLabel });
			expect(clearButton).not.toBeInTheDocument();
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Frameworks',
		clearable: true,
		value: [items[0].value],
		'data-testId': 'multiple-select-controllable',
		onValueChange: mockedOnValueChange
	},
	render: (args) => {
		const [value, setValue] = useState(args.value);

		const handleChange = (newValue: string[], item: any) => {
			setValue(newValue);
			if (args.onValueChange) {
				args.onValueChange(newValue, item);
			}
		};
		return (
			<div className="flex flex-col gap-2">
				<MultipleSelect {...args} value={value} onValueChange={handleChange} />
				<p className="mt-4" aria-label="selected-value">
					Selected: {value?.join(', ')}
				</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testId': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if trigger exists', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toBeInTheDocument();
		});

		const trigger = within(container).getByRole('combobox', { name: label });
		await step('Check if trigger has pre-selected value', async () => {
			expect(trigger).toHaveTextContent(items[0].label);
		});

		await step('Select another item', async () => {
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const secondOption = within(menuPopup).getByRole('option', { name: items[1].label });
			await userEvent.click(secondOption);
		});

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toHaveBeenCalled();
			expect(mockedOnValueChange).toHaveBeenCalledWith(
				[items[0].value, items[1].value],
				[items[0], items[1]]
			);
		});

		await step('Check if external state is updated with new value', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent(`Selected: ${items[0].value}, ${items[1].value}`);
		});

		await step('Clear all values', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected:');
		});

		await step('Check if onValueChange received empty array', async () => {
			// Second call should be empty array
			expect(mockedOnValueChange).toHaveBeenLastCalledWith([], []);
		});
	}
};

export const Status: Story = {
	render: (args) => {
		return (
			<div className="flex flex-col gap-2">
				<MultipleSelect
					{...args}
					status="error"
					label="Error"
					supportingText="Please select at least one framework."
				/>
				<MultipleSelect
					{...args}
					status="success"
					label="Success"
					supportingText="Please select at least one framework."
				/>
				<MultipleSelect
					{...args}
					status="warning"
					label="Warning"
					supportingText="Please select at least one framework."
				/>
			</div>
		);
	}
};

export const Size: Story = {
	args: {},
	render: (args) => {
		return (
			<div className="flex flex-col gap-2">
				<MultipleSelect {...args} size="small" label="Small" />
				<MultipleSelect {...args} size="medium" label="Medium" />
			</div>
		);
	}
};

export const Disabled: Story = {
	args: {
		label: 'Frameworks',
		disabled: true,
		placeholder: 'Select Frameworks',
		'data-testId': 'multiple-select-disabled'
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testId': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if trigger is disabled', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toBeDisabled();
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Frameworks',
		required: true,
		'data-testId': 'multiple-select-required'
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testId': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if required indicator is visible', async () => {
			const requiredSymbol = within(container).getByText('*');
			expect(requiredSymbol).toBeVisible();
		});

		await step('Check if trigger is required', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toBeRequired();
		});
	}
};
