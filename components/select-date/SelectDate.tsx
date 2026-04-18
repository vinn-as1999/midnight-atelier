'use client';

import BarbershopCalendar from '../calendar/BarbershopCalendar';
import './select-date.scss';


export default function SelectDate() {

  return (
    <>
      <section className="sel-date-container">
        <header>
          <span className="page-tag">style and confidence</span>
          <h1>Choose your Time</h1>
        </header>

        <BarbershopCalendar />
      </section>
    </>
  );
}