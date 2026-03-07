import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BaseCalendar } from '@components/BaseCalendar';
import { expect, within, userEvent, fn } from 'storybook/test';
import dayjs from 'dayjs';
import { getDateCellAriaLabel } from '@stories/utils/date';

const mockedOnValueChange = fn();
const mockedOnUpdateModelValue = fn();
const mockedOnUpdateView = fn();

const nextMonthButtonLabel = 'Switch to next month';
const prevMonthButtonLabel = 'Switch to previous month';
const nextYearButtonLabel = 'Switch to next year';
const prevYearButtonLabel = 'Switch to previous year';
const prevDecadeButtonLabel = 'Switch to previous decade';
const nextDecadeButtonLabel = 'Switch to next decade';

const switchToYearViewLabel = 'Switch to year view';
const switchToMonthViewLabel = 'Switch to month view';

const baseDate = dayjs().year(2025).month(10).date(15);

const meta = {
	title: 'Components/DataDisplay/BaseCalendar',
	component: BaseCalendar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered'
	},
	argTypes: {
		onValueChange: { action: 'valueChange' },
		'onUpdate:modelValue': { action: 'update:modelValue' },
		'onUpdate:view': { action: 'update:view' },
		selectionMode: {
			control: 'select',
			options: ['single', 'multiple', 'range']
		},
		startOfWeek: {
			control: 'number',
			min: 0,
			max: 6
		}
	},
	args: {
		dataTestid: 'base-calendar',
		onValueChange: mockedOnValueChange,
		'onUpdate:modelValue': mockedOnUpdateModelValue,
		'onUpdate:view': mockedOnUpdateView,
		defaultValue: [baseDate.toDate()]
	},
	render: (args) => ({
		components: { BaseCalendar },
		setup() {
			return { args };
		},
		template: '<BaseCalendar v-bind="args" />'
	}),
	beforeEach() {
		mockedOnValueChange.mockClear();
		mockedOnUpdateModelValue.mockClear();
		mockedOnUpdateView.mockClear();
	}
} satisfies Meta<typeof BaseCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
	play: async ({ canvas, step, args }) => {
		const { dataTestid = '' } = args;
		const calendar = canvas.getByTestId(dataTestid);

		await step('Check if calendar component is rendered', async () => {
			expect(calendar).toBeInTheDocument();
		});

		await step('Check if navigation controls are available', async () => {
			const prevBtn = within(calendar).getByRole('button', { name: prevMonthButtonLabel });
			const nextBtn = within(calendar).getByRole('button', { name: nextMonthButtonLabel });

			expect(prevBtn).toBeInTheDocument();
			expect(nextBtn).toBeInTheDocument();
		});

		await step('Check if header title show correct value', async () => {
			const viewTrigger = within(calendar).getByRole('button', { name: switchToMonthViewLabel });
			expect(viewTrigger).toBeInTheDocument();
			expect(viewTrigger).toHaveTextContent('November 2025');
		});

		await step('Check if day headers are rendered', async () => {
			const headers = calendar.querySelectorAll('[data-part="table-header"]');
			expect(headers.length).toBe(7);

			const headerTexts = Array.from(headers).map((header) => header.textContent);
			expect(headerTexts).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
		});

		await step('Check if default date is selected', async () => {
			const selectedDays = calendar.querySelectorAll('[data-selected]');
			expect(selectedDays.length).toBe(1);
			expect(selectedDays[0]?.textContent?.trim()).toBe('15');
		});
	}
};

