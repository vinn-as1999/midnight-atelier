'use client';

import './appmt-card.scss';
import { useState } from 'react';
import { StoredAppointment } from '@/types/client-types';
import { getStoredAppointment } from '@/lib/appointment-storage';


export default function AppointmentCard() {
  const [appointment] = useState<StoredAppointment | null>(() => getStoredAppointment());

  return (
    <section className="appmt-card">
      <div className="content-group">
        <span className="label">date & time</span>
        <p className="value">
          {appointment ? `${formatDate(appointment.date)} — ${appointment.hour}` : 'No appointment found'}
        </p>
      </div>

      <div className="content-group">
        <span className="label">service</span>
        <p className="value">{appointment?.service ?? 'Service not informed'}</p>
      </div>
    </section>
  );
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}
