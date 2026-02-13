import dayjs from 'dayjs';

export const getDateCellAriaLabel = (date: string) => {
	const dateStr = dayjs(date).format('dddd, MMMM D, YYYY');
	return `Choose ${dateStr}`;
};

export const formatDate = (date: string, format: string) => {
	return dayjs(date).format(format);
};
