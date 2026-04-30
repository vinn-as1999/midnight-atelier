'use client';

import { Active } from "@/types/client-types";
import { useState } from "react";
import Aside from "./components/aside/Aside";
import Navbar from "./components/navbar/Navbar";
import Dashboards from "./components/dashboards/Dashboards";
import './admin-page.scss';


export default function AdminPage() {
  const [active, setActive] = useState<Active>("dashboards");

  function switchRender() {

  };

  return (
    <>
      <section className="admin-container">
        <Navbar active={active} setActive={setActive} />

        <Aside active={active} setActive={setActive} />

        <article className="active-container">
          <Dashboards />
        </article>
      </section>
    </>
  )
};