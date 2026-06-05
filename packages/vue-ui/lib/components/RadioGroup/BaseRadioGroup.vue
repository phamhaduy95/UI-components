<script setup lang="ts">
	import { RadioGroup as ArkRadioGroup } from '@ark-ui/vue/radio-group';
	import type { RadioGroupProps, RadioGroupEmits, RadioGroupSlots } from './RadioGroup.type';

	import '@packages/styles/components/RadioGroup.css';
	import type { ComponentInstance } from 'vue';

	type ArkRadioGroup = ComponentInstance<typeof ArkRadioGroup.Root>['$props'];

	defineOptions({ inheritAttrs: false });

	withDefaults(defineProps<RadioGroupProps>(), {
		options: () => [],
		modelValue: undefined,
		defaultValue: undefined,
		orientation: 'vertical',
		disabled: false,
		readonly: false,
		required: false
	});

	const emit = defineEmits<RadioGroupEmits>();

	defineSlots<RadioGroupSlots>();

	const handleValueChange: ArkRadioGroup['onValueChange'] = (details) => {
		emit('update:modelValue', details.value ?? '');
		emit('valueChange', details);
	};
</script>

<template>
	<ArkRadioGroup.Root
		:class="['RadioGroup', $attrs.class]"
		:model-value="modelValue"
		:default-value="defaultValue"
		:disabled="disabled"
		:read-only="readonly"
		:orientation="orientation"
		:data-status="status"
		:data-size="size"
		:data-testid="dataTestid"
		@value-change="handleValueChange"
	>
		<ArkRadioGroup.Label
			v-if="label"
			class="RadioGroup_Label"
		>
			{{ label }}
		</ArkRadioGroup.Label>
		<div class="RadioGroup_Options">
			<ArkRadioGroup.Item
				v-for="option in options"
				:key="option.value"
				class="Radio"
				:value="option.value"
				:disabled="option.disabled"
			>
				<ArkRadioGroup.ItemControl class="Radio_Control">
					<div class="Radio_Indicator"></div>
				</ArkRadioGroup.ItemControl>
				<ArkRadioGroup.ItemText class="Radio_Label">
					<slot
						name="label"
						:option="option"
					>
						{{ option.label }}
					</slot>
				</ArkRadioGroup.ItemText>
				<ArkRadioGroup.ItemHiddenInput />
			</ArkRadioGroup.Item>
		</div>
	</ArkRadioGroup.Root>
</template>
