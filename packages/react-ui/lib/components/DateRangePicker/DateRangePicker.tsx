import {
	DatePicker as ArkDatePicker,
	parseDate,
	useDatePickerContext
} from '@ark-ui/react/date-picker';

import { Portal } from '@ark-ui/react/portal';
import BaseCalendarView from '@components/BaseCalendarView/BaseCalendarView';

import { CalendarIcon } from '@radix-ui/react-icons';
import { AriaAttributes, memo, useId, useMemo } from 'react';

import './DateRangePicker.css';

import BaseField from '@components/BaseField';
import { FieldStatus } from '@components/type';

export interface DateRangePickerProps
	extends AriaAttributes,
		Pick<
			ArkDatePicker.RootProps,
			'selectionMode' | 'open' | 'onOpenChange' | 'fixedWeeks' | 'format'
		> {
	label?: string;
	id?: string;
	inputId?: string;
	'data-testid'?: string;
	value?: string[];
	onValueChange?: (value?: string[]) => void;
	disabled?: boolean;
	supportingText?: string;
	status?: FieldStatus;
}

const DateRangePicker = (props: DateRangePickerProps) => {
	const {
		label,
		'aria-label': ariaLabel,
		id,
		value,
		open,
		onValueChange,
		onOpenChange,
		disabled,
		supportingText,
		status
	} = props;

	const internalValue = useMemo(() => (value ? parseDate(value) : undefined), [value]);

	const handleDateChange: ArkDatePicker.RootProps['onValueChange'] = (data) => {
		if (onValueChange) {
			const dates = data.value.map((e) => e.toString());
			onValueChange(dates);
		}
	};

	const supportingTextId = supportingText ? useId() : undefined;

	return (
		<ArkDatePicker.Root
			className="DatePicker"
			id={id}
			value={internalValue}
			onValueChange={handleDateChange}
			selectionMode="range"
			open={open}
			onOpenChange={onOpenChange}
			disabled={disabled}
			asChild
		>
			<BaseField
				label={label}
				supportingText={supportingText}
				supportingTextId={supportingTextId}
				status={status}
				labelElement={ArkDatePicker.Label}
			>
				<ArkDatePicker.Control
					className="BaseField_Field DatePicker_InputField"
					aria-label={ariaLabel}
					aria-disabled={disabled}
					aria-describedby={supportingTextId}
				>
					<DateRangeDisplay />
					<ArkDatePicker.Trigger>
						<div className="Field_TrailingIcon">
							<CalendarIcon
								height={16}
								width={16}
							/>
						</div>
					</ArkDatePicker.Trigger>
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

const DateRangeDisplay = () => {
	const { valueAsString, getInputProps } = useDatePickerContext();

	const { placeholder } = getInputProps();

	console.log(valueAsString);
	const [startDate, endDate] = valueAsString;

	const defaultWidth = placeholder ? `${placeholder.length}ch` : '12ch';

	const startInputWidth = startDate ? `${startDate.length}ch` : defaultWidth;
	const endInputWidth = endDate ? `${endDate.length}ch` : defaultWidth;

	return (
		<div className="DatePicker_InputGroup">
			<ArkDatePicker.Input
				index={0}
				name="startDate"
				value={startDate}
				style={{ width: startInputWidth }}
			/>
			<span>&mdash;</span>
			<ArkDatePicker.Input
				index={1}
				name="endDate"
				value={endDate}
				style={{ width: endInputWidth }}
			/>
		</div>
	);
};
