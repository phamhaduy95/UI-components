import type { Meta, StoryObj } from '@storybook/react-vite';
import Switch from '@components/Switch';
import { useState } from 'react';
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
		onCheckedChange: { action: 'onCheckedChange' },
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
	beforeEach() {
		mockedOnCheckedChange.mockClear();
	}
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Toggle feature',
		'data-testid': 'switch-default'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

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

export const Checked: Story = {
	args: {
		label: 'Initial checked',
		checked: true,
		'data-testid': 'switch-checked'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const switchElement = within(container).getByRole('checkbox');

		await step('Check if switch is checked', async () => {
			expect(switchElement).toBeChecked();
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Controllable Switch',
		onCheckedChange: mockedOnCheckedChange,
		'data-testid': 'switch-controlled'
	},
	render(args) {
		const [checked, setChecked] = useState(false);

		const handleCheckedChange = (details: { checked: boolean; value?: string }) => {
			if (args.onCheckedChange) args.onCheckedChange(details);
			setChecked(details.checked);
		};

		return (
			<div className="flex flex-col gap-4">
				<Switch {...args} checked={checked} onCheckedChange={handleCheckedChange} />
				<p aria-label="Displayed state">State: {checked ? 'On' : 'Off'}</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
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
		disabled: true,
		'data-testid': 'switch-disabled'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const switchElement = within(container).getByRole('checkbox');

		await step('Check if switch is disabled', async () => {
			expect(switchElement).toBeDisabled();
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Required Switch',
		required: true,
		'data-testid': 'switch-required'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);
		const switchElement = within(container).getByRole('checkbox');

		await step('Check if switch is required', async () => {
			expect(switchElement).toBeRequired();
		});
	}
};

export const Color: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Switch label="Error Status" color="error" />
			<Switch label="Warning Status" color="warning" />
			<Switch label="Success Status" color="success" />
			<Switch label="Primary Status" color="primary" />
			<Switch label="Secondary Status" color="secondary" />
		</div>
	)
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Switch label="Small" size="small" />
			<Switch label="Medium" size="medium" />
		</div>
	)
};
