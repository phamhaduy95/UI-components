<script setup lang="ts">
	import { Select as ArkSelect, createListCollection } from '@ark-ui/vue/select';
	import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/vue/20/solid';
	import { computed, useId } from 'vue';

	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';
	import { VirtualList } from '@components/VirtualList';

	import type { BaseSelectEmits, BaseSelectProps, VirtualizationConfig } from './BaseSelect.type';

	import '@packages/styles/components/BaseSelect.css';
	import '@packages/styles/components/DropDownMenu.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<BaseSelectProps>(), {
		items: () => [],
		size: 'medium',
		multiple: false,
		loopFocus: false,
		deselectable: false,
		clearable: false,
		disabled: false,
		required: false,
		virtualizationConfig: undefined,
		modelValue: undefined,
		defaultValue: undefined,
		open: undefined,
		defaultOpen: undefined
	});

	const emit = defineEmits<BaseSelectEmits>();

	const supportingTextId = useId();

	const collection = computed(() => createListCollection({ items: props.items }));

	const virtualEnabled = computed(() => Boolean(props.virtualizationConfig));

	const defaultVirtualizationConfig: Required<VirtualizationConfig> = {
		estimateSize: () => 30,
		overscan: 2,
		viewHeight: 300,
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
			<ArkSelect.Control
				class="Select_Control BaseField_Field"
				:data-status="status"
			>
				<ArkSelect.Trigger
					class="Select_Trigger"
					:aria-describedby="supportingTextId"
				>
					<slot name="customValueText">
						<ArkSelect.ValueText
							class="Select_Value"
							:placeholder="placeholder"
						/>
					</slot>
				</ArkSelect.Trigger>

				<div class="Select_Trailing">
					<ArkSelect.Context v-slot="{ setOpen }">
						<ArkSelect.ClearTrigger
							v-if="clearable"
							class="Select_ClearButton"
							as-child
						>
							<IconButton
								variant="text"
								color="secondary"
								size="medium"
								@click.stop="setOpen(false)"
							>
								<slot name="clearIcon">
									<XMarkIcon />
								</slot>
							</IconButton>
						</ArkSelect.ClearTrigger>
					</ArkSelect.Context>
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
			<Teleport to="body">
				<ArkSelect.Positioner
					class="Positioner"
					style="z-index: var(--menu-popup-z-index)"
				>
					<template v-if="virtualEnabled">
						<ArkSelect.Content
							class="Menu SelectContent"
							as-child
						>
							<VirtualList
								:items="collection.items"
								:estimate-size="virtualConfig.estimateSize"
								:overscan="virtualConfig.overscan"
								:get-item-key="virtualConfig.getItemKey"
								:style="{ height: `${virtualConfig.viewHeight}px` }"
								class="overflow-auto"
								@start-reached="virtualConfig.onStartReached"
								@end-reached="virtualConfig.onEndReached"
							>
								<template #itemContent="{ itemData }">
									<ArkSelect.Item
										:key="itemData.value"
										class="Menu_Item SelectItem"
										:item="itemData"
									>
										<ArkSelect.ItemText>{{ itemData.label }}</ArkSelect.ItemText>
										<ArkSelect.ItemIndicator class="MenuItem_TrailingIcon">
											<CheckIcon />
										</ArkSelect.ItemIndicator>
									</ArkSelect.Item>
								</template>
							</VirtualList>
						</ArkSelect.Content>
					</template>
					<template v-else>
						<ArkSelect.Content class="Menu SelectContent">
							<ArkSelect.Item
								v-for="item in collection.items"
								:key="item.value"
								class="Menu_Item SelectItem"
								:item="item"
							>
								<ArkSelect.ItemText>{{ item.label }}</ArkSelect.ItemText>
								<ArkSelect.ItemIndicator class="MenuItem_TrailingIcon">
									<CheckIcon />
								</ArkSelect.ItemIndicator>
							</ArkSelect.Item>
						</ArkSelect.Content>
					</template>
				</ArkSelect.Positioner>
			</Teleport>
		</BaseField>
	</ArkSelect.Root>
</template>
