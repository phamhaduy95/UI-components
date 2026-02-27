import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { IconButton } from '@components/IconButton';
import { expect, within } from 'storybook/test';
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
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Icon Button' });

		await step('Check if button exists', async () => {
			expect(button).toBeInTheDocument();
		});

		await step('Check if button is not disabled', async () => {
			expect(button).not.toBeDisabled();
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
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

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
					<div style="display: flex; align-items: center; gap: 8px;">
						<IconButton size="small" variant="outlined" aria-label="small outlined">
							<BellIcon />
						</IconButton>
						<IconButton size="medium" variant="outlined" aria-label="medium outlined">
							<BellIcon />
						</IconButton>
						<IconButton size="large" variant="outlined" aria-label="large outlined">
							<BellIcon />
						</IconButton>
					</div>
					<div style="display: flex; align-items: center; gap: 8px;">
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
	})
};

export const ColorPalette: Story = {
	render: () => ({
		components: { IconButton, PlusIcon, BellIcon, TrashIcon },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 20px;">
					<div style="display: flex; align-items: center; gap: 8px;">
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
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Check disabled buttons', async () => {
			const containedButton = canvas.getByLabelText('disabled contained');
			expect(containedButton).toBeDisabled();

			const outlinedButton = canvas.getByLabelText('disabled outlined');
			expect(outlinedButton).toBeDisabled();

			const textButton = canvas.getByLabelText('disabled text');
			expect(textButton).toBeDisabled();
		});
	}
};
