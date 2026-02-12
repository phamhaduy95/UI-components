import BaseCombobox, { BaseComboboxProps } from '@components/BaseCombobox';
import { SelectItem } from '@components/type';

import { JSX, useMemo } from 'react';

export interface SingleComboboxProps
	extends Omit<BaseComboboxProps, 'value' | 'onValueChange' | 'multiple' | 'defaultValue'> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string, item?: SelectItem) => void;
}

const SingleCombobox = (props: SingleComboboxProps): JSX.Element => {
	const { value, defaultValue, onValueChange, ...rest } = props;

	const internalValue = useMemo(() => {
		if (value === undefined) return undefined;
		if (value.length === 0) return [];
		return [value];
	}, [value]);

	const internalDefaultValue = useMemo(() => {
		if (defaultValue === undefined) return undefined;
		if (defaultValue.length === 0) return [];
		return [defaultValue];
	}, [defaultValue]);

	const handleValueChange: BaseComboboxProps['onValueChange'] = (data) => {
		if (onValueChange) onValueChange(data.value[0] ?? '', data.items[0]);
	};

	return (
		<BaseCombobox
			value={internalValue}
			defaultValue={internalDefaultValue}
			onValueChange={handleValueChange}
			{...rest}
		/>
	);
};

export default SingleCombobox;
