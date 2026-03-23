import { useElementSize } from '@reactuses/core';
import { useVirtualizer, type VirtualItem, type VirtualizerOptions } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { type CSSProperties, type Ref, useCallback, useImperativeHandle, useRef } from 'react';

import type {
	ScrollDirection,
	VirtualListProps,
	VirtualListPublicInstance
} from './VirtualList.type';

type VirtualOptions = VirtualizerOptions<HTMLDivElement, Element>;

function VirtualList<TData>(
	props: VirtualListProps<TData> & { ref?: Ref<VirtualListPublicInstance> }
) {
	const {
		className,
		horizontal = false,
		items = [],
		stickyHeader = false,
		initialOffset = 0,
		getItemKey,
		overscan,
		totalCount,
		estimateSize,
		dynamicSize,
		dataTestid,
		children,
		header,
		footer,
		onScrolling,
		onEndReached,
		onStartReached,
		onRangeChanged,
		ref,
		...rest
	} = props;

	const containerRef = useRef<HTMLDivElement>(null);

	const count = totalCount ?? items.length;

	/** Configure Header */
	const headerRef = useRef<HTMLDivElement>(null);

	const [headerWidth, headerHeight] = useElementSize(headerRef);

	const paddingStart = header ? (horizontal ? headerWidth : headerHeight) : 0;
	const scrollPaddingStart = stickyHeader && header ? (horizontal ? headerWidth : headerHeight) : 0;

	const headerStyle = (() => {
		const baseStyle: CSSProperties = stickyHeader
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

		return horizontal
			? {
					...baseStyle,
					height: '100%'
				}
			: {
					...baseStyle,
					width: '100%'
				};
	})();
	/** End Configure Header */

	/** Configure Footer */
	const footerRef = useRef<HTMLDivElement>(null);
	const [footerWidth, footerHeight] = useElementSize(footerRef);

	const paddingEnd = footer ? (horizontal ? footerWidth : footerHeight) : 0;

	const footerStyle: CSSProperties = {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%'
	};
	/** End Configure Footer */

	const firstIndexRef = useRef<number>(undefined);
	const lastIndexRef = useRef<number>(undefined);

	const checkIfValueChanged = (newValue: number, oldValue: number | undefined) => {
		if (oldValue === undefined) {
			return true;
		}
		return newValue !== oldValue;
	};

	const handleOnChanged: VirtualOptions['onChange'] = (virtualizer) => {
		const virtualIndexes = virtualizer.getVirtualIndexes();

		const firstIndex = virtualIndexes[0];

		const lastIndex = virtualIndexes[virtualIndexes.length - 1];

		if (checkIfValueChanged(firstIndex, firstIndexRef.current)) {
			firstIndexRef.current = firstIndex;
			if (firstIndex === 0) {
				onStartReached?.();
			}
		}

		if (checkIfValueChanged(lastIndex, lastIndexRef.current)) {
			lastIndexRef.current = lastIndex;
			if (lastIndex === count - 1) {
				onEndReached?.();
			}
		}

		if (firstIndex !== undefined && lastIndex !== undefined) {
			onRangeChanged?.({
				startIndex: firstIndex,
				endIndex: lastIndex
			});
		}

		if (virtualizer.isScrolling) {
			const direction = virtualizer.scrollDirection as ScrollDirection;
			const offset = virtualizer.scrollOffset ?? 0;
			onScrolling?.({ direction, offsetInPixel: offset });
		}
	};

	// eslint-disable-next-line react-hooks/incompatible-library
	const virtualizer = useVirtualizer({
		count,
		horizontal,
		overscan,
		initialOffset,
		paddingStart,
		scrollPaddingStart,
		paddingEnd,
		getScrollElement: () => containerRef.current,
		estimateSize,
		getItemKey,
		onChange: handleOnChanged
	});

	const virtualItems = virtualizer.getVirtualItems();
	const totalSize = virtualizer.getTotalSize();

	const virtualViewStyle: CSSProperties = horizontal
		? {
				height: '100%',
				width: `${totalSize}px`,
				position: 'relative'
			}
		: {
				height: `${totalSize}px`,
				width: '100%',
				position: 'relative'
			};

	const computeItemStyle = (item: VirtualItem): CSSProperties => {
		return horizontal
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

	const scrollToBottom = useCallback(
		(options?: ScrollToOptions) => {
			virtualizer.scrollToOffset(totalSize, options);
		},
		[virtualizer, totalSize]
	);

	// Since some Ark-ui components require access to underlined HtmlElement instance to be able to pass
	// props via `asChild`, I need to secretly include the container instance to public ref.
	// Developer can only see methods defined in VirtualListPublicInstance.
	useImperativeHandle(ref, () => {
		const { scrollBy, scrollToIndex, scrollToOffset } = virtualizer;

		if (containerRef.current) {
			Object.assign(containerRef.current, {
				scrollBy,
				scrollToIndex,
				scrollToOffset,
				scrollToBottom
			});
		}

		return containerRef.current as unknown as VirtualListPublicInstance;
	}, [scrollToBottom, virtualizer]);

	return (
		<div
			{...rest}
			ref={containerRef}
			className={classNames('VirtualList_Root', className)}
			data-testid={dataTestid}
		>
			<div
				className="VirtualList_VirtualView"
				style={virtualViewStyle}
				data-part="virtual-list_virtual-view"
				role="presentation"
			>
				{header && (
					<div
						ref={headerRef}
						style={headerStyle}
						className="VirtualList_Header"
						data-part="virtual-list_header"
					>
						{header}
					</div>
				)}

				{virtualItems.map((item) => (
					<div
						key={String(item.key)}
						ref={(el) => {
							if (dynamicSize && el) {
								virtualizer.measureElement(el);
							}
						}}
						className="VirtualList_Item"
						style={computeItemStyle(item)}
						data-index={item.index}
						data-part="virtual-list_item"
					>
						{children({ index: item.index, itemData: items[item.index] })}
					</div>
				))}

				{footer && (
					<div
						ref={footerRef}
						style={footerStyle}
						className="VirtualList_Footer"
						data-part="virtual-list_footer"
					>
						{footer}
					</div>
				)}
			</div>
		</div>
	);
}

export default VirtualList;
