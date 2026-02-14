import { Combobox, useComboboxContext, UseComboboxContext } from '@ark-ui/react/combobox';
import BaseCombobox, { BaseComboboxProps } from '@components/BaseCombobox';
import { JSX, Ref } from 'react';

import Tag from '@components/Tag';
import { SelectItem } from '@components/type';
import classNames from 'classnames';

import './MultipleCombobox.css';

export interface MultipleComboboxProps
	extends Omit<BaseComboboxProps, 'value' | 'onValueChange' | 'multiple' | 'defaultValue'> {
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[], item?: SelectItem[]) => void;
}

const MultipleCombobox = (props: MultipleComboboxProps): JSX.Element => {
	const { value, defaultValue, onValueChange, placeholder, inputRef, className, ...rest } = props;

	const handleValueChange: BaseComboboxProps['onValueChange'] = (data) => {
		if (onValueChange) onValueChange(data.value, data.items);
	};

	return (
		<BaseCombobox
			{...rest}
			value={value}
			className={classNames('MultipleCombobox', className)}
			onValueChange={handleValueChange}
			multiple
			defaultValue={defaultValue}
			CustomValueText={<MultipleComboboxDisplayValue placeholder={placeholder} ref={inputRef} />}
		/>
	);
};

export default MultipleCombobox;

interface MultipleComboboxDisplayValueProps {
	placeholder?: string;
	ref?: Ref<HTMLInputElement>;
}

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
		<div className="MultipleCombobox_DisplayArea">
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
				className="MultipleCombobox_Input"
				onKeyDown={handleKeydown}
				placeholder={displayedPlaceholder}
				ref={ref}
			/>
		</div>
	);
};
