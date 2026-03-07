import { DatePicker } from '@ark-ui/react/date-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { IconButton } from '@components/IconButton';
import { JSX } from 'react';

const BaseCalendarYearView = (): JSX.Element => {
	return (
		<DatePicker.View view="year" className="CalendarView">
			<DatePicker.Context>
				{(datePicker) => (
					<>
						<DatePicker.ViewControl className="CalendarView_Control">
							<DatePicker.PrevTrigger className="CalendarView_NavTrigger" asChild>
								<IconButton size="large" variant="text" color="secondary">
									<ChevronLeftIcon />
								</IconButton>
							</DatePicker.PrevTrigger>
							<DatePicker.RangeText />
							<DatePicker.NextTrigger className="CalendarView_NavTrigger" asChild>
								<IconButton size="large" variant="text" color="secondary">
									<ChevronRightIcon />
								</IconButton>
							</DatePicker.NextTrigger>
						</DatePicker.ViewControl>
						<DatePicker.Table className="CalendarView_Table" columns={4}>
							<DatePicker.TableBody className="Calendar_Body">
								{datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
									<DatePicker.TableRow key={id}>
										{years.map((year, yearId) => (
											<DatePicker.TableCell
												key={yearId}
												value={year.value}
												className="CalendarView_TableCell"
											>
												<DatePicker.TableCellTrigger className="CalendarView_TableCellTrigger">
													{year.label}
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

export default BaseCalendarYearView;
