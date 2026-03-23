import classNames from 'classnames';
import { useState } from 'react';
import { expect, fireEvent, fn, screen, userEvent, waitFor, within } from 'storybook/test';

import { SingleCombobox, SingleComboboxProps } from '@components/SingleCombobox';
import { SelectItem } from '@components/type';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockedOnValueChange = fn();
const mockedOnUpdateOpen = fn();
const mockedOnFocusOutside = fn();
const mockedOnExitComplete = fn();
const mockedOnStartReached = fn();
const mockedOnEndReached = fn();

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

const largeItems = Array.from({ length: 1000 }).map((_, i) => ({
	label: `Option ${i}`,
	value: `option-${i}`
}));

const triggerLabel = 'Trigger popup';

const meta: Meta<typeof SingleCombobox> = {
	title: 'Components/FormField/Combobox',
	component: SingleCombobox,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'onValueChange' },
		onFocusOutside: { action: 'focusOutside' },
		onExitComplete: { action: 'exitComplete' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		disabled: { control: 'boolean' },
		supportingText: { control: 'text' }
	},
	args: {
		supportingText: 'Please select a item.',
		items: items,
		onValueChange: mockedOnValueChange,
		onFocusOutside: mockedOnFocusOutside,
		onExitComplete: mockedOnExitComplete,
		'data-testid': 'single-combobox-default'
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateOpen.mockClear();
		mockedOnFocusOutside.mockClear();
		mockedOnExitComplete.mockClear();
		mockedOnStartReached.mockClear();
		mockedOnEndReached.mockClear();
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
		supportingText: 'Please select a framework.'
	},
	play: async ({ canvas, args, step }) => {
		const {
			'data-testid': testId = 'single-combobox-default',
			label = '',
			supportingText = ''
		} = args;
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
		const { 'data-testid': testId = 'single-combobox-default', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Open menu by clicking trigger', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
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
			const trigger = within(container).getByRole('button', { name: triggerLabel });
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
		label: 'Framework'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = 'single-combobox-default', label = '' } = args;
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
		defaultValue: items[0].value,
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
		clearable: true
	},
	render: (args) => {
		const [value, setValue] = useState(args.value);

		const handleChange: SingleComboboxProps['onValueChange'] = (newValue, item) => {
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
		placeholder: 'Select Framework'
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
		required: true
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
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

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
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Open the combobox menu', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
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
		label: 'Frameworks',
		items: items,
		menuHeader: (
			<div className="border-b border-gray-200 px-3 py-2 font-semibold">Available Frameworks</div>
		),
		menuFooter: (
			<div className="border-t border-gray-200 px-3 py-2 text-sm text-gray-500">End of list</div>
		)
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

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

export const CustomEmptyContent: Story = {
	args: {
		label: 'Frameworks',
		items: items,
		emptyContent: (
			<div className="px-3 py-2 text-center text-sm text-red-500">
				No frameworks found! Try something else.
			</div>
		)
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);
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

export const CustomItemContent: Story = {
	args: {
		label: 'Custom Items',
		items: items,
		itemContent: ({
			item,
			isSelected,
			isHighlighted
		}: {
			item: SelectItem;
			isSelected: boolean;
			isHighlighted: boolean;
		}) => (
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
		const { 'data-testid': dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open the combobox menu via trigger', async () => {
			const trigger = within(container).getByRole('button', { name: triggerLabel });
			await userEvent.click(trigger);
		});

		const menuPopup = screen.getByRole('listbox', { name: label });
		await step('Verify custom item content formatting', async () => {
			await waitFor(() => {
				expect(menuPopup).toBeVisible();
			});
			const firstOption = within(menuPopup).getByRole('option', {
				name: items[0].label
			});
			expect(firstOption).toHaveTextContent('Custom item: ' + items[0].label);
		});

		await step('Verify isHighlighted prop works', async () => {
			const secondOption = within(menuPopup).getByRole('option', {
				name: items[1].label
			});
			await userEvent.hover(secondOption);

			await waitFor(() => {
				expect(secondOption).toHaveTextContent('highlighted');
			});
		});

		await step('Verify isSelected prop works', async () => {
			const firstOption = within(menuPopup).getByRole('option', {
				name: items[0].label
			});
			await userEvent.click(firstOption);

			// Re-open list
			const trigger = within(container).getByRole('button', { name: triggerLabel });
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
		label: 'Virtual Frameworks',
		items: largeItems,
		virtualizationConfig: {
			estimateSize: () => 40
		},
		menuHeader: (
			<div className="border-b border-gray-200 px-3 py-2 font-semibold">
				Virtual Frameworks Header
			</div>
		),
		menuFooter: (
			<div className="border-t border-gray-200 px-3 py-2 text-sm text-gray-500">
				Virtual Frameworks Footer
			</div>
		)
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
		const container = canvas.getByTestId(testId);

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
