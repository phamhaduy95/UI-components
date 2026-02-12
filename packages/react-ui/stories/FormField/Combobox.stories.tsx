import type { Meta, StoryObj } from '@storybook/react-vite';
import SingleCombobox from '@components/SingleCombobox';
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

const meta: Meta<typeof SingleCombobox> = {
	title: 'Components/FormField/Combobox',
	component: SingleCombobox,
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
 * The default single combobox with a label.
 */
export const Default: Story = {
	args: {
		label: 'Framework',
		placeholder: 'Search for a framework',
		supportingText: 'Please select a framework.',
		'data-testid': 'combobox-default'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '', supportingText = '' } = args;
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
			expect(input).toHaveAttribute('placeholder', args.placeholder);
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
		label: 'Framework',
		'data-testid': 'combobox-select-item-flow'
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

		await step('user click on the first option', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			await userEvent.click(firstOption);
		});

		await step('Check if menu popup is hidden', async () => {
			expect(menuPopup).not.toBeVisible();
		});

		await step('Check if input shows the selected value', async () => {
			const input = within(container).getByRole('combobox');
			expect(input).toHaveValue(items[0].label);
		});

		await step('Reopen Popup', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);
		});

		await step('Check if item is highlighted', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			expect(firstOption).toHaveAttribute('data-state', 'checked');
		});
	}
};

export const ItemInputFiltering: Story = {
	args: {
		label: 'Framework',
		'data-testid': 'combobox-test-item-filtering'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Type "r" into the input', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			await userEvent.type(input, 'r');
		});
		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if menu popup show filtered options', async () => {
			expect(menuPopup).toBeVisible();

			items
				.filter((item) => item.label.toLowerCase().includes('r'))
				.forEach((item) => {
					const option = within(menuPopup).getByRole('option', { name: item.label });
					expect(option).toBeInTheDocument();
				});
		});

		await step('Continue typing "react" in the input', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			await userEvent.type(input, 'eact');
		});

		await step('Check if menu popup show filtered options', async () => {
			items
				.filter((item) => item.label.toLowerCase().includes('react'))
				.forEach((item) => {
					const option = within(menuPopup).getByRole('option', { name: item.label });
					expect(option).toBeInTheDocument();
				});
		});

		await step('Input filtering that does not exists', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			await userEvent.type(input, 'non-exists');

			const option = within(menuPopup).getByRole('option', { name: 'No item found' });
			expect(option).toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Framework',
		'data-testid': 'combobox-with-default-value',
		defaultValue: items[0].value
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if the input shows the default value', async () => {
			const input = within(container).getByRole('combobox');
			expect(input).toHaveValue(items[0].label);
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Framework',
		'data-testid': 'combobox-clearable',
		value: items[0].value,
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const input = within(container).getByRole('combobox');

		await step('Check if init value is set', async () => {
			expect(input).toHaveValue(items[0].label);
		});

		await step('Clear the selected value', async () => {
			const buttons = within(container).getAllByRole('button');
			const clearButton = buttons.find((b) => b.getAttribute('aria-label') !== 'Trigger popup');

			expect(clearButton).toBeInTheDocument();
			if (clearButton) await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			expect(input).toHaveValue('');
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Framework',
		value: items[0].value,
		onValueChange: mockedOnValueChange,
		'data-testid': 'combobox-controllable',
		clearable: true
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
				<SingleCombobox {...args} value={value} onValueChange={handleChange} />
				<p className="mt-4" aria-label="selected-value">
					Selected: {value}
				</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const input = within(container).getByRole('combobox');

		await step('Check if input has pre-selected value', async () => {
			expect(input).toHaveValue(items[0].label);
		});

		await step('Select an item', async () => {
			const trigger = within(container).getByLabelText('Trigger popup');
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
			const buttons = within(container).getAllByRole('button');
			const clearButton = buttons.find((b) => b.getAttribute('aria-label') !== 'Trigger popup');
			if (clearButton) await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected:');
		});

		await step('Check if onValueChange received empty string argument', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith('', undefined);
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Framework',
		disabled: true,
		placeholder: 'Select Framework',
		'data-testid': 'combobox-disabled'
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
		label: 'Framework',
		required: true,
		'data-testid': 'combobox-required'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if required indicator is visible', async () => {
			const requiredSymbol = within(container).getByText('*');
			expect(requiredSymbol).toBeVisible();
		});

		await step('Check if input is required', async () => {
			const input = within(container).getByRole('combobox');
			expect(input).toBeRequired();
		});
	}
};

export const Status: Story = {
	render: (args) => {
		return (
			<div className="flex flex-col gap-2">
				<SingleCombobox
					{...args}
					status="error"
					label="Error"
					supportingText="Please select a item."
				/>
				<SingleCombobox
					{...args}
					status="success"
					label="Success"
					supportingText="Please select a item."
				/>
				<SingleCombobox
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
				<SingleCombobox {...args} size="small" label="Small" />
				<SingleCombobox {...args} size="medium" label="Medium" />
			</div>
		);
	}
};
