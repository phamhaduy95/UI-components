import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from '@components/Popover';
import { Button } from '@components/Button';
import { useRef, useState } from 'react';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnOpenChange = fn();

const meta: Meta<typeof Popover> = {
	title: 'Components/Overlay/Popover',
	component: Popover,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		onOpenChange: { action: 'onOpenChange' }
	},
	beforeEach() {
		mockedOnOpenChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		Trigger: () => <Button>Click me</Button>,
		children: () => (
			<div className="rounded-md border border-gray-200 bg-white p-4 shadow-lg">
				<h3 className="mb-2 font-bold">Popover Title</h3>
				<p className="text-sm text-gray-600">
					This is a popover content. You can put anything here.
				</p>
			</div>
		)
	},
	play: async ({ canvas, step }) => {
		const button = canvas.getByRole('button', { name: /click me/i });

		await step('Initial state: popover is closed', async () => {
			expect(button).toBeInTheDocument();
			// Since it's in a portal, we might need to look outside the canvas or check aria attributes
			expect(button).toHaveAttribute('aria-expanded', 'false');
		});

		await step('Click trigger to open popover', async () => {
			await userEvent.click(button);
			expect(button).toHaveAttribute('aria-expanded', 'true');
		});

		// Portaled content verification
		await step('Verify popover content is visible', async () => {
			const body = within(document.body);
			expect(body.getByText(/popover title/i)).toBeVisible();
		});

		await step('Click trigger again to close popover', async () => {
			await userEvent.click(button);
			expect(button).toHaveAttribute('aria-expanded', 'false');
		});
	}
};

export const DefaultOpen: Story = {
	args: {
		...Default.args,
		defaultOpen: true
	}
};

export const Controlled: Story = {
	args: {
		onOpenChange: mockedOnOpenChange,
		Trigger: ({ setOpen, open }) => (
			<Button onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'}</Button>
		),
		children: ({ setOpen }) => (
			<div className="rounded-md border border-gray-200 bg-white p-4 shadow-lg">
				<p className="mb-4">Click button below to close</p>
				<Button size="small" onClick={() => setOpen(false)}>
					Close Popover
				</Button>
			</div>
		)
	},
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<div className="flex flex-col items-center gap-4">
				<Popover
					{...args}
					open={open}
					onOpenChange={(nextOpen) => {
						setOpen(nextOpen);
						args.onOpenChange?.(nextOpen);
					}}
				/>
				<p className="text-sm text-gray-500">External state: {open ? 'Open' : 'Closed'}</p>
			</div>
		);
	},
	play: async ({ canvas, step }) => {
		const trigger = canvas.getByRole('button', { name: /open/i });

		await step('Open popover via trigger', async () => {
			await userEvent.click(trigger);
			expect(canvas.getByText(/external state: open/i)).toBeInTheDocument();
			expect(mockedOnOpenChange).toHaveBeenCalledWith(true);
		});

		await step('Close popover via internal button', async () => {
			const body = within(document.body);
			const closeBtn = body.getByRole('button', { name: /close popover/i });
			await userEvent.click(closeBtn);
			expect(canvas.getByText(/external state: closed/i)).toBeInTheDocument();
			expect(mockedOnOpenChange).toHaveBeenCalledWith(false);
		});
	}
};

export const CustomPositioning: Story = {
	args: {
		...Default.args,
		positioning: {
			placement: 'right-start'
		},
		Trigger: () => <Button>Right Start</Button>
	}
};

/**
 * Demonstrates how to anchor the popover to a different element than the trigger.
 */
export const AnchorElement: Story = {
	render: (args) => {
		const anchorRef = useRef<HTMLDivElement>(null);
		return (
			<div className="flex flex-col items-center gap-10">
				<div
					ref={anchorRef}
					className="flex h-20 w-40 items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-blue-50 text-blue-600"
				>
					I am the Anchor
				</div>
				<Popover
					{...args}
					positioning={{
						getAnchorElement: () => anchorRef.current,
						placement: 'top'
					}}
					Trigger={() => <Button>Click me (Anchored to box above)</Button>}
				>
					{() => (
						<div className="rounded-md border border-gray-200 bg-white p-4 shadow-lg">
							I am anchored to the dashed box!
						</div>
					)}
				</Popover>
			</div>
		);
	}
};

/**
 * Demonstrates anchoring the popover to a virtual rectangle (e.g. following mouse clicks).
 */
export const AnchorRect: Story = {
	render: (args) => {
		const [rect, setRect] = useState<DOMRect | null>(null);
		const [open, setOpen] = useState(false);

		const handleContextMenu = (e: React.MouseEvent) => {
			e.preventDefault();
			// Create a virtual rect from the click coordinates
			setRect(new DOMRect(e.clientX, e.clientY, 0, 0));
			setOpen(true);
		};

		return (
			<div
				onContextMenu={handleContextMenu}
				className="flex h-64 w-[500px] cursor-crosshair items-center justify-center rounded-xl bg-gray-100 text-gray-400"
			>
				Right click anywhere in this area
				<Popover
					{...args}
					open={open}
					onOpenChange={setOpen}
					positioning={{
						getAnchorRect: () => rect,
						placement: 'bottom-start',
						offset: { mainAxis: 10 }
					}}
				>
					{() => (
						<div className="rounded-md border border-gray-200 bg-white p-2 shadow-lg">
							Context Menu at {rect?.x.toFixed(0)}, {rect?.y.toFixed(0)}
						</div>
					)}
				</Popover>
			</div>
		);
	}
};

/**
 * Demonstrates the `sameWidth` prop which makes the popover the same width as the trigger.
 */
export const SameWidth: Story = {
	args: {
		...Default.args,
		positioning: {
			sameWidth: true,
			placement: 'bottom'
		},
		Trigger: () => <Button className="w-80">Wide Trigger Button</Button>,
		children: () => (
			<div className="rounded-md border border-gray-200 bg-white p-2 shadow-lg">
				I am exactly as wide as the trigger button.
			</div>
		)
	}
};
