import dayjs from 'dayjs';

export const getDateCellAriaLabel = (date: Date | string, isSelected?: boolean) => {
	const dateStr = dayjs(date).format('dddd, MMMM D, YYYY');
	return isSelected ? `Selected date. ${dateStr}` : `Choose ${dateStr}`;
};

export const formatDate = (date: Date | string, format: string) => {
	return dayjs(date).format(format);
};
