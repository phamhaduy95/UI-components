import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, within, userEvent, screen, waitFor } from 'storybook/test';
import { DropdownMenu } from '@components/DropdownMenu';
import { Button } from '@components/Button';

const items = [
	{ label: 'New Tab', value: 'new-tab' },
	{ label: 'New Window', value: 'new-window' },
	{ label: 'New Private Window', value: 'new-private-window', disabled: true },
	{ label: 'Downloads', value: 'downloads' }
];

const nestedItems = [
	{ label: 'New Tab', value: 'new-tab' },
	{ label: 'New Window', value: 'new-window' },
	{
		label: 'Favorites',
		value: 'favorites',
		type: 'nested' as const,
		items: [
			{ label: 'GitHub', value: 'github' },
			{ label: 'Google', value: 'google' },
			{ label: 'Stack Overflow', value: 'stackoverflow' }
		]
	},
	{ label: 'Downloads', value: 'downloads' }
];

const meta = {
	title: 'Components/Overlay/DropdownMenu',
	component: DropdownMenu,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	args: {
		items: items
	}
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { DropdownMenu, Button },
		setup() {
			return { args };
		},
		template: `
			<DropdownMenu v-bind="args">
				<Button>Open Menu</Button>
			</DropdownMenu>
		`
	}),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step('Open the menu', async () => {
			const trigger = canvas.getByRole('button', { name: /open menu/i });
			await userEvent.click(trigger);
		});

		await step('Verify items are displayed', async () => {
			const menu = screen.getByRole('menu');
			expect(menu).toBeInTheDocument();
			items.forEach((item) => {
				const menuItem = within(menu).getByRole('menuitem', { name: item.label });
				expect(menuItem).toBeInTheDocument();
			});
		});
	}
};

export const Nested: Story = {
	args: {
		items: nestedItems
	},
	render: (args) => ({
		components: { DropdownMenu, Button },
		setup() {
			return { args };
		},
		template: `
			<DropdownMenu v-bind="args">
				<Button>Open Nested Menu</Button>
			</DropdownMenu>
		`
	}),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step('Open the menu', async () => {
			const trigger = canvas.getByRole('button', { name: 'Open Nested Menu' });
			await userEvent.click(trigger);
		});

		const menu = screen.getByRole('menu');
		await step('Open the nested menu', async () => {
			const favoritesItem = within(menu).getByRole('menuitem', { name: 'Favorites' });
			await userEvent.hover(favoritesItem);
		});

		await step('Verify nested items are displayed', async () => {
			const favoritesItem = within(menu).getByRole('menuitem', { name: 'Favorites' });
			const menuId = favoritesItem.getAttribute('aria-controls');

			await waitFor(() => {
				const nestedMenu = document.body.querySelector(`[id="${menuId}"]`) as HTMLElement;
				expect(nestedMenu).toBeInTheDocument();

				const nestedItem = nestedItems.find((item) => item.type === 'nested');

				nestedItem?.items.forEach((item) => {
					const menuItem = within(nestedMenu).getByRole('menuitem', { name: item.label });
					expect(menuItem).toBeInTheDocument();
				});
			});
		});
	}
};

export const CustomItem: Story = {
	render: (args) => ({
		components: { DropdownMenu, Button },
		setup() {
			return { args };
		},
		template: `
			<DropdownMenu v-bind="args">
				<Button>Menu with Custom Items</Button>
				<template #item="{ item }">
					<div class="flex flex-1 justify-between gap-4">
						<span class="font-semibold text-blue-500">{{ item.label }}</span>
						<span class="text-xs text-gray-400 capitalize">{{ item.value }}</span>
					</div>
				</template>
			</DropdownMenu>
		`
	})
};

export const WithDisabledItems: Story = {
	args: {
		items: [
			{ label: 'Edit', value: 'edit' },
			{ label: 'Copy', value: 'copy' },
			{ label: 'Paste', value: 'paste', disabled: true },
			{ label: 'Delete', value: 'delete' }
		]
	},
	render: (args) => ({
		components: { DropdownMenu, Button },
		setup() {
			return { args };
		},
		template: `
			<DropdownMenu v-bind="args">
				<Button>Menu with Disabled Items</Button>
			</DropdownMenu>
		`
	})
};
