<script lang="ts" setup>
	import { computed } from 'vue';

	import { BaseSelect } from '@components/BaseSelect';
	import type { SelectItem } from '@components/type';

	import type {
		SingleSelectEmits,
		SingleSelectProps,
		SingleSelectSlots
	} from './SingleSelect.type';

	defineOptions({ inheritAttrs: false });

	const props = withDefaults(defineProps<SingleSelectProps>(), {
		size: 'md',
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

	defineSlots<SingleSelectSlots>();

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
