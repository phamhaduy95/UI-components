import BaseCombobox, { BaseComboboxProps } from '@components/BaseCombobox';
import { SelectItem } from '@components/type';

import { JSX } from 'react';

export interface SingleComboboxProps
	extends Omit<BaseComboboxProps, 'value' | 'onValueChange' | 'multiple'> {
	value?: string;
	onValueChange?: (value: string, item?: SelectItem) => void;
}

const SingleCombobox = (props: SingleComboboxProps): JSX.Element => {
	const { value, onValueChange, ...rest } = props;

	const internalValue = value ? [value] : undefined;

	const handleValueChange: BaseComboboxProps['onValueChange'] = (data) => {
		if (onValueChange) onValueChange(data.value[0], data.items[0]);
	};

	return <BaseCombobox value={internalValue} onValueChange={handleValueChange} {...rest} />;
};

export default SingleCombobox;
