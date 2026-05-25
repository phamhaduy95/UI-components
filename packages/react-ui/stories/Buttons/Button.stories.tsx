import { PlusIcon, RocketIcon } from '@radix-ui/react-icons';

import { Button } from '@components/Button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
	title: 'Components/Buttons/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['contained', 'outlined', 'text']
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg']
		},
		color: {
			control: 'select',
			options: ['default', 'primary', 'secondary', 'success', 'warning', 'error']
		},
		onClick: { action: 'clicked' },
		disabled: { control: 'boolean' }
	},
	args: {
		variant: 'contained',
		size: 'md',
		color: 'primary',
		disabled: false
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Variant: Story = {
	render: () => {
		return (
			<div className="flex gap-2">
				<Button variant="contained">Contained</Button>
				<Button variant="outlined">Outlined</Button>
				<Button variant="text">Text</Button>
			</div>
		);
	}
};

export const Size: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-5">
				<div className="flex items-center gap-2">
					<Button size="xs">Extra Small</Button>
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button size="xs" variant="outlined">
						Extra Small
					</Button>
					<Button size="sm" variant="outlined">
						Small
					</Button>
					<Button size="md" variant="outlined">
						Medium
					</Button>
					<Button size="lg" variant="outlined">
						Large
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button size="xs" variant="text">
						Extra Small
					</Button>
					<Button size="sm" variant="text">
						Small
					</Button>
					<Button size="md" variant="text">
						Medium
					</Button>
					<Button size="lg" variant="text">
						Large
					</Button>
				</div>
			</div>
		);
	}
};

export const Disabled: Story = {
	args: {
		variant: 'contained',
		children: 'Disabled Button',
		disabled: true
	},
	render: (args) => {
		return (
			<div className="flex gap-2">
				<Button {...args} variant="contained">
					Contained
				</Button>
				<Button {...args} variant="outlined">
					Outlined
				</Button>
				<Button {...args} variant="text">
					Text
				</Button>
			</div>
		);
	}
};

/**
 * Button with an icon before the text.
 */
export const WithIconStart: Story = {
	args: {
		variant: 'contained',
		children: (
			<div className="flex items-center gap-2">
				<PlusIcon />
				<span>Add item</span>
			</div>
		)
	}
};

/**
 * Button with an icon after the text.
 */
export const WithIconEnd: Story = {
	args: {
		variant: 'outlined',
		children: (
			<div className="flex items-center gap-2">
				<span>Launch</span>
				<RocketIcon />
			</div>
		)
	}
};

export const Color: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-5">
				<div className="flex items-center gap-2">
					<Button color="default">Default</Button>
					<Button color="primary">Primary</Button>
					<Button color="secondary">Secondary</Button>
					<Button color="success">Success</Button>
					<Button color="warning">Warning</Button>
					<Button color="error">Error</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button color="default" variant="outlined">
						Default
					</Button>
					<Button color="primary" variant="outlined">
						Primary
					</Button>
					<Button color="secondary" variant="outlined">
						Secondary
					</Button>
					<Button color="success" variant="outlined">
						Success
					</Button>
					<Button color="warning" variant="outlined">
						Warning
					</Button>
					<Button color="error" variant="outlined">
						Error
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button color="default" variant="text">
						Default
					</Button>
					<Button color="primary" variant="text">
						Primary
					</Button>
					<Button color="secondary" variant="text">
						Secondary
					</Button>
					<Button color="success" variant="text">
						Success
					</Button>
					<Button color="warning" variant="text">
						Warning
					</Button>
					<Button color="error" variant="text">
						Error
					</Button>
				</div>
			</div>
		);
	}
};
