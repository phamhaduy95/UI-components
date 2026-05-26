import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Switch } from '@components/Switch';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnCheckedChange = fn();

const meta = {
	title: 'Components/FormField/Switch',
	component: Switch,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		'onUpdate:checked': { action: 'update:checked' },
		onCheckedChange: { action: 'checkedChange' },
		color: {
			control: 'select',
			options: ['primary', 'success', 'error', 'warning', 'secondary']
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large']
		},
		checked: {
			control: 'boolean'
		},
		disabled: {
			control: 'boolean'
		}
	},
	args: {
		label: 'Toggle feature',
		dataTestid: 'switch-default'
	},
	render: (args) => ({
		components: { Switch },
		setup() {
			return { args };
		},
		template: '<Switch v-bind="args" />'
	}),
	beforeEach() {
		mockedOnCheckedChange.mockClear();
	}
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		const switchElement = within(container).getByRole('checkbox');

		await step('Check if switch is unchecked', async () => {
			expect(switchElement).not.toBeChecked();
		});

		await step('Click switch to toggle', async () => {
			await userEvent.click(switchElement);
			expect(switchElement).toBeChecked();
		});
	}
};

export const DefaultChecked: Story = {
	args: {
		defaultChecked: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const switchElement = within(container).getByRole('checkbox');

		await step('Check if switch is checked', async () => {
			expect(switchElement).toBeChecked();
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Controllable Switch',
		onCheckedChange: mockedOnCheckedChange
	},
	render: (args) => ({
		components: { Switch },
		setup() {
			const checked = ref(false);

			const handleCheckedChange = (details: { checked: boolean; value?: string }) => {
				if (args.onCheckedChange) args.onCheckedChange(details);
				checked.value = details.checked;
			};

			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Switch
						{...args}
						checked={checked.value}
						onCheckedChange={handleCheckedChange}
						onUpdate:checked={(val: boolean) => {
							checked.value = val;
						}}
					/>
					<p aria-label="Displayed state">State: {checked.value ? 'On' : 'Off'}</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const switchElement = within(container).getByRole('checkbox');

		await step('Toggle switch and check callback', async () => {
			await userEvent.click(switchElement);
			expect(mockedOnCheckedChange).toHaveBeenCalledWith(
				expect.objectContaining({ checked: true })
			);
			const displayedState = canvas.getByLabelText('Displayed state');
			expect(displayedState).toHaveTextContent('State: On');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Switch',
		disabled: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const switchElement = within(container).getByRole('checkbox');

		await step('Check if switch is disabled', async () => {
			expect(switchElement).toBeDisabled();
		});
	}
};

export const NoLabel: Story = {
	args: {
		defaultChecked: true
	},

	play: async ({ canvas, args }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		expect(container).toBeInTheDocument();
	}
};

export const Color: Story = {
	render: () => ({
		components: { Switch },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Switch label="Error Status" color="error" />
					<Switch label="Warning Status" color="warning" />
					<Switch label="Success Status" color="success" />
					<Switch label="Primary Status" color="primary" />
					<Switch label="Secondary Status" color="secondary" />
				</div>
			);
		}
	})
};

export const Sizes: Story = {
	render: () => ({
		components: { Switch },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Switch label="Extra Small" size="xs" />
					<Switch label="Small" size="sm" />
					<Switch label="Medium" size="md" />
					<Switch label="Large" size="lg" />
				</div>
			);
		}
	})
};
