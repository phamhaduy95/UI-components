<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
	import { Accordion as ArkAccordion } from '@ark-ui/vue/accordion';
	import type { HTMLAttributes } from 'vue';
	import { ChevronDownIcon } from '@heroicons/vue/20/solid';

	import '@packages/styles/components/Accordion.css';

	export interface AccordionItemObject extends /* @vue-ignore */ HTMLAttributes {
		// must be unique value
		value: string;
		title?: string;
		disabled?: boolean;
		content?: string;
		'aria-label'?: string;
	}

	type AccordionRootType = InstanceType<typeof ArkAccordion.Root>;

	export interface AccordionProps extends /* @vue-ignore */ HTMLAttributes {
		items: AccordionItemObject[];
		// Whether multiple accordion items can be expanded at the same time.
		multiple?: boolean;
		// Whether the accordion items can be collapsed.
		collapsible?: boolean;
		disabled?: boolean;
		modelValue?: string[];

		defaultValue?: string[];
		dataTestid?: string;
	}

	export interface AccordionEmits {
		'update:modelValue': [value: string[]];
		valueChange: [value: string[]];
	}

	withDefaults(defineProps<AccordionProps>(), {
		multiple: false,
		collapsible: false,
		disabled: false
	});

	const emit = defineEmits<AccordionEmits>();

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
