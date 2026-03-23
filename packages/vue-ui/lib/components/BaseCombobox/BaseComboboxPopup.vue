<script setup lang="ts">
	import { Combobox as ArkCombobox } from '@ark-ui/vue/combobox';
	import { CheckIcon } from '@heroicons/vue/20/solid';
	import { VirtualList } from '@components/VirtualList';
	import type { SelectItem, VirtualizationConfig } from '@components/type';

	export interface BaseComboboxPopupProps {
		virtualEnabled: boolean;
		virtualConfig: Required<VirtualizationConfig>;
		items: SelectItem[];
		filteredItemsLength: number;
		searchValue: string;
		popupMaxHeight: number;
	}

	defineProps<BaseComboboxPopupProps>();

	const findMatchedSegment = (itemLabel: string, searchValue: string) => {
		if (!searchValue) return [{ type: 'normal', value: itemLabel }];
		const Regex = RegExp(`${searchValue}`, 'gi');
		const results: { type: string; value: string }[] = [];
		let start = 0;
		let match: RegExpExecArray | null;
		while ((match = Regex.exec(itemLabel)) !== null) {
			const noMatchedSegment = {
				type: 'normal',
				value: itemLabel.slice(start, match.index)
			};

			start = match.index + match[0].length;

			const matchedSegment = {
				type: 'matched',
				value: itemLabel.slice(match.index, start)
			};

			results.push(noMatchedSegment, matchedSegment);
		}

		const remaining = start < itemLabel.length ? itemLabel.slice(start) : undefined;

		if (remaining) {
			results.push({ type: 'normal', value: remaining });
		}

		return results;
	};
</script>

<template>
	<Teleport to="body">
		<ArkCombobox.Positioner
			class="Menu_Positioner"
			style="z-index: var(--menu-popup-z-index)"
		>
			<template v-if="virtualEnabled">
				<ArkCombobox.Content
					class="Menu Combobox_Content"
					as-child
				>
					<VirtualList
						:items="items"
						:estimate-size="virtualConfig.estimateSize"
						:overscan="virtualConfig.overscan"
						:get-item-key="(index) => items[index]!.value"
						:style="{ maxHeight: `${popupMaxHeight}px` }"
						class="overflow-auto"
						@start-reached="virtualConfig.onStartReached"
						@end-reached="virtualConfig.onEndReached"
					>
						<template #header>
							<slot name="menuHeader"></slot>
						</template>
						<template #itemContent="{ itemData: item, index }">
							<ArkCombobox.Item
								:key="item.value"
								class="Menu_Item"
								:item="item"
							>
								<slot
									name="itemContent"
									:item="item"
									:item-index="index"
								>
									<ArkCombobox.ItemText>
										<span
											v-for="(segment, segmentIndex) in findMatchedSegment(item.label, searchValue)"
											:key="segmentIndex"
											:class="{
												HighlightedText: segment.type === 'matched'
											}"
										>
											{{ segment.value }}
										</span>
									</ArkCombobox.ItemText>
									<ArkCombobox.ItemIndicator class="MenuItem_TrailingIcon">
										<CheckIcon />
									</ArkCombobox.ItemIndicator>
								</slot>
							</ArkCombobox.Item>
						</template>
						<template #footer>
							<ArkCombobox.Item
								v-if="filteredItemsLength === 0"
								class="Menu_Item"
								:item="{}"
							>
								<slot name="emptyContent">
									<ArkCombobox.ItemText as-child>
										<p>No item found</p>
									</ArkCombobox.ItemText>
								</slot>
							</ArkCombobox.Item>
							<slot name="menuFooter"></slot>
						</template>
					</VirtualList>
				</ArkCombobox.Content>
			</template>
			<template v-else>
				<ArkCombobox.Content
					class="Menu Combobox_Content"
					:style="{ maxHeight: `${popupMaxHeight}px` }"
				>
					<slot name="menuHeader"></slot>
					<ArkCombobox.Item
						v-for="(item, index) in items"
						:key="item.value"
						class="Menu_Item"
						:item="item"
					>
						<slot
							name="itemContent"
							:item="item"
							:item-index="index"
						>
							<ArkCombobox.ItemText>
								<span
									v-for="(segment, segmentIndex) in findMatchedSegment(item.label, searchValue)"
									:key="segmentIndex"
									:class="{
										HighlightedText: segment.type === 'matched'
									}"
								>
									{{ segment.value }}
								</span>
							</ArkCombobox.ItemText>
							<ArkCombobox.ItemIndicator class="MenuItem_TrailingIcon">
								<CheckIcon />
							</ArkCombobox.ItemIndicator>
						</slot>
					</ArkCombobox.Item>

					<ArkCombobox.Item
						v-if="filteredItemsLength === 0"
						class="Menu_Item"
						:item="{}"
					>
						<slot name="emptyContent">
							<ArkCombobox.ItemText as-child>
								<p>No item found</p>
							</ArkCombobox.ItemText>
						</slot>
					</ArkCombobox.Item>
					<slot name="menuFooter"></slot>
				</ArkCombobox.Content>
			</template>
		</ArkCombobox.Positioner>
	</Teleport>
</template>
