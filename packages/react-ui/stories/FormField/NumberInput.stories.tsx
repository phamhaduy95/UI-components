import type { Meta, StoryObj } from '@storybook/react-vite';
import NumberInput from '@components/NumberInput';
import { useState } from 'react';
import { expect, within, userEvent, fn, waitFor } from 'storybook/test';

const mockedOnValueChange = fn();

const increaseTriggerLabel = 'increase value';
const decreaseTriggerLabel = 'decrease value';

const meta: Meta<typeof NumberInput> = {
	title: 'Components/FormField/NumberInput',
	component: NumberInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'onValueChange' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		formatOptions: { control: 'object' },
		min: { control: 'number' },
		max: { control: 'number' },
		step: { control: 'number' }
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Quantity',
		placeholder: 'Enter Number',
		supportingText: 'Enter quantity.',
		'data-testid': 'number-input-default'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '', placeholder = '', supportingText = '' } = args;
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

			const supportingTextEl = container.querySelector(`#${supportingTextId}`);
			expect(supportingTextEl).toBeInTheDocument();
			expect(supportingTextEl).toHaveTextContent(supportingText);
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
		defaultValue: '10',
		'data-testid': 'number-input-default-value'
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', defaultValue = '' } = args;

		await step('Check if input has default value', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toHaveValue(defaultValue);
		});
	}
};

export const MinMaxStep: Story = {
	args: {
		label: 'Step 5, Min 0, Max 20',
		min: 0,
		max: 20,
		step: 5,
		defaultValue: '5',
		'data-testid': 'number-input-min-max'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '' } = args;
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
		defaultValue: '1000',
		'data-testid': 'number-input-formatting'
	},
	play: async ({ canvas, args, step }) => {
		const { label = '' } = args;
		const input = canvas.getByLabelText(label);

		await step('Check formatted value', async () => {
			expect(input).toHaveValue('$1,000.00');
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Controllable',
		value: '10',
		onValueChange: mockedOnValueChange,
		'data-testid': 'number-input-controllable'
	},
	render: (args) => {
		const [value, setValue] = useState(args.value);

		return (
			<div>
				<NumberInput
					{...args}
					value={value}
					onValueChange={(val) => {
						setValue(val);
						if (args.onValueChange) {
							args.onValueChange(val);
						}
					}}
				/>
				<p className="ml-2 mt-3" aria-label="Displayed value">
					Value: {value}
				</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testid': testId = '', value = '' } = args;
		const container = canvas.getByTestId(testId);
		const input = canvas.getByLabelText(label);
		const incrementBtn = within(container).getByRole('button', { name: increaseTriggerLabel });

		await step('Check initial value', async () => {
			expect(input).toHaveValue(value);
		});

		await step('Type in new value', async () => {
			await userEvent.clear(input);
			await userEvent.type(input, '20', { delay: 10 });
		});

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith('20');

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: 20');
		});

		await step('Use increment button', async () => {
			if (incrementBtn) await userEvent.click(incrementBtn);
		});

		await step('Check if valu21e updated via button', async () => {
			expect(input).toHaveValue('21'); // Step default is 1
			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: 21');
		});

		await step('Check if onValueChange is called', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith('21');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		disabled: true,
		defaultValue: '5',
		'data-testid': 'number-input-disabled'
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
		placeholder: 'Enter amount',
		'data-testid': 'number-input-required'
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testid': testId = '' } = args;
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
	render: () => (
		<div className="flex flex-col gap-4">
			<NumberInput label="Small" size="small" placeholder="Small input" />
			<NumberInput label="Medium" size="medium" placeholder="Medium input" />
		</div>
	)
};

export const Statuses: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<NumberInput label="Error" defaultValue="0" supportingText="Invalid value" status="error" />
			<NumberInput label="Warning" defaultValue="0" supportingText="Be careful" status="warning" />
			<NumberInput label="Success" defaultValue="0" supportingText="Good job" status="success" />
		</div>
	)
};
