import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Editable } from '@components/Editable';
import { ref } from 'vue';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnModelValueUpdate = fn();
const mockedOnValueChange = fn();

const meta = {
	title: 'Components/FormField/Editable',
	component: Editable,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		'onUpdate:modelValue': { action: 'update:modelValue' },
		onValueChange: { action: 'valueChange' },

		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg']
		},
		activationMode: {
			control: 'select',
			options: ['focus', 'dblclick', 'click', 'none']
		},
		submitMode: {
			control: 'select',
			options: ['enter', 'blur', 'none', 'both']
		}
	},
	args: {
		label: 'Description',
		placeholder: 'Enter text...',
		supportingText: 'Click to edit the text.',
		dataTestid: 'editable-component',
		'onUpdate:modelValue': mockedOnModelValueUpdate,
		onValueChange: mockedOnValueChange,
		showToggle: true
	},
	render: (args) => ({
		components: { Editable },
		setup() {
			return { args };
		},
		template: '<Editable v-bind="args" />'
	}),
	beforeEach() {
		mockedOnModelValueUpdate.mockClear();
		mockedOnValueChange.mockClear();
	}
} satisfies Meta<typeof Editable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: 'Hello World'
	},
	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { dataTestid = '', label = '' } = args;

		const container = canvas.getByTestId(dataTestid);
		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if label exists', async () => {
			const labelElement = canvas.getByText(label as string);
			expect(labelElement).toBeInTheDocument();
		});

		await step('Check if preview shows defaultValue', async () => {
			const previewElement = canvas.getByText('Hello World');
			expect(previewElement).toBeInTheDocument();
		});

		await step('Click edit button to enter edit mode', async () => {
			const editButton = canvas.getByRole('button', { name: /Edit/i });
			await userEvent.click(editButton);
		});

		await step('Check if input appears and is focused', async () => {
			const input = canvas.getByRole('textbox');
			expect(input).toBeInTheDocument();
			expect(input).toHaveValue('Hello World');
		});

		await step('Type a new value and submit', async () => {
			const input = canvas.getByRole('textbox');
			await userEvent.clear(input);
			await userEvent.type(input, 'New Text');
			const submitButton = canvas.getByRole('button', { name: /Submit/i });
			await userEvent.click(submitButton);
		});

		await step('Check if preview shows new value and valueChange is emitted', async () => {
			const previewElement = canvas.getByText('New Text');
			expect(previewElement).toBeInTheDocument();

			expect(mockedOnValueChange).toBeCalledWith(expect.objectContaining({ value: 'New Text' }));
			expect(mockedOnModelValueUpdate).toBeCalledWith('New Text');
		});
	}
};

export const Controllable: Story = {
	args: {
		modelValue: 'controlled value'
	},
	render: (args) => ({
		components: { Editable },
		setup() {
			const { 'onUpdate:modelValue': onModelValueUpdate } = args;
			const value = ref(args.modelValue);
			const handleValueChange = (val: string) => {
				if (onModelValueUpdate) onModelValueUpdate(val);
				value.value = val;
			};
			return () => (
				<div>
					<Editable {...args} modelValue={value.value} onUpdate:modelValue={handleValueChange} />
					<p style="margin-left: 8px; margin-top: 12px;" aria-label="Displayed value">
						Value: {value.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Check if preview displays initial value', async () => {
			expect(canvas.getByText('controlled value')).toBeInTheDocument();
		});

		await step('Click edit button', async () => {
			const editButton = canvas.getByRole('button', { name: /Edit/i });
			await userEvent.click(editButton);
		});

		await step('Type in value into Editable input and submit', async () => {
			const input = canvas.getByRole('textbox');
			await userEvent.clear(input);
			await userEvent.type(input, 'updated value');
			const submitButton = canvas.getByRole('button', { name: /Submit/i });
			await userEvent.click(submitButton);
		});

		await step('Check if displayed value is updated', async () => {
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: updated value');
			expect(mockedOnModelValueUpdate).toBeCalled();
		});
	}
};

export const DoubleClickActivation: Story = {
	args: {
		activationMode: 'dblclick',
		defaultValue: 'Double click me'
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step('Check if input is not visible initially', async () => {
			const input = canvas.queryByRole('textbox');
			expect(input).not.toBeInTheDocument();
		});

		await step('Double click to edit', async () => {
			const preview = canvas.getByText('Double click me');
			await userEvent.dblClick(preview);
		});

		await step('Check if input appears', async () => {
			const input = canvas.getByRole('textbox');
			expect(input).toBeInTheDocument();
		});
	}
};

export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: 'Disabled Editable'
	},
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step('Check if edit button is disabled', async () => {
			const editButton = canvas.queryByRole('button', { name: /Edit/i });
			expect(editButton).toBeDisabled();
		});
	}
};

export const Sizes: Story = {
	render: () => ({
		components: { Editable },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Editable label="Extra Small" size="xs" defaultValue="xs size" showToggle />
					<Editable label="Small" size="sm" defaultValue="sm size" showToggle />
					<Editable label="Medium" size="md" defaultValue="md size" showToggle />
					<Editable label="Large" size="lg" defaultValue="lg size" showToggle />
				</div>
			);
		}
	})
};

export const Statuses: Story = {
	render: () => ({
		components: { Editable },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<Editable
						label="Error"
						defaultValue="Error text"
						supportingText="There is an error."
						status="error"
						showToggle
					/>
					<Editable
						label="Warning"
						defaultValue="Warning text"
						supportingText="This is a warning."
						status="warning"
						showToggle
					/>
					<Editable
						label="Success"
						defaultValue="Success text"
						supportingText="Great success."
						status="success"
						showToggle
					/>
				</div>
			);
		}
	}),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		await step('Click to enter edit mode to see border status', async () => {
			const editButtons = canvas.getAllByRole('button', { name: /Edit/i });
			for (const button of editButtons) {
				await userEvent.click(button);
				const inputs = canvas.getAllByRole('textbox');
				expect(inputs).toHaveLength(1);
			}
		});
	}
};
