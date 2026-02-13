import type { Meta, StoryObj } from '@storybook/react-vite';
import DatePicker from '@components/DatePicker';
import { useState } from 'react';
import { getDateCellAriaLabel, formatDate } from '../utils/date';
import { expect, within, userEvent, screen, fn } from 'storybook/test';

const mockedOnValueChange = fn();

const triggerButtonLabel = 'Open calendar';
const clearButtonLabel = 'Clear value';

const meta: Meta<typeof DatePicker> = {
	title: 'Components/FormField/DatePicker',
	component: DatePicker,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'onValueChange' },
		onOpenChange: { action: 'onOpenChange' },
		status: {
			control: 'select',
			options: ['default', 'error', 'success', 'warning']
		},
		disabled: { control: 'boolean' },
		clearable: { control: 'boolean' }
	},
	args: {
		label: 'Select a date',
		format: 'DD-MM-YYYY',
		supportingText: 'Please select a date.'
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default date picker with a label.
 */
export const Default: Story = {
	args: {
		'data-testid': 'datepicker-default'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', label = '', supportingText = '', format = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if label exists', async () => {
			const labelElement = within(container).getByText(label);
			expect(labelElement).toBeInTheDocument();
		});

		await step('Check if placeholder exists', async () => {
			// DatePicker renders a p tag for display
			const displayArea = container.querySelector('.DatePicker_DisplayArea');
			expect(displayArea).toBeInTheDocument();
			expect(displayArea).toHaveTextContent(format);
		});

		await step('Check if supporting text exists', async () => {
			const supportingTextEl = within(container).getByText(supportingText);
			expect(supportingTextEl).toBeInTheDocument();
		});

		await step('Check if trigger exists', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			expect(trigger).toBeInTheDocument();
		});
	}
};

export const SelectDateViaCalendar: Story = {
	args: {
		label: 'Select a date',
		'data-testid': 'datepicker-flow'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', format = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Open calendar by clicking the calendar icon', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);
		});

		await step('Check if calendar popover is visible', async () => {
			const calendar = screen.getByRole('application', { name: 'calendar' });
			expect(calendar).toBeInTheDocument();
		});

		const selectedDate = '2026-02-17';

		await step('Select a date', async () => {
			const calendar = screen.getByRole('application', { name: 'calendar' });
			const dateCell = within(calendar).getAllByRole('button', {
				name: getDateCellAriaLabel(selectedDate)
			});
			await userEvent.click(dateCell[0]);
		});

		await step('Check if calendar is closed after selection', async () => {
			const calendar = screen.queryByRole('application', { name: 'calendar' });
			expect(calendar).not.toBeInTheDocument();
		});

		await step('Check if date is displayed in the input', async () => {
			const dateAsText = formatDate(selectedDate as string, format);
			const displayArea = within(container).getByText(dateAsText);
			expect(displayArea).toBeInTheDocument();
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Pre-selected date',
		defaultValue: '2024-05-15',
		format: 'DD-MM-YYYY',
		'data-testid': 'datepicker-with-default-value',
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', format = '', defaultValue = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if display shows the default date', async () => {
			const dateAsText = formatDate(defaultValue as string, format);
			const selectedDate = within(container).getByText(dateAsText);
			expect(selectedDate).toBeInTheDocument();
		});

		await step('Check if clear icon exists', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeInTheDocument();
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Clearable date',
		clearable: true,
		'data-testid': 'datepicker-clearable'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', format = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if clear button does not exist when no date selected', async () => {
			const clearButton = within(container).queryByRole('button', { name: clearButtonLabel });
			expect(clearButton).not.toBeInTheDocument();
		});

		await step('Select Date', async () => {
			const selectedDate = '2026-02-17';
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);

			const calendar = screen.getByRole('application', { name: 'calendar' });
			const dateCell = within(calendar).getAllByRole('button', {
				name: getDateCellAriaLabel(selectedDate)
			});
			await userEvent.click(dateCell[0]);
		});

		await step('Check if clear button appear', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeInTheDocument();
		});

		await step('Click clear button', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if value is cleared and  placeholder is displayed instead', async () => {
			const displayArea = within(container).getByText(format);
			expect(displayArea).toBeInTheDocument();
			expect(displayArea).toHaveAttribute('data-greyout', 'true');
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Controlled date',
		value: '2024-05-15',
		onValueChange: mockedOnValueChange,
		'data-testid': 'datepicker-controlled',
		clearable: true
	},
	render: (args) => {
		const { value: initialValue, onValueChange } = args;
		const [value, setValue] = useState(initialValue);
		return (
			<div className="flex flex-col gap-2">
				<DatePicker
					{...args}
					value={value}
					onValueChange={(value) => {
						setValue(value);
						if (onValueChange) {
							onValueChange(value);
						}
					}}
				/>
				<p aria-label="selected-value">Selected: {value?.toString()}</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Open calendar', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);
		});

		const selectedDate = '2024-05-18';
		await step('Select date', async () => {
			const calendar = screen.getByRole('application', { name: 'calendar' });

			const dateCell = within(calendar).getByRole('button', {
				name: getDateCellAriaLabel(selectedDate)
			});
			await userEvent.click(dateCell);
		});

		await step('Check if external state is updated', async () => {
			const selectedValue = canvas.getByLabelText('selected-value');
			expect(selectedValue).toHaveTextContent('Selected: ' + selectedDate);
		});

		await step('Check if onValueChange was called', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith(selectedDate);
		});

		await step('Clear value', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if external state is cleared', async () => {
			const selectedValue = canvas.getByLabelText('selected-value');
			expect(selectedValue).toHaveTextContent('Selected:');
		});

		await step('Check if onValueChange was called with empty string', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith('');
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled date picker',
		disabled: true,
		value: '2024-05-15',
		'data-testid': 'datepicker-disabled'
	}
};

export const Required: Story = {
	args: {
		label: 'Required date',
		required: true,
		'data-testid': 'datepicker-required'
	}
};

export const Status: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<DatePicker {...args} status="error" label="Error status" supportingText="Invalid date" />
			<DatePicker
				{...args}
				status="success"
				label="Success status"
				supportingText="Date is available"
			/>
			<DatePicker
				{...args}
				status="warning"
				label="Warning status"
				supportingText="Date is almost fully booked"
			/>
		</div>
	)
};

export const Size: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<DatePicker {...args} size="small" label="Small size" />
			<DatePicker {...args} size="medium" label="Medium size" />
		</div>
	)
};
