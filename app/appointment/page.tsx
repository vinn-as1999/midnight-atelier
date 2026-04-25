// app/appointment/page.tsx — busca UMA vez aqui
import AppointmentFlow from '@/components/appointment-flow/AppointmentFlow';
import { getBarbers } from '@/lib/barbers';
import './appointment.scss';
import { getServices } from '@/lib/services';


export default async function AppointmentPage() {
  const [barbers, services] = await Promise.all([
    getBarbers(),
    getServices(),
  ])  

  return <AppointmentFlow barbers={barbers} services={services} />;
}
