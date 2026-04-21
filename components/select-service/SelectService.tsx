'use client';

import ServicesCard from '../cards/ServicesCard';
import './select-service.scss';
import { Service } from '@/types/client-types';

type Props = {
  services: Service[];
  selectedServiceId: string | null;
  setSelectedServiceId: (serviceId: string) => void;
};

export default function SelectService({
  services,
  selectedServiceId,
  setSelectedServiceId,
}: Props) {
  
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
            {services.map((service) => (
              <li key={service.id}>
                <ServicesCard
                  title={service.name}
                  description={service.description}
                  price={service.price}
                  duration={service.duration}
                  isSelected={selectedServiceId === service.id}
                  onSelect={() => setSelectedServiceId(service.id)}
                />
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  )
};
