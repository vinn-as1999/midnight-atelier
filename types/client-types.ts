import { Session } from "@supabase/supabase-js";

export enum AppointmentStatus {
  Barber = "barber",
  Service = "service",
  Date = "date"
}

export type Barber = {
  id: string;
  name: string;
  description: string;
  image: string;
  tag: string;
  phrase: string;
}

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

export interface CreateAppointmentDTO {
  barber_id: string;
  service_id: string;
  date: string;
  hour: string;
  total: number;
}

export interface Appointment extends CreateAppointmentDTO {
  id: string;
  client_id: string;
}

export type ServerResponse<T = Session | null> = {
  message: string;
  success: boolean;
  data?: T;
}

export type RegisterPayload = {
  name: string;
  email: string;
}
