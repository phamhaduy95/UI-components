<script setup lang="ts">
	import {
		Combobox as ArkCombobox,
		createListCollection,
		type ComboboxRootEmits,
		type ComboboxRootProps
	} from '@ark-ui/vue/combobox';
	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';
	import type { CommonFieldProps, SelectItem } from '@components/type';
	import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/vue/20/solid';
	import { computed, useId, type HTMLAttributes, ref } from 'vue';

	import '@packages/styles/components/BaseCombobox.css';
	import '@packages/styles/components/DropDownMenu.css';

	defineOptions({ inheritAttrs: false });

	type ArkComboboxProps = ComboboxRootProps<SelectItem>;

	export interface ComboboxBaseProps
		extends CommonFieldProps<string[]>,
			Pick<
				ArkComboboxProps,
				'loopFocus' | 'open' | 'multiple' | 'modelValue' | 'defaultValue' | 'defaultOpen'
			> {
		class?: string;
		items?: Array<SelectItem>;
		dataTestid?: string;
	}

	export type BaseComboboxProps = ComboboxBaseProps &
		/* @vue-ignore */
		Omit<HTMLAttributes, 'value' | 'disabled' | 'required' | 'size' | 'multiple'>;

	export interface BaseComboboxEmits {
		focusOutside: ComboboxRootEmits<SelectItem>['focusOutside'];
		exitComplete: ComboboxRootEmits<SelectItem>['exitComplete'];
		valueChange: ComboboxRootEmits<SelectItem>['valueChange'];
		'update:modelValue': ComboboxRootEmits<SelectItem>['update:modelValue'];
		'update:open': ComboboxRootEmits<SelectItem>['update:open'];
		'update:inputValue': ComboboxRootEmits<SelectItem>['update:inputValue'];
	}

	const props = withDefaults(defineProps<BaseComboboxProps>(), {
		items: () => [],
		size: 'medium',
		multiple: false,
		loopFocus: false,
		clearable: false,
		disabled: false,
		required: false,
		modelValue: undefined,
		defaultValue: undefined,
		open: undefined,
		defaultOpen: undefined
	});

	const emit = defineEmits<BaseComboboxEmits>();

	const supportingTextId = useId();
	const searchValue = ref('');

	const filteredItems = computed(() => {
		if (!searchValue.value) return props.items;
		return props.items.filter((item) =>
			item.label.toLowerCase().includes(searchValue.value.toLowerCase())
		);
	});

	const collection = computed(() => createListCollection({ items: filteredItems.value }));

	const findMatchedSegment = (itemLabel: string, searchValue: string) => {
		if (!searchValue) return [{ type: 'normal', value: itemLabel }];
		const Regex = RegExp(`${searchValue}`, 'gi');
		const results: { type: string; value: string }[] = [];
		let start = 0;
		let match: RegExpExecArray | null;
		while ((match = Regex.exec(itemLabel)) !== null) {
			const noMatchedSegment = {
				type: 'normal',
				value: itemLabel.slice(start, match.index)
			};

			start = match.index + match[0].length;

			const matchedSegment = {
				type: 'matched',
				value: itemLabel.slice(match.index, start)
			};

			results.push(noMatchedSegment, matchedSegment);
		}

		const remaining = start < itemLabel.length ? itemLabel.slice(start) : undefined;

		if (remaining) {
			results.push({ type: 'normal', value: remaining });
		}

		return results;
	};
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
				<slot name="customValueText">
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
						size="medium"
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
						size="medium"
					>
						<slot name="triggerIcon">
							<ChevronDownIcon class="Combobox_TriggerIcon" />
						</slot>
					</IconButton>
				</ArkCombobox.Trigger>
			</ArkCombobox.Control>

			<Teleport to="body">
				<ArkCombobox.Positioner
					class="Menu_Positioner"
					style="z-index: var(--menu-popup-z-index)"
				>
					<ArkCombobox.Content class="Menu Combobox_Content">
						<slot name="menuHeader"></slot>
						<ArkCombobox.Item
							v-for="(item, index) in collection.items"
							:key="item.value"
							class="Menu_Item"
							:item="item"
						>
							<slot
								name="itemContent"
								:item="item"
								:item-index="index"
							>
								<ArkCombobox.ItemText>
									<span
										v-for="(segment, segmentIndex) in findMatchedSegment(item.label, searchValue)"
										:key="segmentIndex"
										:class="{
											HighlightedText: segment.type === 'matched'
										}"
									>
										{{ segment.value }}
									</span>
								</ArkCombobox.ItemText>
								<ArkCombobox.ItemIndicator class="MenuItem_TrailingIcon">
									<CheckIcon />
								</ArkCombobox.ItemIndicator>
							</slot>
						</ArkCombobox.Item>

						<ArkCombobox.Item
							v-if="filteredItems.length === 0"
							class="Menu_Item"
							:item="{}"
						>
							<slot name="emptyContent">
								<ArkCombobox.ItemText as-child>
									<p>No item found</p>
								</ArkCombobox.ItemText>
							</slot>
						</ArkCombobox.Item>
						<slot name="menuFooter"></slot>
					</ArkCombobox.Content>
				</ArkCombobox.Positioner>
			</Teleport>
		</BaseField>
	</ArkCombobox.Root>
</template>
