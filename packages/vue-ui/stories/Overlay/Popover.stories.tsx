import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ref, computed } from 'vue';

import { Button } from '@components/Button';
import { Popover } from '@components/Popover';

const mockedOnOpenChange = fn();

const meta = {
	title: 'Components/Overlay/Popover',
	component: Popover,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		'onUpdate:open': { action: 'update:open' }
	},
	beforeEach() {
		mockedOnOpenChange.mockClear();
	}
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { Popover, Button },
		setup() {
			return { args };
		},
		template: `
			<Popover v-bind="args">
				<template #trigger>
					<Button>Click me</Button>
				</template>
				<template #default>
					<div class="rounded-md border border-gray-200 bg-white p-4 shadow-lg">
						<h3 class="mb-2 font-bold">Popover Title</h3>
						<p class="text-sm text-gray-600">
							This is a popover content. You can put anything here.
						</p>
					</div>
				</template>
			</Popover>
		`
	}),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /click me/i });

		await step('Initial state: popover is closed', async () => {
			expect(button).toBeInTheDocument();
			expect(button).toHaveAttribute('aria-expanded', 'false');
		});

		await step('Click trigger to open popover', async () => {
			await userEvent.click(button);
			expect(button).toHaveAttribute('aria-expanded', 'true');
		});

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
		defaultOpen: true
	},
	render: Default.render
};

export const Controlled: Story = {
	render: (args) => ({
		components: { Popover, Button },
		setup() {
			const open = ref(false);
			const handleOpenChange = (nextOpen: boolean) => {
				open.value = nextOpen;
				mockedOnOpenChange(nextOpen);
			};
			return { args, open, handleOpenChange };
		},
		template: `
			<div class="flex flex-col items-center gap-4">
				<Popover v-bind="args" :open="open" @update:open="handleOpenChange">
					<template #trigger="{ open: isOpen, setOpen }">
						<Button @click="setOpen(!isOpen)">
							{{ isOpen ? 'Close' : 'Open' }}
						</Button>
					</template>
					<template #default="{ setOpen }">
						<div class="rounded-md border border-gray-200 bg-white p-4 shadow-lg">
							<p class="mb-4">Click button below to close</p>
							<Button size="sm" @click="setOpen(false)">
								Close Popover
							</Button>
						</div>
					</template>
				</Popover>
				<p class="text-sm text-gray-500">External state: {{ open ? 'Open' : 'Closed' }}</p>
			</div>
		`
	}),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
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
		positioning: {
			placement: 'right-start'
		}
	},
	render: (args) => ({
		components: { Popover, Button },
		setup() {
			return { args };
		},
		template: `
			<Popover v-bind="args">
				<template #trigger>
					<Button>Right Start</Button>
				</template>
				<template #default>
					<div class="rounded-md border border-gray-200 bg-white p-4 shadow-lg">
						I am placed to the right!
					</div>
				</template>
			</Popover>
		`
	})
};

export const AnchorElement: Story = {
	render: (args) => ({
		components: { Popover, Button },
		setup() {
			const anchorRef = ref<HTMLElement | null>(null);
			const positioningProps = computed(() => ({
				getAnchorElement: () => anchorRef.value,
				placement: 'top' as const
			}));
			return { args, anchorRef, positioningProps };
		},
		template: `
			<div class="flex flex-col items-center gap-10">
				<div
					ref="anchorRef"
					class="flex h-20 w-40 items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-blue-50 text-blue-600"
				>
					I am the Anchor
				</div>
				<Popover v-bind="args" :positioning="positioningProps">
					<template #trigger>
						<Button>Click me (Anchored to box above)</Button>
					</template>
					<template #default>
						<div class="rounded-md border border-gray-200 bg-white p-4 shadow-lg">
							I am anchored to the dashed box!
						</div>
					</template>
				</Popover>
			</div>
		`
	})
};

export const AnchorRect: Story = {
	render: (args) => ({
		components: { Popover },
		setup() {
			const rect = ref<DOMRect | null>(null);
			const open = ref(false);

			const handleContextMenu = (e: MouseEvent) => {
				e.preventDefault();
				rect.value = new DOMRect(e.clientX, e.clientY, 0, 0);
				open.value = true;
			};

			const positioningProps = computed(() => ({
				getAnchorRect: () => rect.value,
				placement: 'bottom-start' as const,
				offset: { mainAxis: 10 }
			}));

			return { args, rect, open, handleContextMenu, positioningProps };
		},
		template: `
			<div
				@contextmenu="handleContextMenu"
				class="flex h-64 w-[500px] cursor-crosshair items-center justify-center rounded-xl bg-gray-100 text-gray-400"
			>
				Right click anywhere in this area
				<Popover
					v-bind="args"
					v-model:open="open"
					:positioning="positioningProps"
				>
					<template #default>
						<div class="rounded-md border border-gray-200 bg-white p-2 shadow-lg">
							Context Menu at {{ rect?.x.toFixed(0) }}, {{ rect?.y.toFixed(0) }}
						</div>
					</template>
				</Popover>
			</div>
		`
	})
};

export const SameWidth: Story = {
	render: (args) => ({
		components: { Popover, Button },
		setup() {
			const positioningProps = {
				sameWidth: true,
				placement: 'bottom' as const
			};
			return { args, positioningProps };
		},
		template: `
			<Popover v-bind="args" :positioning="positioningProps">
				<template #trigger>
					<Button class="w-80">Wide Trigger Button</Button>
				</template>
				<template #default>
					<div class="rounded-md border border-gray-200 bg-white p-2 shadow-lg">
						I am exactly as wide as the trigger button.
					</div>
				</template>
			</Popover>
		`
	})
};
