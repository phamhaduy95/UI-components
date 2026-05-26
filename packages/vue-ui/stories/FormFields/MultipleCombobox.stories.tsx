import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { MultipleCombobox } from '@components/MultipleCombobox';
import { ref } from 'vue';
import { expect, within, userEvent, screen, fn } from 'storybook/test';
import type { SelectItem } from '@components/type';
import { TrashIcon } from '@heroicons/vue/24/outline';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();
const mockedOnUpdateOpen = fn();
const mockedOnUpdateInputValue = fn();

const items = [
	{ label: 'React', value: 'react' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Svelte', value: 'svelte' }
];

const clearButtonLabel = 'Clear value';
const triggerLabel = 'Trigger popup';

const meta = {
	title: 'Components/FormField/MultipleCombobox',
	component: MultipleCombobox,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'valueChange' },
		'onUpdate:modelValue': { action: 'update:modelValue' },
		'onUpdate:open': { action: 'update:open' },
		'onUpdate:inputValue': { action: 'update:inputValue' },
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
		dataTestid: 'multiple-combobox-default',
		supportingText: 'Please select multiple items.',
		items: items,
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue,
		'onUpdate:open': mockedOnUpdateOpen,
		'onUpdate:inputValue': mockedOnUpdateInputValue
	},
	render: (args) => ({
		components: { MultipleCombobox },
		setup() {
			return { args };
		},
		template: '<MultipleCombobox v-bind="args" />'
	}),
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
		mockedOnUpdateOpen.mockClear();
		mockedOnUpdateInputValue.mockClear();
	}
} satisfies Meta<typeof MultipleCombobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Frameworks',
		placeholder: 'Select frameworks',
		supportingText: 'Please select frameworks.'
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

		await step('Check if input exists', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has placeholder', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toHaveAttribute('placeholder', args.placeholder);
		});

		await step('Check if supporting text is correct', async () => {
			const supportingTextElement = within(container).getByText(supportingText);
			expect(supportingTextElement).toBeInTheDocument();
			expect(supportingTextElement).toHaveAttribute('id');

			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toHaveAttribute('aria-describedby', supportingTextElement.id);
		});

		await step('Check if trigger exists', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
			expect(trigger).toBeInTheDocument();
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

		await step('Open popup via trigger', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if menu popup is displayed', async () => {
			expect(menuPopup).toBeVisible();
		});

		await step('Check if onUpdate:open is called with true', async () => {
			expect(mockedOnUpdateOpen).toHaveBeenCalledWith(true);
		});

		await step('Select the first option', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0]!.label });
			await userEvent.click(firstOption);
		});

		const chip1 = within(container).getByRole('button', { name: items[0]!.label });
		await step('Check if the selected item is displayed as a chip', async () => {
			expect(chip1).toBeInTheDocument();
		});

		await step('Select the second option', async () => {
			const secondOption = within(menuPopup).getByRole('option', { name: items[1]!.label });
			await userEvent.click(secondOption);
		});

		const chip2 = within(container).getByRole('button', { name: items[1]!.label });
		await step('Check if the second selected item is also displayed as a chip', async () => {
			expect(chip2).toBeInTheDocument();
		});

		await step('Remove an item using the chip remove button', async () => {
			await userEvent.click(chip1);
			await userEvent.keyboard('{delete}');
		});

		await step('Check if the first selected item is removed', async () => {
			expect(within(container).queryByText(items[0]!.label)).not.toBeInTheDocument();
		});

		await step('Close the popup', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
			await userEvent.click(trigger);
		});
	}
};

