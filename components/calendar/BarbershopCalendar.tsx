'use client';

import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import './calendar.scss';

type CalendarDay = { day: number; isCurrentMonth: boolean };

type Props = {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
};

export default function BarbershopCalendar({selectedDate, setSelectedDate}: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months: string[] = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  function changeDayClass(dayObject: CalendarDay): string {
    if (!dayObject.isCurrentMonth) return 'month-day other-month';

    const dayValue = getDateValue(dayObject.day);
    if (selectedDate === dayValue) return 'selected-day';
    
    const isToday =
      dayObject.day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();

    return isToday ? 'month-current-day' : 'month-day';
  }

  function getDateValue(day: number): string {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayValue = String(day).padStart(2, '0');

    return `${year}-${month}-${dayValue}`;
  }

  function getCalendarData() {
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

    return {
      calendarArray: calendarDays,
      monthYear: `${months[month]} ${year}`,
    };
  }

  const { calendarArray, monthYear } = getCalendarData();

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
            <li
              key={index}
              className={changeDayClass(item)}
              onClick={() => item.isCurrentMonth && setSelectedDate(getDateValue(item.day))}
            >
              {String(item.day).padStart(2, '0')}
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
