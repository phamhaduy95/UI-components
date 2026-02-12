import { DatePicker } from '@ark-ui/react/date-picker';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import '../Calendar/Calendar.css';

const BaseCalendarView = () => {
	return (
		<DatePicker.View view="day" className="CalendarView">
			<DatePicker.Context>
				{(datePicker) => (
					<>
						<DatePicker.ViewControl className="CalendarView_Control">
							<DatePicker.PrevTrigger className="Calendar_NavTrigger">
								<ChevronLeftIcon height={20} width={20} />
							</DatePicker.PrevTrigger>
							<DatePicker.RangeText />
							<DatePicker.NextTrigger className="Calendar_NavTrigger">
								<ChevronRightIcon height={20} width={20} />
							</DatePicker.NextTrigger>
						</DatePicker.ViewControl>
						<DatePicker.Table className="Calendar_Table">
							<DatePicker.TableHead className="Calendar_Header">
								<DatePicker.TableRow>
									{datePicker.weekDays.map((weekDay, id) => (
										<DatePicker.TableHeader key={id} className="Calendar_HeadCol">
											{weekDay.short}
										</DatePicker.TableHeader>
									))}
								</DatePicker.TableRow>
							</DatePicker.TableHead>
							<DatePicker.TableBody className="Calendar_Body">
								{datePicker.weeks.map((week, id) => (
									<DatePicker.TableRow key={id}>
										{week.map((day, id) => (
											<DatePicker.TableCell key={id} value={day} className="Calendar_TableCell">
												<DatePicker.TableCellTrigger className="Calendar_TableCellTrigger">
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

export default BaseCalendarView;
