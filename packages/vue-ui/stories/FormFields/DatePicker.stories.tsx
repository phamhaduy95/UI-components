import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { DatePicker } from '@components/DatePicker';
import { computed, ref } from 'vue';
import { expect, within, userEvent, screen, fn, waitFor, fireEvent } from 'storybook/test';

import { TrashIcon } from '@heroicons/vue/24/outline';
import dayjs from 'dayjs';
import { formatDate, getDateCellAriaLabel } from '@stories/utils/date';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();
const mockedOnUpdateOpen = fn();

const triggerButtonLabel = 'Open calendar';
const clearButtonLabel = 'Clear value';

const baseDate = dayjs('12/12/2024');
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
		dataTestid: 'date-picker-default',
		supportingText: 'Please select a date.',
		format: dateFormat,
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue,
		'onUpdate:open': mockedOnUpdateOpen,
		defaultValue: defaultDate.toDate()
	},
	render: (args) => ({
		components: { DatePicker },
		setup() {
			return { args };
		},
		template: '<DatePicker v-bind="args" />'
	}),
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
		mockedOnUpdateOpen.mockClear();
	}
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Birth Date',
		supportingText: 'Please choose your birth date.',
		placeholder: 'Select Date'
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

		await step('Check if playholder is showed', async () => {
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
		label: 'Meeting Date'
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

		await step('Select a specific date', async () => {
			const label = getDateCellAriaLabel(baseDate.toDate());
			const dateButton = within(calendarPopup).getByRole('button', { name: label });
			await userEvent.click(dateButton);
		});

		await step('Check if calendar popup is closed', async () => {
			const calendarPopup = screen.queryByRole('application', { name: 'calendar' });
			expect(calendarPopup).not.toBeInTheDocument();
		});

		await step('Check if update:open is triggered with false argument', async () => {
			expect(mockedOnUpdateOpen).toBeCalledWith(false);
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
		const { dataTestid = '' } = args;
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
		dataTestid: 'date-picker-clearable'
	},
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
		const container = canvas.getByTestId(dataTestid);

		const clearButton = within(container).getByRole('button', { name: clearButtonLabel });

		await step('Check if clear icon is displayed when there is a value', async () => {
			expect(clearButton).toBeVisible();
		});

		await step('Clear the selected date', async () => {
			await userEvent.click(clearButton);
		});

		await step('Check if value is clear and format placeholder is back', async () => {
			const displayedText = within(container).getByText(label);
			expect(displayedText).toBeInTheDocument();
		});
	}
};

export const Controllable: Story = {
	args: {
		label: 'Event Date',
		clearable: true,
		modelValue: baseDate.toDate()
	},
	render: (args) => ({
		components: { DatePicker },
		setup() {
			const { 'onUpdate:modelValue': onUpdateModelValue, modelValue } = args;
			const val = ref(modelValue);

			const handleUpdateModelValue = (date: Date | null) => {
				if (onUpdateModelValue) {
					onUpdateModelValue(date);
				}
				val.value = date;
			};

			const displayedDate = computed(() => (val.value ? formatDate(val.value, dateFormat) : ''));

			return () => (
				<div class="flex flex-col gap-2">
					<DatePicker
						{...args}
						modelValue={val.value}
						onUpdate:modelValue={handleUpdateModelValue}
					/>
					<p class="mt-4" aria-label="selected-value">
						Selected Date: {displayedDate.value}
					</p>
				</div>
			);
		}
	}),
	play: async ({ canvas, args, step }) => {
		const { dataTestid = '', label = '' } = args;
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

		await step('Check if onUpdate:modelValue is triggered', async () => {
			expect(mockedOnUpdateModelValue).toHaveBeenLastCalledWith(newDate);
		});

		await step('Clear all selected values via Clear button', async () => {
			const clearButton = within(container).getByRole('button', { name: clearButtonLabel });
			await userEvent.click(clearButton);
		});

		await step('Check if external state is updated accordingly', async () => {
			const displayedValue = canvas.getByLabelText('selected-value');
			expect(displayedValue).toHaveTextContent('Selected Date:');
		});

		await step('Check if onUpdate:modelValue is triggered', async () => {
			expect(mockedOnUpdateModelValue).toHaveBeenCalledWith(null);
		});

		await step('Check if onValueChange is triggered', async () => {
			expect(mockedOnValueChange).toHaveBeenCalledWith(null);
		});

		// This test verifies the shortcut for setting value is possible.
		await step('Set modelValue via hidden input', async () => {
			const inputEl = canvas.getByLabelText(label);
			// ark DatePicker.Input only accepts MM/DD/YYYY format for date string input
			const dateStr = formatDate(baseDate.toDate(), 'MM/DD/YYYY');

			await fireEvent.change(inputEl, { target: { value: dateStr } });
			await fireEvent.keyDown(inputEl, { key: 'Enter' });
		});

		await step('Check if state is updated', async () => {
			const dateStr = formatDate(baseDate.toDate(), dateFormat);
			const displayArea = within(container).getByText(dateStr);
			expect(displayArea).toBeInTheDocument();

			const displayedValue = canvas.getByLabelText('selected-value');
			await expect(displayedValue).toHaveTextContent(
				'Selected Date: ' + formatDate(baseDate.toDate(), dateFormat)
			);
		});
	}
};

export const Disabled: Story = {
	args: {
		label: 'Meeting Date',
		disabled: true,
		dataTestid: 'date-picker-disabled'
	}
};

export const Required: Story = {
	args: {
		label: 'Meeting Date',
		required: true,
		dataTestid: 'date-picker-required'
	}
};

export const Status: Story = {
	render: (args) => ({
		components: { DatePicker },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
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
			);
		}
	})
};

export const Size: Story = {
	render: (args) => ({
		components: { DatePicker },
		setup() {
			return () => (
				<div class="flex flex-col gap-2">
					<DatePicker {...args} size="xs" label="Extra Small" />
					<DatePicker {...args} size="sm" label="Small" />
					<DatePicker {...args} size="md" label="Medium" />
					<DatePicker {...args} size="lg" label="Large" />
				</div>
			);
		}
	})
};

export const CustomTriggerIcon: Story = {
	args: {
		label: 'Delete Scheduling',
		dataTestid: 'date-picker-custom-trigger'
	},
	render: (args) => ({
		components: { DatePicker, TrashIcon },
		setup() {
			return { args };
		},
		template: `
        <DatePicker v-bind="args">
            <template #triggerIcon>
                <TrashIcon />
            </template>
        </DatePicker>
        `
	})
};
