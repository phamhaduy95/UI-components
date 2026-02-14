import type { Meta, StoryObj } from '@storybook/react-vite';
import PasswordInput from '@components/PasswordInput';
import Button from '@components/Button';
import { useState } from 'react';
import { expect, within, userEvent, fn } from 'storybook/test';

const mockedOnValueChange = fn();
const mockedOnVisibilityChange = fn();

const toggleTriggerLabel = 'Toggle password visibility';
const clearButtonLabel = 'Clear value';

const meta: Meta<typeof PasswordInput> = {
	title: 'Components/FormField/PasswordInput',
	component: PasswordInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onChange: { action: 'onChange' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		}
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnVisibilityChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Password',
		placeholder: 'Enter your password',
		supportingText: 'Please enter strong password.',
		'data-testid': `password-input`
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
		clearable: true,
		'data-testid': 'password-input-with-default-value'
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', defaultValue = '', 'data-testid': testId = '' } = args;
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
			const input = canvas.getByLabelText(label);
			expect(input).toHaveValue('');
		});
	}
};

export const Visiable: Story = {
	args: {
		label: 'Visiable Password',
		visible: true,
		defaultValue: 'password',
		onVisibilityChange: mockedOnVisibilityChange,
		'data-testid': 'password-input-visiable'
	},
	render(args) {
		const { visible: externalVisible, ...rest } = args;
		const [visiable, setVisiable] = useState<boolean>(Boolean(externalVisible));

		const handleVisibilityChange = (visible: boolean) => {
			if (args.onVisibilityChange) {
				console.log(visible);
				args.onVisibilityChange(visible);
			}
			setVisiable(visible);
		};

		return (
			<div>
				<Button className="mb-4" onClick={() => setVisiable(!visiable)}>
					Toggle Visibility
				</Button>
				<PasswordInput {...rest} visible={visiable} onVisibilityChange={handleVisibilityChange} />
			</div>
		);
	},

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
		value: 'initial_password',
		onValueChange: mockedOnValueChange
	},
	render(args) {
		const { onValueChange, value: externalValue } = args;
		const [value, setValue] = useState<string | undefined>(externalValue);

		const handleValueChange = (value: string) => {
			if (onValueChange) onValueChange(value);
			setValue(value);
		};

		return (
			<div>
				<PasswordInput {...args} value={value} onValueChange={handleValueChange} />
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

		await step('Type in value into PasswordInput', async () => {
			await userEvent.clear(input);
			await userEvent.type(input, '_new_value', { delay: 5 });
		});

		await step('Check if onChange is called with correct arguments', async () => {
			expect(mockedOnValueChange).toBeCalled();

			const displayedValue = canvas.getByLabelText('Displayed value');
			expect(displayedValue).toHaveTextContent('Value: initial_password_new_value');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Password',
		disabled: true,
		value: 'secret'
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
	render() {
		return (
			<div className="flex flex-col gap-4">
				<PasswordInput label="Small" size="small" placeholder="Password" />
				<PasswordInput label="Medium" size="medium" placeholder="Password" />
			</div>
		);
	}
};

export const Statuses: Story = {
	render() {
		return (
			<div className="flex flex-col gap-4">
				<PasswordInput
					label="Error"
					placeholder="Password"
					supportingText="Password too weak."
					status="error"
					autoComplete="new-password"
				/>
				<PasswordInput
					label="Warning"
					placeholder="Password"
					supportingText="Password could be stronger."
					status="warning"
					autoComplete="new-password"
				/>
				<PasswordInput
					label="Success"
					placeholder="Password"
					supportingText="Strong password."
					status="success"
					autoComplete="current-password"
				/>
			</div>
		);
	}
};
