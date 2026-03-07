<script setup lang="ts">
	import BaseCalendarMonthView from './BaseCalendarMonthView.vue';
	import BaseCalendarDayView from './BaseCalendarDayView.vue';
	import BaseCalendarYearView from './BaseCalendarYearView.vue';

	import './Calendar.css';
	import { useDatePickerContext } from '@ark-ui/vue/date-picker';
	import { computed } from 'vue';

	const context = useDatePickerContext();

	// implement conditional rendering for CalendarView so that only one type of view is displayed at a time
	const view = computed(() => context.value.view);
</script>

<template>
	<BaseCalendarDayView v-if="view === 'day'" />
	<BaseCalendarMonthView v-if="view === 'month'" />
	<BaseCalendarYearView v-if="view === 'year'" />
</template>
