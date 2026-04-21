import { Barber } from '@/types/client-types';
import supabase from './db';


export async function getBarbers(): Promise<Barber[]> {
  const { data, error } = await supabase.from('barbers').select('*');
  if (error) throw error;
  return data;
}