<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
	import { computed, useId, type ComponentInstance } from 'vue';
	import { Editable as ArkEditable } from '@ark-ui/vue/editable';
	import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid';
	import { FieldLabel } from '@components/FieldLabel';
	import { SupportingText } from '@components/SupportingText';
	import { IconButton } from '@components/IconButton';
	import type { EditableProps, EditableEmits, EditableSlots } from './Editable.type';

	import '@packages/styles/components/Editable.css';

	type ArkEditProps = ComponentInstance<typeof ArkEditable.Root>['$props'];

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<EditableProps>(), {
		size: 'md',
		required: false,
		disabled: false,
		readOnly: false,
		autoResize: false,
		submitMode: 'both',
		activationMode: 'focus'
	});

	const emit = defineEmits<EditableEmits>();
	defineSlots<EditableSlots>();

	const supportingTextId = useId();
	const internalSupportingTextId = computed(() => {
		if (!props.supportingText) return undefined;
		return props.supportingTextId ?? supportingTextId;
	});

	const handleValueChange: ArkEditProps['onValueChange'] = (details) => {
		emit('update:modelValue', details.value);
		emit('valueChange', details);
	};

	const handleEditChange: ArkEditProps['onEditChange'] = (details) => {
		emit('update:edit', details.edit);
	};
</script>

<template>
	<ArkEditable.Root
		class="Editable"
		:model-value="modelValue"
		:default-value="defaultValue"
		:placeholder="placeholder"
		:disabled="disabled"
		:readonly="readOnly"
		:auto-resize="autoResize"
		:max-length="maxLength"
		:activation-mode="activationMode"
		:submit-mode="submitMode"
		:select-on-focus="selectOnFocus"
		:data-size="size"
		:data-status="status"
		:data-testid="dataTestid"
		v-bind="$attrs"
		@value-change="handleValueChange"
		@edit-change="handleEditChange"
		@pointer-down-outside="emit('pointerDownOutside', $event)"
		@focus-outside="emit('focusOutside', $event)"
		@interact-outside="emit('interactOutside', $event)"
	>
		<div
			v-if="label || $slots.label"
			class="Editable_Header"
		>
			<ArkEditable.Label as-child>
				<FieldLabel
					:required="required"
					:status="status"
					show-label
				>
					<slot name="label">
						{{ label }}
					</slot>
				</FieldLabel>
			</ArkEditable.Label>
		</div>
		<div class="Editable_Content">
			<ArkEditable.Area class="Editable_Area">
				<ArkEditable.Preview class="Editable_Preview" />
				<ArkEditable.Input class="Editable_Input" />
			</ArkEditable.Area>

			<ArkEditable.Context v-slot="{ editing }">
				<ArkEditable.Control
					v-if="showToggle"
					class="Editable_Control"
				>
					<template v-if="editing">
						<ArkEditable.SubmitTrigger as-child>
							<IconButton
								size="xs"
								variant="text"
								color="primary"
								aria-label="Submit"
							>
								<slot name="submitIcon">
									<CheckIcon />
								</slot>
							</IconButton>
						</ArkEditable.SubmitTrigger>
						<ArkEditable.CancelTrigger as-child>
							<IconButton
								size="xs"
								variant="text"
								color="secondary"
								aria-label="Cancel"
							>
								<slot name="cancelIcon">
									<XMarkIcon />
								</slot>
							</IconButton>
						</ArkEditable.CancelTrigger>
					</template>
					<ArkEditable.EditTrigger
						v-else
						as-child
					>
						<IconButton
							size="xs"
							variant="text"
							color="secondary"
							aria-label="Edit"
						>
							<slot name="editIcon">
								<PencilIcon />
							</slot>
						</IconButton>
					</ArkEditable.EditTrigger>
				</ArkEditable.Control>
			</ArkEditable.Context>
		</div>

		<SupportingText
			v-if="supportingText || $slots.supportingText"
			:id="internalSupportingTextId"
			:status="status"
		>
			<slot name="supportingText">
				{{ supportingText }}
			</slot>
		</SupportingText>
	</ArkEditable.Root>
</template>
