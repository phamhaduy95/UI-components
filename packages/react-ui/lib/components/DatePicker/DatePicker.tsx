import { AriaAttributes, JSX, Ref, useId, useMemo } from 'react';
import dayjs from 'dayjs';

import {
	DatePicker as ArkDatePicker,
	DateValue,
	parseDate,
	useDatePickerContext
} from '@ark-ui/react/date-picker';

import { Portal } from '@ark-ui/react/portal';
import BaseCalendarView from '@components/BaseCalendarView/BaseCalendarView';

import { CalendarIcon, Cross2Icon } from '@radix-ui/react-icons';

import './DatePicker.css';

import BaseField from '@components/BaseField';
import { CommonFieldProps } from '@components/type';
import IconButton from '@components/IconButton';

export interface DatePickerProps
	extends AriaAttributes,
		Pick<ArkDatePicker.RootProps, 'selectionMode' | 'open' | 'onOpenChange' | 'fixedWeeks'>,
		CommonFieldProps {
	// root id
	id?: string;
	ref?: Ref<HTMLDivElement>;
	'data-testid'?: string;
	// support ISO 8601 date format or Date object
	value?: string | Date;
	// support ISO 8601 date format or Date object
	defaultValue?: string | Date;
	locale?: string;
	// using dayjs format
	format?: string;
	onValueChange?: (value?: string, date?: DateValue) => void;
}

const DatePicker = (props: DatePickerProps): JSX.Element => {
	const {
		label,
		id,
		inputId,
		value,
		defaultValue,
		selectionMode = 'single',
		open,
		ref,
		disabled,
		format = 'DD-MM-YYYY',
		fixedWeeks,
		supportingText,
		status,
		clearable,
		locale,
		'data-testid': dataTestId,
		required,
		size,
		onValueChange,
		onOpenChange,
		...rest
	} = props;

	const supportingTextId = supportingText ? useId() : undefined;

	const internalValue = useMemo(() => {
		if (value === undefined) return undefined;
		if (value instanceof Date) return [parseDate(value)];
		if (value.length === 0) return [];
		return [parseDate(value)];
	}, [value]);

	const internalDefaultValue = useMemo(() => {
		if (defaultValue === undefined) return undefined;
		if (defaultValue instanceof Date) return [parseDate(defaultValue)];
		if (defaultValue.length === 0) return [];
		return [parseDate(defaultValue)];
	}, [defaultValue]);

	const handleDateChange: ArkDatePicker.RootProps['onValueChange'] = (data) => {
		const dateStr = data.value[0]?.toString() ?? '';
		if (onValueChange) onValueChange(dateStr, data.value[0]);
	};

	return (
		<ArkDatePicker.Root
			id={id}
			ref={ref}
			className="DatePicker"
			open={open}
			value={internalValue}
			defaultValue={internalDefaultValue}
			selectionMode={selectionMode}
			fixedWeeks={fixedWeeks}
			format={(dateValue, { locale }) => {
				return dayjs(dateValue.toString()).locale(locale).format(format);
			}}
			disabled={disabled}
			data-testid={dataTestId}
			onValueChange={handleDateChange}
			onOpenChange={onOpenChange}
			asChild
		>
			<BaseField
				label={label}
				supportingText={supportingText}
				status={status}
				disabled={disabled}
				required={required}
				size={size}
				inputId={inputId}
				labelElement={ArkDatePicker.Label}
				supportingTextId={supportingTextId}
			>
				<ArkDatePicker.Control className="BaseField_Field DatePicker_InputField">
					<DatePickerDisplay format={format} />
					<div className="BaseField_Trailing">
						{clearable && (
							<ArkDatePicker.ClearTrigger asChild>
								<IconButton size="medium" variant="text" color="secondary" aria-label="Clear value">
									<Cross2Icon />
								</IconButton>
							</ArkDatePicker.ClearTrigger>
						)}
						<ArkDatePicker.Trigger asChild>
							<IconButton size="medium" variant="text" color="secondary" aria-label="Open calendar">
								<CalendarIcon />
							</IconButton>
						</ArkDatePicker.Trigger>
					</div>
					<DatePickerHiddenInput />
				</ArkDatePicker.Control>
				<Portal>
					<ArkDatePicker.Positioner className="Menu_Positioner">
						<ArkDatePicker.Content>
							<BaseCalendarView />
						</ArkDatePicker.Content>
					</ArkDatePicker.Positioner>
				</Portal>
			</BaseField>
		</ArkDatePicker.Root>
	);
};

export default DatePicker;

const DatePickerDisplay = ({ format }: { format: string }) => {
	const { valueAsString } = useDatePickerContext();

	const [date] = valueAsString;

	const displayedValue = date ?? format;

	return (
		<p className="DatePicker_DisplayArea" data-greyout={!Boolean(date)}>
			{displayedValue}
		</p>
	);
};

const DatePickerHiddenInput = () => {
	const { value, setValue } = useDatePickerContext();

	const date = value[0];
	const dateStr = date?.toString();

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const dateStr = e.target.value;
		setValue([parseDate(dateStr)]);
	};

	return (
		<input
			style={{ display: 'none', userSelect: 'none' }}
			hidden
			tabIndex={-1}
			onChange={handleOnChange}
			value={dateStr}
		/>
	);
};
