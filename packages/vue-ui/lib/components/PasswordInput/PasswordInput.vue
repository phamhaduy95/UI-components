<script setup lang="ts">
	import { ref, computed, useId } from 'vue';
	import { PasswordInput as ArkPasswordInput } from '@ark-ui/vue/password-input';
	import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/vue/24/solid';
	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';

	import type { PasswordInputEmits, PasswordInputProps } from './PasswordInput.type';

	import '@packages/styles/components/PasswordInput.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<PasswordInputProps>(), {
		size: 'md',
		required: false,
		disabled: false,
		clearable: false,
		modelVisable: undefined
	});

	const emit = defineEmits<PasswordInputEmits>();

	const internalSupportingTextId = useId();

	const supportingTextIdToUse = computed(() => props.supportingTextId ?? internalSupportingTextId);

	const internalValue = ref(props.defaultValue || '');

	const inputValue = computed(() => (props.modelValue ?? internalValue.value) as string);

	const handleValueChange = (e: InputEvent) => {
		const target = e.target as HTMLInputElement;
		const val = target.value;
		internalValue.value = val;
		emit('update:modelValue', val);
		emit('valueChange', e);
	};

	const handleClearClicked = () => {
		internalValue.value = '';
	};

	const handleVisibilityChange = (details: { visible: boolean }) => {
		emit('update:modelVisable', details.visible);
	};

	const shouldShowClearButton = computed(
		() => props.clearable && typeof inputValue.value === 'string' && inputValue.value.length > 0
	);
</script>

<template>
	<ArkPasswordInput.Root
		class="PasswordInput"
		:read-only="readOnly"
		:required="required"
		:visible="modelVisable"
		:disabled="disabled"
		:default-visible="defaultVisible"
		:data-testid="dataTestid"
		:invalid="status === 'error'"
		as-child
		@visibility-change="handleVisibilityChange"
	>
		<BaseField
			class="PasswordInput_BaseField"
			:read-only="readOnly"
			:required="required"
			:disabled="disabled"
			:size="size"
			:status="status"
			:supporting-text="supportingText"
			:supporting-text-id="supportingTextIdToUse"
			:label="label"
			:label-id="labelId"
			:label-element="ArkPasswordInput.Label"
		>
			<ArkPasswordInput.Control class="BaseField_Field PasswordInput_Control">
				<ArkPasswordInput.Input
					class="PasswordInput_Input"
					:name="name"
					:placeholder="placeholder"
					:value="inputValue"
					:default-value="defaultValue"
					:aria-describedby="supportingText ? supportingTextIdToUse : undefined"
					v-bind="$attrs"
					@input="handleValueChange"
				/>
				<div class="BaseField_Trailing">
					<IconButton
						v-if="shouldShowClearButton"
						:size="size"
						variant="text"
						color="secondary"
						aria-label="Clear value"
						@click="handleClearClicked"
					>
						<XMarkIcon />
					</IconButton>

					<ArkPasswordInput.VisibilityTrigger
						class="BaseField_Trailing PasswordInput_ToggleTrigger"
						as-child
					>
						<IconButton
							:size="size"
							variant="text"
							color="secondary"
							aria-label="Toggle password visibility"
						>
							<ArkPasswordInput.Indicator class="PasswordInput_Indicator">
								<template #fallback>
									<EyeSlashIcon />
								</template>
								<EyeIcon />
							</ArkPasswordInput.Indicator>
						</IconButton>
					</ArkPasswordInput.VisibilityTrigger>
				</div>
			</ArkPasswordInput.Control>
		</BaseField>
	</ArkPasswordInput.Root>
</template>
