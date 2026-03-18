import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { TagsInput } from '@components/TagsInput';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockedOnValueChange = fn();

const meta: Meta<typeof TagsInput> = {
	title: 'Components/FormField/TagsInput',
	component: TagsInput,
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
		size: {
			control: 'select',
			options: ['small', 'medium', 'large']
		}
	},
	args: {
		label: 'Frameworks',
		placeholder: 'Add framework',
		supportingText: 'Please enter your favorite frameworks.',
		'data-testid': 'tag-input'
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;

		const container = canvas.getByTestId(testId);
		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if input exists', async () => {
			const input = canvas.getByLabelText(label as string);
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has placeholder', async () => {
			const input = canvas.getByLabelText(label as string);
			expect(input).toHaveAttribute('placeholder', args.placeholder);
		});

		await step('Check if input has supporting text', async () => {
			const input = canvas.getByLabelText(label as string);

			expect(input).toHaveAttribute('aria-describedby');

			const supportingTextId = input.getAttribute('aria-describedby');

			const supportingTextEl = container.querySelector(`#${supportingTextId}`);

			expect(supportingTextEl).toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Skills',
		defaultValue: ['Vue', 'React'],
		clearable: true
	},

	play: async ({ canvas, args, step }) => {
		const { label = '' } = args;

		let input: HTMLElement;
		await step('Check if input exists', async () => {
			input = canvas.getByLabelText(label as string);
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has default value items', async () => {
			const item1 = canvas.getByText('Vue');
			const item2 = canvas.getByText('React');
			expect(item1).toBeInTheDocument();
			expect(item2).toBeInTheDocument();
		});

		await step('Check if clear button is displayed when there is default value', async () => {
			const clearButton = canvas.getByRole('button', { name: 'Clear' });
			expect(clearButton).toBeInTheDocument();
		});
	}
};

export const BlankInput: Story = {
	args: {
		label: undefined,
		placeholder: undefined,
		supportingText: undefined,
		'data-testid': 'blank-input'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;

		const container = canvas.getByTestId(testId);

		await step('Check if input does not have label', async () => {
			const label = container.querySelector('label');
			expect(label).not.toBeInTheDocument();
		});

		await step('Check if input does not have supporting text', async () => {
			const input = within(container).getByRole('textbox');
			expect(input).not.toHaveAttribute('aria-describedby');
		});
	}
};

export const RemoveItemFlow: Story = {
	args: {
		defaultValue: ['React', 'Vue', 'Svelte', 'Next', 'Angular']
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testid': testId = '', defaultValue = [] } = args;
		const container = canvas.getByTestId(testId);
		const input = within(container).getByRole('textbox', { name: label as string });

		await step('Check if remove item by pressing backspace key is possible', async () => {
			await userEvent.type(input, '{backspace}');

			const lastItemText = defaultValue[defaultValue.length - 1] ?? '';

			const item = canvas.getByLabelText(lastItemText as string);

			expect(item).toHaveAttribute('data-highlighted');

			await userEvent.type(input, '{backspace}');

			expect(item).not.toBeInTheDocument();

			const newHighlightedItem = canvas.getByLabelText('Next');

			expect(newHighlightedItem).toHaveAttribute('data-highlighted');
		});

		await step('Check if remove item by keyboard navigation is correct', async () => {
			//type escape to reset highlighted item
			await userEvent.type(input, '{escape}');
			await userEvent.type(input, '{arrowleft}');

			const highlightedItem = canvas.getByLabelText('Next');

			expect(highlightedItem).toHaveAttribute('data-highlighted');

			await userEvent.type(input, '{backspace}');

			expect(highlightedItem).not.toBeInTheDocument();
		});

		await step('Check if removing item by clicking on X icon is correct', async () => {
			const item = canvas.getByLabelText('React');

			const removeIcon = item.querySelector('[data-part="chip_remove-icon"]') as HTMLElement;
			await userEvent.click(removeIcon);

			const item1 = canvas.queryByLabelText('React');
			expect(item1).not.toBeInTheDocument();
		});
	}
};

export const Clearable: Story = {
	args: {
		clearable: true
	},

	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testid': testId = '' } = args;

		const container = canvas.getByTestId(testId);
		const input = within(container).getByRole('textbox', { name: label as string });

		await step('Check if input is not clearable when there is no value', async () => {
			const clearButton = within(container).queryByRole('button', { name: 'Clear' });
			expect(clearButton).not.toBeInTheDocument();
		});

		await step('Check if input is clearable when there is value', async () => {
			await userEvent.type(input, 'Svelte{enter}');

			const clearButton = within(container).getByRole('button', { name: 'Clear' });
			expect(clearButton).toBeInTheDocument();
		});

		await step('Click on Clear button', async () => {
			const clearButton = within(container).getByRole('button', { name: 'Clear' });
			await userEvent.click(clearButton);
		});

		await step('Check if items are cleared when clear button is clicked', async () => {
			const item = canvas.queryByText('Svelte');
			expect(item).not.toBeInTheDocument();
		});

		await step('Check if clear Button is not displayed', async () => {
			const clearButton = within(container).queryByRole('button', { name: 'Clear' });
			expect(clearButton).not.toBeInTheDocument();
		});
	}
};

