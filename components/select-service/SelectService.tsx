'use client';


export default function SelectService() {
  return (
    <>
      <section className="sel-services-container">
        <header>
          <span className="page-tag">the mastery of the blades</span>
          <h1>Select Services</h1>
          <p>
            Select the service you want. Trust in our grooming mastery.
          </p>
        </header>

        <article className="sel-services-cards">
          <ul className="sel-services-list">
            <li>
              <div className="serv-info">
                <h2>Haircut</h2>
                <p>Precision cutting and styling tailored to your head shape. Includes hot towel finish.</p>
              </div>
              <div>
                <span>$55</span>
                <span>45 min</span>
              </div>
            </li>

            <li>
              <div className="serv-info">
                <h2>Beard Trim</h2>
                <p>Sculpting, lining, and conditioning with premium oils and straight razor definition.</p>
              </div>
              <div>
                <span>$40</span>
                <span>30 min</span>
              </div>
            </li>

            <li>
              <div className="serv-info" id="full-atelier">
                <span className="page-tag-2">signature experience</span>
                <h2>The Full Atelier</h2>
                <p>Our ultimate grooming ritual. Haircut, beard sculpture, facial, and premium beverage.</p>
              </div>
              <div>
                <span>$120</span>
                <span>60 min</span>
              </div>
            </li>
          </ul>
        </article>
      </section>
    </>
  )
};