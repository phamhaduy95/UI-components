import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { SingleSelect } from '@components/SingleSelect';
import { ref } from 'vue';
import { expect, within, userEvent, screen, fn, waitFor, fireEvent } from 'storybook/test';
import type { SelectItem } from '@components/type';
import { TrashIcon } from '@heroicons/vue/24/outline';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();
const mockedOnUpdateOpen = fn();
const mockedOnFocusOutside = fn();
const mockedOnExitComplete = fn();
const mockedOnStartReached = fn();
const mockedOnEndReached = fn();

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
		label: 'Framework',
		placeholder: 'Select a framework',
		supportingText: 'Please select a framework.',
		dataTestid: 'single-select',
		items: items,
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue,
		'onUpdate:open': mockedOnUpdateOpen,
		onFocusOutside: mockedOnFocusOutside,
		onExitComplete: mockedOnExitComplete
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: '<SingleSelect v-bind="args" />'
	}),
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
		mockedOnUpdateOpen.mockClear();
		mockedOnFocusOutside.mockClear();
		mockedOnExitComplete.mockClear();
		mockedOnStartReached.mockClear();
		mockedOnEndReached.mockClear();
	}
} satisfies Meta<typeof SingleSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
		clearable: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '', placeholder = '' } = args;
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
			expect(trigger).toHaveTextContent(placeholder);
		});

		await step('Check if popup is hidden after clearing', async () => {
			const menuPopup = screen.queryByRole('listbox', { name: label });
			expect(menuPopup).not.toBeInTheDocument();
		});

		await step('Check if the clear icon is hidden', async () => {
			expect(clearButton).not.toBeVisible();
		});
	}
};

export const Controllable: Story = {
	args: {
		clearable: true,
		value: items[0]!.value,
		loopFocus: true
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
				<div class="flex flex-col gap-2">
					<SingleSelect {...args} modelValue={value.value} onValueChange={handleChange} />
					<p class="mt-4" aria-label="selected-value">
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

export const EmptyList: Story = {
	args: {
		label: 'Empty List',
		items: [],
		placeholder: 'No items available'
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the select menu', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if default empty message "No item found" is rendered', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const emptyMsg = within(menuPopup).getByText('No item found');
			expect(emptyMsg).toBeInTheDocument();
		});
	}
};

export const Disabled: Story = {
	args: {
		disabled: true
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
		label: 'Framework',
		required: true
	},
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
				<div class="flex flex-col gap-2">
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
				<div class="flex flex-col gap-2">
					<SingleSelect {...args} size="xs" label="Extra Small" />
					<SingleSelect {...args} size="sm" label="Small" />
					<SingleSelect {...args} size="md" label="Medium" />
					<SingleSelect {...args} size="lg" label="Large" />
				</div>
			);
		}
	})
};

export const CustomTriggerIcon: Story = {
	render: (args) => ({
		components: { SingleSelect, TrashIcon },
		setup() {
			return { args };
		},
		template: `
        <SingleSelect v-bind="args">
            <template #triggerIcon>
                <TrashIcon />
            </template>
        </SingleSelect>
        `
	})
};

const largeItems = Array.from({ length: 1000 }).map((_, i) => ({
	label: `Option ${i}`,
	value: `option-${i}`
}));

export const Virtualization: Story = {
	args: {
		virtualizationConfig: {
			estimateSize: () => 40
		},
		items: largeItems,
		label: 'Virtualization Select',
		placeholder: 'Search among 1000 items'
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the select menu', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if menu popup is displayed', async () => {
			expect(menuPopup).toBeVisible();
		});

		await step('Verify that only a few items are rendered in the DOM', async () => {
			const renderedOptions = within(menuPopup).queryAllByRole('option');
			expect(renderedOptions.length).toBeLessThan(30);
		});
	}
};

export const VirtualizationWithEvents: Story = {
	args: {
		items: largeItems,
		label: 'Virtualization Events',
		placeholder: 'Search among 1000 items',
		virtualizationConfig: {
			estimateSize: () => 40,
			onStartReached: mockedOnStartReached,
			onEndReached: mockedOnEndReached
		}
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the select menu', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Verify onStartReached is called initially', async () => {
			await waitFor(() => {
				expect(mockedOnStartReached).toHaveBeenCalled();
			});
		});

		await step('Scroll to end of list', async () => {
			fireEvent.scroll(menuPopup, { target: { scrollTop: menuPopup.scrollHeight } });
		});

		await step('Verify onEndReached is called', async () => {
			await waitFor(() => {
				expect(mockedOnEndReached).toHaveBeenCalled();
			});
		});

		await step('Scroll to start of list', async () => {
			fireEvent.scroll(menuPopup, { target: { scrollTop: 0 } });
		});

		await step('Verify onStartReached is called again', async () => {
			await waitFor(() => {
				expect(mockedOnStartReached).toHaveBeenCalled();
			});
		});
	}
};

