import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Button } from '@components/Button';
import { expect } from 'storybook/test';

const meta = {
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
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset']
		},
		loading: { control: 'boolean' }
	},
	args: {
		variant: 'contained',
		size: 'md',
		color: 'primary',
		default: 'Button'
	}
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { Button },
		setup() {
			return { args };
		},
		template: '<Button v-bind="args">{{ args.default }}</Button>'
	}),
	play: async ({ canvas }) => {
		const button = canvas.getByRole('button', { name: 'Button' });
		expect(button).toBeInTheDocument();
	}
};

export const Variants: Story = {
	render: () => ({
		components: { Button },

		setup() {
			return () => (
				<div style="display: flex; gap: 8px;">
					<Button variant="contained">Contained</Button>
					<Button variant="outlined">Outlined</Button>
					<Button variant="text">Text</Button>
				</div>
			);
		}
	})
};

export const Sizes: Story = {
	render: () => ({
		components: { Button },
		template: `
			<div style="display: flex; flex-direction: column; gap: 20px;">
				<div style="display: flex; align-items: center; gap: 8px;">
					<Button size="xs">Extra Small</Button>
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<Button variant="outlined" size="xs">Extra Small</Button>
					<Button variant="outlined" size="sm">Small</Button>
					<Button variant="outlined" size="md">Medium</Button>
					<Button variant="outlined" size="lg">Large</Button>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<Button variant="text" size="xs">Extra Small</Button>
					<Button variant="text" size="sm">Small</Button>
					<Button variant="text" size="md">Medium</Button>
					<Button variant="text" size="lg">Large</Button>
				</div>
			</div>
		`
	})
};

export const Colors: Story = {
	render: () => ({
		components: { Button },
		template: `
			<div style="display: flex; flex-direction: column; gap: 20px;">
				<div style="display: flex; align-items: center; gap: 8px;">
					<Button color="default">Default</Button>
					<Button color="primary">Primary</Button>
					<Button color="secondary">Secondary</Button>
					<Button color="success">Success</Button>
					<Button color="warning">Warning</Button>
					<Button color="error">Error</Button>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<Button variant="outlined" color="default">Default</Button>
					<Button variant="outlined" color="primary">Primary</Button>
					<Button variant="outlined" color="secondary">Secondary</Button>
					<Button variant="outlined" color="success">Success</Button>
					<Button variant="outlined" color="warning">Warning</Button>
					<Button variant="outlined" color="error">Error</Button>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<Button variant="text" color="default">Default</Button>
					<Button variant="text" color="primary">Primary</Button>
					<Button variant="text" color="secondary">Secondary</Button>
					<Button variant="text" color="success">Success</Button>
					<Button variant="text" color="warning">Warning</Button>
					<Button variant="text" color="error">Error</Button>
				</div>
			</div>
		`
	})
};

export const Disabled: Story = {
	render: () => ({
		components: { Button },
		template: `
			<div style="display: flex; gap: 8px;">
				<Button disabled variant="contained">Contained</Button>
				<Button disabled variant="outlined">Outlined</Button>
				<Button disabled variant="text">Text</Button>
			</div>
		`
	})
};
