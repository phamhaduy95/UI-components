<script setup lang="ts">
	import {
		BaseCombobox,
		type BaseComboboxProps,
		type BaseComboboxEmits
	} from '@components/BaseCombobox';

	import { computed, type ComponentInstance } from 'vue';

	type BaseComboboxRootProps = ComponentInstance<typeof BaseCombobox>['$props'];

	export interface SingleComboboxProps
		extends Omit<BaseComboboxProps, 'modelValue' | 'defaultValue' | 'multiple'> {
		modelValue?: string;
		defaultValue?: string;
	}

	export interface SingleComboboxEmits {
		'update:modelValue': [value: string];
		valueChange: [details: { value: string }];
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

	const handleValueChange: BaseComboboxRootProps['onValueChange'] = (details) => {
		emit('update:modelValue', details.value[0] ?? '');
		emit('valueChange', { value: details.value[0] ?? '' });
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
