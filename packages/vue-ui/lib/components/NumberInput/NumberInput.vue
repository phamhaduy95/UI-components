<script setup lang="ts">
	import { useId } from 'vue';
	import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
	import type { CommonFieldProps } from '@components/type';
	import { BaseField } from '@components/BaseField';
	import {
		NumberInput as ArkNumberInput,
		type NumberInputRootEmits
	} from '@ark-ui/vue/number-input';
	import '@packages/styles/components/NumberInput.css';

	defineOptions({ inheritAttrs: false });

	export interface NumberInputProps extends CommonFieldProps<string> {
		modelValue?: string;
		max?: number;
		min?: number;
		formatOptions?: Intl.NumberFormatOptions;
		step?: number;
		inputMode?: 'decimal' | 'numeric';
		locale?: string;
		dataTestid?: string;
	}

	export type NumberInputEmits = NumberInputRootEmits;

	const props = withDefaults(defineProps<NumberInputProps>(), {
		locale: 'en-US'
	});

	const emit = defineEmits<NumberInputEmits>();

	const internalSupportingTextId = useId();
	const defaultInputId = useId();

	const inputIdToUse = () => props.inputId ?? defaultInputId;
	const supportingTextIdToUse = () => props.supportingTextId ?? internalSupportingTextId;
</script>

<template>
	<ArkNumberInput.Root
		class="NumberInput"
		:default-value="defaultValue"
		:model-value="modelValue"
		:disabled="disabled"
		:required="required"
		:step="step"
		:locale="locale"
		:max="max"
		:min="min"
		:format-options="formatOptions"
		:input-mode="inputMode"
		:data-testid="dataTestid"
		as-child
		@value-change="emit('valueChange', $event)"
		@update:model-value="emit('update:modelValue', $event)"
		@value-invalid="emit('valueInvalid', $event)"
		@focus-change="emit('focusChange', $event)"
	>
		<BaseField
			:disabled="disabled"
			:size="size"
			:required="required"
			:label="label"
			:supporting-text="supportingText"
			:status="status"
			:supporting-text-id="supportingTextIdToUse()"
			:input-id="inputIdToUse()"
			:label-element="ArkNumberInput.Label"
		>
			<ArkNumberInput.Control class="NumberInput_Control BaseField_Field">
				<ArkNumberInput.Input
					:id="inputIdToUse()"
					class="NumberInput_Input"
					:aria-describedby="supportingTextIdToUse()"
					:placeholder="placeholder"
				/>
				<div class="NumberInput_Triggers">
					<ArkNumberInput.IncrementTrigger
						class="NumberInput_IncrementTrigger"
						aria-label="increase value"
					>
						<ChevronUpIcon
							width="15"
							height="15"
						/>
					</ArkNumberInput.IncrementTrigger>
					<ArkNumberInput.DecrementTrigger
						class="NumberInput_DecrementTrigger"
						aria-label="decrease value"
					>
						<ChevronDownIcon
							width="15"
							height="15"
						/>
					</ArkNumberInput.DecrementTrigger>
				</div>
			</ArkNumberInput.Control>
		</BaseField>
	</ArkNumberInput.Root>
</template>
