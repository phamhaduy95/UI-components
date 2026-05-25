<script setup lang="ts">
	import { DatePicker as ArkDatePicker } from '@ark-ui/vue/date-picker';
	import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
	import { IconButton } from '@components/IconButton';
</script>

<template>
	<ArkDatePicker.View
		view="year"
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
				<ArkDatePicker.RangeText />
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
						v-for="(years, id) in context.getYearsGrid({ columns: 4 })"
						:key="id"
					>
						<ArkDatePicker.TableCell
							v-for="(year, yearId) in years"
							:key="yearId"
							:value="year.value"
							class="CalendarView_TableCell"
						>
							<ArkDatePicker.TableCellTrigger class="CalendarView_TableCellTrigger">
								{{ year.label }}
							</ArkDatePicker.TableCellTrigger>
						</ArkDatePicker.TableCell>
					</ArkDatePicker.TableRow>
				</ArkDatePicker.TableBody>
			</ArkDatePicker.Table>
		</ArkDatePicker.Context>
	</ArkDatePicker.View>
</template>
