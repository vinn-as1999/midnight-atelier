export enum AppointmentStatus {
  Barber = "barber",
  Service = "service",
  Date = "date",
  Finish = "finish"
}

export interface Barber {
  id: string;
  name: string;
  description: string;
  image: string;
  tag: string;
  phrase: string;
  avg_rating: number | null;
}

export interface BarberInsert extends Omit<Barber, 'id' | 'avg_rating'> {}

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  special: boolean;
}

export interface CreateAppointmentDTO {
  barber_id: string;
  service_id: string;
  client_id: string;
  date: string;
  hour: string;
  total: number;
  status: string;
}

export type AppointmentDTOStatus = 
  "pending" | 
  "approved" | 
  "finished" | 
  "canceled";

export interface Appointment extends CreateAppointmentDTO {
  id: string;
  client_id: string;
  barber: { id: string; name: string };
  service: { id: string; name: string };
  client: { id: string; name: string };
}

export type StoredAppointment = {
  date: string;
  hour: string;
  service: string;
}

export type Client = {
  id: string;
  name: string;
  email: string;
  gender: boolean;
}

export type ServerResponse<T = null> = {
  message: string;
  success: boolean;
  data?: T;
  path?: string;
}

export type RegisterPayload = {
  name: string;
  email: string;
  gender: boolean;
}

export type Active = 
  "dashboards" |
  "appointments" |
  "barbers" |
  "services";
