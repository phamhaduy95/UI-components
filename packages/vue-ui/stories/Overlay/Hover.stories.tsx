import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import { ref } from 'vue';

import { Button } from '@components/Button';
import { Hover } from '@components/Hover';

const mockedOnOpenChange = fn();

const meta = {
	title: 'Components/Overlay/Hover',
	component: Hover,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		'onUpdate:open': { action: 'update:open' }
	},
	args: {
		openDelay: 1,
		closeDelay: 1
	},
	beforeEach() {
		mockedOnOpenChange.mockClear();
	}
} satisfies Meta<typeof Hover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { Hover, Button },
		setup() {
			return { args };
		},
		template: `
			<Hover v-bind="args">
				<template #trigger>
					<span class="cursor-pointer text-primary hover:underline">Hover over me!</span>
				</template>
				<template #default>
					<div class="rounded-md border border-gray-200 bg-white p-4 shadow-lg w-64">
						<h3 class="mb-2 font-bold">Hover Card Content</h3>
						<p class="text-sm text-gray-600">
							This content appears when you hover over the trigger. It hides when you move your mouse away.
						</p>
					</div>
				</template>
			</Hover>
		`
	})
};

export const Controlled: Story = {
	render: (args) => ({
		components: { Hover, Button },
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
				<p class="text-sm text-gray-500">External state: {{ open ? 'Open' : 'Closed' }}</p>
				<Hover v-bind="args" :open="open" @update:open="handleOpenChange">
					<template #trigger>
						<span class="cursor-pointer text-primary  hover:underline">Controlled Hover</span>
					</template>
					<template #default>
						<div class="rounded-md border border-gray-200 bg-white p-4 shadow-lg w-64">
							<p class="text-sm text-gray-600">
								This content appears when state allows it.
							</p>
						</div>
					</template>
				</Hover>
				
			</div>
		`
	}),
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
	render: (args) => ({
		components: { Hover },
		setup() {
			return { args };
		},
		template: `
			<div class="flex gap-8">
				<Hover :open-delay="1000" :close-delay="1000">
					<template #trigger>
						<span class="cursor-pointer text-primary  hover:underline">1000ms Delays</span>
					</template>
					<template #default>
						<div class="rounded-md border border-gray-200 bg-white p-4 shadow-lg w-64">
							<h3 class="font-bold">Took a while!</h3>
						</div>
					</template>
				</Hover>
				
				<Hover :open-delay="0" :close-delay="0">
					<template #trigger>
						<span class="cursor-pointer text-primary  hover:underline">0ms Delays</span>
					</template>
					<template #default>
						<div class="rounded-md border border-gray-200 bg-white p-4 shadow-lg w-64">
							<h3 class="font-bold">Instant!</h3>
						</div>
					</template>
				</Hover>
			</div>
		`
	})
};

export const CustomPositioning: Story = {
	render: (args) => ({
		components: { Hover, Button },
		setup() {
			return { args };
		},
		template: `
			<Hover v-bind="args" :positioning="{ placement: 'right-start' }">
				<template #trigger>
					<span class="cursor-pointer text-blue-500 hover:underline">Right Start Placement</span>
				</template>
				<template #default>
					<div class="rounded-md border border-gray-200 bg-white p-4 shadow-lg">
						I am placed to the right!
					</div>
				</template>
			</Hover>
		`
	})
};
