<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
	import { Popover as ArkPopover } from '@ark-ui/vue/popover';
	import type { PopoverEmits, PopoverProps, PopoverSlots } from './Popover.type';

	withDefaults(defineProps<PopoverProps>(), {
		autoFocus: undefined,
		open: undefined,
		defaultOpen: undefined,
		closeOnInteractOutside: undefined,
		closeOnEscape: undefined,
		lazyMount: undefined,
		unmountOnExit: undefined
	});

	const emit = defineEmits<PopoverEmits>();

	defineSlots<PopoverSlots>();

	const handleUpdateOpen = (open: boolean) => {
		emit('update:open', open);
	};
	const handleExitComplete = () => {
		emit('exitComplete');
	};
</script>

<template>
	<ArkPopover.Root
		:auto-focus="autoFocus"
		:open="open"
		:default-open="defaultOpen"
		:close-on-escape="closeOnEscape"
		:unmount-on-exit="unmountOnExit"
		:close-on-interact-outside="closeOnInteractOutside"
		:lazy-mount="lazyMount"
		:positioning="positioning"
		@update:open="handleUpdateOpen"
		@exit-complete="handleExitComplete"
	>
		<ArkPopover.Context v-slot="context">
			<ArkPopover.Trigger
				v-if="$slots.trigger"
				as-child
			>
				<slot
					name="trigger"
					:open="context.open"
					:set-open="context.setOpen"
				/>
			</ArkPopover.Trigger>
			<Teleport to="body">
				<ArkPopover.Positioner>
					<ArkPopover.Content>
						<slot
							:open="context.open"
							:set-open="context.setOpen"
						/>
					</ArkPopover.Content>
				</ArkPopover.Positioner>
			</Teleport>
		</ArkPopover.Context>
	</ArkPopover.Root>
</template>
