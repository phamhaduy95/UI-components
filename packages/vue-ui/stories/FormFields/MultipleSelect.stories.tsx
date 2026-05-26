import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { MultipleSelect } from '@components/MultipleSelect';
import { ref } from 'vue';
import { expect, within, userEvent, screen, fn, waitFor } from 'storybook/test';
import type { SelectItem } from '@components/type';
import { TrashIcon, ArrowDownCircleIcon } from '@heroicons/vue/20/solid';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();
const mockedOnUpdateOpen = fn();

const items: SelectItem[] = [
	{ label: 'React', value: 'react' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Svelte', value: 'svelte' }
];

const clearButtonLabel = 'Clear value';
const selectIndicatorLabel = 'select indicator';

const meta = {
	title: 'Components/FormField/MultipleSelect',
	component: MultipleSelect,
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
		dataTestid: 'multiple-select-default',
		supportingText: 'Please select at least one item.',
		items: items,
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue,
		'onUpdate:open': mockedOnUpdateOpen
	},
	render: (args) => ({
		components: { MultipleSelect },
		setup() {
			return { args };
		},
		template: '<MultipleSelect v-bind="args" />'
	}),
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
		mockedOnUpdateOpen.mockClear();
	}
} satisfies Meta<typeof MultipleSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Frameworks',
		placeholder: 'Select frameworks',
		supportingText: 'Please select at least one framework.'
	},

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

export const WithDefaultValue: Story = {
	args: {
		label: 'Frameworks',
		defaultValue: [items[0]!.value, items[1]!.value],
		clearable: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const displayArea = within(container).getByRole('combobox', { name: label });

		await step('Check if the chips presenting selected value are displayed', async () => {
			const chip1 = within(displayArea).getByRole('button', { name: items[0]!.label });
			const chip2 = within(displayArea).getByRole('button', { name: items[1]!.label });
			expect(chip1).toBeInTheDocument();
			expect(chip2).toBeInTheDocument();
		});

		await step('Check if the clear icon is showed', async () => {
			const clearButton = within(container).getByLabelText(clearButtonLabel);
			expect(clearButton).toBeVisible();
		});
	}
};

export const SelectItemFlow: Story = {
	args: {
		label: 'Frameworks'
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open menu', async () => {
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

		await step('Select multiple options', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0]!.label });
			await userEvent.click(firstOption);
			const secondOption = within(menuPopup).getByRole('option', { name: items[1]!.label });
			await userEvent.click(secondOption);
		});

		await step('Check if trigger shows the selected values', async () => {
			const displayArea = within(container).getByRole('combobox', { name: label });
			const chip1 = within(displayArea).getByRole('button', { name: items[0]!.label });
			const chip2 = within(displayArea).getByRole('button', { name: items[1]!.label });
			expect(chip1).toBeInTheDocument();
			expect(chip2).toBeInTheDocument();
		});

		await step('Check if menu popup is still visible (multiple select behavior)', async () => {
			expect(menuPopup).toBeVisible();
		});

		await step('Close menu popup', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
			await waitFor(() => {
				expect(menuPopup).not.toBeVisible();
			});
		});

		await step('Check if onUpdate:open is called with false', async () => {
			expect(mockedOnUpdateOpen).toHaveBeenCalledWith(false);
		});
	}
};

