import { Barber } from '@/types/client-types';
import supabase from './db';


export async function getBarbers(): Promise<Barber[]> {
  const { data, error } = await supabase.rpc('get_barbers_with_avg');
  
  if (error) throw error;

  return data;
};
