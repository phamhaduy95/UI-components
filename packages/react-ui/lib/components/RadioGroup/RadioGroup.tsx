import { RadioGroup as ArkRadioGroup } from '@ark-ui/react/radio-group';
import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';

import { CommonFieldProps } from '@components/type';

import '@packages/styles/components/RadioGroup.css';

export interface RadioGroupItemObject {
	// must be unique among list
	value: string;
	text: string;
	disabled?: boolean;
}

export interface RadioGroupProps
	extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'defaultValue' | 'value'>,
		Pick<
			CommonFieldProps<string>,
			'value' | 'defaultValue' | 'disabled' | 'label' | 'required' | 'name'
		> {
	items: RadioGroupItemObject[];
	onValueChange?: (value: string) => void;
	'data-testid'?: string;
}

const RadioGroup = ({
	items,
	className,
	ref,
	value,
	defaultValue,
	disabled,
	label,
	required,
	name,
	onValueChange,
	...props
}: RadioGroupProps) => {
	const handleValueChange: ArkRadioGroup.RootProps['onValueChange'] = (details) => {
		const { value } = details;
		if (onValueChange) {
			onValueChange(value ?? '');
		}
	};

	return (
		<ArkRadioGroup.Root
			className={classNames('RadioGroup', className)}
			ref={ref}
			value={value}
			defaultValue={defaultValue}
			disabled={disabled}
			required={required}
			name={name}
			onValueChange={handleValueChange}
			{...props}
		>
			<ArkRadioGroup.Label className="RadioGroup_Label">{label}</ArkRadioGroup.Label>

			{items.map(({ text, value, disabled }) => (
				<ArkRadioGroup.Item
					className="RadioGroup_Item"
					key={value}
					value={value}
					disabled={disabled}
				>
					<ArkRadioGroup.ItemControl className="RadioGroup_ItemControl" />
					<ArkRadioGroup.ItemText className="RadioGroup_ItemText">{text}</ArkRadioGroup.ItemText>
					<ArkRadioGroup.ItemHiddenInput />
				</ArkRadioGroup.Item>
			))}
		</ArkRadioGroup.Root>
	);
};

export default RadioGroup;
