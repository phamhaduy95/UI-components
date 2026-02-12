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

export const Default: Story = {
	args: {
		label: 'Email',
		placeholder: 'Enter your email',
		supportingText: 'Please enter your email address.'
	}
};

export const Controllable: Story = {
	args: {
		label: 'Username',
		value: 'john doe'
	},
	render(args) {
		const [value, setValue] = useState(args.value);

		return (
			<div>
				<TextInput {...args} value={value} onValueChange={setValue} />

				<p className="ml-2 mt-3">Value: {value}</p>
			</div>
		);
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled Input',
		disabled: true,
		placeholder: 'You cannot type here'
	}
};

export const Required: Story = {
	args: {
		label: 'Required Field',
		required: true,
		placeholder: 'This field is required',
		supportingText: 'This field is required'
	}
};

export const Clearable: Story = {
	args: {
		label: 'Search',
		clearable: true
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
