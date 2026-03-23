<script setup lang="ts">
	import { Select as ArkSelect, useSelectContext } from '@ark-ui/vue/select';
	import { CheckIcon } from '@heroicons/vue/20/solid';
	import { VirtualList } from '@components/VirtualList';
	import type { SelectItem, VirtualizationConfig } from '@components/type';
	import type { BaseSelectSlots } from './BaseSelect.type';

	export interface BaseSelectPopupProps {
		virtualEnabled: boolean;
		virtualConfig: Required<VirtualizationConfig>;
		items: SelectItem[];
		popupMaxHeight: number;
	}

	defineProps<BaseSelectPopupProps>();

	const slots =
		defineSlots<
			Pick<BaseSelectSlots, 'menuHeader' | 'menuFooter' | 'emptyContent' | 'itemContent'>
		>();

	const context = useSelectContext();
</script>

<template>
	<Teleport to="body">
		<ArkSelect.Positioner
			class="Positioner"
			style="z-index: var(--menu-popup-z-index)"
		>
			<template v-if="virtualEnabled">
				<ArkSelect.Content
					class="Menu Select_Content"
					as-child
				>
					<VirtualList
						:items="items"
						:estimate-size="virtualConfig.estimateSize"
						:overscan="virtualConfig.overscan"
						:get-item-key="virtualConfig.getItemKey"
						:style="{ maxHeight: `${popupMaxHeight}px` }"
						class="overflow-auto"
						@start-reached="virtualConfig.onStartReached"
						@end-reached="virtualConfig.onEndReached"
					>
						<template
							v-if="slots.menuHeader"
							#header
						>
							<slot name="menuHeader"></slot>
						</template>
						<template #itemContent="{ itemData, index }">
							<ArkSelect.Item
								:key="itemData.value"
								class="Menu_Item Select_Item"
								:item="itemData"
								:aria-label="itemData.label"
							>
								<slot
									name="itemContent"
									:item="itemData"
									:item-index="index"
									:is-selected="context.getItemState({ item: itemData }).selected"
									:is-disabled="context.getItemState({ item: itemData }).disabled"
									:is-highlighted="context.getItemState({ item: itemData }).highlighted"
								>
									<ArkSelect.ItemText>{{ itemData.label }}</ArkSelect.ItemText>
									<ArkSelect.ItemIndicator class="MenuItem_TrailingIcon">
										<CheckIcon />
									</ArkSelect.ItemIndicator>
								</slot>
							</ArkSelect.Item>
						</template>
						<template #footer>
							<ArkSelect.Item
								v-if="items.length === 0"
								class="Menu_Item"
								:item="{}"
							>
								<slot name="emptyContent">
									<ArkSelect.ItemText as-child>
										<p>No item found</p>
									</ArkSelect.ItemText>
								</slot>
							</ArkSelect.Item>
							<slot
								v-if="slots.menuFooter"
								name="menuFooter"
							></slot>
						</template>
					</VirtualList>
				</ArkSelect.Content>
			</template>
			<template v-else>
				<ArkSelect.Content
					class="Menu Select_Content"
					:style="{ maxHeight: `${popupMaxHeight}px` }"
				>
					<slot
						v-if="slots.menuHeader"
						name="menuHeader"
					></slot>
					<template
						v-for="(item, index) in items"
						:key="item.value"
					>
						<ArkSelect.Item
							class="Menu_Item Select_Item"
							:item="item"
							:aria-label="item.label"
						>
							<slot
								name="itemContent"
								:item="item"
								:item-index="index"
								:is-selected="context.getItemState({ item }).selected"
								:is-disabled="context.getItemState({ item }).disabled"
								:is-highlighted="context.getItemState({ item }).highlighted"
							>
								<ArkSelect.ItemText>{{ item.label }}</ArkSelect.ItemText>
								<ArkSelect.ItemIndicator class="MenuItem_TrailingIcon">
									<CheckIcon />
								</ArkSelect.ItemIndicator>
							</slot>
						</ArkSelect.Item>
					</template>
					<ArkSelect.Item
						v-if="items.length === 0"
						class="Menu_Item"
						:item="{}"
					>
						<slot name="emptyContent">
							<ArkSelect.ItemText as-child>
								<p>No item found</p>
							</ArkSelect.ItemText>
						</slot>
					</ArkSelect.Item>
					<slot
						v-if="slots.menuFooter"
						name="menuFooter"
					></slot>
				</ArkSelect.Content>
			</template>
		</ArkSelect.Positioner>
	</Teleport>
</template>