export const Controllable: Story = {
	args: {
		value: ['Initial'],
		clearable: true,
		onValueChange: mockedOnValueChange
	},
	render: (args) => {
		const [value, setValue] = useState(args.value || []);
		const handleValueChange = (val: string[]) => {
			if (args.onValueChange) args.onValueChange(val);
			setValue(val);
		};
		return (
			<div>
				<TagsInput {...args} value={value} onValueChange={handleValueChange} />
				<p className="ml-2 mt-3" aria-label="Displayed value">
					Value: {value?.join(', ')}
				</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { label = '' } = args;

		const input = canvas.getByLabelText(label as string);
		await step('Check if input displays initial value', async () => {
			const item = canvas.getByText('Initial');
			expect(item).toBeInTheDocument();
		});

		await step('Type in new value into TagInput', async () => {
			await userEvent.type(input, 'New{enter}');
		});

		await step('Check if onValueChange is called with correct arguments', async () => {
			expect(mockedOnValueChange).toBeCalled();
			expect(mockedOnValueChange.mock.lastCall).toEqual([['Initial', 'New']]);

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: Initial, New');
		});

		await step('Check if clear button is displayed', async () => {
			const clearButton = canvas.getByRole('button', { name: 'Clear' });
			expect(clearButton).toBeInTheDocument();
		});

		await step('Click in Clear button', async () => {
			const clearButton = canvas.getByRole('button', { name: 'Clear' });
			await userEvent.click(clearButton);
		});

		await step('Check if value should be empty array when user clicks clear button', async () => {
			expect(mockedOnValueChange).toBeCalled();
			expect(mockedOnValueChange.mock.lastCall).toEqual([[]]);

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value:');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		disabled: true,
		defaultValue: ['Disabled Tag']
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { label = '' } = args;

		await step('Check if input is disabled', async () => {
			const input = canvas.getByLabelText(label as string);
			expect(input).toBeDisabled();
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Required Field',
		required: true
	},

	play: async ({ canvas, args, step }) => {
		const { label = '' } = args;

		await step('Check if input is required', async () => {
			const input = canvas.getByLabelText(label as string);
			expect(input).toBeRequired();
		});
	}
};

export const Sizes: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-4">
				<TagsInput label="Small" size="small" placeholder="Add tag" />
				<TagsInput label="Medium" size="medium" placeholder="Add tag" />
			</div>
		);
	}
};

export const Statuses: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-4">
				<TagsInput
					label="Error"
					placeholder="Add tag"
					supportingText="Error message."
					status="error"
				/>
				<TagsInput
					label="Warning"
					placeholder="Add tag"
					supportingText="Warning message."
					status="warning"
				/>
				<TagsInput
					label="Success"
					placeholder="Add tag"
					supportingText="Success message."
					status="success"
				/>
			</div>
		);
	}
};

export const MaxTags: Story = {
	args: {
		label: 'Max Tags (3)',
		max: 3,
		defaultValue: ['Vue', 'React', 'Svelte']
	},
	play: async ({ canvas, args, step }) => {
		const input = canvas.getByLabelText(args.label as string);

		await step('Check if 3 initial tags exist', async () => {
			expect(canvas.getByText('Vue')).toBeInTheDocument();
			expect(canvas.getByText('React')).toBeInTheDocument();
			expect(canvas.getByText('Svelte')).toBeInTheDocument();
		});

		await step('Try to add 4th tag', async () => {
			await userEvent.type(input, 'Angular{enter}');
			expect(canvas.queryByText('Angular')).not.toBeInTheDocument();
		});
	}
};

export const Validation: Story = {
	args: {
		label: 'Validation (Min 3 chars)',
		validate: (details) => details.inputValue.length >= 3,
		placeholder: 'Add tag (min 3 chars)'
	},
	play: async ({ canvas, args, step }) => {
		const input = canvas.getByLabelText(args.label as string);

		await step('Try to add tag with less than 3 chars', async () => {
			await userEvent.type(input, 'Nu{enter}');
			expect(canvas.queryByText('Nu')).not.toBeInTheDocument();
		});

		await step('Add valid tag', async () => {
			await userEvent.clear(input);
			await userEvent.type(input, 'Nuxt{enter}');
			expect(canvas.getByText('Nuxt')).toBeInTheDocument();
		});
	}
};

export const CustomDelimiter: Story = {
	args: {
		label: 'Custom Delimiter (-)',
		delimiter: '-',
		placeholder: 'Type tag and press "-" to add'
	},
	play: async ({ canvas, args, step }) => {
		const input = canvas.getByLabelText(args.label as string);

		await step('Type tag and delimiter to add', async () => {
			await userEvent.type(input, 'Vue-');
			expect(canvas.getByText('Vue')).toBeInTheDocument();
		});
	}
};

export const CustomItemSlot: Story = {
	args: {
		label: 'Custom Item Slot',
		defaultValue: ['Vue', 'React']
	},
	render: (args) => {
		return (
			<TagsInput
				{...args}
				renderItem={({ value, removeItem }) => (
					<div className="flex items-center gap-1 rounded border border-indigo-200 bg-indigo-50 px-2 py-1 text-sm text-indigo-700">
						<span>{value}</span>
						<button
							className="cursor-pointer border-none bg-transparent p-0 text-inherit"
							onClick={removeItem}
							aria-label="Custom remove"
						>
							❌
						</button>
					</div>
				)}
			/>
		);
	},
	play: async ({ canvas, step }) => {
		await step('Check if custom item is rendered', async () => {
			expect(canvas.getByText('Vue')).toBeInTheDocument();
			expect(canvas.getByText('React')).toBeInTheDocument();
		});

		await step('Remove custom item', async () => {
			const removeButtons = canvas.getAllByRole('button', { name: 'Custom remove' });
			await userEvent.click(removeButtons[0]!);

			expect(canvas.queryByText('Vue')).not.toBeInTheDocument();
			expect(canvas.getByText('React')).toBeInTheDocument();
		});
	}
};

export const ReadonlyWithHiddenInput: Story = {
	args: {
		defaultValue: ['Vue', 'React'],
		readOnly: true,
		hideInput: true
	}
};
