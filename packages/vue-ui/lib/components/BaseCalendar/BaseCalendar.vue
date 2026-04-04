<script setup lang="ts">
	import { computed, type ComponentInstance } from 'vue';
	import { DatePicker as ArkDatePicker, parseDate } from '@ark-ui/vue/date-picker';

	import BaseCalendarView from './BaseCalendarView.vue';

	import type { BaseCalendarEmits, BaseCalendarProps } from './BaseCalendar.type';

	type ArkDatePickerProps = ComponentInstance<typeof ArkDatePicker.Root>['$props'];

	const props = withDefaults(defineProps<BaseCalendarProps>(), {
		view: undefined,
		modelValue: undefined
	});
	const emit = defineEmits<BaseCalendarEmits>();

	const parsedModelValue = computed(() => {
		return props.modelValue ? props.modelValue.map((date) => parseDate(date)) : undefined;
	});

	const parsedDefaultValue = computed(() => {
		return props.defaultValue ? props.defaultValue.map((date) => parseDate(date)) : undefined;
	});

	const parsedMin = computed(() => {
		return props.min ? parseDate(props.min) : undefined;
	});

	const parsedMax = computed(() => {
		return props.max ? parseDate(props.max) : undefined;
	});

	const handleModelUpdate: ArkDatePickerProps['onUpdate:modelValue'] = (value) => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const dateObj = value.map((e) => e.toDate(timeZone));
		emit('update:modelValue', dateObj);
		emit('valueChange', dateObj);
	};
</script>

<template>
	<ArkDatePicker.Root
		open
		inline
		class="Calendar"
		:close-on-select="false"
		:selection-mode="selectionMode"
		:min="parsedMin"
		:max="parsedMax"
		:start-of-week="startOfWeek"
		:model-value="parsedModelValue"
		:default-value="parsedDefaultValue"
		:view="view"
		:min-view="minView"
		:max-view="maxView"
		unmount-on-exit
		fixed-weeks
		:data-testid="dataTestid"
		@update:model-value="handleModelUpdate"
		@update:view="emit('update:view', $event)"
	>
		<BaseCalendarView />
	</ArkDatePicker.Root>
</template>
