import { useSelectContext, UseSelectContext } from '@ark-ui/react/select';
import BaseSelect, { BaseSelectProps } from '@components/BaseSelect';
import Tag from '@components/Tag';
import { SelectItem } from '@components/type';
import { JSX } from 'react';

import './MultipleSelect.css';

export interface MultipleSelectProps
	extends Omit<BaseSelectProps, 'value' | 'onValueChange' | 'defaultValue'> {
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[], item: SelectItem[]) => void;
}

const MultipleSelect = (props: MultipleSelectProps): JSX.Element => {
	const { value, onValueChange, placeholder, ...rest } = props;

	return (
		<BaseSelect
			multiple
			value={value}
			placeholder={placeholder}
			onValueChange={(selectedValue) => {
				if (onValueChange) onValueChange(selectedValue.value, selectedValue.items);
			}}
			CustomValueText={<DisplayedSelectValue placeholder={placeholder} />}
			{...rest}
		/>
	);
};

export default MultipleSelect;

interface DisplayedSelectValueProps {
	placeholder?: string;
}

const DisplayedSelectValue = ({ placeholder }: DisplayedSelectValueProps) => {
	const {
		selectedItems = [],
		clearValue,
		focus
	}: UseSelectContext<SelectItem> = useSelectContext();

	if (selectedItems.length === 0)
		return <span className="Select_DisplayedValue">{placeholder}</span>;
	return (
		<div className="Select_DisplayedValue">
			{selectedItems.map((item) => (
				<Tag
					label={item.label}
					removable
					onRemoveClick={(e) => {
						e.stopPropagation();
						clearValue(item.value);
						focus();
					}}
				/>
			))}
		</div>
	);
};
