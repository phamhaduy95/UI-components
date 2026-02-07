import type { Meta, StoryObj } from '@storybook/react-vite';
import TextInput from '@components/TextInput';

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
		labelText: 'Email',
		placeholder: 'Enter your email'
	}
};

/**
 * Text input with a value.
 */
export const WithValue: Story = {
	args: {
		labelText: 'Username',
		value: 'johndoe'
	}
};

/**
 * Text input with error status.
 */
export const Error: Story = {
	args: {
		labelText: 'Email',
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
		labelText: 'Disabled Input',
		disabled: true,
		placeholder: 'You cannot type here'
	}
};

/**
 * Required text input.
 */
export const Required: Story = {
	args: {
		labelText: 'Required Field',
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
		labelText: 'Search',
		value: 'Search query',
		clearable: true
	}
};
