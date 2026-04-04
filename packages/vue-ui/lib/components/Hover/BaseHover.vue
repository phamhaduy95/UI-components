<script setup lang="ts">
	import { HoverCard as ArkHoverCard } from '@ark-ui/vue/hover-card';
	import type { HoverProps, HoverEmits, HoverSlots } from './Hover.type';

	withDefaults(defineProps<HoverProps>(), {
		open: undefined,
		disabled: false,
		lazyMount: false,
		unmountOnExit: false,
		positioning: undefined
	});

	const emit = defineEmits<HoverEmits>();

	defineSlots<HoverSlots>();

	const handleUpdateOpen = (open: boolean) => {
		emit('update:open', open);
	};
</script>

<template>
	<ArkHoverCard.Root
		:default-open="defaultOpen"
		:open="open"
		:open-delay="openDelay"
		:close-delay="closeDelay"
		:disabled="disabled"
		:lazy-mount="lazyMount"
		:unmount-on-exit="unmountOnExit"
		:positioning="positioning"
		@update:open="handleUpdateOpen"
	>
		<ArkHoverCard.Context v-slot="context">
			<ArkHoverCard.Trigger
				v-if="$slots.trigger"
				as-child
			>
				<slot
					name="trigger"
					:open="context.open"
				/>
			</ArkHoverCard.Trigger>
			<Teleport to="body">
				<ArkHoverCard.Positioner>
					<ArkHoverCard.Content>
						<slot :open="context.open" />
					</ArkHoverCard.Content>
				</ArkHoverCard.Positioner>
			</Teleport>
		</ArkHoverCard.Context>
	</ArkHoverCard.Root>
</template>
