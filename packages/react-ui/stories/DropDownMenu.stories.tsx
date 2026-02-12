import type { Meta, StoryObj } from '@storybook/react-vite';
import DropDownMenu from '@components/DropDownMenu';
import Button from '@components/Button';
import { ItemObject } from '@components/type';

const items: ItemObject[] = [
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
		type: 'nested',
		items: [
			{ label: 'GitHub', value: 'github' },
			{ label: 'Google', value: 'google' },
			{ label: 'Stack Overflow', value: 'stackoverflow' }
		]
	},
	{ label: 'Downloads', value: 'downloads' }
];

const meta: Meta<typeof DropDownMenu> = {
	title: 'Components/DropDownMenu',
	component: DropDownMenu,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Basic DropDownMenu usage with a simple list of items.
 */
export const Default: Story = {
	args: {
		items: items,
		children: <Button>Open Menu</Button>
	}
};

/**
 * DropDownMenu with nested submenus.
 */
export const Nested: Story = {
	args: {
		items: nestedItems as any,
		children: <Button>Open Nested Menu</Button>
	}
};

/**
 * DropDownMenu using a custom trigger element.
 */
export const CustomTrigger: Story = {
	args: {
		items: items,
		CustomTrigger: <Button variant="contained">Custom Trigger</Button>
	}
};

/**
 * DropDownMenu with some items disabled.
 */
export const WithDisabledItems: Story = {
	args: {
		items: [
			{ label: 'Edit', value: 'edit' },
			{ label: 'Copy', value: 'copy' },
			{ label: 'Paste', value: 'paste', disabled: true },
			{ label: 'Delete', value: 'delete' }
		],
		children: <Button>Menu with Disabled Items</Button>
	}
};

/**
 * DropDownMenu with a custom item renderer.
 */
export const WithCustomItem: Story = {
	args: {
		items: items,
		children: <Button>Menu with Custom Items</Button>,
		CustomItem: (item) => (
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<span>{item.label}</span>
				<span style={{ opacity: 0.5, fontSize: '0.8em' }}>{item.value}</span>
			</div>
		)
	}
};
