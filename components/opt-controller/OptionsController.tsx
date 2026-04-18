'use client';

import { useState } from "react";
import Aside from "../aside/Aside";
import Navbar from "../navbar/Navbar";

export default function OptionsController() {
  const [isActived, setIsActived] = useState<boolean>(false)

  return (
    <>
      <Navbar setIsActived={setIsActived} />

      <Aside isActived={isActived} setIsActived={setIsActived} />
    </>
  )
};