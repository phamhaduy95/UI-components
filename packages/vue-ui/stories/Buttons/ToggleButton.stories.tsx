import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ToggleButton } from '@components/ToggleButton';
import { ref } from 'vue';
import { expect, userEvent, fn } from 'storybook/test';

const mockedOnPressedChange = fn();
const mockedOnUpdatePressed = fn();

import { StarIcon as StarFilledIcon } from '@heroicons/vue/20/solid';
import { StarIcon } from '@heroicons/vue/24/outline';

const meta = {
	title: 'Components/Buttons/ToggleButton',
	component: ToggleButton,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg']
		},
		color: {
			control: 'select',
			options: ['default', 'primary', 'secondary', 'success', 'warning', 'error']
		},
		'onUpdate:pressed': { action: 'update:pressed' },
		onPressedChange: { action: 'pressedChange' },
		disabled: { control: 'boolean' },
		pressed: { control: 'boolean' }
	},
	args: {
		onPressedChange: mockedOnPressedChange,
		'onUpdate:pressed': mockedOnUpdatePressed
	},
	beforeEach() {
		mockedOnPressedChange.mockClear();
		mockedOnUpdatePressed.mockClear();
	}
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		'aria-label': 'Toggle on/off'
	},
	render: (args) => ({
		components: { ToggleButton, StarIcon, StarFilledIcon },
		setup() {
			return { args };
		},
		template: `
			<ToggleButton v-bind="args" v-slot="{ pressed }">
				<div style="display: flex; align-items: center; gap: 8px;">
					<StarFilledIcon v-if="pressed" class="w-4 h-4" />
					<StarIcon v-else class="w-4 h-4" />
					<span>{{ pressed ? 'On' : 'Off' }}</span>
				</div>
			</ToggleButton>
		`
	}),
	play: async ({ canvas, step }) => {
		const button = canvas.getByRole('button', { name: 'Toggle on/off' });

		await step('Check if button exists', async () => {
			expect(button).toBeInTheDocument();
		});

		await step('Check initial state', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'false');
			expect(button).toHaveTextContent('Off');
		});

		await step('Click button', async () => {
			await userEvent.click(button);
		});

		await step('Check state after click', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'true');
			expect(button).toHaveTextContent('On');
		});
	}
};

export const DefaultPressed: Story = {
	args: {
		defaultPressed: true,
		'aria-label': 'Toggle on/off'
	},
	render: (args) => ({
		components: { ToggleButton, StarIcon, StarFilledIcon },
		setup() {
			return { args };
		},
		template: `
			<ToggleButton v-bind="args" v-slot="{ pressed }">
				<div style="display: flex; align-items: center; gap: 8px;">
					<StarFilledIcon v-if="pressed" class="w-4 h-4" />
					<StarIcon v-else class="w-4 h-4" />
					<span>{{ pressed ? 'On' : 'Off' }}</span>
				</div>
			</ToggleButton>
		`
	})
};

export const Disabled: Story = {
	args: {
		disabled: true
	},
	render: (args) => ({
		components: { ToggleButton },
		setup() {
			return { args };
		},
		template: `
			<ToggleButton v-bind="args" v-slot="{ pressed }">
				<span>{{ pressed ? 'On' : 'Off' }}</span>
			</ToggleButton>
		`
	}),
	play: async ({ canvas, step }) => {
		const button = canvas.getByRole('button');
		await step('Check if button is disabled', async () => {
			expect(button).toBeDisabled();
		});
	}
};

export const Controllable: Story = {
	render: (args) => ({
		components: { ToggleButton, StarIcon, StarFilledIcon },
		setup() {
			const { onPressedChange, 'onUpdate:pressed': onUpdatePressed } = args;
			const pressed = ref(false);

			const handlePressedChange = (val: boolean) => {
				if (onPressedChange) onPressedChange(val);
			};

			const handleUpdatePressed = (val: boolean) => {
				if (onUpdatePressed) onUpdatePressed(val);
				pressed.value = val;
			};

			return () => (
				<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
					<ToggleButton
						{...args}
						pressed={pressed.value}
						onPressedChange={handlePressedChange}
						onUpdate:pressed={handleUpdatePressed}
					>
						{{
							default: ({ pressed }: { pressed: boolean }) => (
								<div style="display: flex; align-items: center; gap: 8px;">
									{pressed ? <StarFilledIcon class="w-4 h-4" /> : <StarIcon class="w-4 h-4" />}
									<span>{pressed ? 'On' : 'Off'}</span>
								</div>
							)
						}}
					</ToggleButton>
					<p aria-label="Status label">Status: {pressed.value ? 'ON' : 'OFF'}</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, step }) => {
		const button = canvas.getByRole('button');
		const label = canvas.getByLabelText('Status label');

		await step('Check initial state', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'false');
			expect(label).toHaveTextContent('Status: OFF');
		});

		await step('Click button', async () => {
			await userEvent.click(button);
		});

		await step('Check updated state', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'true');
			expect(label).toHaveTextContent('Status: ON');
			expect(mockedOnPressedChange).toHaveBeenCalledWith(true);
			expect(mockedOnUpdatePressed).toHaveBeenCalledWith(true);
		});

		await step('Click button again', async () => {
			await userEvent.click(button);
		});

		await step('Check final state', async () => {
			expect(button).toHaveAttribute('aria-pressed', 'false');
			expect(label).toHaveTextContent('Status: OFF');
			expect(mockedOnPressedChange).toHaveBeenCalledWith(false);
			expect(mockedOnUpdatePressed).toHaveBeenCalledWith(false);
		});
	}
};
