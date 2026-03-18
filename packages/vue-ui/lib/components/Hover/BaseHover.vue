<script setup lang="ts">
	import { HoverCard as ArkHoverCard, type HoverCardRootProps } from '@ark-ui/vue/hover-card';

	export interface HoverProps
		extends Pick<
			HoverCardRootProps,
			| 'defaultOpen'
			| 'open'
			| 'openDelay'
			| 'closeDelay'
			| 'disabled'
			| 'unmountOnExit'
			| 'lazyMount'
		> {
		positioning?: HoverCardRootProps['positioning'];
	}

	export interface HoverEmits {
		'update:open': [open: boolean];
	}

	withDefaults(defineProps<HoverProps>(), {
		open: undefined,
		disabled: false,
		lazyMount: false,
		unmountOnExit: false,
		positioning: undefined
	});

	const emit = defineEmits<HoverEmits>();

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
