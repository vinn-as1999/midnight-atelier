import { getBarbers } from "@/lib/barbers";
import AdminClient from "./AdminClient";


export default async function AdminPage() {
  const barbers = await getBarbers();

  return <AdminClient barbers={barbers} />
};
