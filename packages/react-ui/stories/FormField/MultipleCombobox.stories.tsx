import type { Meta, StoryObj } from '@storybook/react-vite';
import MultipleCombobox from '@components/MultipleCombobox';
import { useState } from 'react';
import { expect, within, userEvent, screen, fn } from 'storybook/test';

const mockedOnValueChange = fn();

const items = [
	{ label: 'React', value: 'react' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Svelte', value: 'svelte' },
	{ label: 'Next.js', value: 'nextjs' },
	{ label: 'Nuxt.js', value: 'nuxtjs' },
	{ label: 'Remix', value: 'remix' },
	{ label: 'Astro', value: 'astro' },
	{ label: 'Solid', value: 'solid' },
	{ label: 'Preact', value: 'preact' }
];

const triggerButtonLabel = 'Trigger popup';

const clearButtonLabel = 'Clear value';

const meta: Meta<typeof MultipleCombobox> = {
	title: 'Components/FormField/MultipleCombobox',
	component: MultipleCombobox,
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
		disabled: { control: 'boolean' },
		supportingText: { control: 'text' }
	},
	args: {
		label: 'Frameworks',
		placeholder: 'Search for frameworks',
		supportingText: 'Please select frameworks.',
		items: items
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default multiple combobox with a label.
 */
export const Default: Story = {
	args: {
		label: 'Frameworks',
		placeholder: 'Search for frameworks',
		supportingText: 'Please select frameworks.',
		'data-testid': 'multiple-combobox-default'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '', supportingText = '', placeholder = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if label exists', async () => {
			const labelElement = within(container).getByText(label);
			expect(labelElement).toBeInTheDocument();
		});

		await step('Check if input (combobox) exists', async () => {
			const input = within(container).getByRole('combobox');
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has placeholder', async () => {
			const input = within(container).getByRole('combobox');
			expect(input).toHaveAttribute('placeholder', placeholder);
		});

		await step('Check if Combobox has supporting text', async () => {
			const supportingTextEl = within(container).getByText(supportingText);
			expect(supportingTextEl).toBeInTheDocument();
		});

		await step('Check if trigger is displayed', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			expect(trigger).toBeInTheDocument();
		});
	}
};

export const SelectItemFlow: Story = {
	args: {
		label: 'Frameworks',
		'data-testid': 'multiple-combobox-select-item-flow'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Open menu by clicking trigger', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
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

		await step('Check if menu popup is still visible (multiple select behavior)', async () => {
			expect(menuPopup).toBeVisible();
		});

		await step('Close menu popup', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);
			expect(menuPopup).not.toBeVisible();
		});

		await step('Check if input shows the selected values', async () => {
			const tag1 = within(container).getByText(items[0].label);
			const tag2 = within(container).getByText(items[1].label);
			expect(tag1).toBeInTheDocument();
			expect(tag2).toBeInTheDocument();
		});

		await step('Reopen Popup', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);
		});

		await step('Check if items are highlighted', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			const secondOption = within(menuPopup).getByRole('option', { name: items[1].label });
			expect(firstOption).toHaveAttribute('data-state', 'checked');
			expect(secondOption).toHaveAttribute('data-state', 'checked');
		});

		await step('Deselect first option', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			await userEvent.click(firstOption);
		});

		await step('Check if first option is not highlighted', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			expect(firstOption).not.toHaveAttribute('data-state', 'checked');
		});

		await step('Close menu popup', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);
			expect(menuPopup).not.toBeVisible();
		});

		await step('Check if input shows the selected values', async () => {
			const tag2 = within(container).getByText(items[1].label);
			expect(tag2).toBeInTheDocument();

			const tag1 = within(container).queryByText(items[0].label);
			expect(tag1).not.toBeInTheDocument();
		});

		await step('Click directly on tag to remove item', async () => {
			const tag2 = within(container).getByText(items[1].label);
			await userEvent.click(tag2);
		});

		await step('Check if all items are removed', async () => {
			const tag = within(container).queryByText(items[1].label);
			expect(tag).not.toBeInTheDocument();
		});
	}
};

