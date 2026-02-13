import type { Meta, StoryObj } from '@storybook/react-vite';
import TextInput from '@components/TextInput';
import { useState } from 'react';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnValueChange = fn();

const meta: Meta<typeof TextInput> = {
	title: 'Components/FormField/TextInput',
	component: TextInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'onValueChange' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		}
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Email',
		placeholder: 'Enter your email',
		supportingText: 'Please enter your email address.',
		'data-testId': `text-input`
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '', label = '' } = args;
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
	play: async ({ canvas, args, step }) => {
		const { label = '', defaultValue = '' } = args;

		await step('Check if input exists', async () => {
			const input = canvas.getByLabelText(label);
			expect(input).toBeInTheDocument();
		});

		await step('Check if input has default value', async () => {
			const input = canvas.getByLabelText(label);
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
		'data-testId': 'blank-input'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testId': testId = '' } = args;

		const container = canvas.getByTestId(testId);

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
		label: 'Search',
		clearable: true,
		'data-testId': 'text-input'
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', 'data-testId': testId = '' } = args;
		const container = canvas.getByTestId(testId);
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

		const clearButton = within(container).getByRole('button', { name: 'Clear' });
		await step('Click on Clear button', async () => {
			await userEvent.click(clearButton);
		});

		await step('Check if input is cleared when clear button is clicked', async () => {
			expect(input).toHaveValue('');
		});

		await step('Check if clear Button is not displayed', async () => {
			expect(clearButton).not.toBeInTheDocument();
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Username',
		value: 'initial value',
		onValueChange: mockedOnValueChange,
		clearable: true
	},
	render(args) {
		const { onValueChange } = args;
		const [value, setValue] = useState(args.value);

		const handleValueChange = (value: string) => {
			if (onValueChange) onValueChange(value);
			setValue(value);
		};

		return (
			<div>
				<TextInput {...args} value={value} onValueChange={handleValueChange} />
				<p className="ml-2 mt-3" aria-label="Displayed value">
					Value: {value}
				</p>
			</div>
		);
	},

	play: async ({ canvas, args, step }) => {
		const { label = '' } = args;

		const input = canvas.getByLabelText(label);
		await step('Check if input displays initial value', async () => {
			expect(input).toHaveValue(args.value);
		});

		await step('Type in value into TextInput', async () => {
			await userEvent.type(input, ' new value');
		});

		await step('Check if onValueChange is called with correct arguments', async () => {
			expect(mockedOnValueChange).toBeCalled();
			expect(mockedOnValueChange.mock.lastCall).toEqual(['initial value new value']);

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: initial value new value');
		});

		await step('Check if clear button is displayed', () => {
			const clearButton = canvas.getByRole('button', { name: 'Clear' });
			expect(clearButton).toBeInTheDocument();
		});

		await step('Click in Clear button', async () => {
			const clearButton = canvas.getByRole('button', { name: 'Clear' });
			await userEvent.click(clearButton);
		});

		await step('Check if value should be empty string when user clicks clear button', async () => {
			expect(mockedOnValueChange).toBeCalled();
			expect(mockedOnValueChange.mock.lastCall).toEqual(['']);

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value:');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		disabled: true,
		value: 'john doe'
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
			const requiredSymbol = canvas.getByText('*');
			expect(requiredSymbol).toBeVisible();
			expect(input).toBeRequired();
		});
	}
};

export const Sizes: Story = {
	render() {
		return (
			<div className="flex flex-col gap-4">
				<TextInput label="Small" size="small" placeholder="Enter your email" />
				<TextInput label="Medium" size="medium" placeholder="Enter your email" />
			</div>
		);
	}
};

export const Statuses: Story = {
	render() {
		return (
			<div className="flex flex-col gap-4">
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
};
