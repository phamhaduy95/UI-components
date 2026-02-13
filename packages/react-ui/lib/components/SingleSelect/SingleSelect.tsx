import BaseSelect, { BaseSelectProps } from '@components/BaseSelect';
import { SelectItem } from '@components/type';
import { JSX, useMemo } from 'react';

export interface SingleSelectProps
	extends Omit<BaseSelectProps, 'value' | 'onValueChange' | 'defaultValue'> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string, item: SelectItem) => void;
}

const SingleSelect = (props: SingleSelectProps): JSX.Element => {
	const { value, onValueChange, defaultValue, ...rest } = props;

	const mappedValue = useMemo(() => {
		if (value === undefined) return undefined;
		if (value.length === 0) return [];
		return [value];
	}, [value]);

	const mappedDefaultValue = useMemo(() => {
		if (defaultValue === undefined) return undefined;
		if (defaultValue.length === 0) return [];
		return [defaultValue];
	}, [defaultValue]);

	return (
		<BaseSelect
			value={mappedValue}
			defaultValue={mappedDefaultValue}
			onValueChange={(selectedValue) => {
				if (onValueChange) onValueChange(selectedValue.value[0] ?? '', selectedValue.items[0]);
			}}
			{...rest}
		/>
	);
};

export default SingleSelect;
