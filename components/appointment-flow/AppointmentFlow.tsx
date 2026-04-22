'use client';

import Footer from "@/components/footer/Footer";
import SelectBarber from "@/components/select-barber/SelectBarber";
import SelectDate from "@/components/select-date/SelectDate";
import SelectService from "@/components/select-service/SelectService";
import { AppointmentStatus, Barber, CreateAppointmentDTO, ServerResponse, Service } from "@/types/client-types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TimeSlots from "@/components/timeslots/TimeSlots";
import { FaArrowLeft } from "react-icons/fa";
import { Session } from "@supabase/supabase-js";
import { createAppointment } from "@/lib/appointments";
import RegisterModal from "@/components/modal/RegisterModal";
import supabase from "@/lib/db";


type Props = {
  barbers: Barber[];
  services: Service[];
  session: Session | null;
}

export default function AppointmentFlow({barbers, services, session}: Props) {
  const [appointmentStatus, setAppointmentStatus] = useState<AppointmentStatus>(AppointmentStatus.Barber);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(true);
  const [currentSession, setCurrentSession] = useState<Session | null>(session);

  const condition = appointmentStatus === AppointmentStatus.Barber ? 'full-width' : '';
  const condition2 = appointmentStatus === AppointmentStatus.Barber ? 'hidden' : '';
  const router = useRouter();

  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  const selectedBarber = barbers.find((barber) => barber.id === selectedBarberId) ?? null;
  const selectedService = services.find((service) => service.id === selectedServiceId) ?? null;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentSession(session);

      if (session) {
        setRegisterModal(false);
        setServerMessage("Email confirmed successfully. You can finish your appointment now.");
        setIsError(false);
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);


  function formatDate(date: string | null): string {
    if (!date) return 'Select a date';

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(`${date}T00:00:00`));
  };


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
            serverMessage={serverMessage}
            setServerMessage={setServerMessage}
            isError={isError}
            captalize={captalize}
            barbers={barbers}
            selectedBarberId={selectedBarberId}
            setSelectedBarberId={setSelectedBarberId}
          />
        );

      case AppointmentStatus.Service:
        return (
          <SelectService
            serverMessage={serverMessage}
            setServerMessage={setServerMessage}
            services={services}
            isError={isError}
            selectedServiceId={selectedServiceId}
            setSelectedServiceId={setSelectedServiceId}
          />
        );

      case AppointmentStatus.Date:
        return ( 
          <SelectDate 
            serverMessage={serverMessage}
            setServerMessage={setServerMessage}
            isError={isError}
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
          />
        );

      default:
        return <>Sem serviços</>;
    }
  };


  function switchRender() {
    setServerMessage(null);

    switch (appointmentStatus) {
      case AppointmentStatus.Barber:
        if (!selectedBarberId) {
          setServerMessage("Choose a barber to schedule your appointment.");
          setIsError(true);
          console.log("mensagem de erro apareceu")
          return;
        }
        setAppointmentStatus(AppointmentStatus.Service);
        break;
        
      case AppointmentStatus.Service:
        if (!selectedServiceId) {
          setServerMessage("Choose a service to continue.");
          setIsError(true);
          return;
        }
        setAppointmentStatus(AppointmentStatus.Date);
        break;

      case AppointmentStatus.Date:
        if (!selectedDate || !selectedHour) {
          setServerMessage("Choose a date and time to continue.");
          setIsError(true);
          return;
        }
        sendRequest();
        break;
        
      default:
        break;
    }
  };


  async function sendRequest(sessionOverride?: Session | null) {
    const activeSession = sessionOverride ?? currentSession;

    console.log('called')
    if (!selectedBarberId || !selectedServiceId || !selectedDate || !selectedHour) {
      if (!selectedBarberId) {
        setServerMessage("Choose a barber to schedule your appointment.");
      } else if (!selectedServiceId) {
        setServerMessage("Choose a service to complete your booking.");
      } else {
        setServerMessage("Invalid data. Please, try again.");
      }
      setIsError(true);
      return;
    }

    if (!activeSession) {
      console.log('caiu aqui')
      setRegisterModal(true);
      return;
    }

    const payload: CreateAppointmentDTO = {
      barber_id: selectedBarberId,
      service_id: selectedServiceId,
      date: selectedDate,
      hour: selectedHour,
      total: selectedService?.price ?? 0,
    };

    console.log('o payload: ', payload)

    const response = await createAppointment(payload);
    if (response?.message) {
      console.log('caiu no if do send')
      setServerMessage(response.message);
      setIsError(!response.success);
    }
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
          <button onClick={() => sendRequest()}>
            confirm appointment
          </button>
        </article>
      </section>

      {
        registerModal 
        ? <RegisterModal
            sendRequest={() => sendRequest()}
            setRegisterModal={setRegisterModal}
            serverMessage={serverMessage}
            setServerMessage={setServerMessage}
            isError={isError}
            setIsError={setIsError}
          /> : null
      }


      <Footer />
    </main>
  )
};