export const MonthView: Story = {
	args: {
		minView: 'month',
		maxView: 'month',
		view: 'month'
	},
	play: async ({ canvas, step, args }) => {
		const { dataTestid = '' } = args;
		const calendar = canvas.getByTestId(dataTestid);

		await step('Check if navigation controls are available', async () => {
			const prevBtn = within(calendar).getByRole('button', { name: prevYearButtonLabel });
			const nextBtn = within(calendar).getByRole('button', { name: nextYearButtonLabel });

			expect(prevBtn).toBeInTheDocument();
			expect(nextBtn).toBeInTheDocument();
		});

		await step('Check if view trigger show correct year value', async () => {
			const viewTrigger = within(calendar).getByRole('button', { name: switchToYearViewLabel });
			expect(viewTrigger).toBeInTheDocument();
			expect(viewTrigger).toHaveTextContent('2025');
		});

		await step('Check if all months are rendered', async () => {
			const monthTableCells = calendar.querySelectorAll('[data-part="table-cell"]');
			expect(monthTableCells.length).toBe(12);

			const monthTableCellTexts = Array.from(monthTableCells).map((cell) => cell.textContent);
			expect(monthTableCellTexts).toEqual([
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			]);
		});
	}
};

const getYearsInBetween = ({ start, end }: { start: number; end: number }): string[] => {
	const years = [];
	for (let yearValue = start; yearValue <= end; yearValue++) {
		years.push(yearValue.toString());
	}
	return years;
};

export const YearView: Story = {
	args: {
		minView: 'year',
		maxView: 'year',
		view: 'year'
	},
	play: async ({ canvas, step, args }) => {
		const { dataTestid = '' } = args;
		const calendar = canvas.getByTestId(dataTestid);

		const prevBtn = within(calendar).getByRole('button', { name: prevDecadeButtonLabel });
		const nextBtn = within(calendar).getByRole('button', { name: nextDecadeButtonLabel });

		await step('Check if navigation controls are available', async () => {
			expect(prevBtn).toBeInTheDocument();
			expect(nextBtn).toBeInTheDocument();
		});

		await step('Check if view trigger show correct year value', async () => {
			const viewTrigger = within(calendar).getByText('2020 - 2029');
			expect(viewTrigger).toBeInTheDocument();
		});

		await step('Check if years in the viewed decade are rendered', async () => {
			const yearTableCells = calendar.querySelectorAll('[data-part="table-cell"]');
			expect(yearTableCells.length).toBe(10);

			const years = getYearsInBetween({ start: 2020, end: 2029 });

			const yearTableCellTexts = Array.from(yearTableCells).map((cell) => cell.textContent);
			expect(yearTableCellTexts).toEqual(years);
		});

		await step('Click on next decade', async () => {
			await userEvent.click(nextBtn);
		});

		await step('Check if view trigger show year range for next decade', async () => {
			const viewTrigger = within(calendar).getByText('2030 - 2039');
			expect(viewTrigger).toBeInTheDocument();
		});

		await step('Check if years for next decaded is showed', async () => {
			const yearTableCells = calendar.querySelectorAll('[data-part="table-cell"]');
			expect(yearTableCells.length).toBe(10);

			const years = getYearsInBetween({ start: 2030, end: 2039 });

			const yearTableCellTexts = Array.from(yearTableCells).map((cell) => cell.textContent);
			expect(yearTableCellTexts).toEqual(years);
		});
	}
};

