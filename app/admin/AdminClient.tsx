'use client';

import { Active, Barber } from "@/types/client-types";
import { useState } from "react";
import Aside from "./components/aside/Aside";
import Navbar from "./components/navbar/Navbar";
import Dashboards from "./components/dashboards/Dashboards";
import './admin-page.scss';


type Props = {
  barbers: Barber[];
}

export default function AdminClient({ barbers }: Props) {
  const [active, setActive] = useState<Active>("dashboards");

  function switchRender() {
    switch (active) {
      case "dashboards":
        return <Dashboards barbers={barbers} />;
      
      case "appointments":
        return null;

      case "barbers":
        return null;

      case "services":
        return null;
      
      default: 
        return <Dashboards barbers={barbers} />
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
