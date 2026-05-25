<script setup lang="ts">
	import { DatePicker as ArkDatePicker } from '@ark-ui/vue/date-picker';
	import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
	import { IconButton } from '@components/IconButton';
</script>

<template>
	<ArkDatePicker.View
		view="day"
		class="CalendarView"
	>
		<ArkDatePicker.Context v-slot="datePicker">
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
					aria-label="Switch to month view"
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

			<ArkDatePicker.Table
				class="CalendarView_Table"
				:columns="7"
			>
				<ArkDatePicker.TableHead class="Calendar_Header">
					<ArkDatePicker.TableRow>
						<ArkDatePicker.TableHeader
							v-for="(weekDay, id) in datePicker.weekDays"
							:key="id"
							class="CalendarView_HeadCol"
						>
							{{ weekDay.short }}
						</ArkDatePicker.TableHeader>
					</ArkDatePicker.TableRow>
				</ArkDatePicker.TableHead>
				<ArkDatePicker.TableBody class="Calendar_Body">
					<ArkDatePicker.TableRow
						v-for="(week, weekId) in datePicker.weeks"
						:key="weekId"
					>
						<ArkDatePicker.TableCell
							v-for="(day, dayId) in week"
							:key="dayId"
							:value="day"
							class="CalendarView_TableCell"
						>
							<ArkDatePicker.TableCellTrigger class="CalendarView_TableCellTrigger">
								{{ day.day }}
							</ArkDatePicker.TableCellTrigger>
						</ArkDatePicker.TableCell>
					</ArkDatePicker.TableRow>
				</ArkDatePicker.TableBody>
			</ArkDatePicker.Table>
		</ArkDatePicker.Context>
	</ArkDatePicker.View>
</template>
