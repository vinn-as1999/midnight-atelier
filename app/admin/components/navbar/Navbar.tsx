'use client';

import { BsCalendar2 } from "react-icons/bs";
import { RiLayoutGridFill, RiUserLine, RiScissorsFill, RiLogoutBoxLine } from "react-icons/ri";
import './navbar.scss';
import { Dispatch, SetStateAction, useState } from "react";
import { Active } from "@/types/client-types";


type Props = {
  active: Active;
  setActive: Dispatch<SetStateAction<Active>>;
}

export default function Navbar({active, setActive}: Props) {
  const toggleOption = (component: Active) => setActive(component)

  return (
    <>
      <section className="navbar-container">
        <ul>
          <li onClick={() => toggleOption("dashboards")} className={active === "dashboards" ? "active" : ""}>
            <RiLayoutGridFill />
          </li>

          <li onClick={() => toggleOption("appointments")} className={active === "appointments" ? "active" : ""}>
            <BsCalendar2 />
          </li>

          <li onClick={() => toggleOption("barbers")} className={active === "barbers" ? "active" : ""}>
            <RiUserLine />
          </li>

          <li onClick={() => toggleOption("services")} className={active === "services" ? "active" : ""}>
            <RiScissorsFill />
          </li>

          <li><RiLogoutBoxLine /></li>
        </ul>
      </section>
    </>
  )
};