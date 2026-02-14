import { ChangeEvent, HTMLAttributes, JSX, useId, useState } from 'react';

import classNames from 'classnames';

import './TextInput.css';

import BaseField from '@components/BaseField';
import { Cross2Icon } from '@radix-ui/react-icons';
import IconButton from '@components/IconButton';
import { CommonFieldProps } from '@components/type';

export interface TextInputProp extends HTMLAttributes<HTMLInputElement>, CommonFieldProps<string> {
	onValueChange?: (value: string) => void;
	name?: string;
	'data-testId'?: string;
	defaultValue?: string;
}

const TextInput = (props: TextInputProp): JSX.Element => {
	const {
		value: externalValue,
		className,
		status,
		required,
		label,
		supportingText,
		placeholder,
		size,
		disabled,
		clearable,
		'data-testId': dataTestId,
		defaultValue,
		onChange,
		onValueChange,
		...rest
	} = props;

	const inputId = useId();
	const supportingTextId = supportingText ? useId() : undefined;

	const [internalValue, setInternalValue] = useState(defaultValue);

	const value = externalValue ?? internalValue;

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

	const shouldShowClearIcon = clearable && value && value.length > 0;

	return (
		<BaseField
			className={classNames('TextInput', className)}
			label={label}
			supportingText={supportingText}
			status={status}
			required={required}
			inputId={inputId}
			disabled={disabled}
			supportingTextId={supportingTextId}
			size={size}
			data-testId={dataTestId}
		>
			<div className="BaseField_Field" data-clearable={clearable} aria-disabled={disabled}>
				<input
					className="TextInput_Input"
					id={inputId}
					placeholder={placeholder}
					disabled={disabled}
					aria-disabled={disabled}
					aria-describedby={supportingTextId}
					defaultValue={defaultValue}
					aria-invalid={status === 'error'}
					value={value}
					required={required}
					onChange={handleInputChanged}
					{...rest}
				/>
				<div className="BaseField_Trailing">
					{shouldShowClearIcon && (
						<IconButton
							aria-label="Clear"
							size="medium"
							variant="text"
							color="secondary"
							onClick={handleClear}
						>
							<Cross2Icon />
						</IconButton>
					)}
				</div>
			</div>
		</BaseField>
	);
};

export default TextInput;
