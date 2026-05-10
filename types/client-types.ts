export enum AppointmentStatus {
  Barber = "barber",
  Service = "service",
  Date = "date",
  Finish = "finish"
}

export type Barber = {
  id: string;
  name: string;
  description: string;
  image: string;
  tag: string;
  phrase: string;
  avg_rating: number | null;
}

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
}

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
