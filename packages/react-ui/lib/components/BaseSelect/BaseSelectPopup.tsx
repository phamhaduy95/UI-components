import { Select as ArkSelect, useSelectContext } from '@ark-ui/react/select';
import { CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { SelectItem, VirtualizationConfig } from '@components/type';
import VirtualList from '@components/VirtualList/VirtualList';

import type { BaseSelectProps } from './BaseSelect.type';

export interface BaseSelectPopupProps {
	virtualizationConfig?: VirtualizationConfig;
	items: SelectItem[];
	popupMaxHeight?: number;
	menuHeader?: React.ReactNode;
	menuFooter?: React.ReactNode;
	emptyContent?: React.ReactNode;
	itemContent?: BaseSelectProps['itemContent'];
}

export const BaseSelectPopup = ({
	virtualizationConfig,
	items,
	popupMaxHeight = 300, // 300px default
	menuHeader,
	menuFooter,
	emptyContent,
	itemContent
}: BaseSelectPopupProps) => {
	const select = useSelectContext();

	const renderItem = (item: SelectItem, index: number) => {
		const itemState = select.getItemState({ item });
		return (
			<ArkSelect.Item
				className="Menu_Item Select_Item"
				key={item.value}
				item={item}
				aria-label={item.label}
			>
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
						<ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
						<ArkSelect.ItemIndicator className="MenuItem_TrailingIcon">
							<CheckIcon height={16} width={16} />
						</ArkSelect.ItemIndicator>
					</>
				)}
			</ArkSelect.Item>
		);
	};

	const emptyItem = items.length === 0 && (
		<ArkSelect.Item className="Menu_Item Select_Item" key="empty" item={{} as SelectItem}>
			{emptyContent ?? (
				<ArkSelect.ItemText>
					<p>No item found</p>
				</ArkSelect.ItemText>
			)}
		</ArkSelect.Item>
	);

	if (virtualizationConfig) {
		return (
			<ArkSelect.Content className="Menu Select_Content" asChild>
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
			</ArkSelect.Content>
		);
	}

	return (
		<ArkSelect.Content className="Menu Select_Content" style={{ maxHeight: `${popupMaxHeight}px` }}>
			{menuHeader}
			{items.map((item, index) => renderItem(item, index))}
			{emptyItem}
			{menuFooter}
		</ArkSelect.Content>
	);
};
