import { DateRangePicker } from '@packages/react-components';
import { useState } from 'react';

export const BasicDateRangePicker = () => {
	return <DateRangePicker label="Select Date Range" />;
};

export const ControlledDateRangePicker = () => {
	const [dateRange, setDateRange] = useState<string[]>(['2024-01-01', '2024-01-10']);

	return (
		<>
			<DateRangePicker
				value={dateRange}
				onValueChange={(val) => setDateRange(val || [])}
				label="Controlled Range"
			/>
			<p>Start: {dateRange[0]}</p>
			<p>End: {dateRange[1]}</p>
		</>
	);
};

export const DateRangePickerWithLabel = () => {
	return <DateRangePicker label="Travel Dates" />;
};
