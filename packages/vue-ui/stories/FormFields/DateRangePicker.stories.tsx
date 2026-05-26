import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { DateRangePicker } from '@components/DateRangePicker';
import { computed, ref } from 'vue';
import { expect, within, userEvent, screen, fn, waitFor } from 'storybook/test';

import { TrashIcon } from '@heroicons/vue/24/outline';
import dayjs from 'dayjs';
import { formatDate, getDateCellAriaLabel } from '@stories/utils/date';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();
const mockedOnUpdateOpen = fn();

const triggerButtonLabel = 'Open calendar';
const clearButtonLabel = 'Clear value';

const baseStartDate = dayjs('12-1-2024');
const baseEndDate = dayjs('12-1-2024');

const defaultDate = [baseStartDate.toDate(), baseEndDate.toDate()];
const dateFormat = 'DD-MM-YYYY';

const meta = {
	title: 'Components/FormField/DateRangePicker',
	component: DateRangePicker,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		onValueChange: { action: 'valueChange' },
		'onUpdate:modelValue': { action: 'update:modelValue' },
		'onUpdate:open': { action: 'update:open' },
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
		dataTestid: 'date-range-picker-default',
		supportingText: 'Please select a date range.',
		format: dateFormat,
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue,
		'onUpdate:open': mockedOnUpdateOpen,
		defaultValue: defaultDate
	},
	render: (args) => ({
		components: { DateRangePicker },
		setup() {
			return { args };
		},
		template: '<DateRangePicker v-bind="args" />'
	}),
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
		mockedOnUpdateOpen.mockClear();
	}
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Vacation Period',
		supportingText: 'Please choose your vacation period.',
		placeholder: 'Select Date Range'
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '', supportingText = '', placeholder = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		await step('Check if container exists', async () => {
			expect(container).toBeInTheDocument();
		});

		await step('Check if label exists', async () => {
			const dateInput = within(container).getByLabelText(label);
			expect(dateInput).toBeInTheDocument();
		});

		await step('Check if placeholder is showed', async () => {
			const dateInput = within(container).getByPlaceholderText(placeholder);
			expect(dateInput).toBeInTheDocument();
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
		label: 'Event Dates'
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
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

		await step('Check if update:open is triggered', async () => {
			expect(mockedOnUpdateOpen).toBeCalledWith(true);
		});

		await step('Select a specific date range', async () => {
			const startDate = baseStartDate.add(4, 'day').toDate();
			const endDate = baseEndDate.add(12, 'day').toDate();

			const startLabel = getDateCellAriaLabel(startDate);
			const endLabel = getDateCellAriaLabel(endDate);

			const startDateButton = within(calendarPopup).getByRole('button', { name: startLabel });
			await userEvent.click(startDateButton);

			const endDateButton = within(calendarPopup).getByRole('button', { name: endLabel });
			await userEvent.click(endDateButton);
		});

		await step('Check if update:open is triggered with false argument', async () => {
			await waitFor(() => {
				expect(mockedOnUpdateOpen).toBeCalledWith(false);
			});
		});
	}
};

export const WithDefaultValue: Story = {
	args: {
		label: 'Event Dates',
		defaultValue: [baseStartDate.toDate(), baseEndDate.toDate()],
		clearable: true
	},

	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const startDateStr = formatDate(baseStartDate.toDate(), dateFormat);
		const endDateStr = formatDate(baseEndDate.toDate(), dateFormat);

		await step(
			'Check if the display area shows the formatted default start and end values',
			async () => {
				const displayArea = container.querySelector("[data-part='control']");
				expect(displayArea).toHaveTextContent(`${startDateStr}\u2014${endDateStr}`);
			}
		);

		await step('Check if Clear Icon exist', async () => {
			const clearIcon = within(container).getByRole('button', { name: clearButtonLabel });
			expect(clearIcon).toBeVisible();
		});
	}
};

export const Clearable: Story = {
	args: {
		label: 'Event Dates',
		clearable: true,
		defaultValue: [baseStartDate.toDate(), baseEndDate.toDate()],
		dataTestid: 'date-range-picker-clearable'
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		const clearButton = within(container).getByRole('button', { name: 'Clear value' });

		await step('Check if clear icon is displayed when there is a value', async () => {
			expect(clearButton).toBeVisible();
		});

		await step('Clear the selected date', async () => {
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear and format placeholder is back', async () => {
			expect(clearButton).not.toBeVisible();
		});
	}
};

const initialDateRange = [baseStartDate.toDate(), baseEndDate.add(4, 'day').toDate()];

