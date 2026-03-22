import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '@components/Button';
import { Tooltip } from '@components/Tooltip';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockedOnOpenChange = fn();

const meta: Meta<typeof Tooltip> = {
	title: 'Components/Overlay/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		onOpenChange: { action: 'onOpenChange' }
	},
	args: {
		openDelay: 1,
		closeDelay: 1
	},
	beforeEach() {
		mockedOnOpenChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		trigger: () => <Button>Hover me</Button>,
		children: 'I am a tooltip!'
	},
	play: async ({ canvas, step }) => {
		const trigger = canvas.getByRole('button', { name: /hover me/i });

		await step('Check initial state: tooltip is closed', async () => {
			expect(trigger).toBeInTheDocument();
			expect(trigger).toHaveAttribute('data-state', 'closed');
		});

		await step('Hover trigger to open tooltip', async () => {
			await userEvent.hover(trigger);
			await waitFor(() => {
				expect(trigger).toHaveAttribute('data-state', 'open');
			});
		});

		await step('Test if tooltip content is visible', async () => {
			const tooltipContent = within(document.body).queryByRole('tooltip', {
				name: 'I am a tooltip!'
			});
			await waitFor(() => {
				expect(tooltipContent).toBeVisible();
			});
		});

		await step('Unhover to close tooltip', async () => {
			const tooltipContent = within(document.body).queryByRole('tooltip', {
				name: 'I am a tooltip!'
			});
			await userEvent.unhover(trigger);

			await waitFor(() => {
				expect(trigger).toHaveAttribute('data-state', 'closed');
				expect(tooltipContent).not.toBeVisible();
			});
		});
	}
};

export const Controlled: Story = {
	args: {
		onOpenChange: mockedOnOpenChange,
		trigger: () => <Button>Controlled Tooltip</Button>,
		children: 'Controlled content'
	},
	render: (args) => {
		const [open, setOpen] = useState(false);
		const handleOpenChange = (nextOpen: boolean) => {
			setOpen(nextOpen);
			mockedOnOpenChange(nextOpen);
		};
		return (
			<div className="flex flex-col items-center gap-4">
				<p className="text-sm text-gray-500">External state: {open ? 'Open' : 'Closed'}</p>
				<Tooltip {...args} open={open} onOpenChange={handleOpenChange} />
			</div>
		);
	},
	play: async ({ canvas, step }) => {
		const trigger = canvas.getByRole('button', { name: /controlled tooltip/i });

		await step('Hover trigger to open tooltip', async () => {
			await userEvent.hover(trigger);
		});

		await step('Test if external state is Open', async () => {
			await waitFor(() => {
				expect(canvas.getByText('External state: Open')).toBeInTheDocument();
			});
		});

		await step('Test if onOpenChange is called with true', async () => {
			expect(mockedOnOpenChange).toHaveBeenCalledWith(true);
		});

		await step('Unhover trigger to close', async () => {
			await userEvent.unhover(trigger);

			await waitFor(() => {
				expect(canvas.getByText('External state: Closed')).toBeInTheDocument();
			});
		});

		await step('Test if onOpenChange is called with false', async () => {
			expect(mockedOnOpenChange).toHaveBeenCalledWith(false);
		});
	}
};

export const CustomPositioning: Story = {
	args: {
		trigger: () => <Button>Right Start Placement</Button>,
		children: 'Placed to the right!',
		positioning: { placement: 'right-start' }
	}
};

export const WithArrow: Story = {
	args: {
		arrow: true,
		trigger: () => <Button>With Arrow</Button>,
		children: 'I have an arrow!'
	}
};
