'use client';

import { BsCalendar2 } from "react-icons/bs";
import { RiLayoutGridFill, RiLogoutBoxLine, RiScissorsFill, RiUserLine } from "react-icons/ri";
import './aside.scss';
import { Active } from "@/types/client-types";
import { Dispatch, SetStateAction } from "react";


type Props = {
  active: Active;
  setActive: Dispatch<SetStateAction<Active>>;
}

export default function Aside({active, setActive}: Props) {
  const toggleOption = (component: Active) => setActive(component);
  
  return (
    <>
      <section className="aside-container">
        <header>
          <h1>The Atelier</h1>
          <span className="page-tag">master admin</span>
        </header>
        
        <ul>
          <li onClick={() => toggleOption("dashboards")} className={active === "dashboards" ? "active" : ""}>
            <RiLayoutGridFill />
            Dashboards
          </li>

          <li onClick={() => toggleOption("appointments")} className={active === "appointments" ? "active" : ""}>
            <BsCalendar2 />
            Appointments
          </li>

          <li onClick={() => toggleOption("barbers")} className={active === "barbers" ? "active" : ""}>
            <RiUserLine />
            Barbers
          </li>

          <li onClick={() => toggleOption("services")} className={active === "services" ? "active" : ""}>
            <RiScissorsFill />
            Services
          </li>

          <li><RiLogoutBoxLine /></li>
        </ul>
      </section>
    </>
  )
};