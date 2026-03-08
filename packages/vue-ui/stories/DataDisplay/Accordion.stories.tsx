import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Accordion, type AccordionItemObject } from '@components/Accordion';
import { ref } from 'vue';
import { expect, within, userEvent, fn, waitFor } from 'storybook/test';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();

const meta = {
	title: 'Components/DataDisplay/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'valueChange' },
		'onUpdate:modelValue': { action: 'update:modelValue' }
	},
	args: {
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
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
		dataTestid: 'accordion-default',
		collapsible: true
	},
	render: (args) => ({
		components: { Accordion },
		setup() {
			return { args };
		},
		template: '<Accordion v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', items } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if items are rendered', async () => {
			items!.forEach((item) => {
				expect(within(container).getByRole('button', { name: item.title })).toBeInTheDocument();
			});
		});

		const firstTrigger = within(container).getByRole('button', { name: items![0]!.title! });

		await step('Click first item to expand', async () => {
			await userEvent.click(firstTrigger);
		});

		await step('Check if first content is visible', async () => {
			const region = within(container).getByRole('region', { name: items![0]!.title! });
			await waitFor(() => {
				expect(region).toBeVisible();
			});
		});
	}
};

export const DefaultValue: Story = {
	args: {
		items: defaultItems,
		defaultValue: ['item-2'],
		dataTestid: 'accordion-default-value'
	},
	render: (args) => ({
		components: { Accordion },
		setup() {
			return { args };
		},
		template: '<Accordion v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', items } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if second content is visible by default', async () => {
			const region = within(container).getByRole('region', { name: items[1]!.title! });

			expect(region).toBeVisible();
		});
	}
};

export const Multiple: Story = {
	args: {
		items: defaultItems,
		multiple: true,
		dataTestid: 'accordion-multiple'
	},
	render: (args) => ({
		components: { Accordion },
		setup() {
			return { args };
		},
		template: '<Accordion v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', items } = args;
		const container = canvas.getByTestId(dataTestid);

		const firstTrigger = within(container).getByRole('button', { name: items![0]!.title! });
		const secondTrigger = within(container).getByRole('button', { name: items![1]!.title! });

		await step('Click first item', async () => {
			await userEvent.click(firstTrigger);
		});

		await step('Check if first content is visible', async () => {
			const region = within(container).getByRole('region', { name: items![0]!.title! });
			await waitFor(() => {
				expect(region).toBeVisible();
			});
		});

		await step('Click second item (both should be open)', async () => {
			await userEvent.click(secondTrigger);
		});

		await step('Check if second content is visible', async () => {
			const region = within(container).getByRole('region', { name: items![1]!.title! });
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
		dataTestid: 'accordion-collapsible'
	},
	render: (args) => ({
		components: { Accordion },
		setup() {
			return { args };
		},
		template: '<Accordion v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

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
		dataTestid: 'accordion-disabled'
	},
	render: (args) => ({
		components: { Accordion },
		setup() {
			return { args };
		},
		template: '<Accordion v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		const triggers = within(container).getAllByRole('button');

		await step('Check if all triggers are disabled', async () => {
			triggers.forEach((trigger) => {
				expect(trigger).toBeDisabled();
			});
		});
	}
};

export const AriaLabelFallback: Story = {
	args: {
		items: [
			{
				value: 'item-no-title',
				content: 'Content here',
				'aria-label': 'Custom Aria Label Fallback'
			}
		],
		dataTestid: 'accordion-aria-fallback'
	},
	render: (args) => ({
		components: { Accordion },
		setup() {
			return { args };
		},
		template: `
			<Accordion v-bind="args">
				<template #title>
					<span>Custom Title slot <span>🚀</span> for Aria Label Fallback</span>
				</template>
			</Accordion>
		`
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if trigger has correct fallback aria-label', async () => {
			const trigger = within(container).getByRole('button', { name: 'Custom Aria Label Fallback' });
			expect(trigger).toHaveAttribute('aria-label', 'Custom Aria Label Fallback');
		});
	}
};

export const CustomTitleContent: Story = {
	args: {
		items: [
			{
				value: 'custom-1',
				title: 'Custom Title rendering via slots',
				content: 'Custom Content rendering via slots'
			}
		]
	},
	render: (args) => ({
		components: { Accordion },
		setup() {
			return () => (
				<Accordion {...args}>
					{{
						title: ({ item }: { item: AccordionItemObject }) => (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									fontWeight: 'bold',
									color: 'blue'
								}}
							>
								<span>🚀</span>
								<span>{item.title}</span>
							</div>
						),
						content: ({ item }: { item: AccordionItemObject }) => (
							<div
								style={{
									backgroundColor: '#f3f4f6',
									padding: '16px',
									borderRadius: '4px',
									fontStyle: 'italic',
									color: '#374151'
								}}
							>
								{item.content} - And this is styled perfectly!
							</div>
						)
					}}
				</Accordion>
			);
		}
	})
};

export const Controllable: Story = {
	args: {
		items: defaultItems,
		modelValue: ['item-1'],
		dataTestid: 'accordion-controllable'
	},
	render: (args) => ({
		components: { Accordion },
		setup() {
			const value = ref(args.modelValue);

			const handleValueChange = (val: string[]) => {
				mockedOnValueChange(val);
			};

			const handleUpdateModelValue = (val: string[]) => {
				mockedOnUpdateModelValue(val);
				value.value = val;
			};

			return () => (
				<div>
					<Accordion
						{...args}
						modelValue={value.value}
						onValueChange={handleValueChange}
						onUpdate:modelValue={handleUpdateModelValue}
					/>
					<p style={{ marginTop: '16px' }} aria-label="Displayed value">
						Selected: {value.value?.join(', ')}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', items } = args;
		const container = canvas.getByTestId(dataTestid);

		const secondTrigger = within(container).getByRole('button', { name: items![1]!.title! });

		await step('Check if initial value is correct', async () => {
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Selected: item-1');
		});

		await step('Click second item and check callback', async () => {
			await userEvent.click(secondTrigger);
		});

		await step('Check if onValueChange is invoked with correct value', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith(['item-2']);
			expect(mockedOnUpdateModelValue).toHaveBeenLastCalledWith(['item-2']);
		});

		await step('Check if displayd state is correct', async () => {
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Selected: item-2');
		});
	}
};
