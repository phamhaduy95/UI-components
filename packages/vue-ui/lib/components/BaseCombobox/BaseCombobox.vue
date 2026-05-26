<script setup lang="ts">
	import { computed, useId, ref } from 'vue';
	import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/20/solid';
	import { Combobox as ArkCombobox, createListCollection } from '@ark-ui/vue/combobox';

	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';

	import BaseComboboxPopup from './BaseComboboxPopup.vue';

	import type { VirtualizationConfig } from '@components/type';

	import type {
		BaseComboboxEmits,
		BaseComboboxProps,
		BaseComboboxSlots
	} from './BaseCombobox.type';

	import '@packages/styles/components/BaseCombobox.css';
	import '@packages/styles/components/DropDownMenu.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<BaseComboboxProps>(), {
		items: () => [],
		size: 'md',
		multiple: false,
		loopFocus: false,
		clearable: false,
		disabled: false,
		required: false,
		popupMaxHeight: 300,
		modelValue: undefined,
		defaultValue: undefined,
		open: undefined,
		defaultOpen: undefined,
		virtualizationConfig: undefined
	});

	const emit = defineEmits<BaseComboboxEmits>();

	const slots = defineSlots<BaseComboboxSlots>();

	const supportingTextId = useId();
	const searchValue = ref('');

	const filteredItems = computed(() => {
		if (!searchValue.value) return props.items;
		return props.items.filter((item) =>
			item.label.toLowerCase().includes(searchValue.value.toLowerCase())
		);
	});

	const collection = computed(() => createListCollection({ items: filteredItems.value }));

	const virtualEnabled = computed(() => Boolean(props.virtualizationConfig));

	const defaultVirtualizationConfig: Required<VirtualizationConfig> = {
		estimateSize: () => 30,
		overscan: 2,
		getItemKey: (index: number) => index.toString(),
		onStartReached: () => {},
		onEndReached: () => {}
	};

	const virtualConfig = computed(() => ({
		...defaultVirtualizationConfig,
		...(props.virtualizationConfig || {})
	}));
</script>

<template>
	<ArkCombobox.Root
		:class="['Combobox', props.class]"
		:collection="collection"
		:model-value="modelValue"
		:default-value="defaultValue"
		:loop-focus="loopFocus"
		:disabled="disabled"
		:required="required"
		:multiple="multiple"
		:open="open"
		:default-open="defaultOpen"
		:data-testid="dataTestid"
		:data-mode="multiple ? 'multiple' : undefined"
		as-child
		@update:input-value="
			(text) => {
				searchValue = text.trim();
				emit('update:inputValue', text);
			}
		"
		@update:model-value="emit('update:modelValue', $event)"
		@update:open="emit('update:open', $event)"
		@exit-complete="
			() => {
				searchValue = '';
				emit('exitComplete');
			}
		"
		@focus-outside="emit('focusOutside', $event)"
		@value-change="emit('valueChange', $event)"
	>
		<BaseField
			:label="label"
			:supporting-text="supportingText"
			:status="status"
			:size="size"
			:disabled="disabled"
			:required="required"
			:supporting-text-id="supportingText ? supportingTextId : undefined"
			:label-element="ArkCombobox.Label"
		>
			<ArkCombobox.Control
				class="BaseField_Field Combobox_Control"
				:data-status="status"
				:aria-disabled="disabled"
			>
				<slot
					name="customValueText"
					:supporting-text-id="supportingTextId"
				>
					<ArkCombobox.Input
						:aria-describedby="supportingTextId"
						v-bind="$attrs"
						class="Combobox_Input"
						:disabled="disabled"
						:placeholder="placeholder"
					/>
				</slot>

				<ArkCombobox.ClearTrigger
					v-if="clearable"
					class="Combobox_ClearTrigger"
					as-child
					:tabindex="0"
				>
					<IconButton
						variant="text"
						color="secondary"
						:size="size"
					>
						<slot name="clearIcon">
							<XMarkIcon />
						</slot>
					</IconButton>
				</ArkCombobox.ClearTrigger>

				<ArkCombobox.Trigger
					class="Combobox_Trigger"
					aria-label="Trigger popup"
					as-child
				>
					<IconButton
						variant="text"
						color="secondary"
						:size="size"
					>
						<slot name="triggerIcon">
							<ChevronDownIcon class="Combobox_TriggerIcon" />
						</slot>
					</IconButton>
				</ArkCombobox.Trigger>
			</ArkCombobox.Control>
		</BaseField>
		<BaseComboboxPopup
			:virtual-enabled="virtualEnabled"
			:virtual-config="virtualConfig"
			:items="collection.items"
			:filtered-items-length="filteredItems.length"
			:search-value="searchValue"
			:popup-max-height="popupMaxHeight"
		>
			<template
				v-if="slots.menuHeader"
				#menuHeader
			>
				<slot name="menuHeader"></slot>
			</template>
			<template
				v-if="slots.itemContent"
				#itemContent="{ item, itemIndex }"
			>
				<slot
					name="itemContent"
					:item="item"
					:item-index="itemIndex"
				></slot>
			</template>
			<template
				v-if="slots.emptyContent"
				#emptyContent
			>
				<slot name="emptyContent"></slot>
			</template>
			<template
				v-if="slots.menuFooter"
				#menuFooter
			>
				<slot name="menuFooter"></slot>
			</template>
		</BaseComboboxPopup>
	</ArkCombobox.Root>
</template>
