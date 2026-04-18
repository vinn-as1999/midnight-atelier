'use client';

import Footer from "@/components/footer/Footer";
import SelectBarber from "@/components/select-barber/SelectBarber";
import SelectDate from "@/components/select-date/SelectDate";
import SelectService from "@/components/select-service/SelectService";
import { AppointmentStatus } from "@/types/client-types";
import { useState } from "react";
import './appointment.scss';
import TimeSlots from "@/components/timeslots/TimeSlots";


export default function AppointmentPage() {
  const [appointmentStatus, setAppointmentStatus] = useState<AppointmentStatus>(AppointmentStatus.Barber);
  const condition = appointmentStatus === AppointmentStatus.Barber ? 'full-width' : '';
  const condition2 = appointmentStatus === AppointmentStatus.Barber ? 'hidden' : '';

  function renderStep() {
    switch (appointmentStatus) {
      case AppointmentStatus.Barber:
        return <SelectBarber />;
      case AppointmentStatus.Service:
        return <SelectService />;
      case AppointmentStatus.Date:
        return <SelectDate />;
      default:
        return <>Sem serviços</>;
    }
  };

  
  function switchRender() {
    switch (appointmentStatus) {
      case AppointmentStatus.Barber:
        setAppointmentStatus(AppointmentStatus.Service);
        break;
        
      case AppointmentStatus.Service:
        setAppointmentStatus(AppointmentStatus.Date);
        break;

      case AppointmentStatus.Date:
        sendRequest();
        break;
        
      default:
        break;
    }
  };

  function sendRequest() {
    console.log("request sent");
  };
      
  const buttonLabels = {
    [AppointmentStatus.Barber]: "Go to services",
    [AppointmentStatus.Service]: "appointment date",
    [AppointmentStatus.Date]: "Finish appointment",
  };

  console.log(appointmentStatus)

  return (
    <main className={`appointment-main ${appointmentStatus === AppointmentStatus.Date ? '' : 'no-hours'}`}>
      
      <section className={`appointment-render ${condition}`}>
        {renderStep()}
      </section>

      {appointmentStatus === AppointmentStatus.Date && <TimeSlots />}

      <section className={`appointment-bttn-container ${condition}`}>
        {
          appointmentStatus !== AppointmentStatus.Date && <button onClick={switchRender}>
            {buttonLabels[appointmentStatus] ?? "Back to Home"}
          </button>
        }
      </section>

      <section className={`appointment-sheet ${condition2}`}>
        <article className="sheet">
          <h1 className="title">Reservation</h1>
          <ul className="sheet-list">
            <li>
              <h2>service</h2>
              <span>Haircut</span>
            </li>

            <li>
              <h2>barber</h2>
              <span>Julian Thorne</span>
            </li>
            <li>
              <h2>date & time</h2>
              <span>Dec 10, 11:00 AM</span>
            </li>
            <li className="sheet-total">
              <h2>total investment</h2>
              <span>$ 65</span>
            </li>
          </ul>
          <button disabled={appointmentStatus !== AppointmentStatus.Date}>
            confirm appointment
          </button>
        </article>
      </section>

      <Footer />
    </main>
  )
};