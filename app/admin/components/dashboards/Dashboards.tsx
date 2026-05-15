import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdCancelPresentation, MdOutlineCalendarToday, MdOutlineGroup, MdOutlinePersonAdd } from "react-icons/md";
import './dashboards.scss';
import Image from "next/image";
import { Appointment, Barber } from "@/types/client-types";
import Reviews from "../reviews/Reviews";
import AdminHeader from "../header/AdminHeader";
import { LiaEdit } from "react-icons/lia";
import { FaRegCheckSquare } from "react-icons/fa";


type Props = {
  appointments: Appointment[];
  barbers: Barber[];
  formatDate: (date: string) => string;
}

export default function Dashboards({ appointments, barbers, formatDate }: Props) {
  const recentAppointments = appointments.slice(0, 4);
  const topPerfList = barbers.sort((a: Barber, b: Barber) => {
    if (a.avg_rating === null) return 1;
    if (b.avg_rating === null) return -1;
    
    return b.avg_rating - a.avg_rating;
  })

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
                <th>barber</th>
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
                        {apptm.barber.name}
                      </td>
                      <td>
                        {String(apptm.hour).slice(0, 5)}
                      </td>
                      <td>
                        {apptm.status}
                      </td>
                      <td className="edit-apptm">
                        <ul>
                          <li><MdCancelPresentation /></li>
                          <li><FaRegCheckSquare /></li>
                        </ul>
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
              topPerfList.length > 0
                ? topPerfList.map(barber => (
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
