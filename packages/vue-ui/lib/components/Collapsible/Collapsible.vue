<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
	import type { ComponentInstance } from 'vue';
	import { Collapsible as ArkCollapsible } from '@ark-ui/vue/collapsible';
	import { ChevronRightIcon } from '@heroicons/vue/20/solid';

	import type { CollapsibleProps, CollapsibleEmits, CollapsibleSlots } from './Collapsible.type';

	import '@packages/styles/components/Collapsible.css';

	type CollapsiableProps = ComponentInstance<typeof ArkCollapsible.Root>['$props'];

	withDefaults(defineProps<CollapsibleProps>(), {
		disabled: false,
		defaultOpen: false,
		open: undefined,
		lazyMount: false,
		unmountOnExit: false
	});

	const emit = defineEmits<CollapsibleEmits>();

	defineSlots<Partial<CollapsibleSlots>>();

	const handleOpenChange: CollapsiableProps['onUpdate:open'] = (open) => {
		emit('update:open', open);
		emit('openChange', open);
	};
</script>

<template>
	<ArkCollapsible.Root
		:class="'Collapsible'"
		:disabled="disabled"
		:default-open="defaultOpen"
		:lazy-mount="lazyMount"
		:unmount-on-exit="unmountOnExit"
		:open="open"
		:collapsed-height="collapsedHeight"
		:collapsed-width="collapsedWidth"
		@update:open="handleOpenChange"
		@exit-complete="() => emit('exitComplete')"
	>
		<ArkCollapsible.Context v-slot="{ open: currentOpen, disabled: currentDisabled }">
			<ArkCollapsible.Trigger
				class="Collapsible_Trigger"
				:disabled="disabled"
			>
				<slot
					name="title"
					:open="currentOpen"
					:title="title"
					:disabled="currentDisabled"
					:content="content"
				>
					{{ title }}
				</slot>
				<ArkCollapsible.Indicator class="Collapsible_Indicator">
					<slot
						name="indicator"
						:open="currentOpen"
						:title="title"
						:disabled="currentDisabled"
						:content="content"
					>
						<ChevronRightIcon />
					</slot>
				</ArkCollapsible.Indicator>
			</ArkCollapsible.Trigger>
			<ArkCollapsible.Content class="Collapsible_Content">
				<div class="Collapsible_Body">
					<slot
						name="content"
						:open="currentOpen"
						:title="title"
						:disabled="currentDisabled"
						:content="content"
					>
						{{ content }}
					</slot>
				</div>
			</ArkCollapsible.Content>
		</ArkCollapsible.Context>
	</ArkCollapsible.Root>
</template>
