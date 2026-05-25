import { PasswordInput as ArkPasswordInput } from '@ark-ui/react/password-input';
import { Cross2Icon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { ChangeEvent, HTMLAttributes, Ref, useId, useState } from 'react';

import { BaseField } from '@components/BaseField';
import { IconButton } from '@components/IconButton';
import { CommonFieldProps } from '@components/type';

import '@packages/styles/components/PasswordInput.css';

export interface PasswordInputProps
	extends Omit<HTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'>,
		CommonFieldProps<string> {
	onValueChange?: (value: string) => void;
	onVisibilityChange?: (visible: boolean) => void;
	visible?: boolean;
	autoComplete?: ArkPasswordInput.RootProps['autoComplete'];
	defaultVisible?: boolean;
	'data-testid'?: string;
	ref?: Ref<HTMLDivElement>;
	inputRef?: Ref<HTMLInputElement>;
}

const PasswordInput = ({
	value: externalValue,
	readOnly,
	required,
	defaultValue,
	defaultVisible,
	disabled,
	size,
	ref,
	status,
	supportingText,
	placeholder,
	name,
	visible,
	clearable,
	label,
	inputRef,
	labelId,
	inputId,
	'data-testid': dataTestId,
	onValueChange,
	onVisibilityChange,
	...rest
}: PasswordInputProps) => {
	const [internalValue, setInternalValue] = useState(defaultValue);

	const internalSupportingTextId = useId();

	const value = externalValue ?? internalValue;

	const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInternalValue(e.target.value);
		if (onValueChange) {
			onValueChange(e.target.value);
		}
	};

	const handleClearClicked = () => {
		setInternalValue('');
		if (onValueChange) {
			onValueChange('');
		}
	};

	const handleVisibilityChange: ArkPasswordInput.RootProps['onVisibilityChange'] = (details) => {
		const { visible } = details;

		if (onVisibilityChange) {
			onVisibilityChange(visible);
		}
	};

	const shouldShowClearButton = clearable && value && value.length > 0;

	return (
		<ArkPasswordInput.Root
			className="PasswordInput"
			readOnly={readOnly}
			required={required}
			visible={visible}
			disabled={disabled}
			defaultVisible={defaultVisible}
			data-testid={dataTestId}
			onChange={handleValueChange}
			invalid={status === 'error'}
			onVisibilityChange={handleVisibilityChange}
			asChild
			ref={ref}
		>
			<BaseField
				className="PasswordInput_BaseField"
				readOnly={readOnly}
				required={required}
				disabled={disabled}
				size={size}
				status={status}
				supportingText={supportingText}
				supportingTextId={internalSupportingTextId}
				label={label}
				labelId={labelId}
				inputId={inputId}
				labelElement={ArkPasswordInput.Label}
			>
				<ArkPasswordInput.Control className="BaseField_Field PasswordInput_Control">
					<ArkPasswordInput.Input
						ref={inputRef}
						name={name}
						className="PasswordInput_Input"
						placeholder={placeholder}
						value={value}
						defaultValue={defaultValue}
						aria-describedby={internalSupportingTextId}
						{...rest}
					/>
					<div className="BaseField_Trailing">
						{shouldShowClearButton && (
							<IconButton
								size="md"
								variant="text"
								color="secondary"
								aria-label="Clear value"
								onClick={handleClearClicked}
							>
								<Cross2Icon />
							</IconButton>
						)}

						<ArkPasswordInput.VisibilityTrigger
							className="BaseField_Trailing PasswordInput_ToggleTrigger"
							asChild
						>
							<IconButton
								size="md"
								variant="text"
								color="secondary"
								aria-label="Toggle password visibility"
							>
								<ArkPasswordInput.Indicator
									className="PasswordInput_Indicator"
									fallback={<EyeClosedIcon />}
								>
									<EyeOpenIcon />
								</ArkPasswordInput.Indicator>
							</IconButton>
						</ArkPasswordInput.VisibilityTrigger>
					</div>
				</ArkPasswordInput.Control>
			</BaseField>
		</ArkPasswordInput.Root>
	);
};

export default PasswordInput;
