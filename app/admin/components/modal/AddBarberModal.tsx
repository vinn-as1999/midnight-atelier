'use client';

import { Barber } from '@/types/client-types';
import { insertBarbers } from '@/lib/barbers';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import './admin-modals.scss';

type Props = {
  onClose: () => void;
  setBarberList?: Dispatch<SetStateAction<Barber[]>>;
}

export default function AddBarberModal({onClose, setBarberList}: Props) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [tag, setTag] = useState<string>('');
  const [phrase, setPhrase] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);
  }

  async function registerBarber(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!image) {
      setSuccess(false);
      setMessage('Choose a barber picture before saving.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    const response = await insertBarbers({ name, description, tag, phrase }, image);

    setSuccess(response.success);
    setMessage(response.message);

    if (response.success && response.data && setBarberList) {
      setBarberList(previousBarbers => [response.data as Barber, ...previousBarbers]);
    }

    setIsSubmitting(false);
  }

  return (
    <section className="modal-container" role="dialog" aria-modal="true" aria-labelledby="add-barber-title">
      <article className="modal-form">
        <form onSubmit={registerBarber}>
          <header className="modal-header">
            <div>
              <span>new professional</span>
              <h1 id="add-barber-title">register barber</h1>
            </div>

            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label="Close barber modal"
            >
              <RxCross2 />
            </button>
          </header>

          <label htmlFor="barber-name">name</label>
          <input
            id="barber-name"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Julian Thorne"
            required
          />

          <label htmlFor="barber-description">description</label>
          <textarea
            id="barber-description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            placeholder="Barber resumed informations"
            required
          ></textarea>

          <label htmlFor="barber-picture">picture</label>
          <input
            id="barber-picture"
            type="file"
            accept="image/*"
            onChange={handleFile}
            required
          />

          <label htmlFor="barber-tag">tag</label>
          <input
            id="barber-tag"
            type="text"
            value={tag}
            onChange={event => setTag(event.target.value)}
            placeholder="Lead barber, senior stylist..."
            required
          />

          <label htmlFor="barber-phrase">phrase</label>
          <input
            id="barber-phrase"
            type="text"
            value={phrase}
            onChange={event => setPhrase(event.target.value)}
            placeholder="Barber main phrase or slogan"
            required
          />

          {
            message
              ? <p className={`modal-message ${success ? 'success' : 'error'}`}>{message}</p>
              : null
          }

          <button className="modal-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'saving...' : 'save'}
          </button>
        </form>
      </article>
    </section>
  )
};
