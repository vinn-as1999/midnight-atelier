import { getBarbers } from "@/lib/barbers";
import AdminClient from "./AdminClient";
import { getAppointments } from "@/lib/appointments";
import { getServices } from "@/lib/services";


export default async function AdminPage() {
  const appointments = await getAppointments();
  const barbers = await getBarbers();
  const services = await getServices();

  return <AdminClient appointments={appointments} barbers={barbers} services={services} />
};
