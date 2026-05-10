'use client';

import { LiaEdit } from "react-icons/lia";
import { RxTrash } from "react-icons/rx";
import AdminHeader from "../header/AdminHeader";
import './admin-services.scss';
import { Service } from "@/types/client-types";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useState } from "react";


export default function AdminServices({services}: {services: Service[]}) {
  const [special, setSpecial] = useState('');

  return (
    <>
      <section className="adm-services-container">
        <AdminHeader title="The Atelier Services" />
        {
          // adicionar novo serviço ou remover
        }
        {
          services?.length > 0
            ? services.map(serv => (
              <article className="adm-serv-card">
                <div className={`card-info ${serv.special ? 'special' : ''}`}>
                  <div>
                    <h2>{serv.name}</h2>
                    <p>{serv.description}</p>
                  </div>
                  <span>
                    $ {serv.price}
                  </span>
                </div>

                <div className="card-edit">
                  <LiaEdit />
                  <RxTrash />
                  {
                    serv.special ? <IoMdStar className="special" /> : <IoMdStarOutline /> 
                  }
                </div>
              </article>
            ))
            : null
        }
      </section>
    </>
  )
};
