<script lang="ts" setup>
	// This component is created to test the VirtualList component as the storybook does not work well with generic components

	import {
		VirtualList,
		type VirtualListProps,
		type VirtualListSlots,
		type VirtualListEmits,
		type VirtualListPublicInstance
	} from '@components/VirtualList';
	import { ref } from 'vue';

	export type ItemType = {
		id: string;
		label: string;
	};

	type Props = VirtualListProps<ItemType>;

	const props = defineProps<Props>();

	defineEmits<VirtualListEmits>();

	const virtualListRef = ref<VirtualListPublicInstance>();

	defineExpose<VirtualListPublicInstance>({
		scrollBy: (offset, options) => virtualListRef.value?.scrollBy(offset, options),
		scrollToIndex: (index, options) => virtualListRef.value?.scrollToIndex(index, options),
		scrollToOffset: (offset, options) => virtualListRef.value?.scrollToOffset(offset, options),
		scrollToBottom: (options) => virtualListRef.value?.scrollToBottom(options)
	});

	type Slot = VirtualListSlots<ItemType>;

	defineSlots<Slot>();
</script>

<template>
	<VirtualList
		ref="virtualListRef"
		v-bind="props"
		@scrolling="$emit('scrolling', $event)"
		@start-reached="$emit('startReached')"
		@end-reached="$emit('endReached')"
		@range-changed="$emit('rangeChanged', $event)"
	>
		<template
			v-for="(_, slotName) in $slots"
			#[slotName]="slotProps"
		>
			<slot
				:name="slotName as keyof Slot"
				v-bind="slotProps"
			/>
		</template>
	</VirtualList>
</template>
