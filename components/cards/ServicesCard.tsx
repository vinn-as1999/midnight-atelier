'use client';

import './services-card.scss';


export default function ServicesCard() {
  // passar os valores de h2, p e span como props

  return (
    <>
      <section className="serv-card-container">
        <div className="serv-info">
          <h2>Haircut</h2>
          <p>Precision cutting and styling tailored to your head shape. Includes hot towel finish.</p>
        </div>
        <div className='serv-number'>
          <span className='price'>$ 55</span>
          <span className='duration'>45 min</span>
        </div>
      </section>   
    </>
  )
};