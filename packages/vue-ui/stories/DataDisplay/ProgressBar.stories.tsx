import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ProgressBar } from '@components/ProgressBar';
import { expect } from 'storybook/test';

const meta = {
	title: 'Components/DataDisplay/ProgressBar',
	component: ProgressBar,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'error']
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg']
		},
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical']
		},
		modelValue: {
			control: 'number'
		},
		defaultValue: {
			control: 'number'
		},
		min: {
			control: 'number'
		},
		max: {
			control: 'number'
		},
		label: {
			control: 'text'
		},
		showValueText: {
			control: 'boolean'
		}
	},
	args: {
		color: 'primary',
		size: 'md',
		orientation: 'horizontal',
		defaultValue: 40,
		min: 0,
		max: 100,
		label: 'Loading Progress',
		showValueText: true
	}
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { ProgressBar },
		setup() {
			return { args };
		},
		template: '<ProgressBar v-bind="args" style="width: 300px; height: 300px;" />'
	}),
	play: async ({ canvas, step }) => {
		const progressBar = canvas.getByRole('progressbar');

		await step('Check if progress bar is displayed', async () => {
			expect(progressBar).toBeInTheDocument();
		});
	}
};

export const Indeterminate: Story = {
	args: {
		modelValue: null,
		label: 'Indeterminate Progress'
	},
	render: (args) => ({
		components: { ProgressBar },
		setup() {
			return { args };
		},
		template: '<ProgressBar v-bind="args" style="width: 300px; height: 300px;" />'
	})
};

export const ColorVariants: Story = {
	render: () => ({
		components: { ProgressBar },
		setup() {
			return () => (
				<div class="flex flex-col gap-8 w-[300px]">
					<ProgressBar label="Primary" color="primary" defaultValue={20} />
					<ProgressBar label="Secondary" color="secondary" defaultValue={40} />
					<ProgressBar label="Success" color="success" defaultValue={60} />
					<ProgressBar label="Warning" color="warning" defaultValue={80} />
					<ProgressBar label="Error" color="error" defaultValue={100} />
				</div>
			);
		}
	})
};

export const Sizes: Story = {
	render: () => ({
		components: { ProgressBar },
		setup() {
			return () => (
				<div class="flex flex-col gap-8 w-[300px]">
					<ProgressBar label="Small (sm)" size="sm" defaultValue={50} />
					<ProgressBar label="Medium (md)" size="md" defaultValue={50} />
					<ProgressBar label="Large (lg)" size="lg" defaultValue={50} />
				</div>
			);
		}
	})
};

export const Vertical: Story = {
	render: () => ({
		components: { ProgressBar },
		setup() {
			return () => (
				<div class="flex gap-8 h-[300px]">
					<ProgressBar label="Primary" color="primary" orientation="vertical" defaultValue={20} />
					<ProgressBar label="Success" color="success" orientation="vertical" defaultValue={60} />
					<ProgressBar label="Error" color="error" orientation="vertical" defaultValue={100} />
				</div>
			);
		}
	})
};

export const Formatting: Story = {
	render: () => ({
		components: { ProgressBar },
		setup() {
			return () => (
				<div class="flex flex-col gap-8 w-[300px]">
					<ProgressBar
						label="Loading Items"
						defaultValue={42}
						translations={{
							value: ({ value, max }) => (value == null ? 'Loading...' : `${value} of ${max} items`)
						}}
					/>
				</div>
			);
		}
	})
};