export const SearchAndTypingFlow: Story = {
	args: {
		label: 'Frameworks',
		dataTestid: 'multiple-combobox-search-flow'
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const input = within(container).getByRole('combobox', { name: label });

		await step('Type in the input', async () => {
			await userEvent.type(input, 'React');
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if only matched options are displayed', async () => {
			expect(menuPopup).toBeVisible();
			const reactOption = within(menuPopup).getByRole('option', { name: 'React' });
			expect(reactOption).toBeInTheDocument();

			const vueOption = within(menuPopup).queryByRole('option', { name: 'Vue' });
			expect(vueOption).not.toBeInTheDocument();
		});

		await step('Select the matched option', async () => {
			const reactOption = within(menuPopup).getByRole('option', { name: 'React' });
			await userEvent.click(reactOption);
		});

		await step('Check if the item is displayed as a chip', async () => {
			const chip = within(container).getByText('React');
			expect(chip).toBeInTheDocument();
		});

		await step('Check if input is empty after selection', async () => {
			expect(input).toHaveValue('');
		});

		await step('Press Enter or Backspace key to remove item', async () => {
			// Focus back to input and press backspace
			await userEvent.click(input);
			await userEvent.keyboard('{Backspace}');
		});

		await step('Check if the item was removed', async () => {
			expect(within(container).queryByText('React')).not.toBeInTheDocument();
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
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if default items are rendered as chips', async () => {
			const chip1 = within(container).getByText(items[0]!.label);
			const chip2 = within(container).getByText(items[1]!.label);
			expect(chip1).toBeInTheDocument();
			expect(chip2).toBeInTheDocument();
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

		await step('Check if clear button is not visible initially without value', async () => {
			const clearBtn = within(container).queryByRole('button', { name: clearButtonLabel });
			if (clearBtn) {
				expect(clearBtn).not.toBeVisible();
			}
		});

		await step('Select an item', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const firstOption = within(menuPopup).getByRole('option', { name: items[0]!.label });
			await userEvent.click(firstOption);
		});

		const clearButton = within(container).getByLabelText(clearButtonLabel);
		await step('Check if clear icon is displayed', async () => {
			expect(clearButton).toBeVisible();
		});

		await step('Clear all selected values', async () => {
			await userEvent.click(clearButton);
		});

		await step('Check if chips are removed', async () => {
			expect(within(container).queryByText(items[0]!.label)).not.toBeInTheDocument();
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
		components: { MultipleCombobox },
		setup() {
			const selectedItems = ref(args.modelValue);

			const handleChange = (details: { value: string[]; item?: SelectItem[] }) => {
				selectedItems.value = details.value;
				mockedOnValueChange(details);
				mockedOnUpdateModelValue(details.value);
			};

			return () => (
				<div class="flex flex-col gap-2">
					<MultipleCombobox
						{...args}
						modelValue={selectedItems.value}
						onValueChange={handleChange}
					/>
					<p class="mt-4" aria-label="selected-value">
						Selected: {selectedItems.value?.join(', ')}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { label = '', dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if input exists', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toBeInTheDocument();
		});

		await step('Check if pre-selected array item is visible as chip', async () => {
			const chip = within(container).getByText(items[0]!.label);
			expect(chip).toBeInTheDocument();
		});

		await step('Select a second item', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const secondOption = within(menuPopup).getByRole('option', { name: items[1]!.label });
			await userEvent.click(secondOption);
		});

		await step('Check if onValueChange is called with an array of two items', async () => {
			expect(mockedOnValueChange).toHaveBeenCalled();
			expect(mockedOnUpdateModelValue).toHaveBeenCalledWith([items[0]!.value, items[1]!.value]);
		});

		await step('Check if external state is updated with new values', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent(`Selected: ${items[0]!.value}, ${items[1]!.value}`);
		});

		await step('Clear all selected values', async () => {
			const clearButton = within(container).getByLabelText(clearButtonLabel);
			await userEvent.click(clearButton);
		});

		await step('Check if values are cleared from external state', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected:');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Frameworks',
		disabled: true,
		placeholder: 'Select frameworks',
		defaultValue: [items[0]!.value]
	},

	play: async ({ canvas, args, step }) => {
		const { label = '', dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if combobox is disabled', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toBeDisabled();
		});

		await step(
			'Check if pre-selected chip exists and cannot be removed interactively',
			async () => {
				const chip = within(container).getByText(items[0]!.label).closest('.Chip');
				expect(chip).toHaveAttribute('data-disabled'); // or via other means if Ark UI sets data attributes
			}
		);
	}
};

export const Required: Story = {
	args: {
		label: 'Frameworks',
		required: true
	},
	render: (args) => ({
		components: { MultipleCombobox },
		setup() {
			return { args };
		},
		template: '<MultipleCombobox v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { label = '', dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if required indicator is visible', async () => {
			const requiredSymbol = within(container).getByText('*');
			expect(requiredSymbol).toBeVisible();
		});

		await step('Check if input is required', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toBeRequired();
		});
	}
};

export const Status: Story = {
	render: (args) => ({
		components: { MultipleCombobox },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
					<MultipleCombobox
						{...args}
						status="error"
						label="Error"
						supportingText="Please select an item."
					/>
					<MultipleCombobox
						{...args}
						status="success"
						label="Success"
						supportingText="Please select an item."
					/>
					<MultipleCombobox
						{...args}
						status="warning"
						label="Warning"
						supportingText="Please select an item."
					/>
				</div>
			);
		}
	})
};

export const Size: Story = {
	render: (args) => ({
		components: { MultipleCombobox },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
					<MultipleCombobox {...args} size="xs" label="Extra Small" />
					<MultipleCombobox {...args} size="sm" label="Small" />
					<MultipleCombobox {...args} size="md" label="Medium" />
					<MultipleCombobox {...args} size="lg" label="Large" />
				</div>
			);
		}
	})
};

export const CustomTriggerIcon: Story = {
	args: {
		label: 'Frameworks'
	},
	render: (args) => ({
		components: { MultipleCombobox, TrashIcon },
		setup() {
			return { args };
		},
		template: `
        <MultipleCombobox v-bind="args">
            <template #triggerIcon>
                <TrashIcon />
            </template>
        </MultipleCombobox>
        `
	})
};
