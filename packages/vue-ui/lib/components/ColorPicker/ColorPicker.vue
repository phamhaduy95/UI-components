<script setup lang="ts">
	import { computed, useId } from 'vue';
	import { BaseField } from '../BaseField';
	import { ColorPicker as ArkColorPicker } from '@ark-ui/vue/color-picker';

	import type { ColorPickerEmits, ColorPickerProps } from './ColorPicker.type';

	import './ColorPicker.css';

	defineOptions({ inheritAttrs: false });

	const props = defineProps<ColorPickerProps>();

	const emit = defineEmits<ColorPickerEmits>();

	const internalSupportingTextId = useId();

	const supportingTextIdToUse = computed(() => props.supportingTextId ?? internalSupportingTextId);
</script>

<template>
	<ArkColorPicker.Root
		class="ColorPicker"
		:default-value="defaultValue"
		:model-value="modelValue"
		:disabled="disabled"
		:required="required"
		:read-only="readOnly"
		:format="format"
		:default-format="defaultFormat"
		:close-on-select="closeOnSelect"
		:open="open"
		:default-open="defaultOpen"
		:open-auto-focus="openAutoFocus"
		:data-testid="dataTestid"
		as-child
		@value-change="emit('valueChange', $event)"
		@value-change-end="emit('valueChangeEnd', $event)"
		@update:model-value="emit('update:modelValue', $event)"
		@format-change="emit('formatChange', $event)"
		@update:format="emit('update:format', $event)"
		@open-change="emit('openChange', $event)"
		@update:open="emit('update:open', $event)"
		@focus-outside="emit('focusOutside', $event)"
		@interact-outside="emit('interactOutside', $event)"
		@pointer-down-outside="emit('pointerDownOutside', $event)"
		@exit-complete="emit('exitComplete')"
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
			<ArkColorPicker.Control class="ColorPicker_Control BaseField_Field">
				<ArkColorPicker.Trigger class="ColorPicker_Trigger">
					<ArkColorPicker.ValueSwatch class="ColorPicker_ValueSwatch" />
					<ArkColorPicker.ValueText class="ColorPicker_ValueText" />
				</ArkColorPicker.Trigger>
			</ArkColorPicker.Control>

			<ArkColorPicker.Positioner>
				<ArkColorPicker.Content class="ColorPicker_Content">
					<ArkColorPicker.Area class="ColorPicker_Area">
						<ArkColorPicker.AreaBackground class="ColorPicker_AreaBackground" />
						<ArkColorPicker.AreaThumb class="ColorPicker_AreaThumb" />
					</ArkColorPicker.Area>

					<ArkColorPicker.ChannelSlider
						channel="hue"
						class="ColorPicker_ChannelSlider"
					>
						<ArkColorPicker.ChannelSliderTrack class="ColorPicker_ChannelSliderTrack" />
						<ArkColorPicker.ChannelSliderThumb class="ColorPicker_ChannelSliderThumb" />
					</ArkColorPicker.ChannelSlider>

					<ArkColorPicker.ChannelSlider
						channel="alpha"
						class="ColorPicker_ChannelSlider"
					>
						<ArkColorPicker.TransparencyGrid
							size="8px"
							class="ColorPicker_TransparencyGrid"
						/>
						<ArkColorPicker.ChannelSliderTrack class="ColorPicker_ChannelSliderTrack" />
						<ArkColorPicker.ChannelSliderThumb class="ColorPicker_ChannelSliderThumb" />
					</ArkColorPicker.ChannelSlider>
				</ArkColorPicker.Content>
			</ArkColorPicker.Positioner>
		</BaseField>
	</ArkColorPicker.Root>
</template>
