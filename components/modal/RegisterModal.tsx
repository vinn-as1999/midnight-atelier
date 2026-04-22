'use client';

import { FaTimes } from 'react-icons/fa';
import './registermodal.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import { RegisterPayload } from '@/types/client-types';
import { validateEmail, validateString } from '@/app/utils/validateStr';
import { createSession } from '@/lib/auth';

type Props = {
  sendRequest: () => void;
  setRegisterModal: Dispatch<SetStateAction<boolean>>;
  serverMessage: string | null;
  setServerMessage: Dispatch<SetStateAction<string | null>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

export default function RegisterModal({
  sendRequest,
  setRegisterModal,
  serverMessage,
  setServerMessage,
  isError,
  setIsError
}: Props) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);

  async function sendData() {
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();

    if (!validateString(sanitizedName)) {
      setServerMessage('Please fill all fields correctly.');
      setIsError(true);
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      setServerMessage('Please enter a valid email address.');
      setIsError(true);
      return;
    }

    const payload: RegisterPayload = {
      name: sanitizedName,
      email: sanitizedEmail
    };

    const response = await createSession(payload);

    setServerMessage(response.message);
    setIsError(!response.success);

    if (!response.success) {
      return;
    }

    setEmailSent(true);
  };

  return (
    <div className="register-modal-overlay">
      <section className="register-modal" onClick={(e) => e.stopPropagation()}>
        <FaTimes className="icon" onClick={() => setRegisterModal(false)} />

        {serverMessage ? (
          <div className={`modal-message ${isError ? 'error' : 'success'}`}>
            <p>{serverMessage}</p>
          </div>
        ) : null}

        {!emailSent ? (
          <>
            <h2>Register your data</h2>
            <div className="modal-fields">
              <label className="page-tag">Full name</label>
              <input
                type="text"
                placeholder="John Taylor"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="page-tag">Email</label>
              <input
                type="email"
                placeholder="john_taylor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button onClick={sendData}>Send magic link</button>
          </>
        ) : (
          <>
            <h2>Check your email</h2>
            <div className="modal-fields">
              <p>We&apos;ve sent a secure sign-in link to your email. Open it to authenticate with Supabase and then come back here to finish the appointment.</p>
            </div>

            <button onClick={sendRequest}>I already opened the link</button>
          </>
        )}
      </section>
    </div>
  )
};
