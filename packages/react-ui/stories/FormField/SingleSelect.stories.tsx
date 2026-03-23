import classNames from 'classnames';
import { useState } from 'react';
import { expect, fireEvent, fn, screen, userEvent, waitFor, within } from 'storybook/test';

import { SingleSelect, SingleSelectProps } from '@components/SingleSelect';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockedOnValueChange = fn();
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

const largeItems = Array.from({ length: 1000 }).map((_, i) => ({
	label: `Option ${i}`,
	value: `option-${i}`
}));

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
		onFocusOutside: mockedOnFocusOutside,
		onExitComplete: mockedOnExitComplete
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnFocusOutside.mockClear();
		mockedOnExitComplete.mockClear();
		mockedOnStartReached.mockClear();
		mockedOnEndReached.mockClear();
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

		const handleChange: SingleSelectProps['onValueChange'] = (newValue, item) => {
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

export const Virtualization: Story = {
	args: {
		virtualizationConfig: {
			estimateSize: () => 40
		},
		items: largeItems,
		label: 'Virtualization Select',
		placeholder: 'Search among 1000 items',
		'data-testId': 'single-select-virtual'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

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
		'data-testId': 'single-select-virtual-events',
		virtualizationConfig: {
			estimateSize: () => 40,
			onStartReached: mockedOnStartReached,
			onEndReached: mockedOnEndReached
		}
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

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
		label: 'Menu Header/Footer',
		'data-testId': 'single-select-header-footer',
		items: items,
		menuHeader: (
			<div className="border-b border-gray-200 bg-gray-50 px-3 py-2 font-semibold text-gray-700">
				Select Framework
			</div>
		),
		menuFooter: (
			<div className="border-t border-gray-200 px-3 py-2 text-center text-sm text-gray-400">
				All frameworks loaded
			</div>
		)
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

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
		'data-testId': 'single-select-empty',
		placeholder: 'No frameworks available',
		emptyContent: (
			<div className="px-4 py-6 text-center font-medium text-red-500">Oops! No items found.</div>
		)
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

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
		'data-testId': 'single-select-custom-items',
		itemContent: ({ item, isSelected, isHighlighted }) => (
			<div
				className={classNames('flex w-full items-center gap-2 p-1', {
					'bg-blue-50': isHighlighted
				})}
			>
				<span
					className={classNames('font-bold underline', {
						'text-blue-600': isSelected,
						italic: isHighlighted
					})}
				>
					Custom item: {item.label}
				</span>
				{isSelected && <span>(selected)</span>}
				{isHighlighted && (
					<span className="ml-auto text-xs" data-testid="highlight-icon">
						highlighted
					</span>
				)}
			</div>
		)
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Open the select menu', async () => {
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Verify custom item content formatting', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			expect(firstOption).toHaveTextContent('Custom item: ' + items[0].label);
		});

		await step('Verify isHighlighted prop works', async () => {
			const secondOption = within(menuPopup).getByRole('option', { name: items[1].label });
			await userEvent.hover(secondOption);

			await waitFor(() => {
				expect(secondOption).toHaveTextContent('highlighted');
			});
		});

		await step('Verify isSelected prop works', async () => {
			const firstOption = within(menuPopup).getByRole('option', { name: items[0].label });
			await userEvent.click(firstOption);

			// Re-open list
			const trigger = within(container).getByRole('combobox', { name: label });
			await userEvent.click(trigger);

			const updatedMenuPopup = screen.getByRole('listbox', { name: label });
			const firstOptionSelected = within(updatedMenuPopup).getByRole('option', {
				name: items[0].label
			});

			expect(firstOptionSelected).toHaveTextContent('(selected)');
		});
	}
};

export const VirtualizationWithHeaderAndFooter: Story = {
	args: {
		label: 'Virtual Select Header/Footer',
		'data-testId': 'single-select-virtual-header-footer',
		items: largeItems,
		virtualizationConfig: {
			estimateSize: () => 40
		},
		menuHeader: (
			<div className="border-b border-indigo-100 bg-indigo-50 px-3 py-2 font-bold text-indigo-700">
				Virtualized Frameworks
			</div>
		),
		menuFooter: (
			<div className="border-t border-indigo-100 px-3 py-2 text-center text-xs text-indigo-400">
				Scroll to see virtualization in action
			</div>
		)
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

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

export const EmptyList: Story = {
	args: {
		label: 'Empty List',
		items: [],
		placeholder: 'No items available',
		'data-testId': 'single-select-empty-list'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

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
