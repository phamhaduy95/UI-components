import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { TextArea } from '@components/TextArea';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnModelValueUpdate = fn();

const meta = {
	title: 'Components/FormField/TextArea',
	component: TextArea,
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
			options: ['sm', 'md', 'lg']
		}
	},
	args: {
		label: 'Notes',
		placeholder: 'Enter your notes here',
		supportingText: 'Please keep it brief.',
		dataTestid: 'textarea-input',
		'onUpdate:modelValue': mockedOnModelValueUpdate,
		rows: 3
	},
	render: (args) => ({
		components: { TextArea },
		setup() {
			return { args };
		},
		template: '<TextArea v-bind="args" />'
	}),
	beforeEach() {
		mockedOnModelValueUpdate.mockClear();
	}
} satisfies Meta<typeof TextArea>;

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
			const input = canvas.getByLabelText(label as string);
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has placeholder', async () => {
			const input = canvas.getByLabelText(label as string);
			expect(input).toHaveAttribute('placeholder', args.placeholder);
		});

		await step('Check if input has supporting text', async () => {
			const input = canvas.getByLabelText(label as string);

			expect(input).toHaveAttribute('aria-describedby');

			const supportingTextId = input.getAttribute('aria-describedby');

			const supportingTextEl = container.querySelector(`#${supportingTextId}`);

			expect(supportingTextEl).toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Bio',
		defaultValue: 'Hello, world!',
		clearable: true
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { label = '', defaultValue = '' } = args;

		let input: HTMLElement;
		await step('Check if input exists', async () => {
			input = canvas.getByLabelText(label as string);
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
		const input = within(container).getByRole('textbox', { name: label as string });

		await step('Check if input is not clearable when there is no value', async () => {
			const clearButton = within(container).queryByRole('button', { name: 'Clear' });
			expect(clearButton).not.toBeInTheDocument();
		});

		await step('Check if input is clearable when there is value', async () => {
			await userEvent.type(input, 'Testing clear');

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
		modelValue: 'initial state',
		clearable: true
	},
	render: (args) => ({
		components: { TextArea },
		setup() {
			const { 'onUpdate:modelValue': onModelValueUpdate } = args;
			const value = ref(args.modelValue);
			const handleValueChange = (val: string) => {
				if (onModelValueUpdate) onModelValueUpdate(val);
				value.value = val;
			};
			return () => (
				<div>
					<TextArea {...args} modelValue={value.value} onUpdate:modelValue={handleValueChange} />
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

		const input = canvas.getByLabelText(label as string);
		await step('Check if input displays initial value', async () => {
			expect(input).toHaveValue('initial state');
		});

		await step('Type in value into TextArea', async () => {
			await userEvent.type(input, ' updated');
		});

		await step('Check if onValueChange is called with correct arguments', async () => {
			expect(mockedOnModelValueUpdate).toBeCalled();
			expect(mockedOnModelValueUpdate.mock.lastCall).toEqual(['initial state updated']);

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: initial state updated');
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
		defaultValue: 'Lorem ipsum'
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { label = '' } = args;

		await step('Check if input is disabled', async () => {
			const input = canvas.getByLabelText(label as string);
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
			const input = canvas.getByLabelText(label as string);
			expect(input).toBeRequired();
		});
	}
};

export const Sizes: Story = {
	render: () => ({
		components: { TextArea },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<TextArea label="Small" size="sm" placeholder="Enter your notes" />
					<TextArea label="Medium" size="md" placeholder="Enter your notes" />
					<TextArea label="Large" size="lg" placeholder="Enter your notes" />
				</div>
			);
		}
	})
};

export const Statuses: Story = {
	render: () => ({
		components: { TextArea },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<TextArea
						label="Error"
						placeholder="Enter your notes"
						supportingText="This field has an error."
						status="error"
					/>
					<TextArea
						label="Warning"
						placeholder="Enter your notes"
						supportingText="This field has a warning."
						status="warning"
					/>
					<TextArea
						label="Success"
						placeholder="Enter your notes"
						supportingText="This field is successful."
						status="success"
					/>
				</div>
			);
		}
	})
};
