import type { Meta, StoryObj } from '@storybook/react-vite';
import TextInput from '@components/TextInput';
import { useState } from 'react';

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
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default text input with a label.
 */
export const Default: Story = {
	args: {
		label: 'Email',
		placeholder: 'Enter your email',
		supportingText: 'Please enter your email address.'
	}
};

/**
 * Text input with a value.
 */
export const Controllable: Story = {
	args: {
		label: 'Username',
		value: 'john doe'
	},
	render(args) {
		const [value, setValue] = useState(args.value);

		return (
			<div>
				<TextInput
					{...args}
					value={value}
					onValueChange={setValue}
				/>

				<p className="ml-2 mt-3">Value: {value}</p>
			</div>
		);
	}
};

/**
 * Text input with error status.
 */
export const Error: Story = {
	args: {
		label: 'Email',
		value: 'invalid-email',
		status: 'error',
		supportingText: 'Please enter a valid email address.'
	}
};

/**
 * Disabled text input.
 */
export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		disabled: true,
		placeholder: 'You cannot type here'
	}
};

/**
 * Required text input.
 */
export const Required: Story = {
	args: {
		label: 'Required Field',
		required: true,
		placeholder: 'This field is required',
		supportingText: 'This field is required'
	}
};

/**
 * Clearable text input.
 */
export const Clearable: Story = {
	args: {
		label: 'Search',
		clearable: true
	}
};
