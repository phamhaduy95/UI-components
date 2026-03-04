<script setup lang="ts">
	import {
		BaseCombobox,
		type BaseComboboxProps,
		type BaseComboboxEmits
	} from '@components/BaseCombobox';
	import type { SelectItem } from '@components/type';
	import { computed } from 'vue';

	export interface SingleComboboxProps
		extends Omit<BaseComboboxProps, 'modelValue' | 'defaultValue' | 'multiple'> {
		modelValue?: string;
		defaultValue?: string;
	}

	export interface SingleComboboxEmits {
		'update:modelValue': [value: string];
		valueChange: [details: { value: string; item?: SelectItem }];
		'update:open': BaseComboboxEmits['update:open'];
		'update:inputValue': BaseComboboxEmits['update:inputValue'];
		focusOutside: BaseComboboxEmits['focusOutside'];
		exitComplete: BaseComboboxEmits['exitComplete'];
	}

	const props = withDefaults(defineProps<SingleComboboxProps>(), {
		modelValue: undefined,
		defaultValue: undefined,
		open: undefined,
		defaultOpen: undefined
	});
	const emit = defineEmits<SingleComboboxEmits>();

	const internalModelValue = computed(() => {
		if (props.modelValue === undefined) return undefined;
		if (props.modelValue.length === 0) return [];
		return [props.modelValue];
	});

	const internalDefaultValue = computed(() => {
		if (props.defaultValue === undefined) return undefined;
		if (props.defaultValue.length === 0) return [];
		return [props.defaultValue];
	});

	const handleValueChange = (data: { value: string[]; items: SelectItem[] }) => {
		emit('update:modelValue', data.value[0] ?? '');

		emit('valueChange', { value: data.value[0] ?? '', item: data.items[0] });
	};
</script>

<template>
	<BaseCombobox
		v-bind="props"
		:model-value="internalModelValue"
		:default-value="internalDefaultValue"
		:multiple="false"
		:data-testid="dataTestid"
		@value-change="handleValueChange"
		@update:open="emit('update:open', $event)"
		@update:input-value="emit('update:inputValue', $event)"
		@focus-outside="emit('focusOutside', $event)"
		@exit-complete="emit('exitComplete')"
	>
		<template
			v-for="(_, name) in $slots"
			#[name]="slotProps"
		>
			<slot
				:name="name"
				v-bind="slotProps || {}"
			></slot>
		</template>
	</BaseCombobox>
</template>