export const removeSelectedViaKeyboard: Story = {
	args: {
		label: 'Frameworks',
		'data-testid': 'multiple-combobox-remove-selected-via-keyboard',
		defaultValue: [items[0].value, items[1].value],
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Press Backspace to remove second item', async () => {
			const input = canvas.getByRole('combobox', { name: label });
			await userEvent.click(input);
			await userEvent.keyboard('{backspace}');
		});

		await step('Check if second item is removed', async () => {
			const tag2 = within(container).queryByText(items[1].label);
			expect(tag2).not.toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Frameworks',
		'data-testid': 'multiple-combobox-with-default-value',
		defaultValue: [items[0].value, items[1].value],
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if the input shows the default values as tags', async () => {
			const tag1 = within(container).getByText(items[0].label);
			const tag2 = within(container).getByText(items[1].label);
			expect(tag1).toBeInTheDocument();
			expect(tag2).toBeInTheDocument();
		});

		await step('Check if clear button is displayed', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeInTheDocument();
		});

		await step('Open popup menu', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);
		});

		await step('Check if selected items are highlighted', async () => {
			const menuPopup = screen.getByRole('listbox', { name: label });
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			const secondOption = within(menuPopup).getByRole('option', { name: items[1].label });
			expect(firstOption).toHaveAttribute('data-state', 'checked');
			expect(secondOption).toHaveAttribute('data-state', 'checked');
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Frameworks',
		'data-testid': 'multiple-combobox-clearable',
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if clear button is not shown when no value is selected', async () => {
			const clearButton = within(container).queryByRole('button', { name: clearButtonLabel });
			expect(clearButton).not.toBeInTheDocument();
		});

		await step('Select first option', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			await userEvent.click(firstOption);
		});

		await step('Check if clear button is shown', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeInTheDocument();
			if (clearButton) await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const tag = within(container).queryByText(items[0].label);
			expect(tag).not.toBeInTheDocument();
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Frameworks',
		value: [items[0].value],
		onValueChange: mockedOnValueChange,
		'data-testid': 'multiple-combobox-controllable',
		clearable: true
	},
	render: (args) => {
		const [value, setValue] = useState(args.value);

		const handleChange = (newValue: string[], item: any) => {
			console.log(newValue, item);
			setValue(newValue);
			if (args.onValueChange) {
				args.onValueChange(newValue, item);
			}
		};
		return (
			<div className="flex flex-col gap-2">
				<MultipleCombobox {...args} value={value} onValueChange={handleChange} />
				<p className="mt-4" aria-label="selected-value">
					Selected: {value?.join(', ')}
				</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const input = within(container).getByRole('combobox');

		await step('Check if input has pre-selected value', async () => {
			const tag = within(container).getByText(items[0].label);
			expect(tag).toBeInTheDocument();
		});

		await step('Select an item', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
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

		await step('Remove second item', async () => {
			await userEvent.click(input);
			await userEvent.keyboard('{backspace}');
		});

		await step('Check if onValueChange is called after removal', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith([items[0].value], [items[0]]);
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
			expect(mockedOnValueChange).toHaveBeenLastCalledWith([], []);
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Frameworks',
		disabled: true,
		placeholder: 'Select Frameworks',
		'data-testid': 'multiple-combobox-disabled'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if input is disabled', async () => {
			const input = within(container).getByRole('combobox');
			expect(input).toBeDisabled();
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Frameworks',
		required: true,
		'data-testid': 'multiple-combobox-required'
	}
};

export const Status: Story = {
	render: (args) => {
		return (
			<div className="flex flex-col gap-2">
				<MultipleCombobox
					{...args}
					status="error"
					label="Error"
					supportingText="Please select frameworks."
				/>
				<MultipleCombobox
					{...args}
					status="success"
					label="Success"
					supportingText="Please select frameworks."
				/>
				<MultipleCombobox
					{...args}
					status="warning"
					label="Warning"
					supportingText="Please select frameworks."
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
				<MultipleCombobox {...args} size="small" label="Small" />
				<MultipleCombobox {...args} size="medium" label="Medium" />
			</div>
		);
	}
};
