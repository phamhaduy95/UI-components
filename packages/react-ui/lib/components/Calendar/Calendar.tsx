import { DatePicker } from '@ark-ui/react/date-picker';
import classNames from 'classnames';
import { JSX } from 'react';
import BaseCalendarView from '../BaseCalendarView/BaseCalendarView';
import '@packages/styles/components/Calendar.css';

export interface CalendarProps
	extends Pick<
		DatePicker.RootProps,
		| 'value'
		| 'view'
		| 'startOfWeek'
		| 'onValueChange'
		| 'max'
		| 'min'
		| 'selectionMode'
		| 'timeZone'
		| 'fixedWeeks'
	> {
	className?: string;
}

const Calendar = (props: CalendarProps): JSX.Element => {
	const { className, ...rest } = props;
	return (
		<DatePicker.Root
			open
			className={classNames('Calendar', className)}
			closeOnSelect={false}
			role="application"
			{...rest}
		>
			<BaseCalendarView />
		</DatePicker.Root>
	);
};
export default Calendar;
