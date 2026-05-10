import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdOutlineCalendarToday, MdOutlineGroup, MdOutlinePersonAdd } from "react-icons/md";
import './dashboards.scss';
import Image from "next/image";
import { Appointment, Barber } from "@/types/client-types";
import Reviews from "../reviews/Reviews";
import AdminHeader from "../header/AdminHeader";


type Props = {
  appointments: Appointment[];
  barbers: Barber[];
  formatDate: (date: string) => string;
}

export default function Dashboards({ appointments, barbers, formatDate }: Props) {
  const recentAppointments = appointments.slice(0, 4)

  return (
    <>
      <section className="dashboards-container">
        <AdminHeader title="Executive Dashboard" />

        <article className="main-overview">
          <ul>
            <li>
              <div className="icon"><HiOutlineCurrencyDollar /></div>
              <span>total revenue</span>
              <h1>$ 12</h1>
            </li>

            <li>
              <div className="icon"><MdOutlineCalendarToday /></div>
              <span>upcoming appointments</span>
              <h1>12</h1>
            </li>

            <li>
              <div className="icon"><MdOutlineGroup /></div>
              <span>active barbers</span>
              <h1>12</h1>
            </li>

            <li>
              <div className="icon"><MdOutlinePersonAdd /></div>
              <span>new members</span>
              <h1>12</h1>
            </li>
          </ul>
        </article>

        <article className="recent-apptm">
          <h2>Recent Appointment</h2>

          {/* renderização condicional */}
          <table className="apptm-table">
            <thead>
              <tr>
                <th>customer</th>
                <th>service</th>
                <th>barber</th>
                <th>date</th>
                <th>time</th>
                <th>status</th>
              </tr>
            </thead>

            <tbody>
              {
                recentAppointments?.length > 0
                  ? recentAppointments.map(apptm => (
                    <tr key={apptm.id}>
                      <td>
                        {apptm.client.name}
                      </td>
                      <td>
                        {apptm.service.name}
                      </td>
                      <td>
                        {apptm.barber.name}
                      </td>
                      <td>
                        {formatDate(apptm.date)}
                      </td>
                      <td>
                        {String(apptm.hour).slice(0, 5)}
                      </td>
                      <td>
                        Pending
                      </td>
                    </tr>
                  ))
                  : null
              }
            </tbody>
          </table>
        </article>

        <article className="top-perf">
          <h2>Top Performance</h2>

          <ul>
            {
              barbers.length > 0
                ? barbers.map(barber => (
                  <li key={barber.id}>
                    <div className="image-container">
                      {
                        <Image alt="Barber" src={barber.image} width={50} height={50} />
                      }
                    </div>

                    <div>
                      <h3>{barber.name}</h3>
                      <Reviews rating={barber.avg_rating} size="sm" />
                    </div>
                  </li>
                )) : null
            }
          </ul>
        </article>
      </section>
    </>
  )
};
