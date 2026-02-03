import type { Meta, StoryObj } from '@storybook/react-vite';
import SingleCombobox from '@components/SingleCombobox';

const meta: Meta<typeof SingleCombobox> = {
	title: 'Components/Combobox',
	component: SingleCombobox,
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
 * The default single combobox with a label.
 */
export const Default: Story = {
	args: {
		label: 'Framework',
		placeholder: 'Search for a framework',
		items,
		open: true
	}
};

/**
 * Single combobox with a pre-selected value.
 */
export const WithValue: Story = {
	args: {
		label: 'Framework',
		value: 'react',
		items
	}
};

/**
 * Single combobox with error status.
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
 * Disabled single combobox.
 */
export const Disabled: Story = {
	args: {
		label: 'Framework',
		disabled: true,
		items
	}
};
