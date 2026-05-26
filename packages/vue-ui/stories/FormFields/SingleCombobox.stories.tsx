import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { SingleCombobox } from '@components/SingleCombobox';
import { ref } from 'vue';
import { expect, within, userEvent, screen, fn, waitFor } from 'storybook/test';

import { TrashIcon } from '@heroicons/vue/24/outline';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();
const mockedOnUpdateOpen = fn();
const mockedOnFocusOutside = fn();
const mockedOnExitComplete = fn();
const mockedOnUpdateInputValue = fn();
const mockedOnStartReached = fn();
const mockedOnEndReached = fn();

const largeItems = Array.from({ length: 1000 }).map((_, i) => ({
	label: `Option ${i}`,
	value: `option-${i}`
}));

const items = [
	{ label: 'React', value: 'react' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Svelte', value: 'svelte' }
];

const clearButtonLabel = 'Clear value';
const triggerLabel = 'Trigger popup';

const meta = {
	title: 'Components/FormField/SingleCombobox',
	component: SingleCombobox,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'valueChange' },
		'onUpdate:modelValue': { action: 'update:modelValue' },
		onFocusOutside: { action: 'focusOutside' },
		onExitComplete: { action: 'exitComplete' },
		'onUpdate:open': { action: 'update:open' },
		'onUpdate:inputValue': { action: 'update:inputValue' },

		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		clearable: { control: 'boolean' },
		disabled: { control: 'boolean' },
		supportingText: { control: 'text' }
	},
	args: {
		dataTestid: 'single-combobox-default',
		supportingText: 'Please select an item.',
		items: items,
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue,
		'onUpdate:open': mockedOnUpdateOpen,
		'onUpdate:inputValue': mockedOnUpdateInputValue,
		onFocusOutside: mockedOnFocusOutside,
		onExitComplete: mockedOnExitComplete
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
		mockedOnUpdateOpen.mockClear();
		mockedOnUpdateInputValue.mockClear();
		mockedOnFocusOutside.mockClear();
		mockedOnExitComplete.mockClear();
		mockedOnStartReached.mockClear();
		mockedOnEndReached.mockClear();
	}
} satisfies Meta<typeof SingleCombobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Framework',
		placeholder: 'Select a framework',
		supportingText: 'Please select a framework.'
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

		await step('Check if input (combobox) exists', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has placeholder', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toHaveAttribute('placeholder', args.placeholder);
		});

		await step('Check if input has supporting text', async () => {
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
		label: 'Framework'
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
			await waitFor(() => {
				expect(menuPopup).not.toBeVisible();
			});
		});

		await step('Check if onUpdate:open is called with false', async () => {
			expect(mockedOnUpdateOpen).toHaveBeenCalledWith(false);
		});

		await step('Check if combobox input shows the selected value', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toHaveValue(items[0]!.label);
		});
	}
};

