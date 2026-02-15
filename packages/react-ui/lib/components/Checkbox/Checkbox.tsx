import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox';
import { CommonFieldProps } from '@components/type';
import { CheckIcon, MinusIcon } from '@radix-ui/react-icons';
import { JSX, HTMLAttributes, Ref } from 'react';

import './Checkbox.css';
import classNames from 'classnames';

export type CheckboxSize = 'medium' | 'small';

export type CheckboxProps = Omit<HTMLAttributes<HTMLInputElement>, 'defaultChecked' | 'checked'> & {
	value?: string;
	ref?: Ref<HTMLDivElement>;
	disabled?: boolean;
	checked?: boolean;
	onCheckedChange?: (checked: boolean, value?: string) => void;
	defaultChecked?: boolean;
	readonly?: boolean;
	indeterminate?: boolean;
	required?: boolean;
	label?: string;
	status?: CommonFieldProps<boolean>['status'];
	size?: CheckboxSize;
	'data-testid'?: string;
};

const Checkbox = ({
	checked,
	id,
	value,
	className,
	defaultChecked,
	ref,
	indeterminate,
	disabled,
	readonly,
	required,
	size = 'medium',
	label,
	status,
	onCheckedChange,
	'data-testid': dataTestid,
	...rest
}: CheckboxProps): JSX.Element => {
	const handleOnCheckedChange: ArkCheckbox.RootProps['onCheckedChange'] = (details) => {
		if (!onCheckedChange) return;

		if (indeterminate) return onCheckedChange(false, value);

		return onCheckedChange(Boolean(details.checked), value);
	};

	const state = indeterminate ? 'indeterminate' : checked;

	return (
		<ArkCheckbox.Root
			id={id}
			className={classNames('Checkbox', className)}
			checked={state}
			disabled={disabled}
			readOnly={readonly}
			value={value}
			defaultChecked={defaultChecked}
			required={required}
			data-size={size}
			data-status={status}
			data-testid={dataTestid}
			onCheckedChange={handleOnCheckedChange}
		>
			<ArkCheckbox.Control className="Checkbox_Control" ref={ref}>
				<ArkCheckbox.Indicator className="Checkbsox_Indicator">
					<CheckIcon />
				</ArkCheckbox.Indicator>
				{indeterminate && (
					<ArkCheckbox.Indicator className="Checkbox_Indicator" indeterminate={indeterminate}>
						<MinusIcon />
					</ArkCheckbox.Indicator>
				)}
			</ArkCheckbox.Control>
			<ArkCheckbox.Label className="Checkbox_Label">{label}</ArkCheckbox.Label>
			<ArkCheckbox.HiddenInput {...rest} data-checked={state} readOnly={readonly} />
		</ArkCheckbox.Root>
	);
};

export default Checkbox;
