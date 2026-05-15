'use client';

import { FormEvent, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import './admin-modals.scss';

type Props = {
  onClose: () => void;
}

export default function AddServiceModal({onClose}: Props) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [special, setSpecial] = useState<boolean>(false);

  function registerService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log('registerService payload', {
      name,
      description,
      price: Number(price),
      duration,
      special,
    });
  }

  return (
    <section className="modal-container" role="dialog" aria-modal="true" aria-labelledby="add-service-title">
      <article className="modal-form">
        <form onSubmit={registerService}>
          <header className="modal-header">
            <div>
              <span>new atelier service</span>
              <h1 id="add-service-title">register service</h1>
            </div>

            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label="Close service modal"
            >
              <RxCross2 />
            </button>
          </header>

          <label htmlFor="service-name">name</label>
          <input
            id="service-name"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Signature Haircut"
            required
          />

          <label htmlFor="service-description">description</label>
          <textarea
            id="service-description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            placeholder="Service resumed informations"
            required
          ></textarea>

          <div className="modal-fields-grid">
            <div>
              <label htmlFor="service-price">price</label>
              <input
                id="service-price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={event => setPrice(event.target.value)}
                placeholder="55"
                required
              />
            </div>

            <div>
              <label htmlFor="service-duration">duration</label>
              <input
                id="service-duration"
                type="text"
                value={duration}
                onChange={event => setDuration(event.target.value)}
                placeholder="45 min"
                required
              />
            </div>
          </div>

          <label className="modal-checkbox" htmlFor="service-special">
            <input
              id="service-special"
              type="checkbox"
              checked={special}
              onChange={event => setSpecial(event.target.checked)}
            />
            <span>Mark as special service</span>
          </label>

          <button className="modal-submit" type="submit">
            save
          </button>
        </form>
      </article>
    </section>
  )
};
