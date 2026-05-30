import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { NumberInput } from '@components/NumberInput';
import { ref, type ComponentInstance } from 'vue';
import { expect, within, userEvent, fn, waitFor } from 'storybook/test';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();

const increaseTriggerLabel = 'increase value';
const decreaseTriggerLabel = 'decrease value';

const meta = {
	title: 'Components/FormField/NumberInput',
	component: NumberInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'valueChange' },
		'onUpdate:modelValue': { action: 'update:modelValue' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		formatOptions: { control: 'object' },
		min: { control: 'number' },
		max: { control: 'number' },
		step: { control: 'number' }
	},
	args: {
		dataTestid: 'number-input-default',
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
	}
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Quantity',
		placeholder: 'Enter Number',
		supportingText: 'Enter quantity.'
	},

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

		await step('Check if input has placeholder', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toHaveAttribute('placeholder', placeholder);
		});

		await step('Check if input has supporting text', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toHaveAttribute('aria-describedby');

			const supportingTextId = input.getAttribute('aria-describedby');
			if (supportingTextId) {
				const supportingTextEl = container.querySelector(`#${supportingTextId}`);
				expect(supportingTextEl).toBeInTheDocument();
				expect(supportingTextEl).toHaveTextContent(supportingText);
			} else {
				throw new Error('Supporting text ID not found');
			}
		});

		await step('Check if both increment and decrement triggers exist', async () => {
			const incrementBtn = within(container).getByRole('button', { name: increaseTriggerLabel });
			const decrementBtn = within(container).getByRole('button', { name: decreaseTriggerLabel });
			expect(incrementBtn).toBeInTheDocument();
			expect(decrementBtn).toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Initial Value',
		defaultValue: 10
	},

	play: async ({ canvas, args, step }) => {
		const { label = '', defaultValue } = args;

		let input: HTMLElement;
		await step('Check if input exists', async () => {
			input = canvas.getByLabelText(label);
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has default value', async () => {
			expect(input).toHaveValue(defaultValue?.toString());
		});
	}
};

export const MinMaxStep: Story = {
	args: {
		label: 'Step 5, Min 0, Max 20',
		min: 0,
		max: 20,
		step: 5,
		defaultValue: 5
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { dataTestid: testId = '', label = '' } = args;

		const container = canvas.getByTestId(testId);
		const input = canvas.getByLabelText(label);
		const incrementBtn = within(container).getByRole('button', { name: increaseTriggerLabel });
		const decrementBtn = within(container).getByRole('button', { name: decreaseTriggerLabel });

		await step('Check initial value', async () => {
			expect(input).toHaveValue('5');
		});

		await step('Increment to 10', async () => {
			await userEvent.click(incrementBtn);
			await waitFor(() => expect(input).toHaveValue('10'));
		});

		await step('Increment to 15', async () => {
			await userEvent.click(incrementBtn);
			await waitFor(() => expect(input).toHaveValue('15'));
		});

		await step('Increment to 20 (Max)', async () => {
			await userEvent.click(incrementBtn);
			await waitFor(() => expect(input).toHaveValue('20'));
		});

		await step('Try increment beyond Max', async () => {
			await userEvent.click(incrementBtn);
			expect(incrementBtn).toBeDisabled();
			await waitFor(() => expect(input).toHaveValue('20'));
		});

		await step('Decrement back to 15', async () => {
			await userEvent.click(decrementBtn);
			await waitFor(() => expect(input).toHaveValue('15'));
		});
	}
};

export const Formatting: Story = {
	args: {
		label: 'Currency (USD)',
		formatOptions: { style: 'currency', currency: 'USD' },
		defaultValue: 1000
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { label = '' } = args;

		const input = canvas.getByLabelText(label);

		await step('Check formatted value', async () => {
			// Vue ArkUI implementation format output matching
			expect(input).toHaveValue('$1,000.00');
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Controllable',
		modelValue: 10
	},
	render: (args) => ({
		components: { NumberInput },
		setup() {
			type NumberInputProps = ComponentInstance<typeof NumberInput>['$props'];

			const { onValueChange, modelValue, 'onUpdate:modelValue': updateModelValue } = args;
			const value = ref(modelValue);

			const handleValueChange: NumberInputProps['onValueChange'] = (value, valueAsString) => {
				if (onValueChange) onValueChange(value, valueAsString);
			};

			const handleUpdateModelValue: NumberInputProps['onUpdate:modelValue'] = (val) => {
				value.value = val;
				if (updateModelValue) updateModelValue(val);
			};

			return () => (
				<div>
					<NumberInput
						{...args}
						modelValue={value.value}
						onUpdate:modelValue={handleUpdateModelValue}
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
		const { label = '', dataTestid: testId = '', modelValue } = args;

		const container = canvas.getByTestId(testId);
		const input = canvas.getByLabelText(label);

		const incrementBtn = within(container).getByRole('button', { name: increaseTriggerLabel });
		const decrementBtn = within(container).getByRole('button', { name: decreaseTriggerLabel });

		await step('Check initial value', async () => {
			expect(input).toHaveValue(modelValue?.toString());
		});

		await step('Type in new value', async () => {
			await userEvent.clear(input);
			await userEvent.type(input, '20');
		});

		await step('Check if onUpdateModelValue is called', async () => {
			expect(mockedOnUpdateModelValue).toHaveBeenLastCalledWith(20);

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: 20');
		});

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toHaveBeenCalledWith(20, '20');
		});

		await step('Use increment button', async () => {
			if (incrementBtn) await userEvent.click(incrementBtn);
		});

		await step('Check if value updated via button', async () => {
			expect(input).toHaveValue('21');
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: 21');
		});

		await step('Check if onValueChange is called again', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith(21, '21');
			expect(mockedOnUpdateModelValue).toHaveBeenLastCalledWith(21);
		});

		await step('Click on decrease button', async () => {
			await userEvent.click(decrementBtn);
		});

		await step('Check if value updated via button', async () => {
			expect(input).toHaveValue('20');
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: 20');
		});

		await step('Check if onValueChange is called again', async () => {
			expect(mockedOnValueChange).toHaveBeenCalledWith(20, '20');
			expect(mockedOnUpdateModelValue).toHaveBeenLastCalledWith(20);
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		disabled: true,
		defaultValue: 5
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
		placeholder: 'Enter amount'
	},

	play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement);
		const { label = '', dataTestid: testId = '' } = args;

		const container = canvas.getByTestId(testId);

		await step('Check if input is required', async () => {
			const input = canvas.getByLabelText(label);

			const requiredSymbol = within(container).getByText('*');
			expect(requiredSymbol).toBeVisible();

			expect(input).toBeRequired();
		});
	}
};

export const Sizes: Story = {
	render: () => ({
		components: { NumberInput },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<NumberInput label="Extra Small" size="xs" placeholder="Extra Small input" />
					<NumberInput label="Small" size="sm" placeholder="Small input" />
					<NumberInput label="Medium" size="md" placeholder="Medium input" />
					<NumberInput label="Large" size="lg" placeholder="Large input" />
				</div>
			);
		}
	})
};

export const Statuses: Story = {
	render: () => ({
		components: { NumberInput },
		setup() {
			return () => (
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<NumberInput
						label="Error"
						defaultValue={0}
						supportingText="Invalid value"
						status="error"
					/>
					<NumberInput
						label="Warning"
						defaultValue={0}
						supportingText="Be careful"
						status="warning"
					/>
					<NumberInput
						label="Success"
						defaultValue={0}
						supportingText="Good job"
						status="success"
					/>
				</div>
			);
		}
	})
};
