import { ComponentPropsWithRef, JSX, useId, useMemo } from 'react';
import dayjs from 'dayjs';

import { DatePicker as ArkDatePicker, parseDate } from '@ark-ui/react/date-picker';

import { Portal } from '@ark-ui/react/portal';
import BaseCalendarView from '@components/BaseCalendarView/BaseCalendarView';

import { CalendarIcon, Cross2Icon } from '@radix-ui/react-icons';

import '@packages/styles/components/DatePicker.css';

import BaseField from '@components/BaseField';
import { CommonFieldProps } from '@components/type';
import IconButton from '@components/IconButton';

export interface DatePickerProps
	extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue' | 'children'>,
		Pick<ArkDatePicker.RootProps, 'open' | 'placeholder' | 'readOnly' | 'onOpenChange'>,
		CommonFieldProps<Date | null> {
	'data-testid'?: string;
	value?: Date | null;
	defaultValue?: Date;
	locale?: string;
	format?: string;
	max?: Date;
	min?: Date;
	onValueChange?: (date: Date | null) => void;
}

const DatePicker = (props: DatePickerProps): JSX.Element => {
	const {
		label,
		id,
		inputId,
		value,
		defaultValue,
		open,
		ref,
		disabled,
		format = 'DD-MM-YYYY',
		supportingText,
		status,
		clearable,
		min,
		max,
		placeholder,
		readOnly,
		'data-testid': dataTestId,
		required,
		size,
		onValueChange,
		onOpenChange,
		...rest
	} = props;

	const supportingTextId = useId();

	const internalValue = useMemo(() => {
		if (value === null) return [];
		return value ? [parseDate(value)] : undefined;
	}, [value]);

	const internalDefaultValue = useMemo(() => {
		return defaultValue ? [parseDate(defaultValue)] : undefined;
	}, [defaultValue]);

	const parsedMin = useMemo(() => {
		return min ? parseDate(min) : undefined;
	}, [min]);

	const parsedMax = useMemo(() => {
		return max ? parseDate(max) : undefined;
	}, [max]);

	const handleDateChange: ArkDatePicker.RootProps['onValueChange'] = (details) => {
		const { value: selectedValue } = details;
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const dateValue = selectedValue[0] ? selectedValue[0].toDate(timeZone) : null;

		if (onValueChange) onValueChange(dateValue);
	};

	const formatFn: ArkDatePicker.RootProps['format'] = (date) => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		return dayjs(date.toDate(timeZone)).format(format);
	};

	return (
		<ArkDatePicker.Root
			id={id}
			ref={ref}
			className="DatePicker"
			open={open}
			value={internalValue}
			defaultValue={internalDefaultValue}
			selectionMode="single"
			disabled={disabled}
			min={parsedMin}
			max={parsedMax}
			format={formatFn}
			placeholder={placeholder}
			readOnly={readOnly}
			required={required}
			data-testid={dataTestId}
			onValueChange={handleDateChange}
			onOpenChange={onOpenChange}
			asChild
			{...rest}
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
				supportingTextId={supportingText ? supportingTextId : undefined}
			>
				<ArkDatePicker.Control className="BaseField_Field DatePicker_Control">
					<ArkDatePicker.ValueText className="DatePicker_InputField" placeholder={placeholder} />

					<div className="BaseField_Trailing DatePicker_Trailing">
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

					<ArkDatePicker.Input
						tabIndex={-1}
						style={{ userSelect: 'none', display: 'none' }}
						hidden
						aria-describedby={supportingTextId}
					/>
				</ArkDatePicker.Control>

				<Portal>
					<ArkDatePicker.Positioner
						className="Menu_Positioner"
						style={{ zIndex: 'var(--menu-popup-z-index)' }}
					>
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
