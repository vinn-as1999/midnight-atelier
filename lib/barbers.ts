import { Barber, BarberInsert, ServerResponse } from '@/types/client-types';
import supabase from './db';
import { uploadImg } from './uploads';


export async function getBarbers(): Promise<Barber[]> {
  const { data, error } = await supabase.rpc('get_barbers_with_avg');
  
  if (error) throw error;

  return data;
};


export async function insertBarbers(barberData: Omit<BarberInsert, 'image'>, file: File): Promise<ServerResponse<Barber>> {
  const uploadResponse = await uploadImg(file);

  if (!uploadResponse.success) {
    return {
      message: uploadResponse.message,
      success: false
    }
  }

  const { data, error } = await supabase
    .from('barbers')
    .insert({ ...barberData, image: uploadResponse.data! })
    .select('*')
    .single();

  if (error) {
    await supabase.storage
      .from('images')
      .remove(([uploadResponse.path!]))

    return {
      message: error.message,
      success: false
    }
  }

  return {
    message: 'Barber successfully registered!',
    success: true,
    data
  }
}
