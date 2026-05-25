<script setup lang="ts">
	import { BaseSelect } from '@components/BaseSelect';
	import DisplayedSelectValue from './DisplayedSelectValue.vue';

	import type {
		MultipleSelectEmits,
		MultipleSelectProps,
		MultipleSelectSlots
	} from './MultipleSelect.type';

	import '@packages/styles/components/MultipleSelect.css';

	withDefaults(defineProps<MultipleSelectProps>(), {
		items: () => [],
		size: 'md',
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

	const emit = defineEmits<MultipleSelectEmits>();

	defineSlots<MultipleSelectSlots>();
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
