// app/appointment/page.tsx — busca UMA vez aqui
import AppointmentFlow from '@/components/appointment-flow/AppointmentFlow';
import { getBarbers } from '@/lib/barbers';
import { Barber } from '@/types/client-types';
import './appointment.scss';
import { getSession } from '@/lib/auth';


export default async function AppointmentPage() {
  const [barbers, session] = await Promise.all([
    getBarbers(),
    getSession()
  ])  
  
  return <AppointmentFlow barbers={barbers} session={session} />;
}
