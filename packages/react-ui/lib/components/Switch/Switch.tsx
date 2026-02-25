import { Switch as ArkSwitch } from '@ark-ui/react/switch';
import { CommonFieldProps } from '@components/type';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, Ref } from 'react';

import '@packages/styles/components/Switch.css';

export interface SwitchProps
	extends Omit<ComponentPropsWithoutRef<'input'>, 'ref' | 'children' | 'size' | 'defaultChecked'>,
		Pick<CommonFieldProps<boolean>, 'size' | 'supportingText' | 'disabled' | 'name' | 'label'> {
	inputRef?: Ref<HTMLInputElement>;
	className?: string;
	ref?: Ref<HTMLLabelElement>;
	value?: string;
	color?: 'primary' | 'success' | 'error' | 'warning' | 'secondary';
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (args: { checked: boolean; value?: string }) => void;
	'data-testid'?: string;
}

const Switch = ({
	label,
	inputRef,
	className,
	ref,
	value,
	name,
	disabled,
	checked,
	color = 'primary',
	size = 'medium',
	defaultChecked,
	'data-testid': dataTestId,
	onCheckedChange,
	...rest
}: SwitchProps) => {
	const handleCheckedChange: ArkSwitch.RootProps['onCheckedChange'] = (details) => {
		const { checked } = details;
		if (onCheckedChange) {
			onCheckedChange({ checked, value });
		}
	};

	return (
		<ArkSwitch.Root
			ref={ref}
			className={classNames('Switch', className)}
			label={label}
			name={name}
			value={value}
			disabled={disabled}
			checked={checked}
			defaultChecked={defaultChecked}
			data-color={color}
			data-size={size}
			onCheckedChange={handleCheckedChange}
			data-testId={dataTestId}
		>
			<ArkSwitch.Control className="Switch_Control">
				<ArkSwitch.Thumb className="Switch_Thumb" />
			</ArkSwitch.Control>
			<ArkSwitch.Label className="Switch_Label">{label}</ArkSwitch.Label>
			<ArkSwitch.HiddenInput ref={inputRef} {...rest} />
		</ArkSwitch.Root>
	);
};

export default Switch;
