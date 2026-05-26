import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { PasswordInput } from '@components/PasswordInput';
import { Button } from '@components/Button';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnValueChange = fn();
const mockedOnVisibilityChange = fn();

const toggleTriggerLabel = 'Toggle password visibility';
const clearButtonLabel = 'Clear value';

const meta = {
	title: 'Components/FormField/PasswordInput',
	component: PasswordInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'valueChange' },
		'onUpdate:modelValue': { action: 'update:modelValue' },
		'onUpdate:modelVisable': { action: 'update:modelVisable' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		}
	},
	args: {
		dataTestid: 'password-input-with-default-value',
		label: 'Password',
		placeholder: 'Enter your password',
		supportingText: 'Please enter strong password.'
	},
	render: (args) => ({
		components: { PasswordInput },
		setup() {
			return { args };
		},
		template: '<PasswordInput v-bind="args" />'
	}),
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnVisibilityChange.mockClear();
	}
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { PasswordInput },
		setup() {
			return { args };
		},
		template: '<PasswordInput v-bind="args" />'
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid: testId = '', label = '', placeholder = '', supportingText = '' } = args;

		const container = canvas.getByTestId(testId);
		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if input exists', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toBeInTheDocument();
		});

		await step('Check if input type is password', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toHaveAttribute('type', 'password');
		});

		await step('Check if input has placeholder', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toHaveAttribute('placeholder', placeholder);
		});

		await step('Check if input has supporting text', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toHaveAttribute('aria-describedby');

			const supportingTextId = input.getAttribute('aria-describedby');

			const supportingTextEl = container.querySelector(`#${supportingTextId}`);
			expect(supportingTextEl).toBeInTheDocument();
			expect(supportingTextEl).toHaveTextContent(supportingText);
		});

		await step('Check if toggle trigger exists', async () => {
			const toggleTrigger = within(container).getByRole('button', { name: toggleTriggerLabel });
			expect(toggleTrigger).toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Default Password',
		defaultValue: 'strong_password',
		clearable: true
	},

	play: async ({ canvas, args, step }) => {
		const { label = '', defaultValue = '', dataTestid: testId = '' } = args;

		const container = canvas.getByTestId(testId);
		const input = canvas.getByLabelText(label);

		await step('Check if input has default value', async () => {
			expect(input).toHaveValue(defaultValue);
		});

		await step('Check if clear button exists', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeInTheDocument();
		});

		await step('Click clear button', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if input is empty', async () => {
			expect(input).toHaveValue('');
		});
	}
};

export const Visiable: Story = {
	args: {
		label: 'Visiable Password',
		defaultVisible: true,
		defaultValue: 'password',
		'onUpdate:modelVisable': mockedOnVisibilityChange
	},
	render: (args) => ({
		components: { PasswordInput, Button },
		setup() {
			const { 'onUpdate:modelVisable': onUpdateModelVisable, defaultVisible } = args;
			const visible = ref(defaultVisible);
			const handleVisibilityChange = (val: boolean) => {
				if (onUpdateModelVisable) {
					onUpdateModelVisable(val);
				}
				visible.value = val;
			};
			return () => (
				<div>
					<Button class="mb-4" onClick={() => handleVisibilityChange(!visible.value)}>
						Toggle Visibility
					</Button>
					<PasswordInput
						{...args}
						modelVisable={visible.value}
						onUpdate:modelVisable={handleVisibilityChange}
					/>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { label = '' } = args;

		const input = canvas.getByLabelText(label);

		await step('Check if password is visible initially', async () => {
			expect(input).toHaveAttribute('type', 'text');
		});

		await step('Toggle Visibility from external Button', async () => {
			const toggleButton = canvas.getByRole('button', { name: 'Toggle Visibility' });
			await userEvent.click(toggleButton);
		});

		await step('Check if password is hidden', async () => {
			expect(input).toHaveAttribute('type', 'password');
		});

		await step('Toggle Visibility from internal Button', async () => {
			const toggleButton = canvas.getByRole('button', { name: toggleTriggerLabel });
			await userEvent.click(toggleButton);
		});

		await step('Check if onVisibilityChange is called', async () => {
			expect(mockedOnVisibilityChange).lastCalledWith(true);
		});
	}
};

export const ControllableValue: Story = {
	args: {
		label: 'Controllable Password',
		modelValue: 'initial_password',
		onValueChange: mockedOnValueChange
	},
	render: (args) => ({
		components: { PasswordInput },
		setup() {
			const value = ref(args.modelValue);
			const handleValueChange = (e: InputEvent) => {
				if (args.onValueChange) args.onValueChange(e);
			};
			return () => (
				<div>
					<PasswordInput
						{...args}
						modelValue={value.value}
						onUpdate:modelValue={(val: string) => {
							value.value = val;
						}}
						onValueChange={handleValueChange}
					/>
					<p style="margin-left: 8px; margin-top: 12px;" aria-label="Displayed value">
						Value: {value.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { label = '' } = args;

		const input = canvas.getByLabelText(label);

		await step('Check if input displays initial value', async () => {
			expect(input).toHaveValue('initial_password');
		});

		await step('Type in value into PasswordInput', async () => {
			await userEvent.clear(input);
			await userEvent.type(input, 'new_value');
		});

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toBeCalled();

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: new_value');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Password',
		disabled: true,
		defaultValue: 'secret'
	},
	play: async ({ canvas, args, step }) => {
		const { label = '' } = args;

		await step('Check if input is disabled', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toBeDisabled();
		});
	}
};

export const Required: Story = {
	args: {
		label: 'Required Field',
		required: true,
		placeholder: 'This field is required',
		supportingText: 'This field is required'
	},

	play: async ({ canvas, args, step }) => {
		const { label = '' } = args;

		await step('Check if input is required', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toBeRequired();
		});
	}
};

export const Sizes: Story = {
	render: () => ({
		components: { PasswordInput },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<PasswordInput label="Extra Small" size="xs" placeholder="Password" />
					<PasswordInput label="Small" size="sm" placeholder="Password" />
					<PasswordInput label="Medium" size="md" placeholder="Password" />
					<PasswordInput label="Large" size="lg" placeholder="Password" />
				</div>
			);
		}
	})
};

export const Statuses: Story = {
	render: () => ({
		components: { PasswordInput },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<PasswordInput
						label="Error"
						placeholder="Password"
						supportingText="Password too weak."
						status="error"
					/>
					<PasswordInput
						label="Warning"
						placeholder="Password"
						supportingText="Password could be stronger."
						status="warning"
					/>
					<PasswordInput
						label="Success"
						placeholder="Password"
						supportingText="Strong password."
						status="success"
					/>
				</div>
			);
		}
	})
};
