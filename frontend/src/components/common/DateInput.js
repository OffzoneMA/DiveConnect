import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

export default function DateInput() {
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;

  const [date, setDate] = useState(null);

  let minDate = new Date();

  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();

  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  return (
    <div className="card flex justify-content-center">
      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        minDate={minDate}
        maxDate={maxDate}
        readOnlyInput
        icon="pi pi-calendar"
        showIcon
        iconPos="left"
        className="bg-white rounded-lg p-2"
        placeholder="Date"
      />
    </div>
  );
}
