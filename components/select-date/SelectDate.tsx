'use client';

export default function SelectDate() {
  return (
    <>
      <section className="sel-date-container">
        <header>
          <span className="page-tag">style and confidence</span>
          <h1>Choose your Time</h1>
        </header>

        <article className="calendar">
          <header className="calendar-header">
            <div>{"April 2026"}</div>
            <div>
              {"< >"}
            </div>
          </header>

          {
            // dias aqui
          }
        </article>

        <article className="hours">
          {
            // a partir da hora de início, ele se baseia na duração de cada serviço

            // pra cada serviço tem uma lista de horários desde o horário inicial
          }
        </article>
      </section>
    </>
  )
};