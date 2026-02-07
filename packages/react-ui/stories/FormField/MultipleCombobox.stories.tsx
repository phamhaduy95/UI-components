import type { Meta, StoryObj } from '@storybook/react-vite';
import MultipleCombobox from '@components/MultipleCombobox';

const meta: Meta<typeof MultipleCombobox> = {
	title: 'Components/FormField/MultipleCombobox',
	component: MultipleCombobox,
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
	{ label: 'Svelte', value: 'svelte' },
	{ label: 'Next.js', value: 'nextjs' },
	{ label: 'Nuxt.js', value: 'nuxtjs' },
	{ label: 'Remix', value: 'remix' },
	{ label: 'Astro', value: 'astro' }
];

/**
 * The default multiple combobox with a label.
 */
export const Default: Story = {
	args: {
		label: 'Frameworks',
		placeholder: 'Search for frameworks',
		items
	}
};

/**
 * Multiple combobox with pre-selected values.
 */
export const WithValues: Story = {
	args: {
		label: 'Frameworks',
		value: ['react', 'vue'],
		items
	}
};

/**
 * Multiple combobox with error status.
 */
export const Error: Story = {
	args: {
		label: 'Frameworks',
		status: 'error',
		supportingText: 'Please select at least one framework.',
		items
	}
};
