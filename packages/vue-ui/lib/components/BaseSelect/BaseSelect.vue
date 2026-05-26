<script setup lang="ts">
	import { Select as ArkSelect, createListCollection } from '@ark-ui/vue/select';
	import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/20/solid';
	import { computed, useId } from 'vue';

	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';

	import BaseSelectPopup from './BaseSelectPopup.vue';

	import type { BaseSelectEmits, BaseSelectProps, BaseSelectSlots } from './BaseSelect.type';
	import type { VirtualizationConfig } from '@components/type';

	import '@packages/styles/components/BaseSelect.css';
	import '@packages/styles/components/DropDownMenu.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<BaseSelectProps>(), {
		items: () => [],
		size: 'md',
		multiple: false,
		loopFocus: false,
		deselectable: false,
		clearable: false,
		disabled: false,
		required: false,
		popupMaxHeight: 300,
		virtualizationConfig: undefined,
		modelValue: undefined,
		defaultValue: undefined,
		open: undefined,
		defaultOpen: undefined
	});

	const emit = defineEmits<BaseSelectEmits>();

	const slots = defineSlots<BaseSelectSlots>();

	const supportingTextId = useId();

	const collection = computed(() => createListCollection({ items: props.items }));

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
	<ArkSelect.Root
		:class="['Select', props.class]"
		:name="name"
		:collection="collection"
		:disabled="disabled"
		:required="required"
		:deselectable="deselectable"
		:loop-focus="loopFocus"
		:open="open"
		:default-open="defaultOpen"
		:model-value="modelValue"
		:default-value="defaultValue"
		:unmount-on-exit="unmountOnExit"
		:lazy-mount="lazyMount"
		:multiple="multiple"
		:data-testid="dataTestid"
		as-child
		@update:model-value="emit('update:modelValue', $event)"
		@focus-outside="emit('focusOutside', $event)"
		@update:open="emit('update:open', $event)"
		@exit-complete="emit('exitComplete')"
		@value-change="emit('valueChange', $event)"
	>
		<BaseField
			:label="label"
			:supporting-text="supportingText"
			:status="status"
			:size="size"
			:disabled="disabled"
			:required="required"
			:supporting-text-id="supportingTextId"
			:label-element="ArkSelect.Label"
		>
			<ArkSelect.Context v-slot="{ setOpen }">
				<ArkSelect.Control
					class="Select_Control BaseField_Field"
					:data-status="status"
				>
					<ArkSelect.Trigger
						class="Select_Trigger"
						:aria-describedby="supportingTextId"
					>
						<slot
							name="customValueText"
							:supporting-text-id="supportingTextId"
						>
							<ArkSelect.ValueText
								class="Select_Value"
								:placeholder="placeholder"
							/>
						</slot>
					</ArkSelect.Trigger>

					<div class="Select_Trailing">
						<ArkSelect.ClearTrigger
							v-if="clearable"
							class="Select_ClearButton"
							as-child
						>
							<IconButton
								variant="text"
								color="secondary"
								:size="size"
								@click.stop="setOpen(false)"
							>
								<slot name="clearIcon">
									<XMarkIcon />
								</slot>
							</IconButton>
						</ArkSelect.ClearTrigger>

						<ArkSelect.Indicator
							class="Select_Indicator"
							aria-label="select indicator"
						>
							<slot name="triggerIcon">
								<ChevronDownIcon />
							</slot>
						</ArkSelect.Indicator>
					</div>

					<ArkSelect.HiddenSelect
						:name="name"
						:aria-describedby="supportingTextId"
						:tabindex="-1"
						v-bind="$attrs"
					/>
				</ArkSelect.Control>
			</ArkSelect.Context>
		</BaseField>
		<BaseSelectPopup
			:virtual-enabled="virtualEnabled"
			:virtual-config="virtualConfig"
			:items="collection.items"
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
				#itemContent="itemProps"
			>
				<slot
					name="itemContent"
					v-bind="itemProps"
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
		</BaseSelectPopup>
	</ArkSelect.Root>
</template>
