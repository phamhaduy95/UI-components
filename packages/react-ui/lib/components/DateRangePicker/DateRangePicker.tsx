import {
	DatePicker as ArkDatePicker,
	parseDate,
	useDatePickerContext
} from '@ark-ui/react/date-picker';

import { Portal } from '@ark-ui/react/portal';
import BaseCalendarView from '@components/BaseCalendarView/BaseCalendarView';

import { CalendarIcon, Cross2Icon } from '@radix-ui/react-icons';
import { AriaAttributes, useId } from 'react';
import dayjs from 'dayjs';

import './DateRangePicker.css';

import BaseField from '@components/BaseField';
import { CommonFieldProps } from '@components/type';
import IconButton from '@components/IconButton';

export interface DateRangePickerProps
	extends AriaAttributes,
		Pick<ArkDatePicker.RootProps, 'selectionMode' | 'open' | 'onOpenChange' | 'fixedWeeks'>,
		CommonFieldProps {
	id?: string;
	'data-testid'?: string;
	format?: string;
	// support ISO 8601 date format or Date object
	value?: string[] | Date[];
	defaultValue?: string[] | Date[];
	onValueChange?: (value?: string[]) => void;
}

const DateRangePicker = (props: DateRangePickerProps) => {
	const {
		label,
		'aria-label': ariaLabel,
		id,
		inputId,
		value,
		defaultValue,
		open,
		format = 'DD-MM-YYYY',
		disabled,
		supportingText,
		status,
		'data-testid': dataTestId,
		required,
		size,
		clearable,
		onValueChange,
		onOpenChange
	} = props;

	const parsedDateValue = (() => {
		if (value) {
			return value.map((e) => parseDate(e));
		}
	})();

	const parsedDateDefaultValue = (() => {
		if (defaultValue) {
			return defaultValue.map((e) => parseDate(e));
		}
	})();

	const handleDateChange: ArkDatePicker.RootProps['onValueChange'] = (data) => {
		if (onValueChange) {
			const dates = data.value.map((e) => e.toString());
			onValueChange(dates);
		}
	};

	const supportingTextId = supportingText ? useId() : undefined;

	return (
		<ArkDatePicker.Root
			id={id}
			className="DatePicker"
			selectionMode="range"
			open={open}
			disabled={disabled}
			data-testid={dataTestId}
			value={parsedDateValue}
			defaultValue={parsedDateDefaultValue}
			format={(date, { locale }) => {
				return dayjs(date.toString()).locale(locale).format(format);
			}}
			onValueChange={handleDateChange}
			onOpenChange={onOpenChange}
			asChild
		>
			<BaseField
				label={label}
				supportingText={supportingText}
				supportingTextId={supportingTextId}
				status={status}
				required={required}
				size={size}
				inputId={inputId}
				labelElement={ArkDatePicker.Label}
			>
				<ArkDatePicker.Control
					className="BaseField_Field DateRangePicker_InputField"
					aria-label={ariaLabel}
					aria-disabled={disabled}
					aria-describedby={supportingTextId}
				>
					<DateRangeDisplay formatAsStr={format} />
					<div className="BaseField_Trailing">
						{clearable && (
							<ArkDatePicker.ClearTrigger asChild>
								<IconButton variant="text" size="medium" color="secondary" aria-label="Clear value">
									<Cross2Icon />
								</IconButton>
							</ArkDatePicker.ClearTrigger>
						)}
						<ArkDatePicker.Trigger asChild>
							<IconButton variant="text" size="medium" color="secondary" aria-label="Open calendar">
								<CalendarIcon />
							</IconButton>
						</ArkDatePicker.Trigger>
					</div>
					<DateRangePickerHiddenInput />
				</ArkDatePicker.Control>
				<Portal>
					<ArkDatePicker.Positioner>
						<ArkDatePicker.Content>
							<BaseCalendarView />
						</ArkDatePicker.Content>
					</ArkDatePicker.Positioner>
				</Portal>
			</BaseField>
		</ArkDatePicker.Root>
	);
};

export default DateRangePicker;

interface DateRangeDisplayProps {
	formatAsStr: string;
}

const DateRangeDisplay = ({ formatAsStr }: DateRangeDisplayProps) => {
	const { valueAsString } = useDatePickerContext();

	const [startDate, endDate] = valueAsString;

	const startDateStr = startDate ?? formatAsStr;
	const endDateStr = endDate ?? formatAsStr;

	return (
		<p className="DateRangePicker_DisplayArea" aria-label="date range display">
			<span data-greyout={!Boolean(startDate)}>{startDateStr}</span>
			<span data-greyout={!Boolean(startDate)}>&mdash;</span>
			<span data-greyout={!Boolean(endDate)}>{endDateStr}</span>
		</p>
	);
};

const DateRangePickerHiddenInput = () => {
	const { value, setValue, getInputProps } = useDatePickerContext();

	const { id } = getInputProps();

	const textValue = value.map((e) => e.toString()).join(',');

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (value && value.length > 0) {
			const [startDate, endDate] = value.split(',');

			if (startDate && endDate) {
				setValue([parseDate(startDate), parseDate(endDate)]);
			}
		}
	};

	return <input id={id} hidden onChange={handleValueChange} value={textValue} tabIndex={-1} />;
};
