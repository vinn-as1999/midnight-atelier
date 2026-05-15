'use client';

import { Active, Appointment, Barber, Service } from "@/types/client-types";
import { useState } from "react";
import Aside from "./components/aside/Aside";
import Navbar from "./components/navbar/Navbar";
import Dashboards from "./components/dashboards/Dashboards";
import './admin-page.scss';
import AdminAppointments from "./components/appointments/AdminAppointments";
import AdminBarbers from "./components/barbers/AdminBarbers";
import AdminServices from "./components/services/AdminServices";


type Props = {
  appointments: Appointment[];
  barbers: Barber[];
  services: Service[];
}

export default function AdminClient({ appointments, barbers, services }: Props) {
  const date = new Date;
  const currentMonth = String(date.getMonth() + 1).padStart(2, '0');

  const [active, setActive] = useState<Active>("dashboards");
  const [searchList, setSearchList] = useState<Appointment[]>(appointments.filter(scheduling => scheduling.date.slice(5, 7) === currentMonth));
  

  function formatDate(date: string): string {
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);

    return `${day}/${month}/${year}`
  };

  function switchRender() {
    switch (active) {
      case "dashboards":
        return <Dashboards appointments={appointments} barbers={barbers} formatDate={formatDate} />;
      
      case "appointments":
        return <AdminAppointments 
          appointments={appointments} 
          currentMonth={currentMonth} 
          formatDate={formatDate} 
          searchList={searchList} 
          setSearchList={setSearchList} 
        />;

      case "barbers":
        return <AdminBarbers barbers={barbers} />;

      case "services":
        return <AdminServices services={services} />;
      
      default: 
        return <Dashboards appointments={appointments} barbers={barbers} formatDate={formatDate} />
    }
  };

  return (
    <>
      <section className="admin-container">
        <Navbar active={active} setActive={setActive} />

        <Aside active={active} setActive={setActive} />

        <article className="active-container">
          {
            switchRender()
          }
        </article>
      </section>
    </>
  )
};
