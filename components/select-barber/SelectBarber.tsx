'use client';

export default function SelectBarber() {
  return (
    <>
      <section className="sel-barber-container">
        <header>
          <span className="page-tag">the heritage guild</span>
          <h1>Choose your Artisan</h1>
          <p>
            Select your artisan. Each barber at The Midnight Atelier is a specialist in the timeless intersection of classic heritage and modern precision.
          </p>
        </header>

        <article>
          <ul className="barber-list">
            <li className="barber-card">
              <article className="barber-img-container">
                img
              </article>

              <article className="barber-info">
                <h3>Julian Thorne</h3>
                <span>4.9 - - - - -</span>
                <p>Grooming is a form of architecture. It's about finding the balance between tradition and the individual's character.</p>
              </article>
            </li>

            <li className="barber-card">
              <article className="barber-img-container">
                img
              </article>

              <article className="barber-info">
                <h3>Elias Vance</h3>
                <span>4.8 - - - - -</span>
                <p>I don't just cut hair; I craft confidence. Every client leaves the chair feeling like the best version of themselves.</p>
              </article>
            </li>
          </ul>
        </article>
      </section>
    </>
  )
};