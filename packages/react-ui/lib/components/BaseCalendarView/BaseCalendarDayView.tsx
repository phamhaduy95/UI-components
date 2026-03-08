import { DatePicker } from '@ark-ui/react/date-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { JSX } from 'react';

import { IconButton } from '@components/IconButton';

const BaseCalendarDayView = (): JSX.Element => {
	return (
		<DatePicker.View view="day" className="CalendarView">
			<DatePicker.Context>
				{(datePicker) => (
					<>
						<DatePicker.ViewControl className="CalendarView_Control">
							<DatePicker.PrevTrigger className="CalendarView_NavTrigger" asChild>
								<IconButton size="large" variant="text" color="secondary">
									<ChevronLeftIcon />
								</IconButton>
							</DatePicker.PrevTrigger>
							<DatePicker.ViewTrigger
								className="CalendarView_ViewTrigger"
								aria-label="Switch to month view"
							>
								<DatePicker.RangeText />
							</DatePicker.ViewTrigger>

							<DatePicker.NextTrigger className="CalendarView_NavTrigger" asChild>
								<IconButton size="large" variant="text" color="secondary">
									<ChevronRightIcon />
								</IconButton>
							</DatePicker.NextTrigger>
						</DatePicker.ViewControl>

						<DatePicker.Table className="CalendarView_Table" columns={7}>
							<DatePicker.TableHead className="Calendar_Header">
								<DatePicker.TableRow>
									{datePicker.weekDays.map((weekDay, id) => (
										<DatePicker.TableHeader key={id} className="CalendarView_HeadCol">
											{weekDay.short}
										</DatePicker.TableHeader>
									))}
								</DatePicker.TableRow>
							</DatePicker.TableHead>
							<DatePicker.TableBody className="Calendar_Body">
								{datePicker.weeks.map((week, weekId) => (
									<DatePicker.TableRow key={weekId}>
										{week.map((day, dayId) => (
											<DatePicker.TableCell
												key={dayId}
												value={day}
												className="CalendarView_TableCell"
											>
												<DatePicker.TableCellTrigger className="CalendarView_TableCellTrigger">
													{day.day}
												</DatePicker.TableCellTrigger>
											</DatePicker.TableCell>
										))}
									</DatePicker.TableRow>
								))}
							</DatePicker.TableBody>
						</DatePicker.Table>
					</>
				)}
			</DatePicker.Context>
		</DatePicker.View>
	);
};

export default BaseCalendarDayView;
