'use client';

import Footer from "@/components/footer/Footer";
import SelectBarber from "@/components/select-barber/SelectBarber";
import SelectDate from "@/components/select-date/SelectDate";
import SelectService from "@/components/select-service/SelectService";
import { Appointment, AppointmentStatus, Barber, CreateAppointmentDTO, Service } from "@/types/client-types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TimeSlots from "@/components/timeslots/TimeSlots";
import { FaArrowLeft } from "react-icons/fa";
import { getSession } from "@/lib/auth";
import { Session } from "@supabase/supabase-js";
import { createAppointment } from "@/lib/appointments";


const SERVICES: Service[] = [
  {
    id: "haircut",
    name: "Haircut",
    description: "Precision cutting and styling tailored to your head shape. Includes hot towel finish.",
    price: 55,
    duration: "45 min",
  },
  {
    id: "beard-groom",
    name: "Royal Beard Groom",
    description: "Sculpting, lining, and conditioning with premium oils and a straight-edge finish.",
    price: 40,
    duration: "30 min",
  },
  {
    id: "full-atelier",
    name: "The Full Atelier",
    description: "Signature cut, beard groom, and a facial massage in one complete experience.",
    price: 85,
    duration: "75 min",
  },
];

export default function AppointmentFlow({session, barbers}: {barbers: Barber[], session: Session | null}) {
  const [appointmentStatus, setAppointmentStatus] = useState<AppointmentStatus>(AppointmentStatus.Barber);
  const condition = appointmentStatus === AppointmentStatus.Barber ? 'full-width' : '';
  const condition2 = appointmentStatus === AppointmentStatus.Barber ? 'hidden' : '';
  const router = useRouter();

  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  const selectedBarber = barbers.find((barber) => barber.id === selectedBarberId) ?? null;
  const selectedService = SERVICES.find((service) => service.id === selectedServiceId) ?? null;

  function formatDate(date: string | null): string {
    if (!date) return 'Select a date';

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(`${date}T00:00:00`));
  }

  function captalize(name: string): string {
    const nameSplit = name.split(' ');
    const captalizedNames = nameSplit.map(name => name.charAt(0).toUpperCase() + name.slice(1))

    return captalizedNames.join(' ')
  };

  function handleBack() {
    switch (appointmentStatus) {
      case AppointmentStatus.Barber:
        router.back();
        break;
        
      case AppointmentStatus.Service:
        setAppointmentStatus(AppointmentStatus.Barber);
        break;

      case AppointmentStatus.Date:
        setAppointmentStatus(AppointmentStatus.Service);
        break;

      default:
        break;
    }
  };

  function renderStep() {
    switch (appointmentStatus) {
      case AppointmentStatus.Barber:
        return (
          <SelectBarber
            captalize={captalize}
            barbers={barbers}
            selectedBarberId={selectedBarberId}
            setSelectedBarberId={setSelectedBarberId}
          />
        );

      case AppointmentStatus.Service:
        return (
          <SelectService
            services={SERVICES}
            selectedServiceId={selectedServiceId}
            setSelectedServiceId={setSelectedServiceId}
          />
        );

      case AppointmentStatus.Date:
        return <SelectDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />;

      default:
        return <>Sem serviços</>;
    }
  };

  function canMoveForward() {
    switch (appointmentStatus) {
      case AppointmentStatus.Barber:
        return Boolean(selectedBarberId);

      case AppointmentStatus.Service:
        return Boolean(selectedServiceId);

      case AppointmentStatus.Date:
        return Boolean(selectedDate && selectedHour);

      default:
        return false;
    }
  }
  
  function switchRender() {
    switch (appointmentStatus) {
      case AppointmentStatus.Barber:
        if (!selectedBarberId) return;
        setAppointmentStatus(AppointmentStatus.Service);
        break;
        
      case AppointmentStatus.Service:
        if (!selectedServiceId) return;
        setAppointmentStatus(AppointmentStatus.Date);
        break;

      case AppointmentStatus.Date:
        if (!selectedDate || !selectedHour) return;
        sendRequest();
        break;
        
      default:
        break;
    }
  };

  async function sendRequest() {
    console.log('called')
    if (!selectedBarberId || !selectedServiceId || !selectedDate || !selectedHour) {
      return;
    }

    if (!session) {
      setRegisterModal(true);
      return;
    }

    const payload: CreateAppointmentDTO = {
      barberId: selectedBarberId,
      serviceId: selectedServiceId,
      date: selectedDate,
      hour: selectedHour,
      total: selectedService?.price ?? 0,
    };

    const response = await createAppointment(payload);
    console.log('resposta: ', response.message)
  };
      
  const buttonLabels = {
    [AppointmentStatus.Barber]: "Go to services",
    [AppointmentStatus.Service]: "appointment date",
    [AppointmentStatus.Date]: "Finish appointment",
  };

  return (
    <main className={`appointment-main ${appointmentStatus === AppointmentStatus.Date ? 'with-hours' : ''}`}>

      <button className='back-bttn' onClick={() => handleBack()}>
        <FaArrowLeft /> back
      </button>
      
      <section className={`appointment-render ${condition}`}>
        {renderStep()}
      </section>

      {appointmentStatus === AppointmentStatus.Date && (
        <TimeSlots selectedHour={selectedHour} setSelectedHour={setSelectedHour} />
      )}

      <section className={`appointment-bttn-container ${condition}`}>
        {
          appointmentStatus !== AppointmentStatus.Date && <button disabled={!canMoveForward()} onClick={switchRender}>
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
              <span>{selectedService?.name ?? 'Select a service'}</span>
            </li>

            <li>
              <h2>barber</h2>
              <span>{selectedBarber?.name ? captalize(selectedBarber.name) : 'Select a barber'}</span>
            </li>
            <li>
              <h2>date & time</h2>
              <span>{selectedDate ? `${formatDate(selectedDate)}, ${selectedHour ?? 'Select a time'}` : 'Select a date'}</span>
            </li>
            <li className="sheet-total">
              <h2>total investment</h2>
              <span>$ {selectedService?.price ?? 0}</span>
            </li>
          </ul>
          <button disabled={!canMoveForward() || appointmentStatus !== AppointmentStatus.Date} onClick={sendRequest}>
            confirm appointment
          </button>
        </article>
      </section>

      

      <Footer />
    </main>
  )
};
