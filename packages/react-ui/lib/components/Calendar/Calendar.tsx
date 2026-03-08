import { DatePicker, parseDate } from '@ark-ui/react/date-picker';
import classNames from 'classnames';
import { JSX, useMemo } from 'react';

import BaseCalendarView from '@components/BaseCalendarView/BaseCalendarView';

import '@packages/styles/components/Calendar.css';

export interface CalendarProps
	extends Pick<
		DatePicker.RootProps,
		| 'view'
		| 'startOfWeek'
		| 'selectionMode'
		| 'timeZone'
		| 'minView'
		| 'maxView'
		| 'defaultView'
		| 'fixedWeeks'
		| 'unmountOnExit'
	> {
	className?: string;
	value?: Date[];
	defaultValue?: Date[];
	min?: Date;
	max?: Date;
	'data-testid'?: string;
	onValueChange?: (value: Date[]) => void;
	onViewChange?: DatePicker.RootProps['onViewChange'];
}

const Calendar = (props: CalendarProps): JSX.Element => {
	const {
		className,
		value,
		defaultValue,
		min,
		max,
		onValueChange,
		onViewChange,
		'data-testid': dataTestId,
		...rest
	} = props;

	const parsedValue = useMemo(() => {
		return value ? value.map((date) => parseDate(date)) : undefined;
	}, [value]);

	const parsedDefaultValue = useMemo(() => {
		return defaultValue ? defaultValue.map((date) => parseDate(date)) : undefined;
	}, [defaultValue]);

	const parsedMin = useMemo(() => {
		return min ? parseDate(min) : undefined;
	}, [min]);

	const parsedMax = useMemo(() => {
		return max ? parseDate(max) : undefined;
	}, [max]);

	const handleValueChange: DatePicker.RootProps['onValueChange'] = (details) => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const dateObj = details.value.map((e) => e.toDate(timeZone));
		if (onValueChange) onValueChange(dateObj);
	};

	return (
		<DatePicker.Root
			open
			className={classNames('Calendar', className)}
			closeOnSelect={false}
			role="application"
			value={parsedValue}
			defaultValue={parsedDefaultValue}
			min={parsedMin}
			max={parsedMax}
			onValueChange={handleValueChange}
			onViewChange={onViewChange}
			data-testid={dataTestId}
			unmountOnExit
			fixedWeeks
			{...rest}
		>
			<BaseCalendarView />
		</DatePicker.Root>
	);
};

export default Calendar;
