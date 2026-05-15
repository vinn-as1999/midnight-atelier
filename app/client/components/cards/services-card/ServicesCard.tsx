'use client';

import './services-card.scss';

type Props = {
  title: string;
  description: string;
  price: number;
  duration: string;
  isSelected: boolean;
  onSelect: () => void;
};

export default function ServicesCard({
  title,
  description,
  price,
  duration,
  isSelected,
  onSelect,
}: Props) {
  return (
    <>
      <section className={`serv-card-container ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
        <div className="serv-info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className='serv-number'>
          <span className='price'>$ {price}</span>
          <span className='duration'>{duration} min</span>
        </div>
      </section>
    </>
  )
};
