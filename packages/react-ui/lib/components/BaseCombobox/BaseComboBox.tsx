import { Combobox, createListCollection } from '@ark-ui/react/combobox';
import { Portal } from '@ark-ui/react/portal';

import SupportingText from '@components/SupportingText';
import { FieldStatus, SelectItem } from '@components/type';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { HTMLAttributes, JSX, Ref, useMemo, useState } from 'react';

import '../FormField/FormField.css';
import './ComboBox.css';
import '../DropDownMenu/Menu.css';

export interface BaseComboboxProps extends HTMLAttributes<HTMLInputElement> {
	className?: string;
	disabled?: boolean;
	items?: Array<SelectItem>;
	label?: string;
	placeholder?: string;
	supportingText?: string;
	ref?: Ref<HTMLDivElement>;
	inputRef?: Ref<HTMLInputElement>;
	status?: FieldStatus;
	required?: boolean;
	loopFocus?: boolean;
	value?: string[];
	onValueChange?: Combobox.RootProps<SelectItem>['onValueChange'];
	onOpenChange?: Combobox.RootProps<SelectItem>['onOpenChange'];
	multiple?: boolean;
	CustomValueText?: React.ReactNode;
	'data-testid'?: string;
	open?: boolean;
}

const BaseCombobox = (props: BaseComboboxProps): JSX.Element => {
	const {
		label,
		items = [],
		value,
		loopFocus,
		multiple,
		disabled,
		status,
		className,
		supportingText,
		ref,
		inputRef,
		'data-testid': dataTestid,
		CustomValueText,
		open,
		onValueChange,
		onOpenChange,
		...rest
	} = props;

	const [searchValue, setSearchValue] = useState('');

	const filteredItems = useMemo(() => {
		if (!searchValue) return items;
		return items.filter(
			(e) => e.label.toLowerCase().includes(searchValue.toLocaleLowerCase()) && !e.disabled
		);
	}, [searchValue, items]);

	const collection = createListCollection({ items: filteredItems });

	const highlightMatchedSearchValue = (itemLabel: string) => {
		if (!searchValue) return itemLabel;
		const Regex = RegExp(`${searchValue}`, 'gi');
		const results: React.ReactNode[] = [];
		let start = 0;
		let match: RegExpExecArray | null;
		while ((match = Regex.exec(itemLabel)) !== null) {
			const noMatchedSegment = <span>{itemLabel.slice(start, match.index)}</span>;

			start = match.index + match[0].length;

			const matchedSegment = (
				<span className="HighlightedText">{itemLabel.slice(match.index, start)}</span>
			);

			results.push(noMatchedSegment, matchedSegment);
		}

		const remaining = start < itemLabel.length ? <span>{itemLabel.slice(start)}</span> : null;

		results.push(remaining);

		return results;
	};

	const renderEmptyItemMessage = () => {
		if (filteredItems.length === 0)
			return (
				<Combobox.Item className="Menu_Item" key={'no item'} item={{}}>
					<Combobox.ItemText asChild>
						<p>No Item founded</p>
					</Combobox.ItemText>
				</Combobox.Item>
			);
	};

	return (
		<Combobox.Root
			className={classNames('FormField Combobox', className)}
			collection={collection}
			onInputValueChange={(data) => {
				setSearchValue(data.inputValue.trim());
			}}
			value={value}
			onValueChange={onValueChange}
			onOpenChange={onOpenChange}
			loopFocus={loopFocus}
			disabled={disabled}
			multiple={multiple}
			data-mode={multiple ? 'multiple' : undefined}
			onExitComplete={() => setSearchValue('')}
			onFocusOutside={() => setSearchValue('')}
			ref={ref}
			open={open}
			data-testid={dataTestid}
		>
			<Combobox.Label className="FormLabel" data-status={status}>
				{label}
			</Combobox.Label>
			<Combobox.Control
				className="FormField_Field Combobox_Field"
				data-status={status}
				aria-disabled={disabled}
			>
				{CustomValueText ?? (
					<Combobox.Input className="Combobox_Input" disabled={disabled} ref={inputRef} {...rest} />
				)}
				<Combobox.Trigger className="Combobox_Trigger" aria-label="Trigger popup">
					<ChevronDownIcon className="Combobox_TriggerIcon" />
				</Combobox.Trigger>
			</Combobox.Control>

			<SupportingText>{supportingText}</SupportingText>
			<Portal>
				<Combobox.Positioner
					className="Menu_Positioner"
					style={{ zIndex: 'var(--menu-popup-z-index)' }}
				>
					<Combobox.Content className="Menu Combobox_Content">
						{collection.items.map((item) => (
							<Combobox.Item className="Menu_Item" key={item.value} item={item}>
								<Combobox.ItemText asChild>
									<p>{highlightMatchedSearchValue(item.label)}</p>
								</Combobox.ItemText>
								<Combobox.ItemIndicator className="MenuItem_TrailingIcon">
									<CheckIcon height={16} width={16} />
								</Combobox.ItemIndicator>
							</Combobox.Item>
						))}
						{renderEmptyItemMessage()}
					</Combobox.Content>
				</Combobox.Positioner>
			</Portal>
		</Combobox.Root>
	);
};

export default BaseCombobox;
