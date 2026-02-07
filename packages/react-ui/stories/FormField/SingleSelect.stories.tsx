import type { Meta, StoryObj } from '@storybook/react-vite';
import SingleSelect from '@components/SingleSelect';

const meta: Meta<typeof SingleSelect> = {
	title: 'Components/FormField/SingleSelect',
	component: SingleSelect,
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

const items = [
	{ label: 'React', value: 'react' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Svelte', value: 'svelte' }
];

/**
 * The default single select with a label.
 */
export const Default: Story = {
	args: {
		label: 'Framework',
		placeholder: 'Select a framework',
		items
	}
};

/**
 * Single select with a pre-selected value.
 */
export const WithValue: Story = {
	args: {
		label: 'Framework',
		value: 'react',
		items
	}
};

/**
 * Single select with error status.
 */
export const Error: Story = {
	args: {
		label: 'Framework',
		status: 'error',
		supportingText: 'Please select a framework.',
		items
	}
};

/**
 * Disabled single select.
 */
export const Disabled: Story = {
	args: {
		label: 'Framework',
		disabled: true,
		items
	}
};

/**
 * Clearable single select.
 */
export const Clearable: Story = {
	args: {
		label: 'Framework',
		clearable: true,
		items
	}
};
