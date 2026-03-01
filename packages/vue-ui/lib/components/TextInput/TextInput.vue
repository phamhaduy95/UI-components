<script setup lang="ts">
	import { ref, computed, useId } from 'vue';
	import type { CommonFieldProps } from '@components/type';
	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';
	import '@packages/styles/components/TextInput.css';

	export interface TextInputProps extends CommonFieldProps<string> {
		modelValue?: string;
		dataTestid?: string;
	}

	const props = withDefaults(defineProps<TextInputProps>(), {
		size: 'medium',
		required: false,
		disabled: false,
		clearable: false
	});

	const emit = defineEmits<{
		(e: 'update:modelValue', value: string): void;
		(e: 'valueChange', value: string): void;
	}>();

	const inputId = useId();
	const supportingTextId = useId();

	const internalValue = ref(props.defaultValue || '');

	const value = computed({
		get: () => (props.modelValue ?? props.value ?? internalValue.value) as string,
		set: (val: string) => {
			internalValue.value = val;
			emit('update:modelValue', val);
			emit('valueChange', val);
		}
	});

	const handleInputChanged = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value.value = target.value;
	};

	const handleClear = () => {
		value.value = '';
	};

	const shouldShowClearIcon = computed(
		() => props.clearable && !!value.value && String(value.value).length > 0
	);
</script>

<template>
	<BaseField
		class="TextInput"
		:label="label"
		:supporting-text="supportingText"
		:status="status"
		:required="required"
		:input-id="inputId"
		:disabled="disabled"
		:supporting-text-id="supportingText ? supportingTextId : undefined"
		:size="size"
		:data-testid="dataTestid"
	>
		<div
			class="BaseField_Field"
			:data-clearable="clearable"
			:aria-disabled="disabled"
		>
			<input
				:id="inputId"
				class="TextInput_Input"
				:placeholder="placeholder"
				:disabled="disabled"
				:aria-disabled="disabled"
				:aria-describedby="supportingText ? supportingTextId : undefined"
				:aria-invalid="status === 'error'"
				:value="value"
				:required="required"
				v-bind="$attrs"
				@input="handleInputChanged"
			/>
			<div class="BaseField_Trailing">
				<IconButton
					v-if="shouldShowClearIcon"
					aria-label="Clear"
					size="medium"
					variant="text"
					color="secondary"
					@click="handleClear"
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
						/>
					</svg>
				</IconButton>
			</div>
		</div>
	</BaseField>
</template>