export const Controllable: Story = {
	args: {
		label: 'Event Dates',
		clearable: true,
		modelValue: initialDateRange
	},
	render: (args) => ({
		components: { DateRangePicker },
		setup() {
			const { 'onUpdate:modelValue': onUpdateModelValue, modelValue } = args;
			const selectedRange = ref(modelValue);

			const handleUpdateModelValue = (date: Date[]) => {
				if (onUpdateModelValue) {
					onUpdateModelValue(date);
				}
				selectedRange.value = date;
			};

			const displayedDateRange = computed(() => {
				return selectedRange.value
					? selectedRange.value.map((date) => formatDate(date, dateFormat)).join(' - ')
					: '';
			});

			return () => (
				<div class="flex flex-col gap-2">
					<DateRangePicker
						{...args}
						modelValue={selectedRange.value}
						onUpdate:modelValue={handleUpdateModelValue}
					/>
					<p class="mt-4" aria-label="selected-value">
						Selected Range: {displayedDateRange.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '' } = args;
		const container = canvas.getByTestId(dataTestid);
		const startDateStr = formatDate(initialDateRange[0]!, dateFormat);
		const endDateStr = formatDate(initialDateRange[1]!, dateFormat);

		await step('Check if pre-selected value is shown', async () => {
			const displayArea = container.querySelector("[data-part='control']");
			expect(displayArea).toHaveTextContent(`${startDateStr}\u2014${endDateStr}`);
		});

		await step('Check if displayed selected date is correct', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent(`Selected Range: ${startDateStr} - ${endDateStr}`);
		});

		const newStartDate = dayjs(initialDateRange[0]!).add(3, 'day');
		const newEndDate = dayjs(initialDateRange[1]!).add(10, 'day');

		await step('Choose new date via Calendar popup', async () => {
			const trigger = within(container).getByRole('button', { name: 'Open calendar' });
			await userEvent.click(trigger);

			const calendarPopup = screen.getByRole('application', { name: 'calendar' });

			await waitFor(() => {
				expect(calendarPopup).toBeVisible();
			});

			const newStartDateStr = getDateCellAriaLabel(newStartDate.toDate());
			const startDateButton = within(calendarPopup).getByRole('button', { name: newStartDateStr });
			await userEvent.click(startDateButton);

			const newEndDateStr = getDateCellAriaLabel(newEndDate.toDate());
			const endDateButton = within(calendarPopup).getByRole('button', { name: newEndDateStr });
			await userEvent.click(endDateButton);
		});

		await step('Check if external state is updated accordingly', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			await expect(displayedValue).toHaveTextContent(
				`Selected Range: ${formatDate(newStartDate.toDate(), dateFormat)} - ${formatDate(newEndDate.toDate(), dateFormat)}`
			);
		});

		await step('Check if onValueChange is triggered', async () => {
			expect(mockedOnValueChange).toHaveBeenLastCalledWith([
				newStartDate.toDate(),
				newEndDate.toDate()
			]);
		});

		await step('Check if onUpdate:modelValue is triggered', async () => {
			expect(mockedOnUpdateModelValue).toHaveBeenLastCalledWith([
				newStartDate.toDate(),
				newEndDate.toDate()
			]);
		});

		await step('Clear all selected values via Clear button', async () => {
			const clearButton = within(container).getByRole('button', { name: 'Clear value' });
			await userEvent.click(clearButton);
		});

		await step('Check if external state is updated accordingly', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected Range:');
		});

		await step('Check if onUpdate:modelValue is triggered', async () => {
			expect(mockedOnUpdateModelValue).toHaveBeenCalledWith([]);
		});

		await step('Check if onValueChange is triggered', async () => {
			expect(mockedOnValueChange).toHaveBeenCalledWith([]);
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Event Dates',
		disabled: true,
		dataTestid: 'date-range-picker-disabled'
	}
};

export const Required: Story = {
	args: {
		label: 'Event Dates',
		required: true,
		dataTestid: 'date-range-picker-required'
	}
};

export const Status: Story = {
	render: (args) => ({
		components: { DateRangePicker },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
					<DateRangePicker
						{...args}
						status="error"
						label="Error"
						supportingText="Please select a valid date."
					/>
					<DateRangePicker
						{...args}
						status="success"
						label="Success"
						supportingText="Valid date selected."
					/>
					<DateRangePicker
						{...args}
						status="warning"
						label="Warning"
						supportingText="Date represents a warning."
					/>
				</div>
			);
		}
	})
};

export const Size: Story = {
	render: (args) => ({
		components: { DateRangePicker },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
					<DateRangePicker {...args} size="xs" label="Extra Small" />
					<DateRangePicker {...args} size="sm" label="Small" />
					<DateRangePicker {...args} size="md" label="Medium" />
					<DateRangePicker {...args} size="lg" label="Large" />
				</div>
			);
		}
	})
};

export const CustomTriggerIcon: Story = {
	args: {
		label: 'Delete Scheduling',
		dataTestid: 'date-range-picker-custom-trigger'
	},
	render: (args) => ({
		components: { DateRangePicker, TrashIcon },
		setup() {
			return { args };
		},
		template: `
        <DateRangePicker v-bind="args">
            <template #triggerIcon>
                <TrashIcon />
            </template>
        </DateRangePicker>
        `
	})
};
