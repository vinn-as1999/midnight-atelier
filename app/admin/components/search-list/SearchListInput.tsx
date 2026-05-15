'use client';

import { Appointment } from "@/types/client-types";
import { CiSearch } from "react-icons/ci";
import { Dispatch, SetStateAction, useState } from "react";
import './search-input.scss';


type Props = {
  appointments: Appointment[];
  currentMonth: string;
  setSearchList: Dispatch<SetStateAction<Appointment[]>>
}

export default function SearchListInput({appointments, currentMonth, setSearchList}: Props) {
  const [term, setTerm] = useState<string>('');

  function searchScheduling(): Appointment[] {
    const search = term.toLowerCase().trim();

    if (term === '') {
      const originalList = appointments.filter(scheduling => scheduling.date.slice(5, 7) === currentMonth);
      setSearchList(originalList);
      return originalList;
    }
    
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

    if (filtered.length <= 0) {
      
    }

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