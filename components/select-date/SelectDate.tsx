'use client';

import BarbershopCalendar from '../calendar/BarbershopCalendar';
import './select-date.scss';
import ErrorMessage from '../error/ErrorMessage';


export type Props = {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
  serverMessage: string | null;
  setServerMessage: (message: string | null) => void;
  isError: boolean;
};

export default function SelectDate({selectedDate, setSelectedDate, serverMessage, setServerMessage, isError}: Props) {

  function handleDateChange(date: string) {
    setServerMessage(null);
    setSelectedDate(date);
  }

  return (
    <>
      <section className="sel-date-container">
        <header>
          {
            serverMessage 
              ? <ErrorMessage message={serverMessage} isError={isError} /> : null
          }

          <span className="page-tag">style and confidence</span>
          <h1>Choose your Time</h1>
        </header>

        <BarbershopCalendar selectedDate={selectedDate} setSelectedDate={handleDateChange} />
      </section>
    </>
  );
}
