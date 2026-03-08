import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';

import { ToggleButton } from '@components/ToggleButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockedOnPressedChange = fn();

const meta: Meta<typeof ToggleButton> = {
	title: 'Components/Buttons/ToggleButton',
	component: ToggleButton,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large']
		},
		onPressedChange: { action: 'onPressedChange' },
		disabled: { control: 'boolean' },
		pressed: { control: 'boolean' }
	},
	beforeEach() {
		mockedOnPressedChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: ({ pressed }) => (
			<div className="flex items-center gap-2">
				{pressed ? <StarFilledIcon /> : <StarIcon />}
				<span>{pressed ? 'On' : 'Off'}</span>
			</div>
		),
		'aria-label': 'Toggle on/off'
	},
	play: async ({ canvas, step }) => {
		const button = canvas.getByRole('button', { name: 'Toggle on/off' });

		await step('Check if button exists', async () => {
			expect(button).toBeInTheDocument();
		});

		await step('Check initial state', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'false');
			expect(button).toHaveTextContent('Off');
		});

		await step('Click button', async () => {
			await userEvent.click(button);
		});

		await step('Check state after click', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'true');
			expect(button).toHaveTextContent('On');
		});
	}
};

export const DefaultPressed: Story = {
	args: {
		defaultPressed: true,
		children: ({ pressed }) => (
			<div className="flex items-center gap-2">
				{pressed ? <StarFilledIcon /> : <StarIcon />}
				<span>{pressed ? 'On' : 'Off'}</span>
			</div>
		)
	}
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: ({ pressed }) => <span>{pressed ? 'On' : 'Off'}</span>
	},
	play: async ({ canvas, step }) => {
		const button = canvas.getByRole('button');
		await step('Check if button is disabled', async () => {
			expect(button).toBeDisabled();
		});
	}
};

export const Controllable: Story = {
	args: {
		onPressedChange: mockedOnPressedChange,
		children: ({ pressed }) => (
			<div className="flex items-center gap-2">
				{pressed ? <StarFilledIcon /> : <StarIcon />}
				<span>{pressed ? 'On' : 'Off'}</span>
			</div>
		)
	},
	render: (args) => {
		const [pressed, setPressed] = useState(false);

		const handlePressedChange = (pressed: boolean) => {
			if (args.onPressedChange) args.onPressedChange(pressed);
			setPressed(pressed);
		};

		return (
			<div className="flex flex-col items-center gap-3">
				<ToggleButton {...args} pressed={pressed} onPressedChange={handlePressedChange} />
				<p aria-label="Status label">Status: {pressed ? 'ON' : 'OFF'}</p>
			</div>
		);
	},
	play: async ({ canvas, step }) => {
		const button = canvas.getByRole('button');
		const label = canvas.getByLabelText('Status label');

		await step('Check initial state', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'false');
			expect(label).toHaveTextContent('Status: OFF');
		});

		await step('Click button', async () => {
			await userEvent.click(button);
		});

		await step('Check updated state', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'true');
			expect(label).toHaveTextContent('Status: ON');
			expect(mockedOnPressedChange).toHaveBeenCalledWith(true);
		});

		await step('Click button again', async () => {
			await userEvent.click(button);
		});

		await step('Check final state', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'false');
			expect(label).toHaveTextContent('Status: OFF');
			expect(mockedOnPressedChange).toHaveBeenCalledWith(false);
		});
	}
};
