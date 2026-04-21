'use server';

import { CreateAppointmentDTO, ServerResponse } from "@/types/client-types";
import supabase from "./db";


export async function createAppointment(payload: CreateAppointmentDTO): Promise<ServerResponse> {
  const { error } = await supabase
    .from("appointments")
    .insert(payload);
  
  if (error) return { message: "Error creating appointment", success: false }

  return { message: "Appointment successfully registered!", success: true }
};