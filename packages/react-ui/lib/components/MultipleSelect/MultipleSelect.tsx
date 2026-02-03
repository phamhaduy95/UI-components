import { useSelectContext, UseSelectContext } from '@ark-ui/react/select';
import BaseSelect, { BaseSelectProps } from '@components/BaseSelect';
import Tag from '@components/Tag';
import { SelectItem } from '@components/type';
import { JSX } from 'react';

import './MultipleSelect.css';

export interface MultipleSelectProps extends Omit<BaseSelectProps, 'value' | 'onValueChange'> {
	value?: string[];
	onValueChange?: (value: string[], item: SelectItem[]) => void;
}

const MultipleSelect = (props: MultipleSelectProps): JSX.Element => {
	const { value, onValueChange, ...rest } = props;

	return (
		<BaseSelect
			multiple
			value={value}
			onValueChange={(selectedValue) => {
				if (onValueChange) onValueChange(selectedValue.value, selectedValue.items);
			}}
			CustomValueText={<DisplayedSelectValue />}
			{...rest}
		/>
	);
};

export default MultipleSelect;

interface DisplayedSelectValueProps {
	placeholder?: string;
	className?: string;
}

const DisplayedSelectValue = ({ placeholder }: DisplayedSelectValueProps) => {
	const {
		selectedItems = [],
		clearValue,
		focus
	}: UseSelectContext<SelectItem> = useSelectContext();

	if (selectedItems.length === 0) return <span className="Select_Value">{placeholder}</span>;
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
