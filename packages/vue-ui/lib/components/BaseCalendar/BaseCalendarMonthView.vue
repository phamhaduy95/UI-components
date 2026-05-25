<script setup lang="ts">
	import { DatePicker as ArkDatePicker } from '@ark-ui/vue/date-picker';
	import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
	import { IconButton } from '@components/IconButton';
</script>

<template>
	<ArkDatePicker.View
		view="month"
		class="CalendarView"
	>
		<ArkDatePicker.Context v-slot="context">
			<ArkDatePicker.ViewControl class="CalendarView_Control">
				<ArkDatePicker.PrevTrigger
					class="CalendarView_NavTrigger"
					as-child
				>
					<IconButton
						size="lg"
						variant="text"
						color="secondary"
					>
						<ChevronLeftIcon />
					</IconButton>
				</ArkDatePicker.PrevTrigger>
				<ArkDatePicker.ViewTrigger
					class="CalendarView_ViewTrigger"
					aria-label="Switch to year view"
				>
					<ArkDatePicker.RangeText />
				</ArkDatePicker.ViewTrigger>
				<ArkDatePicker.NextTrigger
					class="CalendarView_NavTrigger"
					as-child
				>
					<IconButton
						size="lg"
						variant="text"
						color="secondary"
					>
						<ChevronRightIcon />
					</IconButton>
				</ArkDatePicker.NextTrigger>
			</ArkDatePicker.ViewControl>
			<ArkDatePicker.Table class="CalendarView_Table">
				<ArkDatePicker.TableBody class="Calendar_Body">
					<ArkDatePicker.TableRow
						v-for="(months, id) in context.getMonthsGrid({ columns: 4, format: 'short' })"
						:key="id"
					>
						<ArkDatePicker.TableCell
							v-for="(month, monthId) in months"
							:key="monthId"
							:value="month.value"
							class="CalendarView_TableCell"
						>
							<ArkDatePicker.TableCellTrigger class="CalendarView_TableCellTrigger">
								{{ month.label }}
							</ArkDatePicker.TableCellTrigger>
						</ArkDatePicker.TableCell>
					</ArkDatePicker.TableRow>
				</ArkDatePicker.TableBody>
			</ArkDatePicker.Table>
		</ArkDatePicker.Context>
	</ArkDatePicker.View>
</template>
