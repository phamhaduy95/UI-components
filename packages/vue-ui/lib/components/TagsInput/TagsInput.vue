<script setup lang="ts">
	import { computed, useId, type ComponentInstance } from 'vue';
	import { XMarkIcon } from '@heroicons/vue/20/solid';
	import { BaseField } from '@components/BaseField';
	import { IconButton } from '@components/IconButton';
	import { Chip } from '@components/Chip';
	import { TagsInput as ArkTagsInput } from '@ark-ui/vue/tags-input';

	import type { TagInputEmits, TagInputProps, TagInputSlots } from './TagInput.type';

	import '@packages/styles/components/TagInput.css';

	type ArkTagInputRootProps = ComponentInstance<typeof ArkTagsInput.Root>['$props'];

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<TagInputProps>(), {
		size: 'md',
		required: false,
		disabled: false,
		clearable: false,
		allowOverflow: false,
		addOnPaste: true,
		readOnly: false,
		delimiter: ',',
		hideInput: false,
		modelValue: undefined
	});

	const emit = defineEmits<TagInputEmits>();

	defineSlots<TagInputSlots>();

	const internalSupportingTextId = useId();

	const supportingTextIdToUse = computed(() => {
		if (!props.supportingText) return undefined;
		return props.supportingTextId ?? internalSupportingTextId;
	});

	const handleOnValueChange: ArkTagInputRootProps['onValueChange'] = (details) => {
		const { value } = details;
		emit('valueChange', value);
		emit('update:modelValue', value);
	};
</script>

<template>
	<ArkTagsInput.Root
		class="TagInput"
		:model-value="modelValue"
		:default-value="defaultValue"
		:disabled="disabled"
		:required="required"
		:max="max"
		:max-length="maxLength"
		:allow-overflow="allowOverflow"
		:readonly="readOnly"
		:data-testid="dataTestid"
		:delimiter="delimiter"
		:editable="false"
		:validate="validate"
		as-child
		@value-change="handleOnValueChange"
	>
		<BaseField
			:label="label"
			:size="size"
			:disabled="disabled"
			:required="required"
			:status="status"
			:supporting-text="supportingText"
			:supporting-text-id="supportingTextIdToUse"
			:label-element="ArkTagsInput.Label"
		>
			<ArkTagsInput.Control class="BaseField_Field TagInput_Control">
				<ArkTagsInput.Context v-slot="{ value, setValue }">
					<div class="TagInput_InputArea">
						<ArkTagsInput.Item
							v-for="(tagValue, index) in value"
							:key="index"
							:index="index"
							:value="tagValue"
							class="TagInput_Item"
						>
							<ArkTagsInput.ItemPreview as-child>
								<slot
									name="item"
									:value="tagValue"
									:index="index"
									:remove-item="() => setValue(value.filter((item) => item !== tagValue))"
								>
									<Chip
										:label="tagValue"
										removable
										@remove="setValue(value.filter((item) => item !== tagValue))"
									>
									</Chip>
								</slot>
							</ArkTagsInput.ItemPreview>
							<ArkTagsInput.ItemInput />
						</ArkTagsInput.Item>

						<ArkTagsInput.Input
							v-if="!hideInput"
							class="TagInput_Input"
							:aria-describedby="supportingTextIdToUse"
							:placeholder="placeholder"
							:required="required"
							v-bind="$attrs"
						/>
					</div>
					<div class="BaseField_Trailing TagInput_Trailing">
						<ArkTagsInput.ClearTrigger as-child>
							<IconButton
								aria-label="Clear"
								:size="size"
								variant="text"
								color="secondary"
							>
								<XMarkIcon />
							</IconButton>
						</ArkTagsInput.ClearTrigger>
					</div>
				</ArkTagsInput.Context>
			</ArkTagsInput.Control>
		</BaseField>

		<ArkTagsInput.HiddenInput v-if="!hideInput" />
	</ArkTagsInput.Root>
</template>
