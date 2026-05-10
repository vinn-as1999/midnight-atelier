'use client';

import { Barber } from '@/types/client-types';
import Image from 'next/image';
import { useState } from 'react';
import './admin-barbers.scss';
import Reviews from '../reviews/Reviews';
import AdminHeader from '../header/AdminHeader';


export default function AdminBarbers({barbers}: {barbers: Barber[]}) {
  const [selectedBarberId, setSelectedBarberId] = useState(barbers[0]?.id);
  const selectedBarber = barbers.find(barber => barber.id === selectedBarberId) ?? barbers[0];

  console.log(barbers)

  return (
    <>
      <section className="barbers-container">
        <AdminHeader title="Oficial Barbers" />

        <article className="barbers-management">
          <div className="barbers-table-panel">
            <div className="table-heading">
              <h2>Barbers Team</h2>
              <span>{barbers.length} active professionals</span>
            </div>

            {
              barbers.length > 0
                ? (
                  <table className="barbers-table">
                    <thead>
                      <tr>
                        <th>barber</th>
                        <th>tag</th>
                        <th>rating</th>
                        <th>signature phrase</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        barbers.map(barber => (
                          <tr
                            key={barber.id}
                            className={selectedBarber?.id === barber.id ? 'active' : ''}
                            onClick={() => setSelectedBarberId(barber.id)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                setSelectedBarberId(barber.id);
                              }
                            }}
                            tabIndex={0}
                            aria-label={`View ${barber.name} profile`}
                          >
                            <td>
                              <div className="barber-cell">
                                <Image alt={barber.name} src={barber.image} width={48} height={48} />
                                <div>
                                  <strong>{barber.name}</strong>
                                  <span>ID {barber.id}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="barber-tag">{barber.tag}</span>
                            </td>
                            <td>
                              <Reviews rating={barber.avg_rating} size="sm" />
                            </td>
                            <td>{barber.description}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )
                : <p className="empty-state">No barbers registered yet.</p>
            }
          </div>

          {
            selectedBarber
              ? (
                <aside className="barber-profile">
                  <div className="profile-image">
                    <Image alt={selectedBarber.name} src={selectedBarber.image} width={220} height={220} />
                  </div>

                  <span className="barber-tag">{selectedBarber.tag}</span>

                  <h2>{selectedBarber.name}</h2>

                  <Reviews rating={selectedBarber.avg_rating} />

                  <p>{selectedBarber.description}</p>

                  <dl>
                    <div>
                      <dt>Status</dt>
                      <dd>Active</dd>
                    </div>

                    <div>
                      <dt>Profile ID</dt>
                      <dd>{selectedBarber.id}</dd>
                    </div>
                  </dl>
                </aside>
              )
              : null
          }
        </article>
      </section>
    </>
  )
};
