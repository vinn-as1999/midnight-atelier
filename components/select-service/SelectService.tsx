'use client';

import ServicesCard from '../cards/ServicesCard';
import './select-service.scss';


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
              <ServicesCard />
            </li>

            <li>
              <ServicesCard />
            </li>
            <li>
              <ServicesCard />
            </li>
          </ul>
        </article>
      </section>
    </>
  )
};