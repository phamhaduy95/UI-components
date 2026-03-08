import dayjs from 'dayjs';
import { useState } from 'react';
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';

import { DatePicker } from '@components/DatePicker';

import { formatDate, getDateCellAriaLabel } from '@stories/utils/date';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockedOnValueChange = fn();
const mockedOnOpenChange = fn();

const triggerButtonLabel = 'Open calendar';
const clearButtonLabel = 'Clear value';

const baseDate = dayjs(new Date(2024, 11, 12)); // December 12, 2024
const defaultDate = baseDate.add(-10, 'day');
const dateFormat = 'DD-MM-YYYY';

const meta = {
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
		format: { control: 'text' },
		clearable: { control: 'boolean' },
		disabled: { control: 'boolean' },
		required: { control: 'boolean' },
		supportingText: { control: 'text' }
	},
	args: {
		'data-testid': 'date-picker-default',
		supportingText: 'Please select a date.',
		format: dateFormat,
		onValueChange: mockedOnValueChange,
		onOpenChange: mockedOnOpenChange,
		defaultValue: defaultDate.toDate()
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnOpenChange.mockClear();
	}
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Birth Date',
		supportingText: 'Please choose your birth date.',
		placeholder: 'Select Date',
		defaultValue: undefined
	},
	play: async ({ canvas, args, step }) => {
		const {
			'data-testid': dataTestid = '',
			label = '',
			supportingText = '',
			placeholder = ''
		} = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if label exists', async () => {
			const labelElement = within(container).getByText(label);
			expect(labelElement).toBeInTheDocument();
		});

		await step('Check if placeholder is showed', async () => {
			const displayArea = container.querySelector('.DatePicker_InputField');
			expect(displayArea).toBeInTheDocument();
			expect(displayArea).toHaveTextContent(placeholder);
		});

		await step('Check if supporting text is rendered', async () => {
			const supportingTextElement = within(container).getByText(supportingText);
			expect(supportingTextElement).toBeInTheDocument();
		});

		await step('Check if trigger exists', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			expect(trigger).toBeInTheDocument();
		});
	}
};

export const OpenCalendarFlow: Story = {
	args: {
		label: 'Meeting Date'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Open calendar via trigger', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);
		});

		const calendarPopup = screen.getByRole('application', { name: 'calendar' });
		await step('Check if calendar popup is displayed', async () => {
			await waitFor(() => {
				expect(calendarPopup).toBeVisible();
			});
		});

		await step('Check if onOpenChange is triggered', async () => {
			expect(mockedOnOpenChange).toBeCalledWith(expect.objectContaining({ open: true }));
		});

		await step('Select a specific date', async () => {
			const label = getDateCellAriaLabel(baseDate.toDate());
			const dateButton = within(calendarPopup).getByRole('button', { name: label });
			await userEvent.click(dateButton);
		});

		await step('Check if calendar popup is closed', async () => {
			const closedCalendar = screen.queryByRole('application', { name: 'calendar' });
			expect(closedCalendar).not.toBeInTheDocument();
		});

		await step('Check if onOpenChange is triggered with false argument', async () => {
			expect(mockedOnOpenChange).toBeCalledWith(expect.objectContaining({ open: false }));
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Meeting Date',
		defaultValue: baseDate.toDate(),
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		const dateStr = formatDate(baseDate.toDate(), dateFormat);

		await step('Check if the display area shows the formatted default value', async () => {
			const displayArea = within(container).getByText(dateStr);
			expect(displayArea).toBeInTheDocument();
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Meeting Date',
		clearable: true,
		defaultValue: baseDate.toDate(),
		placeholder: 'Select Date'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': dataTestid = '', placeholder = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		const clearButton = within(container).getByRole('button', { name: clearButtonLabel });

		await step('Check if clear icon is displayed when there is a value', async () => {
			expect(clearButton).toBeVisible();
		});

		await step('Clear the selected date', async () => {
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear and placeholder is back', async () => {
			const displayArea = container.querySelector('.DatePicker_InputField');
			expect(displayArea).toHaveTextContent(placeholder as string);
		});
	}
};

export const Controllable: Story = {
	args: {
		clearable: true,
		value: baseDate.toDate()
	},
	render: (args) => {
		const { value: initialValue, onValueChange } = args;
		const [value, setValue] = useState(initialValue);

		const handleValueChange = (date: Date | null) => {
			if (onValueChange) {
				onValueChange(date);
			}
			setValue(date);
		};

		const displayedDate = value ? formatDate(value, dateFormat) : '';

		return (
			<div className="flex flex-col gap-2">
				<DatePicker {...args} value={value} onValueChange={handleValueChange} />
				<p className="mt-4" aria-label="selected-value">
					Selected Date: {displayedDate}
				</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if pre-selected value is shown', async () => {
			const dateStr = formatDate(baseDate.toDate(), dateFormat);
			const displayArea = within(container).getByText(dateStr);
			expect(displayArea).toBeInTheDocument();
		});

		await step('Check if displayed selected date is correct', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent(
				'Selected Date: ' + formatDate(baseDate.toDate(), dateFormat)
			);
		});

		const newDate = baseDate.add(1, 'day').toDate();

		await step('Choose new date via Calendar popup', async () => {
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);

			const calendarPopup = screen.getByRole('application', { name: 'calendar' });

			await waitFor(() => {
				expect(calendarPopup).toBeVisible();
			});

			const newDateStr = getDateCellAriaLabel(newDate);
			const dateButton = within(calendarPopup).getByRole('button', { name: newDateStr });
			await userEvent.click(dateButton);
		});

		await step('Check if external state is updated accordingly', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			await expect(displayedValue).toHaveTextContent(
				'Selected Date: ' + formatDate(newDate, dateFormat)
			);
		});

		await step('Check if onValueChange is triggered', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith(newDate);
		});

		await step('Clear all selected values via Clear button', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if external state is updated accordingly', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected Date:');
		});

		await step('Check if onValueChange is triggered with null', async () => {
			expect(mockedOnValueChange).toHaveBeenCalledWith(null);
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Meeting Date',
		disabled: true,
		'data-testid': 'date-picker-disabled'
	}
};

export const Required: Story = {
	args: {
		label: 'Meeting Date',
		required: true,
		'data-testid': 'date-picker-required'
	}
};

export const Status: Story = {
	render: (args) => (
		<div className="flex flex-col gap-2">
			<DatePicker
				{...args}
				status="error"
				label="Error"
				supportingText="Please select a valid date."
			/>
			<DatePicker
				{...args}
				status="success"
				label="Success"
				supportingText="Valid date selected."
			/>
			<DatePicker
				{...args}
				status="warning"
				label="Warning"
				supportingText="Date represents a warning."
			/>
		</div>
	)
};

export const Size: Story = {
	render: (args) => (
		<div className="flex flex-col gap-2">
			<DatePicker {...args} size="small" label="Small" />
			<DatePicker {...args} size="medium" label="Medium" />
		</div>
	)
};
