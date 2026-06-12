import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Collapsible } from '@components/Collapsible';
import { ref } from 'vue';
import { expect, within, userEvent, fn, waitFor } from 'storybook/test';
import type { CollapsibleSlotProps } from '@components/Collapsible/Collapsible.type';

const mockedOnOpenChange = fn();
const mockedOnUpdateOpen = fn();

const meta = {
	title: 'Components/DataDisplay/Collapsible',
	component: Collapsible,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onOpenChange: { action: 'openChange' },
		'onUpdate:open': { action: 'update:open' }
	},
	args: {
		onOpenChange: mockedOnOpenChange,
		'onUpdate:open': mockedOnUpdateOpen
	},
	beforeEach() {
		mockedOnOpenChange.mockClear();
		mockedOnUpdateOpen.mockClear();
	}
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Collapsible Trigger',
		content: 'This is the collapsible content that is revealed when opened.'
	},
	render: (args) => ({
		components: { Collapsible },
		setup() {
			return { args };
		},
		template: '<Collapsible v-bind="args" data-testid="collapsible-default" />'
	}),
	play: async ({ canvas, step }) => {
		const container = canvas.getByTestId('collapsible-default');

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		const trigger = within(container).getByRole('button', { name: /Collapsible Trigger/i });

		await step('Click trigger to expand', async () => {
			await userEvent.click(trigger);
		});

		await step('Check if content is visible', async () => {
			const content = within(container).getByText(/This is the collapsible content/i);
			await waitFor(() => {
				expect(content).toBeVisible();
			});
		});
	}
};

export const DefaultOpen: Story = {
	args: {
		title: 'Open by default',
		content: 'This content is visible by default.',
		defaultOpen: true
	},
	render: (args) => ({
		components: { Collapsible },
		setup() {
			return { args };
		},
		template: '<Collapsible v-bind="args" data-testid="collapsible-default-open" />'
	}),
	play: async ({ canvas, step }) => {
		const container = canvas.getByTestId('collapsible-default-open');

		await step('Check if content is visible initially', async () => {
			const content = within(container).getByText(/This content is visible by default./i);
			expect(content).toBeVisible();
		});
	}
};

export const Disabled: Story = {
	args: {
		title: 'Disabled Trigger',
		content: 'You cannot see me.',
		disabled: true
	},
	render: (args) => ({
		components: { Collapsible },
		setup() {
			return { args };
		},
		template: '<Collapsible v-bind="args" data-testid="collapsible-disabled" />'
	}),
	play: async ({ canvas, step }) => {
		const container = canvas.getByTestId('collapsible-disabled');
		const trigger = within(container).getByRole('button');

		await step('Check if trigger is disabled', async () => {
			expect(trigger).toBeDisabled();
		});
	}
};

export const CustomSlots: Story = {
	args: {
		title: 'Custom Content',
		content: 'Content provided via slots'
	},
	render: (args) => ({
		components: { Collapsible },
		setup() {
			return () => (
				<Collapsible {...args}>
					{{
						title: (props: CollapsibleSlotProps) => (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									fontWeight: 'bold',
									color: props.open ? 'blue' : 'inherit'
								}}
							>
								<span>🚀</span>
								<span>{props.title}</span>
							</div>
						),
						content: (props: CollapsibleSlotProps) => (
							<div
								style={{
									backgroundColor: '#f3f4f6',
									padding: '16px',
									borderRadius: '4px',
									fontStyle: 'italic',
									color: '#374151'
								}}
							>
								{props.content} - And this is styled perfectly!
							</div>
						)
					}}
				</Collapsible>
			);
		}
	})
};

export const Controllable: Story = {
	args: {
		title: 'Controlled Trigger',
		content: 'This collapsible is controlled externally.',
		open: true
	},
	render: (args) => ({
		components: { Collapsible },
		setup() {
			const isOpen = ref(args.open);

			const handleUpdateOpen = (val: boolean) => {
				mockedOnUpdateOpen(val);
				isOpen.value = val;
			};

			const handleOpenChange = (val: boolean) => {
				mockedOnOpenChange(val);
			};

			return () => (
				<div>
					<div style={{ marginBottom: '16px' }}>
						<button onClick={() => (isOpen.value = !isOpen.value)} data-testid="external-trigger">
							Toggle Externally
						</button>
					</div>
					<Collapsible
						{...args}
						open={isOpen.value}
						onOpenChange={handleOpenChange}
						onUpdate:open={handleUpdateOpen}
						data-testid="collapsible-controllable"
					/>
					<p style={{ marginTop: '16px' }} aria-label="Displayed value">
						Is Open: {String(isOpen.value)}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, step }) => {
		const container = canvas.getByTestId('collapsible-controllable');
		const externalTrigger = canvas.getByTestId('external-trigger');
		const trigger = within(container).getByRole('button', { name: /Controlled Trigger/i });

		await step('Check if initial value is correct', async () => {
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Is Open: true');
		});

		await step('Toggle externally', async () => {
			await userEvent.click(externalTrigger);
		});

		await step('Check if state is updated', async () => {
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Is Open: false');
		});

		await step('Toggle internally', async () => {
			await userEvent.click(trigger);
		});

		await step('Check if state is updated again and callback invoked', async () => {
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Is Open: true');
			expect(mockedOnUpdateOpen).toHaveBeenCalledWith(true);
		});
	}
};
