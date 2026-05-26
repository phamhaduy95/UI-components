<script setup lang="ts">
	import { computed, useId, type ComponentInstance } from 'vue';
	import { BaseField } from '@components/BaseField';
	import { ColorPicker as ArkColorPicker, parseColor } from '@ark-ui/vue/color-picker';
	import ColorPickerTextValue from './ColorPickerTextValue.vue';

	import type { ColorPickerEmits, BaseColorPickerProps, ColorValue } from './ColorPicker.type';

	import ColorPickerContent from './ColorPickerContent.vue';
	import { generateColorStringValue } from './ColorPicker.util';

	import './ColorPicker.css';

	export type ComponentProps = ComponentInstance<typeof ArkColorPicker.Root>['$props'];

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<BaseColorPickerProps>(), {
		defaultValue: undefined,
		modelValue: undefined,
		open: undefined,
		defaultOpen: undefined,
		format: 'hex'
	});

	const innerFormat = computed(() => {
		return props.format === 'hex' ? undefined : props.format;
	});

	const innerModelValue = computed(() => {
		return props.modelValue ? parseColor(props.modelValue) : undefined;
	});

	const innerDefaultValue = computed(() => {
		return props.defaultValue ? parseColor(props.defaultValue) : undefined;
	});

	const internalSupportingTextId = useId();

	const supportingTextIdToUse = computed(() => props.supportingTextId ?? internalSupportingTextId);

	const emit = defineEmits<ColorPickerEmits>();

	const handleValueChange: ComponentProps['onValueChange'] = (detail) => {
		const colorValue: ColorValue = {
			toString: detail.value.toString,
			isEqual: detail.value.isEqual
		};

		emit('value-change', detail.valueAsString, colorValue);
	};

	const handleUpdateModelValue: ComponentProps['onUpdate:modelValue'] = (detail) => {
		const strValue = generateColorStringValue(detail, props.format);
		emit('update:modelValue', strValue);
	};
</script>

<template>
	<ArkColorPicker.Root
		class="ColorPicker"
		:default-value="innerDefaultValue"
		:model-value="innerModelValue"
		:disabled="disabled"
		:required="required"
		:format="innerFormat"
		:read-only="readOnly"
		:close-on-select="closeOnSelect"
		:open="open"
		:default-open="defaultOpen"
		:open-auto-focus="openAutoFocus"
		:data-testid="dataTestid"
		:positioning="positioning"
		as-child
		@update:model-value="handleUpdateModelValue"
		@update:open="emit('update:open', $event)"
		@value-change="handleValueChange"
		@value-change-end="handleValueChange"
	>
		<BaseField
			:disabled="disabled"
			:size="size"
			:required="required"
			:label="label"
			:supporting-text="supportingText"
			:status="status"
			:supporting-text-id="supportingTextIdToUse"
			:label-element="ArkColorPicker.Label"
		>
			<ArkColorPicker.Control class="ColorPicker_Control">
				<ArkColorPicker.Trigger class="ColorPicker_Trigger BaseField_Field">
					<div class="ColorPicker_Swatch">
						<ArkColorPicker.TransparencyGrid class="ColorPicker_TransparencyGrid" />
						<ArkColorPicker.ValueSwatch
							respect-alpha
							class="ColorPicker_ValueSwatch"
						/>
					</div>
					<ColorPickerTextValue :format="format" />
				</ArkColorPicker.Trigger>
			</ArkColorPicker.Control>
			<ArkColorPicker.Context v-slot="{ value: innerValue }">
				<ArkColorPicker.HiddenInput :value="generateColorStringValue(innerValue, format)" />
			</ArkColorPicker.Context>
			<ArkColorPicker.Positioner>
				<ColorPickerContent />
			</ArkColorPicker.Positioner>
		</BaseField>
	</ArkColorPicker.Root>
</template>
