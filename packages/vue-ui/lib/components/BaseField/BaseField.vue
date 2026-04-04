<script setup lang="ts">
	import { FieldLabel } from '@components/FieldLabel';
	import { SupportingText } from '@components/SupportingText';

	import type { BaseFieldProps, BaseFieldSlots } from './BaseField.type';

	import '@packages/styles/components/BaseField.css';

	withDefaults(defineProps<BaseFieldProps>(), {
		size: 'medium',
		required: false,
		disabled: false,
		clearable: false,
		labelElement: 'label',
		status: undefined
	});

	defineSlots<BaseFieldSlots>();
</script>

<template>
	<div
		class="BaseField"
		:data-status="status"
		:data-size="size"
		:data-required="required"
		:aria-disabled="disabled"
		:data-clearable="clearable"
		:data-testid="dataTestid"
	>
		<FieldLabel
			:id="labelId"
			class="BaseField_Label"
			:status="status"
			:required="required"
			:type="labelElement"
			:for="inputId"
			:show-label="!!label"
		>
			{{ label }}
		</FieldLabel>
		<slot />
		<SupportingText
			:id="supportingTextId"
			class="BaseField_SupportingText"
			:status="status"
			:show="!!supportingText"
		>
			{{ supportingText }}
		</SupportingText>
	</div>
</template>
