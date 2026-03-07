import { DatePicker } from '@packages/react-components';
import { useState } from 'react';

export const BasicDatePicker = () => {
	return (
		<div className="flex flex-col gap-5">
			<DatePicker label="Select Date" />
		</div>
	);
};

export const ControlledDatePicker = () => {
	const [date, setDate] = useState<Date | null>(new Date('2024-01-01'));

	return (
		<div className="flex flex-col gap-2">
			<DatePicker value={date} onValueChange={(val) => setDate(val)} label="Controlled Date" />
			<p>Selected Date: {date?.toLocaleDateString() ?? 'None'}</p>
		</div>
	);
};

export const DatePickerWithLabel = () => {
	return (
		<div className="flex flex-col gap-5">
			<DatePicker label="Birth Date" />
		</div>
	);
};
