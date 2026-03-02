import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { SingleSelect } from '@components/SingleSelect';
import { ref } from 'vue';
import { expect, within, userEvent, screen, fn, waitFor } from 'storybook/test';
import type { SelectItem } from '@components/type';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();
const mockedOnUpdateOpen = fn();
const mockedOnFocusOutside = fn();
const mockedOnExitComplete = fn();

const items = [
	{ label: 'React', value: 'react' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Svelte', value: 'svelte' }
];

const clearButtonLabel = 'Clear value';
const selectIndicatorLabel = 'select indicator';

const meta = {
	title: 'Components/FormField/SingleSelect',
	component: SingleSelect,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'valueChange' },
		'onUpdate:modelValue': { action: 'update:modelValue' },
		'onUpdate:open': { action: 'update:open' },
		onFocusOutside: { action: 'focusOutside' },
		onExitComplete: { action: 'exitComplete' },
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
		items: items,
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue,
		'onUpdate:open': mockedOnUpdateOpen,
		onFocusOutside: mockedOnFocusOutside,
		onExitComplete: mockedOnExitComplete
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
		mockedOnUpdateOpen.mockClear();
		mockedOnFocusOutside.mockClear();
		mockedOnExitComplete.mockClear();
	}
} satisfies Meta<typeof SingleSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Framework',
		placeholder: 'Select a framework',
		supportingText: 'Please select a framework.',
		dataTestid: 'single-select-default'
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: '<SingleSelect v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '', supportingText = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if label exists', async () => {
			const labelElement = within(container).getByText(label!);
			expect(labelElement).toBeInTheDocument();
		});

		await step('Check if trigger exists', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toBeInTheDocument();
		});

		await step('Check if Select has placeholder', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent(args.placeholder ?? '');
		});

		await step('Check if Select has supporting text', async () => {
			const supportingTextElement = within(container).getByText(supportingText);
			expect(supportingTextElement).toBeInTheDocument();
			expect(supportingTextElement).toHaveAttribute('id');

			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveAttribute('aria-describedby', supportingTextElement.id);
		});

		await step('Check if indicator is displayed', async () => {
			const indicator = within(container).getByLabelText(selectIndicatorLabel);
			expect(indicator).toBeInTheDocument();
		});

		await step('Check if hidden select is rendered', async () => {
			const hiddenSelect = within(container).getByLabelText(label!, { selector: 'select' });
			expect(hiddenSelect).toBeInTheDocument();
		});
	}
};

export const SelectItemFlow: Story = {
	args: {
		label: 'Framework',
		dataTestid: 'single-select-select-item-flow'
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: '<SingleSelect v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Select Item', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if menu popup is displayed', async () => {
			expect(menuPopup).toBeVisible();
		});

		await step('Check if onUpdate:open is called with true', async () => {
			expect(mockedOnUpdateOpen).toHaveBeenCalledWith(true);
		});

		await step('Check if menu popup consists all options from the item list', async () => {
			items.forEach((item) => {
				const option = within(menuPopup).getByRole('option', { name: item.label });
				expect(option).toBeInTheDocument();
			});
		});

		await step('user click on the first option', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0]!.label });
			await userEvent.click(firstOption);
		});

		await step('Check if menu popup is hidden', async () => {
			// Since the popup has animation for closing, we need to wait for it to finish
			await waitFor(() => {
				expect(menuPopup).not.toBeVisible();
			});
		});

		await step('Check if onUpdate:open is called with false', async () => {
			expect(mockedOnUpdateOpen).toHaveBeenCalledWith(false);
		});

		await step('Check if trigger show the selected value', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent(items[0]!.label);
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Framework',
		dataTestid: 'single-select-with-default-value',
		defaultValue: items[0]!.value,
		clearable: true
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: '<SingleSelect v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if the trigger show the default value', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent(items[0]!.label);
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Framework',
		clearable: true,
		dataTestid: 'single-select-clearable'
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: '<SingleSelect v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const clearButton = within(container).getByLabelText(clearButtonLabel);

		await step('Check if the clear icon is hidden when there is no selected value', async () => {
			expect(clearButton).not.toBeVisible();
		});

		await step('Select first item', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const firstOption = within(menuPopup).getByRole('option', { name: items[0]!.label });
			await userEvent.click(firstOption);
		});

		await step('Clear the selected value', async () => {
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent('');
		});

		await step('Check if the clear icon is hidden', async () => {
			expect(clearButton).not.toBeVisible();
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Framework',
		clearable: true,
		value: items[0]!.value,
		dataTestid: 'single-select-controllable'
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			const value = ref(args.value);

			const handleChange = (details: { value: string; item?: SelectItem }) => {
				value.value = details.value;
				mockedOnValueChange(details);
				mockedOnUpdateModelValue(details.value);
			};

			return () => (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					<SingleSelect {...args} modelValue={value.value} onValueChange={handleChange} />
					<p style={{ marginTop: '16px' }} aria-label="selected-value">
						Selected: {value.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { label = '', dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if trigger exists', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toBeInTheDocument();
		});

		const trigger = within(container).getByRole('combobox', { name: label });
		await step('Check if trigger has pre-selected value', async () => {
			expect(trigger).toHaveTextContent(items[0]!.label);
		});

		await step('Select an item', async () => {
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const secondOption = within(menuPopup).getByRole('option', { name: items[1]!.label });
			await userEvent.click(secondOption);
		});

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toHaveBeenCalled();
			expect(mockedOnValueChange).toHaveBeenCalledWith({ value: items[1]!.value, item: items[1] });
			expect(mockedOnUpdateModelValue).toHaveBeenCalledWith(items[1]!.value);
		});

		await step('Check if external state is updated with new value', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected: ' + items[1]!.value);
		});

		await step('Clear selected value', async () => {
			const clearButton = within(container).getByLabelText(clearButtonLabel);
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected:');
		});

		await step('Check if onValueChange received empty string argument', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith({ value: '', item: undefined });
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Framework',
		disabled: true,
		placeholder: 'Select Framwork',
		dataTestid: 'single-select-disabled'
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: '<SingleSelect v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { label = '', dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

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
		dataTestid: 'single-select-required'
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: '<SingleSelect v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { label = '', dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

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
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return () => (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
	})
};

export const Size: Story = {
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return () => (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					<SingleSelect {...args} size="small" label="Small" />
					<SingleSelect {...args} size="medium" label="Medium" />
				</div>
			);
		}
	})
};
