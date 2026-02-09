import { ChangeEvent, HTMLAttributes, JSX, useId, useState } from 'react';

import classNames from 'classnames';

import './TextInput.css';
import BaseField, { BaseFieldProps } from '@components/BaseField';
import { Cross2Icon } from '@radix-ui/react-icons';

export interface TextInputProp
	extends HTMLAttributes<HTMLInputElement>,
		Omit<BaseFieldProps, 'children'> {
	value?: string;
	onValueChange?: (value: string) => void;
	required?: boolean;
	name?: string;
	placeholder?: string;
	'data-testId'?: string;
}

const TextInput = (props: TextInputProp): JSX.Element => {
	const {
		value,
		className,
		status,
		required,
		label,
		supportingText,
		placeholder,
		onChange,
		onValueChange,
		disabled,
		clearable,
		'data-testId': dataTestId,
		...rest
	} = props;

	const inputId = useId();
	const supportingTextId = supportingText ? useId() : undefined;

	const [internalValue, setInternalValue] = useState(value);

	const state = value ? value : internalValue;

	const handleInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(e);
		const value = (e.target as HTMLInputElement).value;
		setInternalValue(value);
		if (onValueChange) onValueChange(value);
	};

	const handleClear = () => {
		setInternalValue('');
		if (onValueChange) onValueChange('');
	};

	const shouldShowClearIcon = clearable && state && state.length > 0;

	return (
		<BaseField
			className={classNames('TextInput', className)}
			label={label}
			supportingText={supportingText}
			status={status}
			required={required}
			inputId={inputId}
			supportingTextId={supportingTextId}
		>
			<div
				className="BaseField_Field TextInput_InputField"
				data-status={status}
				data-clearable={clearable}
				aria-disabled={disabled}
			>
				<input
					className="TextInput_Input"
					id={inputId}
					placeholder={placeholder}
					disabled={disabled}
					aria-disabled={disabled}
					aria-describedby={supportingTextId}
					aria-invalid={status === 'error'}
					value={state}
					onChange={handleInputChanged}
					{...rest}
				/>
				{shouldShowClearIcon && (
					<button
						type="button"
						aria-label="Clear"
						onClick={handleClear}
					>
						<Cross2Icon
							width={20}
							height={20}
						/>
					</button>
				)}
			</div>
		</BaseField>
	);
};

export default TextInput;