export const ViewChangeFlow: Story = {
	play: async ({ canvas, step, args }) => {
		const { dataTestid = '' } = args;
		const calendar = canvas.getByTestId(dataTestid);

		await step('Check if initial view is day', () => {
			const viewTrigger = within(calendar).getByRole('button', { name: switchToMonthViewLabel });
			expect(viewTrigger).toHaveAttribute('data-view', 'day');
		});

		await step('Click on view Trigger to switch to Month view', async () => {
			const viewTrigger = within(calendar).getByRole('button', { name: switchToMonthViewLabel });
			await userEvent.click(viewTrigger);
		});

		await step('Chec    k update:view event is triggered', () => {
			expect(mockedOnUpdateView).toHaveBeenCalledWith('month');
		});

		await step('Check if view is Month', () => {
			const viewTrigger = within(calendar).getByRole('button', { name: switchToYearViewLabel });
			expect(viewTrigger).toHaveAttribute('data-view', 'month');
			expect(viewTrigger).toHaveTextContent('2025');
		});

		await step('Click on view Trigger to switch to Year view', async () => {
			const viewTrigger = within(calendar).getByRole('button', { name: switchToYearViewLabel });
			await userEvent.click(viewTrigger);
		});

		await step('Check update:view event is triggered', () => {
			expect(mockedOnUpdateView).toHaveBeenCalledWith('year');
		});

		await step('Check if view is Year', () => {
			const viewTitle = within(calendar).getByText('2020 - 2029');
			expect(viewTitle).toBeInTheDocument();
		});

		await step('Select new year value', async () => {
			const yearToSelect = within(calendar).getByRole('button', { name: '2021' });
			await userEvent.click(yearToSelect);
		});

		await step('Check if view is switched back to Month', () => {
			const viewTrigger = within(calendar).getByRole('button', { name: switchToYearViewLabel });
			expect(viewTrigger).toHaveAttribute('data-view', 'month');
			expect(viewTrigger).toHaveTextContent('2021');
		});

		await step('Check update:modelValue event is triggered', () => {
			expect(mockedOnUpdateView).toHaveBeenCalledWith('month');
		});

		await step('Select new month value', async () => {
			const monthToSelect = within(calendar).getByRole('button', { name: 'June 2021' });
			await userEvent.click(monthToSelect);
		});

		await step('Check update:modelValue event is triggered', () => {
			expect(mockedOnUpdateView).toHaveBeenCalledWith('day');
		});
	}
};

export const SingleSelectionFlow: Story = {
	args: {
		selectionMode: 'single'
	},

	play: async ({ canvas, step, args }) => {
		const { dataTestid = '' } = args;
		const calendar = canvas.getByTestId(dataTestid);

		const selectedDate = baseDate.add(4, 'day').toDate();

		await step('Select a date', async () => {
			const label = getDateCellAriaLabel(selectedDate);
			const dateButton = within(calendar).getByRole('button', { name: label });
			await userEvent.click(dateButton);
		});

		await step('Check if value change events fired', async () => {
			expect(mockedOnUpdateModelValue).toHaveBeenCalledTimes(1);
			expect(mockedOnValueChange).toHaveBeenCalledTimes(1);
		});

		await step('Check if the day was correctly marked as selected attributes', async () => {
			const label = getDateCellAriaLabel(selectedDate, true);
			const dateButton = within(calendar).getByRole('button', { name: label });
			expect(dateButton).toHaveAttribute('data-selected');
		});

		await step('Test navigation actions', async () => {
			const prevBtn = within(calendar).getByRole('button', { name: prevMonthButtonLabel });
			await userEvent.click(prevBtn);

			const nextBtn = within(calendar).getByRole('button', { name: nextMonthButtonLabel });
			await userEvent.click(nextBtn);
		});
	}
};

export const MultipleSelection: Story = {
	args: {
		selectionMode: 'multiple',
		defaultValue: [baseDate, baseDate.add(4, 'day'), baseDate.add(6, 'day')].map((e) => e.toDate())
	}
};

export const RangeSelection: Story = {
	args: {
		selectionMode: 'range',
		defaultValue: [baseDate.add(-3, 'day').toDate(), baseDate.add(10, 'day').toDate()]
	}
};

export const CheckMinMaxBounds: Story = {
	args: {
		max: dayjs().add(5, 'day').toDate(),
		min: dayjs().add(-4, 'day').toDate(),
		defaultValue: [dayjs().toDate()]
	},

	play: async ({ canvas, step, args }) => {
		const { dataTestid = '' } = args;
		const calendar = canvas.getByTestId(dataTestid);

		await step('Validate presence of disabled past dates', async () => {
			const dates = within(calendar).getAllByRole('button');
			const disabledDates = dates.filter((btn) => btn.hasAttribute('data-disabled'));

			expect(disabledDates.length).toBeGreaterThan(0);
		});
	}
};
