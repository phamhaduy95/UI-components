import type { Meta, StoryObj } from '@storybook/react-vite';
import DateRangePicker from '@components/DateRangePicker';
import { useState } from 'react';
import { getDateCellAriaLabel, formatDate } from '../utils/date';

import { expect, within, userEvent, screen, fn } from 'storybook/test';

const mockedOnValueChange = fn();

const triggerButtonLabel = 'Open calendar';
const clearButtonLabel = 'Clear value';

const dateRangeDisplayLabel = 'date range display';

const meta: Meta<typeof DateRangePicker> = {
	title: 'Components/FormField/DateRangePicker',
	component: DateRangePicker,
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
		label: 'Select a range',
		format: 'DD-MM-YYYY',
		supportingText: 'Please select a date range.'
	},
	beforeEach() {
		mockedOnValueChange.mockClear();
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default date range picker with a label.
 */
export const Default: Story = {
	args: {
		'data-testid': 'daterangepicker-default'
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

		await step('Check if placeholders exist', async () => {
			const displayArea = within(container).getByLabelText(dateRangeDisplayLabel);
			expect(displayArea).toBeInTheDocument();
			expect(displayArea).toHaveTextContent(`${format}\u2014${format}`);
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

export const SelectRangeViaCalendar: Story = {
	args: {
		label: 'Select a range',
		'data-testid': 'daterangepicker-flow'
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

		const startDate = '2026-02-10';
		const endDate = '2026-02-15';

		await step('Select start date', async () => {
			const calendar = screen.getByRole('application', { name: 'calendar' });
			const startDateCell = within(calendar).getByRole('button', {
				name: getDateCellAriaLabel(startDate)
			});
			await userEvent.click(startDateCell);
		});

		await step('Select end date', async () => {
			const calendar = screen.getByRole('application', { name: 'calendar' });
			const endDateCell = within(calendar).getByRole('button', {
				name: getDateCellAriaLabel(endDate)
			});
			await userEvent.click(endDateCell);
		});

		await step('Check if calendar is closed after range selection', async () => {
			const calendar = screen.queryByRole('application', { name: 'calendar' });
			expect(calendar).not.toBeInTheDocument();
		});

		await step('Check if range is displayed in the input', async () => {
			const startText = formatDate(startDate, format);
			const endText = formatDate(endDate, format);
			const displayArea = within(container).getByLabelText(dateRangeDisplayLabel);
			expect(displayArea).toHaveTextContent(`${startText}\u2014${endText}`);
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Pre-selected range',
		defaultValue: ['2024-05-20', '2024-05-25'],
		format: 'DD-MM-YYYY',
		'data-testid': 'daterangepicker-with-default-value',
		clearable: true
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', format = '', defaultValue = [] } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if display shows the default range', async () => {
			const startText = formatDate(defaultValue[0] as string, format);
			const endText = formatDate(defaultValue[1] as string, format);
			const displayArea = within(container).getByLabelText(dateRangeDisplayLabel);
			expect(displayArea).toHaveTextContent(`${startText}\u2014${endText}`);
		});

		await step('Check if clear icon exists', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeInTheDocument();
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Clearable range',
		clearable: true,
		'data-testid': 'daterangepicker-clearable'
	},
	play: async ({ canvas, args, step }) => {
		const { 'data-testid': testId = '', format = '' } = args;
		const container = canvas.getByTestId(testId);

		await step('Check if clear button does not exist when no range selected', async () => {
			const clearButton = within(container).queryByRole('button', { name: clearButtonLabel });
			expect(clearButton).not.toBeInTheDocument();
		});

		await step('Select Range', async () => {
			const start = '2026-02-10';
			const end = '2026-02-12';
			const trigger = within(container).getByRole('button', { name: triggerButtonLabel });
			await userEvent.click(trigger);

			const calendar = screen.getByRole('application', { name: 'calendar' });

			const startCell = within(calendar).getByRole('button', {
				name: getDateCellAriaLabel(start)
			});
			await userEvent.click(startCell);

			const endCell = within(calendar).getByRole('button', {
				name: getDateCellAriaLabel(end)
			});
			await userEvent.click(endCell);
		});

		await step('Check if clear button appear', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearButton).toBeInTheDocument();
		});

		await step('Click clear button', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if value is cleared and placeholders are displayed', async () => {
			const displayArea = within(container).getByLabelText(dateRangeDisplayLabel);
			expect(displayArea).toHaveTextContent(`${format}\u2014${format}`);
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Controlled range',
		value: ['2024-05-15', '2024-05-20'],
		onValueChange: mockedOnValueChange,
		'data-testid': 'daterangepicker-controlled',
		clearable: true
	},
	render: (args) => {
		const { value: initialValue, onValueChange } = args;
		const [value, setValue] = useState(initialValue);
		return (
			<div className="flex flex-col gap-2">
				<DateRangePicker
					{...args}
					value={value}
					onValueChange={(val) => {
						setValue(val);
						if (onValueChange) {
							onValueChange(val);
						}
					}}
				/>
				<p aria-label="selected-value">Selected: {value?.join(' - ')}</p>
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

		const start = '2024-05-18';
		const end = '2024-05-22';
		await step('Select start date', async () => {
			const calendar = screen.getByRole('application', { name: 'calendar' });
			const cell = within(calendar).getByRole('button', {
				name: getDateCellAriaLabel(start)
			});
			await userEvent.click(cell);
		});

		await step('Select end date', async () => {
			const calendar = screen.getByRole('application', { name: 'calendar' });
			const cell = within(calendar).getByRole('button', {
				name: getDateCellAriaLabel(end)
			});
			await userEvent.click(cell);
		});

		await step('Check if external state is updated', async () => {
			const selectedValue = canvas.getByLabelText('selected-value');
			expect(selectedValue).toHaveTextContent(`${start} - ${end}`);
		});

		await step('Check if onValueChange was called', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith([start, end]);
		});

		await step('Clear value', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if external state is cleared', async () => {
			const selectedValue = canvas.getByLabelText('selected-value');
			expect(selectedValue).toHaveTextContent('Selected:');
		});

		await step('Check if onValueChange was called', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith([]);
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled range picker',
		disabled: true,
		value: ['2024-05-15', '2024-05-20'],
		'data-testid': 'daterangepicker-disabled'
	}
};

export const Required: Story = {
	args: {
		label: 'Required range',
		required: true,
		'data-testid': 'daterangepicker-required'
	}
};

export const Status: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<DateRangePicker
				{...args}
				status="error"
				label="Error status"
				supportingText="Invalid range"
			/>
			<DateRangePicker
				{...args}
				status="success"
				label="Success status"
				supportingText="Range is available"
			/>
			<DatePickerStatusWrapper args={args} />
		</div>
	)
};

// Helper component for Status story to avoid hook issues if needed,
// though direct render usually works in Storybook CSP.
const DatePickerStatusWrapper = ({ args }: { args: any }) => (
	<DateRangePicker
		{...args}
		status="warning"
		label="Warning status"
		supportingText="Range is almost fully booked"
	/>
);

export const Size: Story = {
	render: (args) => (
		<div className="flex flex-col gap-4">
			<DateRangePicker {...args} size="small" label="Small size" />
			<DateRangePicker {...args} size="medium" label="Medium size" />
		</div>
	)
};
