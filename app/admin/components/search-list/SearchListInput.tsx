'use client';

import { Appointment } from "@/types/client-types";
import { CiSearch } from "react-icons/ci";
import { Dispatch, SetStateAction, useState } from "react";
import './search-input.scss';


type Props = {
  appointments: Appointment[];
  setSearchList: Dispatch<SetStateAction<Appointment[]>>
}

export default function SearchListInput({appointments, setSearchList}: Props) {
  const [term, setTerm] = useState<string>('');

  function searchScheduling(): Appointment[] {
    const search = term.toLowerCase().trim();
    
    const filtered = appointments.filter((scheduling) => {
      return (
        scheduling.client.name
          ?.toLowerCase()
          .includes(search) ||

        scheduling.barber.name
          ?.toLowerCase()
          .includes(search) ||

        scheduling.service.name
          ?.toLowerCase()
          .includes(search) ||

        scheduling.date
          ?.toLowerCase()
          .includes(search)
      );
    });

    setSearchList(filtered);

    return filtered;
  };


  return (
    <>
      <section className="search-input-container">
        <label htmlFor="" className="page-tag">search scheduling</label>

        <div className="input-container">
          <input type="text" placeholder="Enter client name, barber, date or service" value={term} onChange={e => setTerm(e.target.value)} />

          <button onClick={() => searchScheduling()}>
            <CiSearch />
            search
          </button>
        </div>
      </section>
    </>
  )
}