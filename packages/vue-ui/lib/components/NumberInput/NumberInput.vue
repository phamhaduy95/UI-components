<script setup lang="ts">
	import { computed, useId, type ComponentInstance } from 'vue';
	import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
	import { BaseField } from '@components/BaseField';
	import { NumberInput as ArkNumberInput } from '@ark-ui/vue/number-input';

	import type { NumberInputEmits, NumberInputProps } from './NumberInput.type';

	import '@packages/styles/components/NumberInput.css';

	type ArkNumberInpurProps = ComponentInstance<typeof ArkNumberInput.Root>['$props'];

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<NumberInputProps>(), {
		locale: 'en-US'
	});

	const emit = defineEmits<NumberInputEmits>();

	const defaultValue = computed(() => {
		if (props.defaultValue === undefined) return undefined;
		if (props.defaultValue === null) return '';
		return props.defaultValue.toString();
	});

	const modelValue = computed(() => {
		if (props.modelValue === undefined) return undefined;
		if (props.modelValue === null) return '';
		return props.modelValue.toString();
	});

	const handleValueChange: ArkNumberInpurProps['onValueChange'] = ({
		valueAsNumber,
		value: valueAsString
	}) => {
		const value = valueAsString === '' ? null : valueAsNumber;
		emit('valueChange', value, valueAsString);
		emit('update:modelValue', value);
	};

	const handleFocusChange: ArkNumberInpurProps['onFocusChange'] = ({ focused, valueAsNumber }) => {
		emit('focusChange', focused, valueAsNumber);
	};

	const internalSupportingTextId = useId();

	const supportingTextIdToUse = computed(() => props.supportingTextId ?? internalSupportingTextId);
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
		@value-change="handleValueChange"
		@focus-change="handleFocusChange"
	>
		<BaseField
			:disabled="disabled"
			:size="size"
			:required="required"
			:label="label"
			:supporting-text="supportingText"
			:status="status"
			:supporting-text-id="supportingTextIdToUse"
			:label-element="ArkNumberInput.Label"
		>
			<ArkNumberInput.Control class="NumberInput_Control BaseField_Field">
				<ArkNumberInput.Input
					class="NumberInput_Input"
					:aria-describedby="supportingTextIdToUse"
					:placeholder="placeholder"
					v-bind="$attrs"
				/>
				<div class="NumberInput_Triggers">
					<ArkNumberInput.IncrementTrigger
						class="NumberInput_IncrementTrigger"
						aria-label="increase value"
					>
						<ChevronUpIcon />
					</ArkNumberInput.IncrementTrigger>
					<ArkNumberInput.DecrementTrigger
						class="NumberInput_DecrementTrigger"
						aria-label="decrease value"
					>
						<ChevronDownIcon />
					</ArkNumberInput.DecrementTrigger>
				</div>
			</ArkNumberInput.Control>
		</BaseField>
	</ArkNumberInput.Root>
</template>
