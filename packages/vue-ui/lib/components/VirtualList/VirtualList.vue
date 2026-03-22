<script setup lang="ts" generic="TData">
	import { useVirtualizer, type VirtualItem, type VirtualizerOptions } from '@tanstack/vue-virtual';
	import type {
		VirtualListEmits,
		VirtualListProps,
		VirtualListSlots,
		ScrollDirection,
		VirtualListPublicInstance
	} from './VirtualList.type';
	import { computed, ref, watchEffect, type CSSProperties } from 'vue';

	import { useElementSize } from '@vueuse/core';

	const props = withDefaults(defineProps<VirtualListProps<TData>>(), {
		horizontal: false,
		items: () => [],
		stickyHeader: false,
		initialOffset: 0
	});

	const slots = defineSlots<VirtualListSlots<TData>>();

	const emit = defineEmits<VirtualListEmits>();

	const containerRef = ref<HTMLDivElement | null>(null);

	const count = computed(() => props.totalCount ?? props.items.length);

	/** Configure Header */
	const headerRef = ref<HTMLDivElement | null>(null);

	const { height: headerHeight, width: headerWidth } = useElementSize(headerRef);

	const paddingStart = computed(() => {
		if ('header' in slots) {
			return props.horizontal ? headerWidth.value : headerHeight.value;
		}
		return 0;
	});

	const scrollPaddingStart = computed(() => {
		if (props.stickyHeader && 'header' in slots) {
			return props.horizontal ? headerWidth.value : headerHeight.value;
		}
		return 0;
	});

	const headerStyle = computed<CSSProperties>(() => {
		const baseStyle: CSSProperties = props.stickyHeader
			? {
					position: 'sticky',
					left: 0,
					top: 0,
					zIndex: 10,
					width: 'max-content'
				}
			: {
					position: 'absolute',
					top: 0,
					left: 0
				};

		return props.horizontal
			? {
					...baseStyle,
					height: '100%'
				}
			: {
					...baseStyle,
					width: '100%'
				};
	});
	/** End Configure Header */

	/** Configure Footer */
	const footerRef = ref<HTMLDivElement | null>(null);

	const { height: footerHeight, width: footerWidth } = useElementSize(footerRef);

	const paddingEnd = computed(() => {
		if ('footer' in slots) {
			return props.horizontal ? footerWidth.value : footerHeight.value;
		}
		return 0;
	});

	const footerStyle = computed<CSSProperties>(() => {
		return {
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: '100%'
		};
	});
	/** End Configure Footer */

	const virtualizerOptions = computed(
		() =>
			({
				count: count.value,
				getScrollElement: () => containerRef.value,
				estimateSize: props.estimateSize,
				horizontal: props.horizontal,
				overscan: props.overscan,
				initialOffset: props.initialOffset,
				paddingStart: paddingStart.value,
				scrollPaddingStart: scrollPaddingStart.value,
				paddingEnd: paddingEnd.value
			}) satisfies Partial<VirtualizerOptions<HTMLDivElement, Element>>
	);

	const virtualizer = useVirtualizer(virtualizerOptions);

	const virtualItems = computed(() => virtualizer.value.getVirtualItems());

	const totalSize = computed(() => virtualizer.value.getTotalSize());

	const virtualIndexes = computed(() => virtualizer.value.getVirtualIndexes());

	const firstIndex = computed(() => virtualIndexes.value[0]);

	watchEffect(() => {
		if (firstIndex.value === 0) {
			emit('startReached');
		}
	});

	const lastIndex = computed(() => virtualIndexes.value[virtualIndexes.value.length - 1]);

	watchEffect(() => {
		if (lastIndex.value === count.value - 1) {
			emit('endReached');
		}
	});

	watchEffect(() => {
		if (firstIndex.value !== undefined && lastIndex.value !== undefined) {
			emit('rangeChanged', {
				startIndex: firstIndex.value,
				endIndex: lastIndex.value
			});
		}
	});

	const virtualViewStyle = computed<CSSProperties>(() => {
		return props.horizontal
			? {
					height: '100%',
					width: `${totalSize.value}px`,
					position: 'relative'
				}
			: {
					height: `${totalSize.value}px`,
					width: '100%',
					position: 'relative'
				};
	});

	const computeItemStyle = (item: VirtualItem): CSSProperties => {
		return props.horizontal
			? {
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					minWidth: `${item.size}px`,
					transform: `translateX(${item.start}px)`
				}
			: {
					position: 'absolute',
					top: 0,
					left: 0,
					minHeight: `${item.size}px`,
					width: '100%',
					transform: `translateY(${item.start}px)`
				};
	};

	watchEffect(() => {
		if (virtualizer.value.isScrolling) {
			const direction = virtualizer.value.scrollDirection as ScrollDirection;
			const offset = virtualizer.value.scrollOffset ?? 0;
			emit('scrolling', { direction, offsetInPixel: offset });
		}
	});

	const scrollToBottom = (options?: ScrollToOptions) => {
		virtualizer.value.scrollToOffset(totalSize.value, options);
	};

	defineExpose<VirtualListPublicInstance>({
		scrollBy: virtualizer.value.scrollBy,
		scrollToIndex: virtualizer.value.scrollToIndex,
		scrollToOffset: virtualizer.value.scrollToOffset,
		scrollToBottom
	});
</script>

<template>
	<div
		ref="containerRef"
		class="VirtualList_Root"
		:data-testid="dataTestid"
	>
		<div
			class="VirtualList_VirtualView"
			:style="virtualViewStyle"
		>
			<div
				v-if="slots.header"
				ref="headerRef"
				:style="headerStyle"
				class="VirtualList_StickyHeader"
				data-part="virtual-list_sticky-header"
			>
				<slot name="header"></slot>
			</div>

			<template
				v-for="item in virtualItems"
				:key="String(item.key)"
			>
				<div
					:ref="(el) => dynamicSize && virtualizer.measureElement(el as HTMLElement)"
					class="VirtualList_Item"
					:style="computeItemStyle(item)"
					:data-index="item.index"
					data-part="virtual-list_item"
				>
					<slot
						name="itemContent"
						:index="item.index"
						:item-data="items[item.index] as TData"
					></slot>
				</div>
			</template>
			<div
				v-if="slots.footer"
				ref="footerRef"
				:style="footerStyle"
				class="VirtualList_Footer"
				data-part="virtual-list_footer"
			>
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>
