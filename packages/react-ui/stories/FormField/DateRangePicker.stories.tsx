import type { Meta, StoryObj } from '@storybook/react-vite';
import DateRangePicker from '@components/DateRangePicker';
import { expect, userEvent, within, fireEvent, screen } from 'storybook/test';
import dayjs from 'dayjs';
import { useState } from 'react';

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
	},
	args: {
		'data-testid': 'date-range-picker'
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default date range picker with a label.
 */
export const Basic: Story = {
	args: {
		label: 'Select a range',
		format: 'DD MMMM, YYYY',
		supportingText: 'Select a range of dates'
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', supportingText = '', 'data-testid': dataTestId = '', format } = args;

		await step(
			'Check if the date range picker and its subcomponents are rendered correctly',
			async () => {
				const container = canvas.getByTestId(dataTestId);
				expect(container).toBeInTheDocument();

				const dateInput = within(container).getByText(label);
				expect(dateInput).toBeInTheDocument();

				const supportingTextEl = within(container).getByText(supportingText);
				expect(supportingTextEl).toBeInTheDocument();

				const calendarButton = within(container).getByRole('button', { name: 'Open calendar' });
				expect(calendarButton).toBeInTheDocument();

				const rangeDisplay = within(container).getByRole('paragraph', {
					name: 'date range display'
				});
				expect(rangeDisplay).toBeInTheDocument();
				expect(rangeDisplay.textContent).toBe(`${format}\u2014${format}`);
			}
		);

		await step(
			'Check if calendar popup is rendered when user click on trigger button',
			async () => {
				const container = canvas.getByTestId(dataTestId);

				const calendarButton = within(container).getByRole('button', { name: 'Open calendar' });

				const calendarId = calendarButton.getAttribute('aria-controls');
				await userEvent.click(calendarButton);

				const calendarPopup = await screen.findByLabelText('calendar', {
					selector: `[id='${calendarId}']`
				});
				expect(calendarPopup).toBeVisible();

				await step('Verify Calendar UI', async () => {
					const calendarHeading = dayjs().format('MMMM YYYY');
					const calendarHeadingEl = within(calendarPopup).getByText(calendarHeading);
					expect(calendarHeadingEl).toBeInTheDocument();

					const prevButton = within(calendarPopup).getByRole('button', {
						name: 'Switch to previous month'
					});
					expect(prevButton).toBeInTheDocument();

					const nextButton = within(calendarPopup).getByRole('button', {
						name: 'Switch to next month'
					});
					expect(nextButton).toBeInTheDocument();

					const calendarGrid = within(calendarPopup).getByRole('grid');
					expect(calendarGrid).toBeInTheDocument();
				});
			}
		);

		await step(
			'Check if Calendar popup is closed when user click on trigger button again',
			async () => {
				const container = canvas.getByTestId(dataTestId);

				const calendarButton = within(container).getByRole('button', { name: 'Close calendar' });

				const calendarId = calendarButton.getAttribute('aria-controls');
				await userEvent.click(calendarButton);

				const calendarPopup = await screen.findByLabelText('calendar', {
					selector: `[id='${calendarId}']`
				});

				expect(calendarPopup).not.toBeVisible();
			}
		);
	}
};

/**
 * Date range picker with a pre-selected range.
 */
export const WithDefaultValue: Story = {
	args: {
		label: 'Selected range',
		defaultValue: ['2024-05-20', '2024-05-25']
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', supportingText = '', 'data-testid': dataTestId = '', format } = args;
		const datepickerInput = canvas.getByLabelText(label) as HTMLInputElement;
		expect(datepickerInput).toBeInTheDocument();

		const dateRange = '2025-05-22,2026-05-25';

		await fireEvent.change(datepickerInput, { target: { value: dateRange } });
	}
};

export const Controllable: Story = {
	args: {
		label: 'Controllable',
		value: ['2024-05-20', '2024-05-21']
	},

	render: (args) => {
		const [value, setValue] = useState<string[] | undefined>(args.value as string[]);
		return (
			<div className="flex flex-col gap-2">
				<DateRangePicker
					{...args}
					value={value}
					onValueChange={(value) => {
						setValue(value);
					}}
				/>
				<p>Current value: {value?.join(' - ')}</p>
			</div>
		);
	},
	play: async ({ canvas, args, step }) => {
		const { label = '', supportingText = '', 'data-testid': dataTestId = '', format } = args;
		const datepickerInput = canvas.getByLabelText(label) as HTMLInputElement;
		expect(datepickerInput).toBeInTheDocument();

		const dateRange = '2025-05-22,2026-05-25';

		await fireEvent.change(datepickerInput, { target: { value: dateRange } });
	}
};

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		disabled: true
	}
};

export const Clearable: Story = {
	args: {
		label: 'Clearable'
	}
};

export const Status: Story = {
	args: {},

	render: (args) => {
		return (
			<div className="flex flex-col gap-4">
				<DateRangePicker
					{...args}
					label="Error"
					status="error"
					supportingText="This is an error message"
				/>
				<DateRangePicker
					{...args}
					label="Warning"
					status="warning"
					supportingText="This is a warning message"
				/>
				<DateRangePicker
					{...args}
					label="Success"
					status="success"
					supportingText="This is a success message"
				/>
			</div>
		);
	}
};
