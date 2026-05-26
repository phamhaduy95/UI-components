import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { TextInput } from '@components/TextInput';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnModelValueUpdate = fn();

const meta = {
	title: 'Components/FormField/TextInput',
	component: TextInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		'onUpdate:modelValue': { action: 'update:modelValue' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large']
		}
	},
	args: {
		label: 'Email',
		placeholder: 'Enter your email',
		supportingText: 'Please enter your email address.',
		dataTestid: 'text-input',
		'onUpdate:modelValue': mockedOnModelValueUpdate
	},
	render: (args) => ({
		components: { TextInput },
		setup() {
			return { args };
		},
		template: '<TextInput v-bind="args" />'
	}),
	beforeEach() {
		mockedOnModelValueUpdate.mockClear();
	}
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { dataTestid = '', label = '' } = args;

		const container = canvas.getByTestId(dataTestid);
		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if input exists', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has placeholder', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toHaveAttribute('placeholder', args.placeholder);
		});

		await step('Check if input has supporting text', async () => {
			const input = canvas.getByLabelText(label);

			expect(input).toHaveAttribute('aria-describedby');

			const supportingTextId = input.getAttribute('aria-describedby');

			const supportingTextEl = container.querySelector(`#${supportingTextId}`);

			expect(supportingTextEl).toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Username',
		defaultValue: 'john doe',
		clearable: true
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { label = '', defaultValue = '' } = args;

		let input: HTMLElement;
		await step('Check if input exists', async () => {
			input = canvas.getByLabelText(label);
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has default value', async () => {
			expect(input).toHaveValue(defaultValue);
		});

		await step('Check if clear button is displayed when there is default value', async () => {
			const clearButton = canvas.getByRole('button', { name: 'Clear' });
			expect(clearButton).toBeInTheDocument();
		});
	}
};

export const BlankInput: Story = {
	args: {
		label: undefined,
		placeholder: undefined,
		supportingText: undefined
	},
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { dataTestid = '' } = args;

		const container = canvas.getByTestId(dataTestid);

		await step('Check if input is blank', async () => {
			const input = within(container).getByRole('textbox');
			expect(input).toHaveValue('');
		});

		await step('Check if input does not have label', async () => {
			const label = container.querySelector('label');
			expect(label).not.toBeInTheDocument();
		});

		await step('Check if input does not have supporting text', async () => {
			const input = within(container).getByRole('textbox');
			expect(input).not.toHaveAttribute('aria-describedby');
		});
	}
};

export const Clearable: Story = {
	args: {
		clearable: true
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { label = '', dataTestid = '' } = args;

		const container = canvas.getByTestId(dataTestid);
		const input = within(container).getByRole('textbox', { name: label });

		await step('Check if input is not clearable when there is no value', async () => {
			const clearButton = within(container).queryByRole('button', { name: 'Clear' });
			expect(clearButton).not.toBeInTheDocument();
		});

		await step('Check if input is clearable when there is value', async () => {
			await userEvent.type(input, 'john doe');

			const clearButton = within(container).getByRole('button', { name: 'Clear' });
			expect(clearButton).toBeInTheDocument();
		});

		await step('Click on Clear button', async () => {
			const clearButton = within(container).getByRole('button', { name: 'Clear' });
			await userEvent.click(clearButton);
		});

		await step('Check if input is cleared when clear button is clicked', async () => {
			expect(input).toHaveValue('');
		});

		await step('Check if clear Button is not displayed', async () => {
			const clearButton = within(container).queryByRole('button', { name: 'Clear' });
			expect(clearButton).not.toBeInTheDocument();
		});
	}
};

export const Controllable: Story = {
	args: {
		modelValue: 'initial value',
		clearable: true
	},
	render: (args) => ({
		components: { TextInput },
		setup() {
			const { 'onUpdate:modelValue': onModelValueUpdate } = args;
			const value = ref(args.modelValue);
			const handleValueChange = (val: string) => {
				if (onModelValueUpdate) onModelValueUpdate(val);
				value.value = val;
			};
			return () => (
				<div>
					<TextInput {...args} modelValue={value.value} onUpdate:modelValue={handleValueChange} />
					<p style="margin-left: 8px; margin-top: 12px;" aria-label="Displayed value">
						Value: {value.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { label = '' } = args;

		const input = canvas.getByLabelText(label);
		await step('Check if input displays initial value', async () => {
			expect(input).toHaveValue('initial value');
		});

		await step('Type in value into TextInput', async () => {
			await userEvent.type(input, ' new value');
		});

		await step('Check if onValueChange is called with correct arguments', async () => {
			expect(mockedOnModelValueUpdate).toBeCalled();
			expect(mockedOnModelValueUpdate.mock.lastCall).toEqual(['initial value new value']);

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: initial value new value');
		});

		await step('Check if clear button is displayed', async () => {
			const clearButton = canvas.getByRole('button', { name: 'Clear' });
			expect(clearButton).toBeInTheDocument();
		});

		await step('Click in Clear button', async () => {
			const clearButton = canvas.getByRole('button', { name: 'Clear' });
			await userEvent.click(clearButton);
		});

		await step('Check if value should be empty string when user clicks clear button', async () => {
			expect(mockedOnModelValueUpdate).toBeCalled();
			expect(mockedOnModelValueUpdate.mock.lastCall).toEqual(['']);

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value:');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		disabled: true,
		defaultValue: 'john doe'
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
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
		required: true
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { label = '' } = args;

		await step('Check if input is required', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toBeRequired();
		});
	}
};

export const Sizes: Story = {
	render: () => ({
		components: { TextInput },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<TextInput label="Extra Small" size="xs" placeholder="Enter your email" />
					<TextInput label="Small" size="sm" placeholder="Enter your email" />
					<TextInput label="Medium" size="md" placeholder="Enter your email" />
					<TextInput label="Large" size="lg" placeholder="Enter your email" />
				</div>
			);
		}
	})
};

export const Statuses: Story = {
	render: () => ({
		components: { TextInput },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<TextInput
						label="Error"
						placeholder="Enter your email"
						supportingText="Please enter your email address."
						status="error"
					/>
					<TextInput
						label="Warning"
						placeholder="Enter your email"
						supportingText="Please enter your email address."
						status="warning"
					/>
					<TextInput
						label="Success"
						placeholder="Enter your email"
						supportingText="Please enter your email address."
						status="success"
					/>
				</div>
			);
		}
	})
};
