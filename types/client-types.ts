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
  barberId: string;
  serviceId: string;
  date: string;
  hour: string;
  total: number;
}

export interface Appointment extends CreateAppointmentDTO {
  id: string;
  clientId: string;
}

export type ServerResponse = {
  message: string;
  success: boolean;
}
