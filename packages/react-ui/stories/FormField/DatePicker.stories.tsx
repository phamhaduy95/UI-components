import type { Meta, StoryObj } from '@storybook/react-vite';
import DatePicker from '@components/DatePicker';

const meta: Meta<typeof DatePicker> = {
	title: 'Components/FormField/DatePicker',
	component: DatePicker,
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
 * The default date picker with a label.
 */
export const Default: Story = {
	args: {
		label: 'Select a date',
		format: 'MMMM DD, YYYY'
	}
};

export const Clearable: Story = {
	args: {
		label: 'Clearable',
		clearable: true
	}
};

// /**
//  * Date picker with a pre-selected value.
//  */
// export const WithValue: Story = {
// 	args: {
// 		label: 'Selected date',
// 		value: '2024-05-20'
// 	}
// };

// /**
//  * Date picker without a label.
//  */
// export const NoLabel: Story = {
// 	args: {
// 		'aria-label': 'Select date'
// 	}
// };

// export const Disabled: Story = {
// 	args: {
// 		label: 'Disabled date picker',
// 		disabled: true
// 	}
// };
