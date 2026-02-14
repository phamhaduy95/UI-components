import { CommonFieldProps } from '@components/type';

import { NumberInput as ArkNumberInput } from '@ark-ui/react/number-input';
import BaseField from '@components/BaseField';
import { JSX, useId } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import './NumberInput.css';

export interface NumberInputProps extends CommonFieldProps<string> {
	onValueChange?: (value: string) => void;
	max?: number;
	min?: number;
	formatOptions?: Intl.NumberFormatOptions;
	step?: number;
	inputMode?: 'decimal' | 'numeric';
	locale?: string;
	'data-testid'?: string;
}

const NumberInput = (props: NumberInputProps): JSX.Element => {
	const {
		value,
		defaultValue,
		onValueChange,
		disabled,
		size,
		required,
		placeholder,
		label,
		supportingText,
		status,
		step,
		supportingTextId,
		inputId,
		locale = 'en-US',
		'data-testid': dataTestId,
		...rest
	} = props;

	const handleValueChange: ArkNumberInput.RootProps['onValueChange'] = (details) => {
		onValueChange?.(details.value);
	};

	const internalSupportingTextId = supportingTextId ?? useId();

	return (
		<ArkNumberInput.Root
			className="NumberInput"
			defaultValue={defaultValue}
			value={value}
			disabled={disabled}
			required={required}
			step={step}
			locale={locale}
			data-testid={dataTestId}
			onValueChange={handleValueChange}
			asChild
			{...rest}
		>
			<BaseField
				disabled={disabled}
				size={size}
				required={required}
				label={label}
				supportingText={supportingText}
				status={status}
				supportingTextId={internalSupportingTextId}
				inputId={inputId}
				labelElement={ArkNumberInput.Label}
			>
				<ArkNumberInput.Control className="NumberInput_Control BaseField_Field">
					<ArkNumberInput.Input
						className="NumberInput_Input"
						id={inputId}
						aria-describedby={internalSupportingTextId}
						placeholder={placeholder}
					/>
					<div className="NumberInput_Triggers">
						<ArkNumberInput.IncrementTrigger
							className="NumberInput_IncrementTrigger"
							aria-label="increase value"
						>
							<ChevronUpIcon />
						</ArkNumberInput.IncrementTrigger>
						<ArkNumberInput.DecrementTrigger
							className="NumberInput_DecrementTrigger"
							aria-label="decrease value"
						>
							<ChevronDownIcon />
						</ArkNumberInput.DecrementTrigger>
					</div>
				</ArkNumberInput.Control>
			</BaseField>
		</ArkNumberInput.Root>
	);
};

export default NumberInput;
