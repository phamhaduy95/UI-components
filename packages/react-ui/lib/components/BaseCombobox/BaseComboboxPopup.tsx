import { Combobox as ArkCombobox, useComboboxContext } from '@ark-ui/react/combobox';
import { CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { SelectItem, VirtualizationConfig } from '@components/type';
import { VirtualList } from '@components/VirtualList';

import type { BaseComboboxProps } from './BaseCombobox.type';

export interface BaseComboboxPopupProps {
	virtualizationConfig?: VirtualizationConfig;
	items: SelectItem[];
	searchValue: string;
	popupMaxHeight?: number;
	menuHeader?: React.ReactNode;
	menuFooter?: React.ReactNode;
	emptyContent?: React.ReactNode;
	itemContent?: BaseComboboxProps['itemContent'];
}

export const BaseComboboxPopup = ({
	virtualizationConfig,
	items,
	searchValue,
	popupMaxHeight = 300,
	menuHeader,
	menuFooter,
	emptyContent,
	itemContent
}: BaseComboboxPopupProps) => {
	const combobox = useComboboxContext();

	const highlightMatchedSearchValue = (itemLabel: string) => {
		if (!searchValue) return itemLabel;
		const Regex = RegExp(`${searchValue}`, 'gi');
		const results: React.ReactNode[] = [];
		let start = 0;
		let match: RegExpExecArray | null;
		while ((match = Regex.exec(itemLabel)) !== null) {
			const noMatchedSegment = (
				<span key={`normal-${start}`}>{itemLabel.slice(start, match.index)}</span>
			);

			start = match.index + match[0].length;

			const matchedSegment = (
				<span className="HighlightedText" key={`matched-${match.index}`}>
					{itemLabel.slice(match.index, start)}
				</span>
			);

			results.push(noMatchedSegment, matchedSegment);
		}

		const remaining =
			start < itemLabel.length ? (
				<span key={`remaining-${start}`}>{itemLabel.slice(start)}</span>
			) : null;

		results.push(remaining);

		return results;
	};

	const renderItem = (item: SelectItem, index: number) => {
		const itemState = combobox.getItemState({ item });
		return (
			<ArkCombobox.Item className="Menu_Item" key={item.value} item={item} aria-label={item.label}>
				{itemContent ? (
					itemContent({
						item,
						itemIndex: index,
						isSelected: itemState.selected,
						isDisabled: itemState.disabled,
						isHighlighted: itemState.highlighted
					})
				) : (
					<>
						<ArkCombobox.ItemText asChild>
							<div>{highlightMatchedSearchValue(item.label)}</div>
						</ArkCombobox.ItemText>
						<ArkCombobox.ItemIndicator className="MenuItem_TrailingIcon">
							<CheckIcon height={16} width={16} />
						</ArkCombobox.ItemIndicator>
					</>
				)}
			</ArkCombobox.Item>
		);
	};

	const emptyItem = items.length === 0 && (
		<ArkCombobox.Item className="Menu_Item" key="empty" item={{} as SelectItem}>
			{emptyContent ?? (
				<ArkCombobox.ItemText asChild>
					<p>No item found</p>
				</ArkCombobox.ItemText>
			)}
		</ArkCombobox.Item>
	);

	return (
		<ArkCombobox.Positioner
			className="Menu_Positioner"
			style={{ zIndex: 'var(--menu-popup-z-index)' }}
		>
			{virtualizationConfig ? (
				<ArkCombobox.Content className="Menu Combobox_Content" asChild>
					<VirtualList
						items={items}
						estimateSize={virtualizationConfig.estimateSize}
						overscan={virtualizationConfig.overscan}
						getItemKey={virtualizationConfig.getItemKey}
						style={{ maxHeight: `${popupMaxHeight}px` }}
						className="overflow-auto"
						onStartReached={virtualizationConfig.onStartReached}
						onEndReached={virtualizationConfig.onEndReached}
						header={menuHeader}
						footer={
							<>
								{emptyItem}
								{menuFooter}
							</>
						}
					>
						{({ index, itemData }) => renderItem(itemData, index)}
					</VirtualList>
				</ArkCombobox.Content>
			) : (
				<ArkCombobox.Content
					className="Menu Combobox_Content"
					style={{ maxHeight: `${popupMaxHeight}px` }}
				>
					{menuHeader}
					{items.map((item, index) => renderItem(item, index))}
					{emptyItem}
					{menuFooter}
				</ArkCombobox.Content>
			)}
		</ArkCombobox.Positioner>
	);
};
