import { AriaAttributes, JSX, useId, useMemo } from 'react';

import { DatePicker as ArkDatePicker, DateValue, parseDate } from '@ark-ui/react/date-picker';
import { Portal } from '@ark-ui/react/portal';
import BaseCalendarView from '@components/BaseCalendarView/BaseCalendarView';
import FormLabel from '@components/FormLabel/FormLabel';
import { CalendarIcon } from '@radix-ui/react-icons';

import './DatePicker.css';

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
	onValueChange?: (value?: string, date?: DateValue) => void;
	disabled?: boolean;
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
		...rest
	} = props;

	const uuid = useId();

	const internalValue = useMemo(() => (value ? [parseDate(value)] : undefined), [value]);

	const handleDateChange: ArkDatePicker.RootProps['onValueChange'] = (data) => {
		const dateStr = data.value[0]?.toString();
		if (onValueChange) onValueChange(dateStr, data.value[0]);
	};

	return (
		<ArkDatePicker.Root
			className="DatePicker"
			id={id}
			value={internalValue}
			onValueChange={handleDateChange}
			selectionMode={selectionMode}
			open={open}
			onOpenChange={onOpenChange}
			fixedWeeks={fixedWeeks}
			format={format}
			disabled={disabled}
			data-testid={dataTestId}
		>
			<FormLabel
				type="p"
				id={uuid}
			>
				{label}
			</FormLabel>
			<ArkDatePicker.Control
				className="FormField_Field DatePicker_InputField"
				aria-role="group"
				aria-labelledby={uuid}
				aria-label={ariaLabel}
				aria-disabled={disabled}
			>
				<ArkDatePicker.Input className="DatePicker_Input" />
				<ArkDatePicker.Trigger>
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
		</ArkDatePicker.Root>
	);
};

export default DatePicker;
