import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Chip } from '@components/Chip';
import { expect, fn, userEvent } from 'storybook/test';
import { TrashIcon } from '@heroicons/vue/20/solid';

const mockedOnRemove = fn();
const mockedOnClick = fn();

const meta = {
	title: 'Components/DataDisplay/Chip',
	component: Chip,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		color: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'default']
		},
		size: {
			control: 'select',
			options: ['md', 'sm']
		},
		onRemove: { action: 'removed' },
		onClick: { action: 'clicked' }
	},
	args: {
		onRemove: mockedOnRemove,
		onClick: mockedOnClick
	},
	beforeEach: () => {
		mockedOnRemove.mockClear();
		mockedOnClick.mockClear();
	}
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Tag Label'
	},
	render: (args) => ({
		components: { Chip },
		setup() {
			return { args };
		},
		template: '<Chip v-bind="args" />'
	}),
	play: async ({ canvas, step, args }) => {
		const chip = canvas.getByLabelText(args.label ?? '');

		await step('Check if chip is displayed', async () => {
			expect(chip).toBeInTheDocument();
		});
	}
};

export const ColorVariants: Story = {
	render: () => ({
		components: { Chip },
		setup() {
			return () => (
				<div class="flex flex-col gap-4">
					<div>
						<p class="mb-2">Non-Interactable</p>
						<div class="flex gap-2">
							<Chip label="Primary" color="primary" />
							<Chip label="Secondary" color="secondary" />
							<Chip label="Success" color="success" />
							<Chip label="Warning" color="warning" />
							<Chip label="Error" color="error" />
						</div>
					</div>
					<div>
						<p class="mb-2">Clickable</p>
						<div class="flex gap-2">
							<Chip label="Primary" color="primary" clickable />
							<Chip label="Secondary" color="secondary" clickable />
							<Chip label="Success" color="success" clickable />
							<Chip label="Warning" color="warning" clickable />
							<Chip label="Error" color="error" clickable />
						</div>
					</div>
					<div>
						<p class="mb-2">Removeable</p>
						<div class="flex gap-2">
							<Chip label="Primary" color="primary" removable />
							<Chip label="Secondary" color="secondary" removable />
							<Chip label="Success" color="success" removable />
							<Chip label="Warning" color="warning" removable />
							<Chip label="Error" color="error" removable />
						</div>
					</div>
				</div>
			);
		}
	})
};

export const Clickable: Story = {
	args: {
		label: 'Clickable Tag',
		clickable: true
	},
	render: (args) => ({
		components: { Chip },
		setup() {
			return { args };
		},
		template: '<Chip v-bind="args"  />'
	}),
	async play({ step, canvas }) {
		const chip = canvas.getByRole('button', { name: 'Clickable Tag' });

		await step('Click on Chip', async () => {
			await userEvent.click(chip);
		});

		await step('Check if onclick is invoked', async () => {
			expect(mockedOnClick).toHaveBeenCalled();
		});

		await step('press Backspace', async () => {
			await userEvent.keyboard('{backspace}');
		});

		await step('Check if onRemove is not invoked', async () => {
			expect(mockedOnRemove).not.toHaveBeenCalled();
		});
	}
};

export const Size: Story = {
	render: () => ({
		components: { Chip },
		setup() {
			return () => (
				<div class="flex flex-col gap-4">
					<div class="flex items-center gap-2">
						<Chip label="Default size" size="sm" />
						<Chip label="Default size" size="sm" color="secondary" />
					</div>
					<div class="flex items-center gap-2">
						<Chip label="Small size" size="md" />
						<Chip label="Small size" size="md" color="secondary" />
					</div>
				</div>
			);
		}
	})
};

export const Removable: Story = {
	args: {
		label: 'Removable Tag',
		removable: true,
		clickable: true,
		dataTestid: 'chip-remove-button'
	},
	render: (args) => ({
		components: { Chip },
		setup() {
			return { args, mockedOnRemove };
		},
		template: '<Chip v-bind="args" @remove="mockedOnRemove" />'
	}),
	play: async ({ args, canvas, step }) => {
		const { label = 'Remove' } = args;

		const Chips = canvas.getByRole('button', { name: label });

		const removeIcon = Chips.querySelector('[data-part="chip_remove-icon"]') as HTMLElement;

		await step('Click on Remove icon', async () => {
			await userEvent.click(removeIcon);
		});

		await step('Check if onRemove is called', async () => {
			expect(mockedOnRemove).toHaveBeenCalled();
		});

		await step('Focus on Chip and press Delete', async () => {
			await userEvent.keyboard('{delete}');
		});

		await step('Check if onRemove is called', async () => {
			expect(mockedOnRemove).toHaveBeenCalled();
		});

		await step('Focus on Chip and press Backspace', async () => {
			await userEvent.keyboard('{backspace}');
		});

		await step('Check if onRemove is called', async () => {
			expect(mockedOnRemove).toHaveBeenCalled();
		});
	}
};

export const RemovableVariants: Story = {
	render: () => ({
		components: { Chip },
		setup() {
			return () => (
				<div class="flex gap-2">
					<Chip label="Primary" color="primary" removable />
					<Chip label="Secondary" color="secondary" removable />
					<Chip label="Success" color="success" removable />
					<Chip label="Warning" color="warning" removable />
					<Chip label="Error" color="error" removable />
				</div>
			);
		}
	})
};

export const CustomizeIconSlot: Story = {
	args: {
		label: 'Removable Tag',
		removable: true,
		dataTestid: 'chip-remove-button'
	},
	render: (args) => ({
		components: { Chip, TrashIcon },
		setup() {
			return { args };
		},
		template: `
			<Chip v-bind="args">
				<template #removeIcon>
					<TrashIcon class="Chip_RemoveIcon" />
				</template>
			</Chip>
		`
	}),
	play: async ({ args, canvas, step }) => {
		const { label = 'Remove' } = args;

		const Chips = canvas.getByRole('button', { name: label });

		const removeIcon = Chips.querySelector('[data-part="chip_remove-icon"]') as HTMLElement;

		await step('Check if removeIcon is displayed', async () => {
			expect(removeIcon).toBeInTheDocument();
			// need visual testing to verify new icon is displayed
		});
	}
};
