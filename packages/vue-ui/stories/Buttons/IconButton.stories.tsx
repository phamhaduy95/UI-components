import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IconButton } from '@components/IconButton';
import { expect } from 'storybook/test';
import { PlusIcon, TrashIcon, BellIcon } from '@heroicons/vue/24/outline';

const meta = {
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
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { IconButton, PlusIcon },
		setup() {
			return { args };
		},
		template: '<IconButton v-bind="args"><PlusIcon /></IconButton>'
	}),
	play: async ({ canvas, step }) => {
		const button = canvas.getByRole('button', { name: 'Icon Button' });

		await step('Check if button exists', async () => {
			expect(button).toBeInTheDocument();
		});
	}
};

export const Variant: Story = {
	render: () => ({
		components: { IconButton, PlusIcon },
		setup() {
			return () => (
				<div style="display: flex; gap: 8px;">
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
	}),
	play: async ({ canvas, step }) => {
		await step('Check variants', async () => {
			expect(canvas.getByLabelText('contained')).toBeInTheDocument();
			expect(canvas.getByLabelText('outlined')).toBeInTheDocument();
			expect(canvas.getByLabelText('text')).toBeInTheDocument();
		});
	}
};

export const Size: Story = {
	render: () => ({
		components: { IconButton, PlusIcon, BellIcon },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 20px;">
					<div style="display: flex; align-items: center; gap: 8px;">
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
					<div style="display: flex; align-items: center; gap: 8px;">
						<IconButton size="xs" variant="outlined" aria-label="extra small outlined">
							<BellIcon />
						</IconButton>
						<IconButton size="sm" variant="outlined" aria-label="small outlined">
							<BellIcon />
						</IconButton>
						<IconButton size="md" variant="outlined" aria-label="medium outlined">
							<BellIcon />
						</IconButton>
						<IconButton size="lg" variant="outlined" aria-label="large outlined">
							<BellIcon />
						</IconButton>
					</div>
					<div style="display: flex; align-items: center; gap: 8px;">
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
	})
};

export const Shape: Story = {
	render: () => ({
		components: { IconButton, PlusIcon },
		setup() {
			return () => (
				<div style="display: flex; gap: 20px;">
					<IconButton shape="circle" aria-label="circle">
						<PlusIcon />
					</IconButton>
					<IconButton shape="square" aria-label="square">
						<PlusIcon />
					</IconButton>
				</div>
			);
		}
	})
};

export const ColorPalette: Story = {
	render: () => ({
		components: { IconButton, PlusIcon, BellIcon, TrashIcon },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 20px;">
					<div style="display: flex; align-items: center; gap: 8px;">
						<IconButton color="default" aria-label="default">
							<PlusIcon />
						</IconButton>
						<IconButton color="primary" aria-label="primary">
							<PlusIcon />
						</IconButton>
						<IconButton color="secondary" aria-label="secondary">
							<BellIcon />
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
					<div style="display: flex; align-items: center; gap: 8px;">
						<IconButton color="default" variant="outlined" aria-label="default outlined">
							<PlusIcon />
						</IconButton>
						<IconButton color="primary" variant="outlined" aria-label="primary outlined">
							<PlusIcon />
						</IconButton>
						<IconButton color="secondary" variant="outlined" aria-label="secondary outlined">
							<BellIcon />
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
					<div style="display: flex; align-items: center; gap: 8px;">
						<IconButton color="default" variant="text" aria-label="default text">
							<PlusIcon />
						</IconButton>
						<IconButton color="primary" variant="text" aria-label="primary text">
							<PlusIcon />
						</IconButton>
						<IconButton color="secondary" variant="text" aria-label="secondary text">
							<BellIcon />
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
	})
};

export const Disabled: Story = {
	render: () => ({
		components: { IconButton, PlusIcon, BellIcon },
		setup() {
			return () => (
				<div style="display: flex; gap: 8px;">
					<IconButton disabled variant="contained" aria-label="disabled contained">
						<PlusIcon />
					</IconButton>
					<IconButton disabled variant="outlined" aria-label="disabled outlined">
						<BellIcon />
					</IconButton>
					<IconButton disabled variant="text" aria-label="disabled text">
						<BellIcon />
					</IconButton>
				</div>
			);
		}
	}),
	play: async ({ canvas, step }) => {
		await step('Check disabled buttons', async () => {
			const containedButton = canvas.getByLabelText('disabled contained');
			expect(containedButton).toBeDisabled();
		});
	}
};
