import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function MyCalender() {
	const [date, setDate] = useState(new Date());

	const onChange = (newDate) => {
		setDate(newDate);
	};
	return (
		<div>
			<h3>Calender</h3>
			<Calendar onChange={onChange} value={date} />
			<p>{date.toDateString()}</p>
		</div>
	);
}