export const RemoveItemFlow: Story = {
	args: {
		label: 'Frameworks',
		defaultValue: [items[0]!.value, items[1]!.value],
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		const trigger = within(container).getByRole('combobox', { name: label });
		const chip1 = within(trigger).getByRole('button', { name: items[0]!.label });
		const chip2 = within(trigger).getByRole('button', { name: items[1]!.label });

		await step('Remove first item', async () => {
			chip1.focus();
			await userEvent.keyboard('[Backspace]');
		});

		await step('Check if the first item is removed', async () => {
			expect(chip1).not.toBeInTheDocument();
		});

		await step('Remove second item', async () => {
			chip2.focus();
			await userEvent.keyboard('[Backspace]');
		});

		await step('Check if the second item is removed', async () => {
			expect(chip2).not.toBeInTheDocument();
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Frameworks',
		clearable: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const clearButton = within(container).getByLabelText(clearButtonLabel);

		await step('Check if the clear icon is hidden when there is no selected value', async () => {
			expect(clearButton).not.toBeVisible();
		});

		await step('Select items', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const firstOption = within(menuPopup).getByRole('option', { name: items[0]!.label });
			await userEvent.click(firstOption);
			const secondOption = within(menuPopup).getByRole('option', { name: items[1]!.label });
			await userEvent.click(secondOption);
		});

		await step('Check if close Icon is showed', async () => {
			expect(clearButton).toBeVisible();
		});

		await step('Clear the selected value', async () => {
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			expect(trigger).toHaveTextContent('');
		});

		await step('Check if the clear button is hidden', async () => {
			expect(clearButton).not.toBeVisible();
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Frameworks',
		clearable: true,
		modelValue: [items[0]!.value]
	},
	render: (args) => ({
		components: { MultipleSelect },
		setup() {
			const value = ref(args.modelValue);

			const handleChange = (details: { value: string[]; items: SelectItem[] }) => {
				value.value = details.value;
				mockedOnValueChange(details);
				mockedOnUpdateModelValue(details.value);
			};

			return () => (
				<div class="flex flex-col gap-2">
					<MultipleSelect {...args} modelValue={value.value} onValueChange={handleChange} />
					<p class="mt-4" aria-label="selected-value">
						Selected: {value.value?.join(', ')}
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

		await step('Select another item', async () => {
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const secondOption = within(menuPopup).getByRole('option', { name: items[1]!.label });
			await userEvent.click(secondOption);
		});

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toHaveBeenCalled();
			expect(mockedOnValueChange).toHaveBeenCalledWith({
				value: [items[0]!.value, items[1]!.value],
				items: [items[0], items[1]]
			});
			expect(mockedOnUpdateModelValue).toHaveBeenCalledWith([items[0]!.value, items[1]!.value]);
		});

		await step('Check if external state is updated with new value', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent(`Selected: ${items[0]!.value}, ${items[1]!.value}`);
		});

		await step('Clear all values', async () => {
			const clearButton = within(container).getByLabelText(clearButtonLabel);
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected:');
		});

		await step('Check if onValueChange received empty array', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith({ value: [], items: [] });
			expect(mockedOnUpdateModelValue).toHaveBeenLastCalledWith([]);
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Frameworks',
		disabled: true,
		placeholder: 'Select Frameworks'
	},

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
		label: 'Frameworks',
		required: true,
		dataTestid: 'multiple-select-required'
	},
	render: (args) => ({
		components: { MultipleSelect },
		setup() {
			return { args };
		},
		template: '<MultipleSelect v-bind="args" />'
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
		components: { MultipleSelect },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
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
	})
};

export const Size: Story = {
	render: (args) => ({
		components: { MultipleSelect },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
					<MultipleSelect {...args} size="xs" label="Extra Small" />
					<MultipleSelect {...args} size="sm" label="Small" />
					<MultipleSelect {...args} size="md" label="Medium" />
					<MultipleSelect {...args} size="lg" label="Large" />
				</div>
			);
		}
	})
};

export const CustomIcon: Story = {
	args: {
		label: 'Frameworks',
		dataTestid: 'multiple-select-custom-trigger-icon',
		clearable: true
	},
	render: (args) => ({
		components: { MultipleSelect, TrashIcon, ArrowDownCircleIcon },
		setup() {
			return { args };
		},
		template: `
        <MultipleSelect v-bind="args">
            <template #triggerIcon>
                <ArrowDownCircleIcon />
            </template>
            <template #clearIcon>
                <TrashIcon />
            </template>
        </MultipleSelect>
        `
	})
};
