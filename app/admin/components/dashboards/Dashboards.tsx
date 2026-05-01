import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdOutlineCalendarToday, MdOutlineGroup, MdOutlinePersonAdd } from "react-icons/md";
import './dashboards.scss';
import Image from "next/image";
import { Barber } from "@/types/client-types";


type Props = {
  barbers: Barber[];
}

export default function Dashboards({ barbers }: Props) {
  return (
    <>
      <section className="dashboards-container">
        <header>
          <h1>Executive Dashboard</h1>
          <span className="min-tag">The Midnight Atelier • Operational Overview</span>
        </header>

        <article className="main-overview">
          <ul>
            <li>
              <div className="icon"><HiOutlineCurrencyDollar /></div>
              <span>total revenue</span>
              <h1>12</h1>
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
                <th>time</th>
                <th>status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="apptm-card">
                <td>Julian Dereck</td>
                <td>The Full Atelier</td>
                <td>Elias Vance</td>
                <td>14:00h</td>
                <td className="card-status">complete</td>
              </tr>
            </tbody>
          </table>
        </article>

          {/* renderização condicional */}
        <article className="top-perf">
          <h2>Top Performance</h2>

          <ul>
            {
              barbers.length > 0
                ? barbers.map(barber => (
                  <li key={barber.id}>
                    <div className="image-container">
                      {
                        <Image alt="Barber" src={barber.image} />
                      }
                    </div>

                    <h3>{barber.name}</h3>
                  </li>
                )) : null
            }
          </ul>

          {/* <ul>
            <li>
              <div className="image-container">img</div>
              <h3>Julian Thorne</h3>
              <span>5.0 (0 reviews)</span>
            </li>

            <li>
             <div className="image-container">img</div>
              <h3>Elias Vance</h3>
              <span>4.9 (0 reviews)</span>
            </li>
          </ul> */}
        </article>
      </section>
    </>
  )
};
