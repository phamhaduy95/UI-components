import { useDatePickerContext } from '@ark-ui/react/date-picker';
import { JSX } from 'react';

import BaseCalendarDayView from './BaseCalendarDayView';
import BaseCalendarMonthView from './BaseCalendarMonthView';
import BaseCalendarYearView from './BaseCalendarYearView';

import '@packages/styles/components/Calendar.css';

const BaseCalendarView = (): JSX.Element => {
	const context = useDatePickerContext();

	switch (context.view) {
		case 'day':
			return <BaseCalendarDayView />;
		case 'month':
			return <BaseCalendarMonthView />;
		case 'year':
			return <BaseCalendarYearView />;
	}
};

export default BaseCalendarView;
