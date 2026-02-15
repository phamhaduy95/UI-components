import type { Meta, StoryObj } from '@storybook/react-vite';
import IconButton from '@components/IconButton';
import { PlusIcon, TrashIcon, RocketIcon, ReloadIcon, BellIcon } from '@radix-ui/react-icons';

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
			options: ['small', 'medium', 'large']
		},
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'error']
		},
		disabled: { control: 'boolean' }
	},
	args: {
		'aria-label': 'Icon Button'
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
					<IconButton size="small" aria-label="small">
						<PlusIcon />
					</IconButton>
					<IconButton size="medium" aria-label="medium">
						<PlusIcon />
					</IconButton>
					<IconButton size="large" aria-label="large">
						<PlusIcon />
					</IconButton>
				</div>
				<div className="flex items-center gap-2">
					<IconButton size="small" variant="outlined" aria-label="small outlined">
						<RocketIcon />
					</IconButton>
					<IconButton size="medium" variant="outlined" aria-label="medium outlined">
						<RocketIcon />
					</IconButton>
					<IconButton size="large" variant="outlined" aria-label="large outlined">
						<RocketIcon />
					</IconButton>
				</div>
				<div className="flex items-center gap-2">
					<IconButton size="small" variant="text" aria-label="small text">
						<BellIcon />
					</IconButton>
					<IconButton size="medium" variant="text" aria-label="medium text">
						<BellIcon />
					</IconButton>
					<IconButton size="large" variant="text" aria-label="large text">
						<BellIcon />
					</IconButton>
				</div>
			</div>
		);
	}
};

export const ColorPalette: Story = {
	render: () => {
		return (
			<div className="flex flex-col gap-5">
				<div className="flex items-center gap-2">
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
