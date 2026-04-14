'use client';

import Footer from "@/components/footer/Footer";
import SelectBarber from "@/components/select-barber/SelectBarber";
import SelectDate from "@/components/select-date/SelectDate";
import SelectService from "@/components/select-service/SelectService";
import { AppointmentStatus } from "@/types/client-types";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";


export default function AppointmentPage() {
  const [appointmentStatus, setAppointmentStatus] = useState<AppointmentStatus>(AppointmentStatus.Barber);

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
    [AppointmentStatus.Service]: "Select appointment date",
    [AppointmentStatus.Date]: "Finish appointment",
  };

  return (
    <main className="appointment-main">
      <nav className="general-nav">
        <div>
          <IoIosArrowRoundBack /> back
        </div>
      </nav>
      
      {renderStep()}

      <div className="appointment-bttn-container">
        <button onClick={switchRender}>
          {buttonLabels[appointmentStatus] ?? "Back to Home"}
        </button>
      </div>

      {
        // formulário de registro do cliente
      }

      <Footer />
    </main>
  )
};