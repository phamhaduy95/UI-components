<script lang="ts" setup>
	import { BaseSelect, type BaseSelectEmits, type SelectBaseProps } from '@components/BaseSelect';

	import type { CommonFieldProps, SelectItem } from '@components/type';
	import { computed, type SelectHTMLAttributes } from 'vue';

	defineOptions({ inheritAttrs: false });

	export interface SingleSelectBaseProps
		extends CommonFieldProps<string>,
			Omit<SelectBaseProps, 'modelValue' | 'defaultValue'> {
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
		multiple: false,
		modelValue: undefined,
		defaultValue: undefined,
		open: undefined,
		defaultOpen: undefined
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
		v-bind="props"
		:model-value="mappedValue"
		:default-value="mappedDefaultValue"
		:multiple="false"
		@value-change="handleValueChange"
		@update:open="emit('update:open', $event)"
		@focus-outside="emit('focusOutside', $event)"
		@exit-complete="emit('exitComplete')"
	>
		<template
			v-for="(_, slotName) in $slots"
			#[slotName]="slotProps"
		>
			<slot
				:name="slotName"
				v-bind="slotProps"
			/>
		</template>
	</BaseSelect>
</template>
