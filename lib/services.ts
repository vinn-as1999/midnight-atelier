import { ServerResponse, Service } from "@/types/client-types";
import supabase from "./db";


export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase.from('services').select('*');

  if (error) throw Error(error.message);

  return data;
};
