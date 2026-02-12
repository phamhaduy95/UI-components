import { Combobox, useComboboxContext, UseComboboxContext } from '@ark-ui/react/combobox';
import BaseCombobox, { BaseComboboxProps } from '@components/BaseCombobox';
import { JSX, Ref } from 'react';

import Tag from '@components/Tag';
import { SelectItem } from '@components/type';

export interface MultipleComboboxProps
	extends Omit<BaseComboboxProps, 'value' | 'onValueChange' | 'multiple'> {
	value?: string[];
	onValueChange?: (value: string[], item?: SelectItem[]) => void;
}

const MultipleCombobox = (props: MultipleComboboxProps): JSX.Element => {
	const { value, onValueChange, placeholder, inputRef, ...rest } = props;

	const handleValueChange: BaseComboboxProps['onValueChange'] = (data) => {
		if (onValueChange) onValueChange(data.value, data.items);
	};

	return (
		<BaseCombobox
			{...rest}
			value={value}
			onValueChange={handleValueChange}
			multiple
			CustomValueText={<MultipleComboboxDisplayValue placeholder={placeholder} ref={inputRef} />}
		/>
	);
};

export default MultipleCombobox;

type MultipleComboboxDisplayValueProps = {
	placeholder?: string;
	ref?: Ref<HTMLInputElement>;
};

const MultipleComboboxDisplayValue = ({ placeholder, ref }: MultipleComboboxDisplayValueProps) => {
	const {
		selectedItems = [],
		clearValue,
		focus
	}: UseComboboxContext<SelectItem> = useComboboxContext();

	const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e;
		const target = e.target as HTMLInputElement;

		if (!target.value && key === 'Backspace') {
			const lastSelectedItem = selectedItems[selectedItems.length - 1];
			clearValue(lastSelectedItem.value);
		}
	};

	const displayedPlaceholder = placeholder && selectedItems.length === 0 ? placeholder : undefined;

	return (
		<div className="Combobox_DisplayArea">
			{selectedItems.map((item) => (
				<Tag
					label={item.label}
					key={item.value}
					removable
					onRemoveClick={() => {
						clearValue(item.value);
						focus();
					}}
				/>
			))}
			<Combobox.Input
				className="Combobox_Input"
				onKeyDown={handleKeydown}
				placeholder={displayedPlaceholder}
				ref={ref}
			/>
		</div>
	);
};
