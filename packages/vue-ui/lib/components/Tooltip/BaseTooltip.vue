<script setup lang="ts">
	import { Tooltip as ArkTooltip } from '@ark-ui/vue/tooltip';
	import type { TooltipEmits, TooltipProps, TooltipSlots } from './Tooltip.type';
	import '@packages/styles/components/Tooltip.css';

	withDefaults(defineProps<TooltipProps>(), {
		defaultOpen: undefined,
		open: undefined,
		openDelay: undefined,
		closeDelay: undefined,
		disabled: undefined,
		lazyMount: undefined,
		unmountOnExit: undefined,
		positioning: undefined,
		closeOnPointerDown: undefined,
		closeOnScroll: undefined,
		interactive: undefined,
		arrow: false
	});

	const emit = defineEmits<TooltipEmits>();

	const slots = defineSlots<TooltipSlots>();

	const handleUpdateOpen = (open: boolean) => {
		emit('update:open', open);
	};
</script>

<template>
	<ArkTooltip.Root
		:default-open="defaultOpen"
		:open="open"
		:open-delay="openDelay"
		:close-delay="closeDelay"
		:disabled="disabled"
		:lazy-mount="lazyMount"
		:unmount-on-exit="unmountOnExit"
		:positioning="positioning"
		:close-on-pointer-down="closeOnPointerDown"
		:close-on-scroll="closeOnScroll"
		:interactive="interactive"
		:data-testid="dataTestId"
		@update:open="handleUpdateOpen"
	>
		<ArkTooltip.Context v-slot="context">
			<ArkTooltip.Trigger
				v-if="slots.trigger"
				as-child
			>
				<slot
					name="trigger"
					:open="context.open"
				/>
			</ArkTooltip.Trigger>
			<Teleport to="body">
				<ArkTooltip.Positioner class="Tooltip_Positioner">
					<ArkTooltip.Content class="Tooltip_Content">
						<ArkTooltip.Arrow
							v-if="arrow"
							class="Tooltip_Arrow"
						>
							<ArkTooltip.ArrowTip class="Tooltip_ArrowTip" />
						</ArkTooltip.Arrow>
						<slot :open="context.open" />
					</ArkTooltip.Content>
				</ArkTooltip.Positioner>
			</Teleport>
		</ArkTooltip.Context>
	</ArkTooltip.Root>
</template>
