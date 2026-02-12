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
import { FieldStatus } from '@components/type';
import IconButton from '@components/IconButton';

export interface DatePickerProps
	extends AriaAttributes,
		Pick<ArkDatePicker.RootProps, 'selectionMode' | 'open' | 'onOpenChange' | 'fixedWeeks'> {
	label?: string;
	// root id
	id?: string;
	ref?: Ref<HTMLDivElement>;
	inputId?: string;
	'data-testid'?: string;
	// support ISO 8601 date format or Date object
	value?: string | Date;
	disabled?: boolean;
	supportingText?: string;
	status?: FieldStatus;
	locale?: string;
	clearable?: boolean;
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
		onValueChange,
		onOpenChange,
		...rest
	} = props;

	const supportingTextId = supportingText ? useId() : undefined;

	const internalValue = useMemo(() => (value ? [parseDate(value)] : undefined), [value]);

	const handleDateChange: ArkDatePicker.RootProps['onValueChange'] = (data) => {
		const dateStr = data.value[0]?.toString();
		if (onValueChange) onValueChange(dateStr, data.value[0]);
	};

	return (
		<ArkDatePicker.Root
			className="DatePicker"
			value={internalValue}
			selectionMode={selectionMode}
			open={open}
			fixedWeeks={fixedWeeks}
			format={(dateValue, { locale }) => {
				return dayjs(dateValue.toString()).locale(locale).format(format);
			}}
			id={id}
			disabled={disabled}
			data-testid={dataTestId}
			onValueChange={handleDateChange}
			onOpenChange={onOpenChange}
			asChild
			ref={ref}
		>
			<BaseField
				label={label}
				supportingText={supportingText}
				status={status}
				disabled={disabled}
				labelElement={ArkDatePicker.Label}
				supportingTextId={supportingTextId}
			>
				<ArkDatePicker.Control className="BaseField_Field DatePicker_InputField">
					<DatePickerDisplay format={format} />
					<div className="BaseField_Trailing">
						<ArkDatePicker.ClearTrigger asChild>
							<IconButton size="medium" variant="text" color="secondary">
								<Cross2Icon />
							</IconButton>
						</ArkDatePicker.ClearTrigger>
						<ArkDatePicker.Trigger asChild>
							<IconButton size="medium" variant="text" color="secondary">
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
