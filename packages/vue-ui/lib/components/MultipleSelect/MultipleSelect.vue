<script setup lang="ts">
	import { BaseSelect, type BaseSelectEmits, type BaseSelectProps } from '@components/BaseSelect';
	import DisplayedSelectValue from './DisplayedSelectValue.vue';

	import '@packages/styles/components/MultipleSelect.css';

	export type MultipleSelectProps = Omit<BaseSelectProps, 'multiple'> & {
		placeholder?: string;
	};

	withDefaults(defineProps<MultipleSelectProps>(), {
		items: () => [],
		size: 'medium',
		loopFocus: false,
		deselectable: false,
		clearable: false,
		disabled: false,
		required: false,
		open: undefined,
		defaultOpen: undefined,
		modelValue: undefined,
		defaultValue: undefined
	});

	const emit = defineEmits<BaseSelectEmits>();
</script>

<template>
	<BaseSelect
		v-bind="$props"
		multiple
		@update:model-value="emit('update:modelValue', $event)"
		@update:open="emit('update:open', $event)"
		@focus-outside="emit('focusOutside', $event)"
		@exit-complete="emit('exitComplete')"
		@value-change="emit('valueChange', $event)"
	>
		<template #customValueText>
			<DisplayedSelectValue :placeholder="placeholder" />
		</template>
		<template
			v-if="$slots.triggerIcon"
			#triggerIcon
		>
			<slot name="triggerIcon" />
		</template>
		<template
			v-if="$slots.clearIcon"
			#clearIcon
		>
			<slot name="clearIcon" />
		</template>
	</BaseSelect>
</template>
