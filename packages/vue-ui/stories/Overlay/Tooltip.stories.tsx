import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { ref } from 'vue';

import { Button } from '@components/Button';
import { Tooltip } from '@components/Tooltip';

const mockedOnOpenChange = fn();

const meta = {
	title: 'Components/Overlay/Tooltip',
	component: Tooltip,
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
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { Tooltip, Button },
		setup() {
			return { args };
		},
		template: `
			<Tooltip v-bind="args">
				<template #trigger>
					<Button>Hover me</Button>
				</template>
				<template #default>
					I am a tooltip!
				</template>
			</Tooltip>
		`
	}),
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
	render: (args) => ({
		components: { Tooltip, Button },
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
				<Tooltip v-bind="args" :open="open" @update:open="handleOpenChange">
					<template #trigger>
						<Button>Controlled Tooltip</Button>
					</template>
					<template #default>
						Controlled content
					</template>
				</Tooltip>
			</div>
		`
	}),
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
	render: (args) => ({
		components: { Tooltip, Button },
		setup() {
			return { args };
		},
		template: `
			<Tooltip v-bind="args" :positioning="{ placement: 'right-start' }">
				<template #trigger>
					<Button>Right Start Placement</Button>
				</template>
				<template #default>
					Placed to the right!
				</template>
			</Tooltip>
		`
	})
};

export const WithArrow: Story = {
	args: {
		arrow: true
	},
	render: (args) => ({
		components: { Tooltip, Button },
		setup() {
			return { args };
		},
		template: `
			<Tooltip v-bind="args" :has-arrow="true">
				<template #trigger>
					<Button>With Arrow</Button>
				</template>
				<template #default>
					I have an arrow!
				</template>
			</Tooltip>
		`
	})
};
