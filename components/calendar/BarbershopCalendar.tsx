'use client';

import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import './calendar.scss';

type CalendarDay = { day: number; isCurrentMonth: boolean };

export default function BarbershopCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthYear, setMonthYear] = useState<string>('');
  const [calendarArray, setCalendarArray] = useState<CalendarDay[]>([]);

  const months: string[] = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  function changeDayClass(dayObject: CalendarDay): string {
    if (!dayObject.isCurrentMonth) return 'month-day other-month';
    
    const isToday =
      dayObject.day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();

    return isToday ? 'month-current-day' : 'month-day';
  }

  function getCalendarArray() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstWeekDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarDays: CalendarDay[] = [];

    // dias do mês anterior
    for (let i = firstWeekDay - 1; i >= 0; i--) {
      calendarDays.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    }

    // dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({ day, isCurrentMonth: true });
    }

    // dias do próximo mês
    for (let day = 1; calendarDays.length < 42; day++) {
      calendarDays.push({ day, isCurrentMonth: false });
    }

    setCalendarArray(calendarDays);
    setMonthYear(`${months[month]} ${year}`);
  }

  useEffect(() => getCalendarArray(), [currentDate]);

  function prevMonth() {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  return (
    <>
      <article className="calendar-container">
        <header className="calendar-header">
          <div className="month-info">{monthYear}</div>
          <div className="bttn-bf">
            <button onClick={prevMonth}>
              <MdKeyboardArrowLeft />
            </button>
            <button onClick={nextMonth}>
              <MdKeyboardArrowRight />
            </button>
          </div>
          <ul className="week-list">
            <li>S</li>
            <li>M</li>
            <li>T</li>
            <li>W</li>
            <li>T</li>
            <li>F</li>
            <li>S</li>
          </ul>
        </header>

        <ul className="calendar-days">
          {calendarArray.map((item, index) => (
            <li key={index} className={changeDayClass(item)}>
              {String(item.day).padStart(2, '0')}
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}