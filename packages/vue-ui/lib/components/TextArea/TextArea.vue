<script setup lang="ts">
	import { ref, computed, useId } from 'vue';
	import { XMarkIcon } from '@heroicons/vue/20/solid';
	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';

	import type { TextAreaEmits, TextAreaProps } from './TextArea.type';

	import '@packages/styles/components/TextArea.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<TextAreaProps>(), {
		size: 'md',
		required: false,
		disabled: false,
		clearable: false,
		rows: 3
	});

	const emit = defineEmits<TextAreaEmits>();

	const inputId = useId();
	const supportingTextId = useId();

	const internalValue = ref(props.defaultValue ?? '');

	const inputValue = computed(() => props.modelValue ?? internalValue.value);

	const handleInputChanged = (e: InputEvent) => {
		const target = e.target as HTMLTextAreaElement;
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
		class="TextArea"
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
			<textarea
				:id="inputId"
				class="TextArea_Input"
				:placeholder="placeholder"
				:disabled="disabled"
				:aria-describedby="supportingText ? supportingTextId : undefined"
				:aria-invalid="status === 'error'"
				:value="inputValue"
				:required="required"
				:readonly="readOnly"
				:rows="rows"
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