export const CustomMenuHeaderFooter: Story = {
	args: {
		label: 'Menu Slots',
		dataTestid: 'single-select-header-footer',
		items: items
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: `
        <SingleSelect v-bind="args">
            <template #menuHeader>
                <div class="px-3 py-2 font-semibold border-b border-gray-200 bg-gray-50 text-gray-700">
                    Select Framework
                </div>
            </template>
            <template #menuFooter>
                <div class="px-3 py-2 text-sm text-center text-gray-400 border-t border-gray-200">
                    All frameworks loaded
                </div>
            </template>
        </SingleSelect>
        `
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the select menu', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if custom header is rendered', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const header = within(menuPopup).getByText('Select Framework');
			expect(header).toBeInTheDocument();
		});

		await step('Check if custom footer is rendered', async () => {
			const footer = within(menuPopup).getByText('All frameworks loaded');
			expect(footer).toBeInTheDocument();
		});
	}
};

export const CustomEmptyContent: Story = {
	args: {
		label: 'Empty Select',
		items: [],
		dataTestid: 'single-select-empty',
		placeholder: 'No frameworks available'
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: `
        <SingleSelect v-bind="args">
            <template #emptyContent>
                <div class="px-4 py-6 text-center text-red-500 font-medium">
                    Oops! No items found.
                </div>
            </template>
        </SingleSelect>
        `
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the select menu', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if custom empty content is rendered', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const emptyMsg = within(menuPopup).getByText('Oops! No items found.');
			expect(emptyMsg).toBeInTheDocument();
		});
	}
};

export const CustomItemContent: Story = {
	args: {
		label: 'Custom Items',
		items: items,
		dataTestid: 'single-select-custom-items'
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: `
        <SingleSelect v-bind="args">
            <template #itemContent="{ item, isSelected, isHighlighted }">
                <div 
                    class="flex w-full items-center gap-2 p-1"
                    :class="{ 'bg-blue-50': isHighlighted }"
                >
                   
                    <span
                        class="font-bold underline"
                        :class="{ 'text-blue-600': isSelected, 'italic': isHighlighted }"
                    >
                        Custom item: {{ item.label }}
                        
                    </span>
                    <span v-if="isSelected">(selected)</span>
                    <span v-if="isHighlighted" class="text-xs ml-auto" data-testid="highlight-icon">highlighted</span>
                </div>
            </template>
        </SingleSelect>
        `
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the select menu', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Verify custom item content formatting', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const firstOption = within(menuPopup).getByRole('option', { name: items[0]!.label });
			expect(firstOption).toHaveTextContent('Custom item: ' + items[0]!.label);
		});

		await step('Verify isHighlighted prop works', async () => {
			const secondOption = within(menuPopup).getByRole('option', { name: items[1]!.label });
			await userEvent.hover(secondOption);

			await waitFor(() => {
				expect(secondOption).toHaveTextContent('highlighted');
			});
		});

		await step('Verify isSelected prop works', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0]!.label });
			await userEvent.click(firstOption);

			// Re-open list
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);

			const updatedMenuPopup = screen.getByRole('listbox', { name: label });
			const firstOptionSelected = within(updatedMenuPopup).getByRole('option', {
				name: items[0]!.label
			});

			expect(firstOptionSelected).toHaveTextContent('(selected)');
		});
	}
};

export const VirtualizationWithHeaderAndFooter: Story = {
	args: {
		label: 'Virtual Select Header/Footer',
		dataTestid: 'single-select-virtual-header-footer',
		items: largeItems,
		virtualizationConfig: {
			estimateSize: () => 40
		}
	},
	render: (args) => ({
		components: { SingleSelect },
		setup() {
			return { args };
		},
		template: `
        <SingleSelect v-bind="args">
            <template #menuHeader>
                <div class="px-3 py-2 font-bold text-indigo-700 bg-indigo-50 border-b border-indigo-100">
                    Virtualized Frameworks
                </div>
            </template>
            <template #menuFooter>
                <div class="px-3 py-2 text-xs text-center text-indigo-400 border-t border-indigo-100">
                    Scroll to see virtualization in action
                </div>
            </template>
        </SingleSelect>
        `
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the select menu', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if custom header is rendered', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const header = within(menuPopup).getByText('Virtualized Frameworks');
			expect(header).toBeInTheDocument();
		});

		await step('Check if custom footer is rendered', async () => {
			const footer = within(menuPopup).getByText('Scroll to see virtualization in action');
			expect(footer).toBeInTheDocument();
		});

		await step('Verify virtualization is active', async () => {
			const renderedOptions = within(menuPopup).queryAllByRole('option');
			expect(renderedOptions.length).toBeLessThan(30);
		});
	}
};
