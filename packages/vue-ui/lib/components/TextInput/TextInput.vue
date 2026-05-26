<script setup lang="ts">
	import { ref, computed, useId } from 'vue';
	import { XMarkIcon } from '@heroicons/vue/20/solid';
	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';

	import type { TextInputEmits, TextInputProps } from './TextInput.type';

	import '@packages/styles/components/TextInput.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<TextInputProps>(), {
		size: 'md',
		required: false,
		disabled: false,
		clearable: false
	});

	const emit = defineEmits<TextInputEmits>();

	const inputId = useId();
	const supportingTextId = useId();

	const internalValue = ref(props.defaultValue ?? '');

	const inputValue = computed(() => props.modelValue ?? internalValue.value);

	const handleInputChanged = (e: InputEvent) => {
		const target = e.target as HTMLInputElement;
		internalValue.value = target.value;
		emit('update:modelValue', target.value);
		emit('valueChange', e);
	};

	const handleClear = () => {
		emit('update:modelValue', '');
		internalValue.value = '';
	};

	const shouldShowClearIcon = computed(
		() => props.clearable && typeof inputValue.value === 'string' && inputValue.value.length > 0
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
			:data-disabled="disabled"
			:data-required="required"
			:data-status="status"
		>
			<input
				:id="inputId"
				class="TextInput_Input"
				:placeholder="placeholder"
				:disabled="disabled"
				:aria-describedby="supportingText ? supportingTextId : undefined"
				:aria-invalid="status === 'error'"
				:value="inputValue"
				:required="required"
				:readonly="readOnly"
				v-bind="$attrs"
				@input="handleInputChanged"
			/>
			<div class="BaseField_Trailing">
				<IconButton
					v-if="shouldShowClearIcon"
					aria-label="Clear"
					:size="size"
					variant="text"
					color="secondary"
					@click="handleClear"
				>
					<XMarkIcon />
				</IconButton>
			</div>
		</div>
	</BaseField>
</template>
