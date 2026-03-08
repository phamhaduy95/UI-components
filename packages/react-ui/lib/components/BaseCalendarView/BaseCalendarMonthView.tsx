import { DatePicker } from '@ark-ui/react/date-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { JSX } from 'react';

import { IconButton } from '@components/IconButton';

const BaseCalendarMonthView = (): JSX.Element => {
	return (
		<DatePicker.View view="month" className="CalendarView">
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
								aria-label="Switch to year view"
							>
								<DatePicker.RangeText />
							</DatePicker.ViewTrigger>
							<DatePicker.NextTrigger className="CalendarView_NavTrigger" asChild>
								<IconButton size="large" variant="text" color="secondary">
									<ChevronRightIcon />
								</IconButton>
							</DatePicker.NextTrigger>
						</DatePicker.ViewControl>
						<DatePicker.Table className="CalendarView_Table" columns={4}>
							<DatePicker.TableBody className="Calendar_Body">
								{datePicker.getMonthsGrid({ columns: 4, format: 'short' }).map((months, id) => (
									<DatePicker.TableRow key={id}>
										{months.map((month, monthId) => (
											<DatePicker.TableCell
												key={monthId}
												value={month.value}
												className="CalendarView_TableCell"
											>
												<DatePicker.TableCellTrigger className="CalendarView_TableCellTrigger">
													{month.label}
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

export default BaseCalendarMonthView;
