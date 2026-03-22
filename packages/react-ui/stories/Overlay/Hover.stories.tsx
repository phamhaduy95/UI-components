import { useState } from 'react';
import { expect, fn, userEvent, waitFor } from 'storybook/test';

import { Hover } from '@components/Hover';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockedOnOpenChange = fn();

const meta: Meta<typeof Hover> = {
	title: 'Components/Overlay/Hover',
	component: Hover,
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
		trigger: () => (
			<span className="cursor-pointer text-blue-500 hover:underline">Hover over me!</span>
		),
		children: (
			<div className="w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg">
				<h3 className="mb-2 font-bold">Hover Card Content</h3>
				<p className="text-sm text-gray-600">
					This content appears when you hover over the trigger. It hides when you move your mouse
					away.
				</p>
			</div>
		)
	}
};

export const Controlled: Story = {
	args: {
		onOpenChange: mockedOnOpenChange,
		trigger: () => (
			<span className="cursor-pointer text-blue-500 hover:underline">Controlled Hover</span>
		),
		children: (
			<div className="w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg">
				<p className="text-sm text-gray-600">This content appears when state allows it.</p>
			</div>
		)
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
				<Hover {...args} open={open} onOpenChange={handleOpenChange} />
			</div>
		);
	},
	play: async ({ canvas, step }) => {
		const trigger = canvas.getByText('Controlled Hover');

		await step('Hover trigger to open hover card', async () => {
			await userEvent.hover(trigger);

			await waitFor(() => {
				expect(canvas.getByText('External state: Open')).toBeInTheDocument();
				expect(mockedOnOpenChange).toHaveBeenCalledWith(true);
			});
		});

		await step('Unhover trigger to close', async () => {
			await userEvent.unhover(trigger);

			await waitFor(() => {
				expect(canvas.getByText('External state: Closed')).toBeInTheDocument();
				expect(mockedOnOpenChange).toHaveBeenCalledWith(false);
			});
		});
	}
};

export const Delays: Story = {
	render: () => (
		<div className="flex gap-8">
			<Hover
				openDelay={1000}
				closeDelay={1000}
				trigger={() => (
					<span className="cursor-pointer text-blue-500 hover:underline">1000ms Delays</span>
				)}
			>
				<div className="w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg">
					<h3 className="font-bold">Took a while!</h3>
				</div>
			</Hover>

			<Hover
				openDelay={0}
				closeDelay={0}
				trigger={() => (
					<span className="cursor-pointer text-blue-500 hover:underline">0ms Delays</span>
				)}
			>
				<div className="w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg">
					<h3 className="font-bold">Instant!</h3>
				</div>
			</Hover>
		</div>
	)
};

export const CustomPositioning: Story = {
	args: {
		positioning: { placement: 'right-start' },
		trigger: () => (
			<span className="cursor-pointer text-blue-500 hover:underline">Right Start Placement</span>
		),
		children: (
			<div className="rounded-md border border-gray-200 bg-white p-4 shadow-lg">
				I am placed to the right!
			</div>
		)
	}
};
