<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
	import { Accordion as ArkAccordion } from '@ark-ui/vue/accordion';
	import { ChevronDownIcon } from '@heroicons/vue/20/solid';

	import type { AccordionEmits, AccordionProps, AccordionSlots } from './Accordion.type';

	import '@packages/styles/components/Accordion.css';

	type AccordionRootType = InstanceType<typeof ArkAccordion.Root>;

	withDefaults(defineProps<AccordionProps>(), {
		multiple: false,
		collapsible: false,
		disabled: false
	});

	const emit = defineEmits<AccordionEmits>();

	defineSlots<AccordionSlots>();

	const handleValueChange: AccordionRootType['onValueChange'] = (details) => {
		emit('update:modelValue', details.value);
		emit('valueChange', details.value);
	};
</script>

<template>
	<ArkAccordion.Root
		:class="'Accordion'"
		:disabled="disabled"
		:collapsible="collapsible"
		:multiple="multiple"
		:model-value="modelValue"
		:default-value="defaultValue"
		:data-testid="dataTestid"
		:unmount-on-exit="unmountOnExit"
		:lazy-mount="lazyMount"
		@value-change="handleValueChange"
	>
		<ArkAccordion.Item
			v-for="item in items"
			:key="item.value"
			class="Accordion_Item"
			:disabled="item.disabled"
			:value="item.value"
			:aria-label="item.title ?? item['aria-label']"
		>
			<ArkAccordion.ItemContext>
				<ArkAccordion.ItemTrigger
					class="Accordion_Trigger"
					:aria-label="item.title ?? item['aria-label']"
				>
					<slot
						name="title"
						:item="item"
					>
						{{ item.title }}
					</slot>
					<ArkAccordion.ItemIndicator class="Accordion_ItemIndicator">
						<ChevronDownIcon />
					</ArkAccordion.ItemIndicator>
				</ArkAccordion.ItemTrigger>
				<ArkAccordion.ItemContent class="Accordion_Content">
					<slot
						name="content"
						:item="item"
					>
						{{ item.content }}
					</slot>
				</ArkAccordion.ItemContent>
			</ArkAccordion.ItemContext>
		</ArkAccordion.Item>
	</ArkAccordion.Root>
</template>
