'use client';

import { IoIosAdd } from "react-icons/io";
import './add-buttons.scss';
import { Dispatch, SetStateAction } from "react";

type Props = {
  setActiveAddButton: Dispatch<SetStateAction<boolean>>;
}

export function AddBarberButton({setActiveAddButton}: Props) {
  return (
    <>
      <button className="add-barber-bttn"
        onClick={() => setActiveAddButton(true)}>
        <IoIosAdd /> add new barber
      </button>
    </>
  )
}

export function AddServiceButton({setActiveAddButton}: Props) {
  return (
    <>
      <button className="add-service-bttn"
        onClick={() => setActiveAddButton(true)}>
        <IoIosAdd /> add new service
      </button>
    </>
  )
}
