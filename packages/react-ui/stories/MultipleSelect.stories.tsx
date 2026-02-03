import type { Meta, StoryObj } from '@storybook/react-vite';
import MultipleSelect from '@components/MultipleSelect';

const meta: Meta<typeof MultipleSelect> = {
	title: 'Components/MultipleSelect',
	component: MultipleSelect,
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
 * The default multiple select with a label.
 */
export const Default: Story = {
	args: {
		label: 'Frameworks',
		placeholder: 'Select frameworks',
		items
	}
};

/**
 * Multiple select with pre-selected values.
 */
export const WithValues: Story = {
	args: {
		label: 'Frameworks',
		value: ['react', 'vue'],
		items
	}
};

/**
 * Multiple select with error status.
 */
export const Error: Story = {
	args: {
		label: 'Frameworks',
		status: 'error',
		supportingText: 'Please select at least one framework.',
		items
	}
};
