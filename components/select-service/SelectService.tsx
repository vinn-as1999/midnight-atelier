'use client';

import ServicesCard from '../cards/services-card/ServicesCard';
import './select-service.scss';
import { Service } from '@/types/client-types';

import ErrorMessage from '../error/ErrorMessage';

type Props = {
  captalize: (name: string) => string;
  services: Service[];
  selectedServiceId: string | null;
  setSelectedServiceId: (serviceId: string) => void;
  serverMessage: string | null;
  setServerMessage: (message: string | null) => void;
  isError: boolean;
};

export default function SelectService({
  captalize,
  services,
  selectedServiceId,
  setSelectedServiceId,
  serverMessage,
  setServerMessage,
  isError,
}: Props) {
  
  return (
    <>
      <section className="sel-services-container">
        {
          serverMessage 
            ? <ErrorMessage message={serverMessage} isError={isError} /> 
            : null
        }

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
                  title={captalize(service.name)}
                  description={service.description}
                  price={service.price}
                  duration={service.duration}
                  isSelected={selectedServiceId === service.id}
                  onSelect={() => {
                    setServerMessage(null);
                    setSelectedServiceId(service.id);
                  }}
                />
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  )
};
