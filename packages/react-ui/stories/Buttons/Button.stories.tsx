import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@components/Button';
import { PlusIcon, RocketIcon } from '@radix-ui/react-icons';

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
			options: ['small', 'medium', 'large']
		},
		onClick: { action: 'clicked' },
		disabled: { control: 'boolean' }
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
					<Button size="small">Small</Button>
					<Button size="medium">Medium</Button>
					<Button size="large">Large</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button size="small" variant="outlined">
						Small
					</Button>
					<Button size="medium" variant="outlined">
						Medium
					</Button>
					<Button size="large" variant="outlined">
						Large
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button size="small" variant="text">
						Small
					</Button>
					<Button size="medium" variant="text">
						Medium
					</Button>
					<Button size="large" variant="text">
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
					<Button color="primary">Primary</Button>
					<Button color="secondary">Secondary</Button>
					<Button color="success">Success</Button>
					<Button color="warning">Warning</Button>
					<Button color="error">Error</Button>
				</div>
				<div className="flex items-center gap-2">
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
