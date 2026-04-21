'use client';

import BarbershopCalendar from '../calendar/BarbershopCalendar';
import './select-date.scss';

export type Props = {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
};

export default function SelectDate({selectedDate, setSelectedDate}: Props) {

  return (
    <>
      <section className="sel-date-container">
        <header>
          <span className="page-tag">style and confidence</span>
          <h1>Choose your Time</h1>
        </header>

        <BarbershopCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </section>
    </>
  );
}
