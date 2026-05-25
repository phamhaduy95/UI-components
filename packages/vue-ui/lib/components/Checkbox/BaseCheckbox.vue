<script setup lang="ts">
	import { computed } from 'vue';
	import { Checkbox as ArkCheckbox } from '@ark-ui/vue/checkbox';
	import { CheckIcon, MinusIcon } from '@heroicons/vue/20/solid';

	import type { CheckboxProps, CheckboxEmits, CheckboxSlots } from './Checkbox.type';

	import '@packages/styles/components/Checkbox.css';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<CheckboxProps>(), {
		defaultChecked: false,
		checked: undefined,
		indeterminate: false
	});

	const emit = defineEmits<CheckboxEmits>();

	defineSlots<CheckboxSlots>();

	const checkedState = computed(() => {
		if (props.indeterminate) return 'indeterminate';
		return props.checked;
	});

	const handleCheckedChange = (checkedState: boolean | 'indeterminate') => {
		const newChecked = Boolean(checkedState);
		emit('update:checked', newChecked);
		emit('checkedChange', newChecked, props.value);
	};
</script>

<template>
	<ArkCheckbox.Root
		:class="['Checkbox', $attrs.class]"
		:checked="checkedState"
		:disabled="disabled"
		:read-only="readonly"
		:value="value"
		:default-checked="defaultChecked"
		:required="required"
		:data-size="size"
		:data-status="status"
		:data-testid="dataTestid"
		@update:checked="handleCheckedChange"
	>
		<ArkCheckbox.Control class="Checkbox_Control">
			<ArkCheckbox.Indicator class="Checkbox_Indicator">
				<CheckIcon />
			</ArkCheckbox.Indicator>
			<ArkCheckbox.Indicator
				v-if="indeterminate"
				class="Checkbox_Indicator"
				indeterminate
			>
				<MinusIcon />
			</ArkCheckbox.Indicator>
		</ArkCheckbox.Control>
		<ArkCheckbox.Label
			v-if="label"
			class="Checkbox_Label"
		>
			{{ label }}
		</ArkCheckbox.Label>
		<ArkCheckbox.HiddenInput
			v-bind="$attrs"
			:data-checked="checkedState"
			:read-only="readonly"
		/>
	</ArkCheckbox.Root>
</template>
