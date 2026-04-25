'use client';

import Footer from "@/components/footer/Footer";
import SelectBarber from "@/components/select-barber/SelectBarber";
import SelectDate from "@/components/select-date/SelectDate";
import SelectService from "@/components/select-service/SelectService";
import { AppointmentStatus, Barber, CreateAppointmentDTO, Service } from "@/types/client-types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TimeSlots from "@/components/timeslots/TimeSlots";
import { FaArrowLeft } from "react-icons/fa";
import { createAppointment } from "@/lib/appointments";
import RegisterModal from "@/components/modal/RegisterModal";
import { ensureClientExists, getStoredClient } from "@/lib/auth";
import FinishedScreen from "../finished-screen/FinishedScreen";
import { saveStoredAppointment } from "@/lib/appointment-storage";


type Props = {
  barbers: Barber[];
  services: Service[];
}

export default function AppointmentFlow({barbers, services}: Props) {
  const [appointmentStatus, setAppointmentStatus] = useState<AppointmentStatus>(AppointmentStatus.Barber);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(true);

  const isFullWidth =
    appointmentStatus === AppointmentStatus.Barber ||
    appointmentStatus === AppointmentStatus.Finish;
  const condition = isFullWidth ? 'full-width' : '';

  const isHidden = 
    appointmentStatus === AppointmentStatus.Barber || 
    appointmentStatus === AppointmentStatus.Finish;
  const condition2 = isHidden ? 'hidden' : '';

  const renderBttnCondition = appointmentStatus !== AppointmentStatus.Date && appointmentStatus !== AppointmentStatus.Finish;

  const router = useRouter();

  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  const selectedBarber = barbers.find((barber) => barber.id === selectedBarberId) ?? null;
  const selectedService = services.find((service) => service.id === selectedServiceId) ?? null;


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

      case AppointmentStatus.Finish:
        router.back();
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
            captalize={captalize}
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

      case AppointmentStatus.Finish:
        return (
          <FinishedScreen />
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
        break;
        
      default:
        break;
    }
  };


  async function sendRequest() {
    const storedClient = getStoredClient();
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

    if (!storedClient) {
      console.log('caiu aqui')
      setRegisterModal(true);
      return;
    }

    const clientResponse = await ensureClientExists(storedClient);

    if (!clientResponse.success) {
      setServerMessage(clientResponse.message);
      setIsError(true);
      return;
    }

    const payload: CreateAppointmentDTO = {
      barber_id: selectedBarberId,
      service_id: selectedServiceId,
      client_id: storedClient.id,
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

    saveStoredAppointment({
      date: selectedDate,
      hour: selectedHour,
      service: selectedService?.name ? captalize(selectedService.name) : "Service not informed",
    });
    
    setAppointmentStatus(AppointmentStatus.Finish);
    setIsError(false);
  };


  const buttonLabels = {
    [AppointmentStatus.Barber]: "Go to services",
    [AppointmentStatus.Service]: "appointment date",
    [AppointmentStatus.Date]: "Finish appointment",
    [AppointmentStatus.Finish]: "Finished"
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
          renderBttnCondition && <button onClick={switchRender}>
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
              <span>{selectedService?.name ? captalize(selectedService.name) : 'Select a service'}</span>
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
