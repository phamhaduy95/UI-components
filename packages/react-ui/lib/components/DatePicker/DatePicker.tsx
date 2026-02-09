import { AriaAttributes, JSX, useId, useMemo } from 'react';

import { DatePicker as ArkDatePicker, DateValue, parseDate } from '@ark-ui/react/date-picker';
import { Portal } from '@ark-ui/react/portal';
import BaseCalendarView from '@components/BaseCalendarView/BaseCalendarView';

import { CalendarIcon } from '@radix-ui/react-icons';

import './DatePicker.css';
import BaseField from '@components/BaseField';
import { FieldStatus } from '@components/type';

export interface DatePickerProps
	extends AriaAttributes,
		Pick<
			ArkDatePicker.RootProps,
			'selectionMode' | 'open' | 'onOpenChange' | 'fixedWeeks' | 'format'
		> {
	label?: string;
	id?: string;
	inputId?: string;
	'data-testid'?: string;
	value?: string;
	disabled?: boolean;
	supportingText?: string;
	status?: FieldStatus;
	onValueChange?: (value?: string, date?: DateValue) => void;
}

const DatePicker = (props: DatePickerProps): JSX.Element => {
	const {
		label,
		'aria-label': ariaLabel,
		id,
		value,
		selectionMode = 'single',
		open,
		'data-testid': dataTestId,
		disabled,
		onValueChange,
		onOpenChange,
		format,
		fixedWeeks,
		supportingText,
		status,
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
			format={format}
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
				labelElement={ArkDatePicker.Label}
				supportingTextId={supportingTextId}
			>
				<ArkDatePicker.Control
					className="BaseField_Field DatePicker_InputField"
					aria-disabled={disabled}
				>
					<ArkDatePicker.Input
						className="DatePicker_Input"
						aria-describedby={supportingTextId}
					/>
					<ArkDatePicker.Trigger aria-label="Open/Close Calendar">
						<CalendarIcon
							height={16}
							width={16}
						/>
					</ArkDatePicker.Trigger>
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
