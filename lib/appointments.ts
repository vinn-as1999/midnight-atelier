'use server';

import { Appointment, CreateAppointmentDTO, ServerResponse } from "@/types/client-types";
import supabase from "./db";


export async function createAppointment(payload: CreateAppointmentDTO): Promise<ServerResponse> {
  const { error } = await supabase
    .from("appointments")
    .insert(payload);
  
  if (error) return { message: "Error creating appointment", success: false }

  return { message: "Appointment successfully registered!", success: true }
};


export async function getAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select(`
      *,
      barber:barber_id ( id, name ),
      service:service_id ( id, name ),
      client:client_id ( id, name )
    `);

  if (error) throw error;
  return (data as Appointment[]) ?? [];
};