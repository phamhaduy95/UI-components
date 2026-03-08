import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Accordion } from '@components/Accordion';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockedOnValueChange = fn();

const meta = {
	title: 'Components/DataDisplay/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'onValueChange' }
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultItems = [
	{
		value: 'item-1',
		title: 'Accordion Item 1',
		content: 'Content for Accordion Item 1'
	},
	{
		value: 'item-2',
		title: 'Accordion Item 2',
		content: 'Content for Accordion Item 2'
	},
	{
		value: 'item-3',
		title: 'Accordion Item 3',
		content: 'Content for Accordion Item 3'
	}
];

export const Default: Story = {
	args: {
		items: defaultItems,
		'data-testid': 'accordion-default',
		collapsible: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', items } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if items are rendered', async () => {
			items.forEach((item) => {
				expect(within(container).getByRole('button', { name: item.title })).toBeInTheDocument();
			});
		});

		const firstTrigger = within(container).getByRole('button', { name: items[0].title });

		await step('Click first item to expand', async () => {
			await userEvent.click(firstTrigger);
		});

		await step('Check if first content is visible', async () => {
			const region = within(container).getByRole('region', { name: items[0].title });
			await waitFor(() => {
				expect(region).toBeVisible();
			});
		});
	}
};

export const Multiple: Story = {
	args: {
		items: defaultItems,
		multiple: true,
		'data-testid': 'accordion-multiple'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', items } = args;
		const container = canvas.getByTestId(testId);

		const firstTrigger = within(container).getByRole('button', { name: items[0].title });
		const secondTrigger = within(container).getByRole('button', { name: items[1].title });

		await step('Click first item', async () => {
			await userEvent.click(firstTrigger);
		});

		await step('Check if first content is visible', async () => {
			const region = within(container).getByRole('region', { name: items[0].title });
			await waitFor(() => {
				expect(region).toBeVisible();
			});
		});

		await step('Click second item (both should be open)', async () => {
			await userEvent.click(secondTrigger);
		});

		await step('Check if second content is visible', async () => {
			const region = within(container).getByRole('region', { name: items[1].title });
			await waitFor(() => {
				expect(region).toBeVisible();
			});
		});
	}
};

export const Collapsible: Story = {
	args: {
		items: defaultItems,
		collapsible: true,
		'data-testid': 'accordion-collapsible'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		const firstTrigger = within(container).getByRole('button', { name: /Accordion Item 1/i });

		await step('Click first item to open', async () => {
			await userEvent.click(firstTrigger);
		});

		await step('Check if first content is visible', async () => {
			const region = within(container).getByRole('region', { name: /Accordion Item 1/i });
			await waitFor(() => {
				expect(region).toBeVisible();
			});
		});

		await step('Click first item again to close', async () => {
			await userEvent.click(firstTrigger);
		});

		await step('Check if first content is hidden', async () => {
			const region = within(container).getByRole('region', { name: /Accordion Item 1/i });
			await waitFor(() => {
				expect(region).not.toBeVisible();
			});
		});
	}
};

export const Disabled: Story = {
	args: {
		items: defaultItems,
		disabled: true,
		'data-testid': 'accordion-disabled'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		const triggers = within(container).getAllByRole('button');

		await step('Check if all triggers are disabled', async () => {
			triggers.forEach((trigger) => {
				expect(trigger).toBeDisabled();
			});
		});
	}
};

export const Controllable: Story = {
	args: {
		items: defaultItems,
		value: ['item-1'],
		onValueChange: mockedOnValueChange,
		'data-testid': 'accordion-controllable'
	},
	render(args) {
		const [value, setValue] = useState(args.value);

		const handleValueChange = (val: string[]) => {
			if (args.onValueChange) args.onValueChange(val);
			setValue(val);
		};

		return (
			<div>
				<Accordion {...args} value={value} onValueChange={handleValueChange} />
				<p className="mt-4" aria-label="Displayed value">
					Selected: {value?.join(', ')}
				</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', items } = args;
		const container = canvas.getByTestId(testId);

		const secondTrigger = within(container).getByRole('button', { name: items[1].title });

		await step('Check if initial value is correct', async () => {
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Selected: item-1');
		});

		await step('Click second item and check callback', async () => {
			await userEvent.click(secondTrigger);
		});

		await step('Check if onValueChange is invoked with correct value', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith(['item-2']);
		});

		await step('Check if displayd state is correct', async () => {
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Selected: item-2');
		});
	}
};

export const CustomTitleContent: Story = {
	args: {
		items: [
			{
				value: 'custom-1',
				CustomTitle: (ctx) => (
					<div className="flex items-center gap-2 font-bold text-blue-600">
						<span>🚀</span>
						<span>Custom Title {ctx.expanded ? '(Open)' : '(Closed)'}</span>
					</div>
				),
				CustomContent: () => (
					<div className="rounded bg-gray-100 p-4 italic text-gray-700">
						This is some custom content inside a styled div.
					</div>
				)
			}
		]
	}
};
