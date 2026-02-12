import type { Meta, StoryObj } from '@storybook/react-vite';
import SingleSelect from '@components/SingleSelect';
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

const meta: Meta<typeof SingleSelect> = {
	title: 'Components/FormField/SingleSelect',
	component: SingleSelect,
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
		supportingText: 'Please select a item.',
		items: items
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default single select with a label.
 */
export const Default: Story = {
	args: {
		label: 'Framework',
		placeholder: 'Select a framework',
		supportingText: 'Please select a framework.',
		'data-testId': 'single-select-default'
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
			expect(trigger).toHaveTextContent(args.placeholder as string);
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
		label: 'Framework',
		'data-testId': 'single-select-select-item-flow'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Select Item', async () => {
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

		await step('user click on the first option', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			await userEvent.click(firstOption);
		});

		await step('Check if menu popup is hidden', async () => {
			expect(menuPopup).not.toBeVisible();
		});

		await step('Check if trigger show the selected value', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent(items[0].label);
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Framework',
		'data-testId': 'single-select-with-default-value',
		defaultValue: items[0].value,
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if the trigger show the default value', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent(items[0].label);
		});

		await step('Check if the clear icon is showed', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeVisible();
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Framework',
		clearable: true,
		'data-testId': 'single-select-clearable'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if the clear icon is hidden when there is no selected value', async () => {
			const clearButton = within(container).queryByRole('button', { name: clearButtonLabel });
			expect(clearButton).not.toBeInTheDocument();
		});

		await step('Select first item', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			await userEvent.click(firstOption);
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

/**
 * Single select with a pre-selected value.
 */

export const Controllable: Story = {
	args: {
		label: 'Framework',
		clearable: true,
		value: items[0].value,
		onValueChange: mockedOnValueChange,
		'data-testId': 'single-select-controllable'
	},
	render: (args) => {
		const [value, setValue] = useState(args.value);

		const handleChange = (newValue: string, item: any) => {
			setValue(newValue);
			if (args.onValueChange) {
				args.onValueChange(newValue, item);
			}
		};
		return (
			<div className="flex flex-col gap-2">
				<SingleSelect {...args} value={value} onValueChange={handleChange} />
				<p className="mt-4" aria-label="selected-value">
					Selected: {value}
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

		await step('Select an item', async () => {
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const firstOption = within(menuPopup).getByRole('option', { name: items[1].label });
			await userEvent.click(firstOption);
		});

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toHaveBeenCalled();
			expect(mockedOnValueChange).toHaveBeenCalledWith(items[1].value, items[1]);
		});

		await step('Check if external state is updated with new value', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected: ' + items[1].value);
		});

		await step('Clear selected value', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected:');
		});

		await step('Check if onValueChange received empty string argument', async () => {
			expect(mockedOnValueChange).toHaveBeenNthCalledWith(2, '', undefined);
		});

		await step('Check if clear button is hidden', async () => {
			const clearButton = within(container).queryByRole('button', { name: clearButtonLabel });
			expect(clearButton).not.toBeInTheDocument();
		});
	}
};

/**
 * Disabled single select.
 */
export const Disabled: Story = {
	args: {
		label: 'Framework',
		disabled: true,
		placeholder: 'Select Framwork',
		'data-testId': 'single-select-disabled'
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
		label: 'Framework',
		required: true,
		'data-testId': 'single-select-required'
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

export const Status: Story = {
	render: (args) => {
		return (
			<div className="flex flex-col gap-2">
				<SingleSelect
					{...args}
					status="error"
					label="Error"
					supportingText="Please select a item."
				/>
				<SingleSelect
					{...args}
					status="success"
					label="Success"
					supportingText="Please select a item."
				/>
				<SingleSelect
					{...args}
					status="warning"
					label="Warning"
					supportingText="Please select a item."
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
				<SingleSelect {...args} size="small" label="Small" />
				<SingleSelect {...args} size="medium" label="Medium" />
			</div>
		);
	}
};