export const SearchAndTypingFlow: Story = {
	args: {
		label: 'Framework'
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

		await step('Check if input gets the selected value text', async () => {
			expect(input).toHaveValue('React');
		});

		await step('Type more for the input', async () => {
			await userEvent.type(input, 'React');
		});

		await step('Check if empty message is displayed', async () => {
			expect(menuPopup).toBeVisible();
			const emptyMessage = within(menuPopup).getByText('No item found');
			expect(emptyMessage).toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Framework',
		defaultValue: items[0]!.value,
		clearable: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if the combobox input shows the default value', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toHaveValue(items[0]!.label);
		});

		await step('Check if clear button is visible', async () => {
			const clearBtn = within(container).getByLabelText(clearButtonLabel);
			expect(clearBtn).toBeInTheDocument();
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Framework',
		clearable: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if clear button is not visible initially without value', async () => {
			const clearBtn =
				within(container).queryByLabelText(clearButtonLabel) ??
				within(container).queryByRole('button', { name: clearButtonLabel });
			if (clearBtn) {
				expect(clearBtn).not.toBeVisible();
			}
		});

		await step('Select first item', async () => {
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

		await step('Clear the selected value', async () => {
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toHaveValue('');
		});

		await step('Check if clear button is not visible', async () => {
			const clearBtn =
				within(container).queryByLabelText(clearButtonLabel) ??
				within(container).queryByRole('button', { name: clearButtonLabel });
			if (clearBtn) {
				expect(clearBtn).not.toBeVisible();
			}
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Framework',
		clearable: true,
		modelValue: items[0]!.value
	},
	render: (args) => ({
		components: { SingleCombobox },
		setup() {
			const selectedValue = ref(args.modelValue);

			return () => (
				<div class="flex flex-col gap-2">
					<SingleCombobox
						{...args}
						modelValue={selectedValue.value}
						onUpdate:modelValue={(val) => (selectedValue.value = val)}
					/>
					<p class="mt-4" aria-label="selected-value">
						Selected: {selectedValue.value}
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

		const input = within(container).getByRole('combobox', { name: label });
		await step('Check if input has pre-selected value', async () => {
			expect(input).toHaveValue(items[0]!.label);
		});

		await step('Select an item', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
			await userEvent.click(trigger);
			const menuPopup = screen.getByRole('listbox', { name: label });

			const secondOption = within(menuPopup).getByRole('option', { name: items[1]!.label });
			await userEvent.click(secondOption);
		});

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith({
				value: items[1]!.value
			});
			expect(mockedOnUpdateModelValue).toHaveBeenLastCalledWith(items[1]!.value);
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

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toHaveBeenCalledWith({ value: '', item: undefined });
			expect(mockedOnUpdateModelValue).toHaveBeenCalledWith('');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Framework',
		disabled: true,
		placeholder: 'Select a framework'
	},

	play: async ({ canvas, args, step }) => {
		const { label = '', dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if combobox is disabled', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toBeDisabled();
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

		await step('Check if input is required', async () => {
			const input = within(container).getByRole('combobox', { name: label });
			expect(input).toBeRequired();
		});
	}
};

export const Status: Story = {
	render: (args) => ({
		components: { SingleCombobox },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
					<SingleCombobox
						{...args}
						status="error"
						label="Error"
						supportingText="Please select an item."
					/>
					<SingleCombobox
						{...args}
						status="success"
						label="Success"
						supportingText="Please select an item."
					/>
					<SingleCombobox
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
		components: { SingleCombobox },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
					<SingleCombobox {...args} size="xs" label="Extra Small" />
					<SingleCombobox {...args} size="sm" label="Small" />
					<SingleCombobox {...args} size="md" label="Medium" />
					<SingleCombobox {...args} size="lg" label="Large" />
				</div>
			);
		}
	})
};

export const CustomTriggerIcon: Story = {
	args: {
		label: 'Frameworks',
		dataTestid: 'single-combobox-custom-trigger'
	},
	render: (args) => ({
		components: { SingleCombobox, TrashIcon },
		setup() {
			return { args };
		},
		template: `
        <SingleCombobox v-bind="args">
            <template #triggerIcon>
                <TrashIcon />
            </template>
        </SingleCombobox>
        `
	})
};

export const Virtualization: Story = {
	args: {
		virtualizationConfig: {
			estimateSize: () => 40
		},
		items: largeItems,
		label: 'Virtualization Combobox',
		placeholder: 'Search among 1000 items',
		loopFocus: true
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the combobox menu', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
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
		placeholder: 'Scroll to see events',
		virtualizationConfig: {
			estimateSize: () => 40,
			onStartReached: mockedOnStartReached,
			onEndReached: mockedOnEndReached,
			overscan: 10
		}
	}
};

export const CustomEmptyContent: Story = {
	args: {
		label: 'Frameworks',
		items: items
	},
	render: (args) => ({
		components: { SingleCombobox },
		setup() {
			return { args };
		},
		template: `
        <SingleCombobox v-bind="args">
            <template #emptyContent>
                <div class="px-3 py-2 text-center text-sm text-red-500">
                    No frameworks found! Try something else.
                </div>
            </template>
        </SingleCombobox>
        `
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const input = within(container).getByRole('combobox', { name: label });

		await step('Search for a non-existent item', async () => {
			await userEvent.type(input, 'NonExistentFramework');
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if custom empty message is rendered', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const emptyMessage = within(menuPopup).getByText('No frameworks found! Try something else.');
			expect(emptyMessage).toBeInTheDocument();
		});
	}
};

export const HeaderAndFooterContent: Story = {
	args: {
		label: 'Frameworks',
		dataTestid: 'single-combobox-header-footer',
		items: items
	},
	render: (args) => ({
		components: { SingleCombobox },
		setup() {
			return { args };
		},
		template: `
        <SingleCombobox v-bind="args">
            <template #menuHeader>
                <div class="px-3 py-2 font-semibold border-b border-gray-200">
                    Available Frameworks
                </div>
            </template>
            <template #menuFooter>
                <div class="px-3 py-2 text-sm text-gray-500 border-t border-gray-200">
                    End of list
                </div>
            </template>
        </SingleCombobox>
        `
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the combobox menu', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if custom header is rendered', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const header = within(menuPopup).getByText('Available Frameworks');
			expect(header).toBeInTheDocument();
		});

		await step('Check if custom footer is rendered', async () => {
			const footer = within(menuPopup).getByText('End of list');
			expect(footer).toBeInTheDocument();
		});
	}
};

export const VirtualizationWithHeaderAndFooter: Story = {
	args: {
		label: 'Virtual Frameworks',
		dataTestid: 'single-combobox-virtual-header-footer',
		items: largeItems,
		virtualizationConfig: {
			estimateSize: () => 40
		}
	},
	render: (args) => ({
		components: { SingleCombobox },
		setup() {
			return { args };
		},
		template: `
        <SingleCombobox v-bind="args">
            <template #menuHeader>
                <div class="px-3 py-2 font-semibold border-b border-gray-200">
                    Virtual Frameworks Header
                </div>
            </template>
            <template #menuFooter>
                <div class="px-3 py-2 text-sm text-gray-500 border-t border-gray-200">
                    Virtual Frameworks Footer
                </div>
            </template>
        </SingleCombobox>
        `
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the combobox menu', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Check if custom header is rendered', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const header = within(menuPopup).getByText('Virtual Frameworks Header');
			expect(header).toBeInTheDocument();
		});

		await step('Check if custom footer is rendered', async () => {
			const footer = within(menuPopup).getByText('Virtual Frameworks Footer');
			expect(footer).toBeInTheDocument();
		});
	}
};
