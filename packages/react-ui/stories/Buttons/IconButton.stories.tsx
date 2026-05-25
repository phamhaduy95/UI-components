import { BellIcon, PlusIcon, ReloadIcon, RocketIcon, TrashIcon } from '@radix-ui/react-icons';

import { IconButton } from '@components/IconButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof IconButton> = {
	title: 'Components/Buttons/IconButton',
	component: IconButton,
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
		shape: {
			control: 'select',
			options: ['circle', 'square']
		},
		disabled: { control: 'boolean' }
	},
	args: {
		'aria-label': 'Icon Button',
		variant: 'contained',
		size: 'md',
		color: 'primary',
		shape: 'circle',
		disabled: false
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<IconButton {...args}>
			<PlusIcon />
		</IconButton>
	)
};

export const Variant: Story = {
	render: () => {
		return (
			<div className="flex gap-2">
				<IconButton variant="contained" aria-label="contained">
					<PlusIcon />
				</IconButton>
				<IconButton variant="outlined" aria-label="outlined">
					<TrashIcon />
				</IconButton>
				<IconButton variant="text" aria-label="text">
					<BellIcon />
				</IconButton>
			</div>
		);
	}
};

export const Size: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-5">
				<div className="flex items-center gap-2">
					<IconButton size="xs" aria-label="extra small">
						<PlusIcon />
					</IconButton>
					<IconButton size="sm" aria-label="small">
						<PlusIcon />
					</IconButton>
					<IconButton size="md" aria-label="medium">
						<PlusIcon />
					</IconButton>
					<IconButton size="lg" aria-label="large">
						<PlusIcon />
					</IconButton>
				</div>
				<div className="flex items-center gap-2">
					<IconButton size="xs" variant="outlined" aria-label="extra small outlined">
						<RocketIcon />
					</IconButton>
					<IconButton size="sm" variant="outlined" aria-label="small outlined">
						<RocketIcon />
					</IconButton>
					<IconButton size="md" variant="outlined" aria-label="medium outlined">
						<RocketIcon />
					</IconButton>
					<IconButton size="lg" variant="outlined" aria-label="large outlined">
						<RocketIcon />
					</IconButton>
				</div>
				<div className="flex items-center gap-2">
					<IconButton size="xs" variant="text" aria-label="extra small text">
						<BellIcon />
					</IconButton>
					<IconButton size="sm" variant="text" aria-label="small text">
						<BellIcon />
					</IconButton>
					<IconButton size="md" variant="text" aria-label="medium text">
						<BellIcon />
					</IconButton>
					<IconButton size="lg" variant="text" aria-label="large text">
						<BellIcon />
					</IconButton>
				</div>
			</div>
		);
	}
};

export const Shape: Story = {
	render: () => {
		return (
			<div className="flex gap-5">
				<IconButton shape="circle" aria-label="circle">
					<PlusIcon />
				</IconButton>
				<IconButton shape="square" aria-label="square">
					<PlusIcon />
				</IconButton>
			</div>
		);
	}
};

export const ColorPalette: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-5">
				<div className="flex items-center gap-2">
					<IconButton color="default" aria-label="default">
						<PlusIcon />
					</IconButton>
					<IconButton color="primary" aria-label="primary">
						<PlusIcon />
					</IconButton>
					<IconButton color="secondary" aria-label="secondary">
						<ReloadIcon />
					</IconButton>
					<IconButton color="success" aria-label="success">
						<PlusIcon />
					</IconButton>
					<IconButton color="warning" aria-label="warning">
						<BellIcon />
					</IconButton>
					<IconButton color="error" aria-label="error">
						<TrashIcon />
					</IconButton>
				</div>
				<div className="flex items-center gap-2">
					<IconButton color="default" variant="outlined" aria-label="default outlined">
						<PlusIcon />
					</IconButton>
					<IconButton color="primary" variant="outlined" aria-label="primary outlined">
						<PlusIcon />
					</IconButton>
					<IconButton color="secondary" variant="outlined" aria-label="secondary outlined">
						<ReloadIcon />
					</IconButton>
					<IconButton color="success" variant="outlined" aria-label="success outlined">
						<PlusIcon />
					</IconButton>
					<IconButton color="warning" variant="outlined" aria-label="warning outlined">
						<BellIcon />
					</IconButton>
					<IconButton color="error" variant="outlined" aria-label="error outlined">
						<TrashIcon />
					</IconButton>
				</div>
				<div className="flex items-center gap-2">
					<IconButton color="default" variant="text" aria-label="default text">
						<PlusIcon />
					</IconButton>
					<IconButton color="primary" variant="text" aria-label="primary text">
						<PlusIcon />
					</IconButton>
					<IconButton color="secondary" variant="text" aria-label="secondary text">
						<ReloadIcon />
					</IconButton>
					<IconButton color="success" variant="text" aria-label="success text">
						<PlusIcon />
					</IconButton>
					<IconButton color="warning" variant="text" aria-label="warning text">
						<BellIcon />
					</IconButton>
					<IconButton color="error" variant="text" aria-label="error text">
						<TrashIcon />
					</IconButton>
				</div>
			</div>
		);
	}
};

export const Disabled: Story = {
	render: () => {
		return (
			<div className="flex gap-2">
				<IconButton disabled variant="contained" aria-label="disabled contained">
					<PlusIcon />
				</IconButton>
				<IconButton disabled variant="outlined" aria-label="disabled outlined">
					<RocketIcon />
				</IconButton>
				<IconButton disabled variant="text" aria-label="disabled text">
					<BellIcon />
				</IconButton>
			</div>
		);
	}
};
