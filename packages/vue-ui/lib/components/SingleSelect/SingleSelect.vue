<script setup lang="ts">
	import { computed, type SelectHTMLAttributes } from 'vue';
	import { BaseSelect, type BaseSelectEmits, type SelectBaseProps } from '@components/BaseSelect';
	import type { CommonFieldProps, SelectItem } from '@components/type';

	defineOptions({ inheritAttrs: false });

	export interface SingleSelectBaseProps
		extends CommonFieldProps<string>,
			Pick<
				SelectBaseProps,
				| 'loopFocus'
				| 'open'
				| 'defaultOpen'
				| 'multiple'
				| 'deselectable'
				| 'lazyMount'
				| 'unmountOnExit'
				| 'name'
				| 'items'
				| 'class'
				| 'clearable'
				| 'deselectable'
				| 'loopFocus'
				| 'multiple'
				| 'placeholder'
				| 'supportingText'
				| 'size'
				| 'status'
				| 'label'
				| 'disabled'
				| 'required'
			> {
		dataTestid?: string;
		modelValue?: string;
		defaultValue?: string;
	}
	export type SingleSelectProps = SingleSelectBaseProps &
		// @vue-ignore
		Omit<SelectHTMLAttributes, keyof SingleSelectBaseProps>;

	export interface SingleSelectEmits {
		valueChange: [details: { value: string; item?: SelectItem }];
		'update:modelValue': [value: string];
		'update:open': BaseSelectEmits['update:open'];
		focusOutside: BaseSelectEmits['focusOutside'];
		exitComplete: BaseSelectEmits['exitComplete'];
	}

	const props = withDefaults(defineProps<SingleSelectProps>(), {
		size: 'medium',
		loopFocus: false,
		deselectable: false,
		items: () => [],
		clearable: false,
		disabled: false,
		required: false,
		multiple: false
	});

	const emit = defineEmits<SingleSelectEmits>();

	const mappedValue = computed(() => {
		const val = props.modelValue;
		if (val === undefined) return undefined;
		if (val.length === 0) return [];
		return [val];
	});

	const mappedDefaultValue = computed(() => {
		if (props.defaultValue === undefined) return undefined;
		if (props.defaultValue.length === 0) return [];
		return [props.defaultValue];
	});

	const handleValueChange = (details: { value: string[]; items: SelectItem[] }) => {
		emit('valueChange', { value: details.value[0] ?? '', item: details.items[0] });
		emit('update:modelValue', details.value[0] ?? '');
	};
</script>

<template>
	<BaseSelect
		v-bind="$attrs"
		:model-value="mappedValue"
		:default-value="mappedDefaultValue"
		:items="items"
		:size="size"
		:status="status"
		:label="label"
		:disabled="disabled"
		:clearable="clearable"
		:required="required"
		:loop-focus="loopFocus"
		:placeholder="placeholder"
		:supporting-text="supportingText"
		:deselectable="deselectable"
		:multiple="false"
		:name="name"
		:data-testid="dataTestid"
		@value-change="handleValueChange"
		@update:open="emit('update:open', $event)"
		@focus-outside="emit('focusOutside', $event)"
		@exit-complete="emit('exitComplete')"
	>
	</BaseSelect>
</template>
