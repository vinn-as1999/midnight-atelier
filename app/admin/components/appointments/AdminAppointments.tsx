import { Appointment } from "@/types/client-types";
import './admin-appointments.scss';
import AdminHeader from "../header/AdminHeader";
import { Dispatch, SetStateAction } from "react";
import SearchListInput from "../search-list/SearchListInput";


type Props = {
  appointments: Appointment[];
  formatDate: (date: string) => string;
  searchList: Appointment[];
  setSearchList: Dispatch<SetStateAction<Appointment[]>>;
}

export default function AdminAppointments({appointments, formatDate, searchList, setSearchList}: Props) {

  return (
    <>
      <section className="adm-apptm-container">
        <AdminHeader title="Registered Appointments" />

        <SearchListInput appointments={appointments} setSearchList={setSearchList} />

        <article className="apptm-tab-container">
          <table>
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
                searchList?.length > 0 
                  ? searchList.map(apptm => (
                    <tr key={apptm.id}>
                      <td className="name">{apptm.client.name}</td>
                      <td>{apptm.service.name}</td>
                      <td className="name">{apptm.barber.name}</td>
                      <td>{formatDate(apptm.date)}</td>
                      <td>{String(apptm.hour).slice(0, 5)}</td>
                      <td>Complete</td>
                    </tr>
                  ))
                  : null
              }
            </tbody>
          </table>
        </article>

        <article className="apptm-info">

        </article>
      </section>
    </>
  )
};
