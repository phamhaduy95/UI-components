import type { Meta, StoryObj } from '@storybook/react-vite';
import DateRangePicker from '@components/DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
	title: 'Components/FormField/DateRangePicker',
	component: DateRangePicker,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'onValueChange' },
		onOpenChange: { action: 'onOpenChange' }
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default date range picker with a label.
 */
export const Default: Story = {
	args: {
		label: 'Select a range'
	}
};

/**
 * Date range picker with a pre-selected range.
 */
export const WithValue: Story = {
	args: {
		label: 'Selected range',
		value: ['2024-05-20', '2024-05-25']
	}
};

/**
 * Date range picker without a label.
 */
export const NoLabel: Story = {
	args: {
		'aria-label': 'Select date range'
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		disabled: true
	}
};
