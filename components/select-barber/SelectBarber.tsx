'use client';

import { IoMdStar } from 'react-icons/io';
import Image from 'next/image';
import './select-barber.scss';
import { Barber } from '@/types/client-types';

import ErrorMessage from '../error/ErrorMessage';

type Props = {
  captalize: (name: string) => string;
  barbers: Barber[];
  selectedBarberId: string | null;
  setSelectedBarberId: (barberId: string) => void;
  serverMessage: string | null;
  setServerMessage: (message: string | null) => void;
  isError: boolean;
};

export default function SelectBarber({
  captalize,
  barbers,
  selectedBarberId,
  setSelectedBarberId,
  serverMessage,
  setServerMessage,
  isError,
}: Props) {
  
  return (
    <>
      {
        serverMessage 
          ? <ErrorMessage message={serverMessage} isError={isError} />
          : null
      }
      
      <section className="sel-barber-container">
        <header>
          <span className="page-tag">the heritage guild</span>
          <h1>Choose your Artisan</h1>
          <p>
            Each barber at The Midnight Atelier is a specialist in the timeless intersection of classic heritage and modern precision.
          </p>
        </header>

        <article className='b-list-container'>
          <ul className="barber-list">
            {
              barbers?.map((barber) => (
                <li
                  key={barber.id}
                  className={selectedBarberId === barber.id ? 'selected' : ''}
                  onClick={() => {
                    setServerMessage(null);
                    setSelectedBarberId(barber.id);
                  }}
                >
                  <div className="barber-img">
                    <Image alt='Barber Photo' fill src={barber.image} />
                  </div>

                  <article className='barber-info'>
                    <h3>{captalize(barber.name)}</h3>
                    <div className="reviews">
                      <span className="number">5.0</span>
                      <span className="stars">
                        <IoMdStar />
                        <IoMdStar />
                        <IoMdStar />
                        <IoMdStar />
                        <IoMdStar />
                      </span>
                    </div>
                    <p>{barber.description}</p>
                  </article>
                </li>
              ))
            }
          </ul>
        </article>
      </section>
    </>
  )
};
