import { StoredAppointment } from "@/types/client-types";

const APPOINTMENT_STORAGE_KEY = "midnight-atelier-appointment";

export function saveStoredAppointment(payload: StoredAppointment): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(APPOINTMENT_STORAGE_KEY, JSON.stringify(payload));
}

export function getStoredAppointment(): StoredAppointment | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedAppointment = window.localStorage.getItem(APPOINTMENT_STORAGE_KEY);

  if (!storedAppointment) {
    return null;
  }

  try {
    return JSON.parse(storedAppointment) as StoredAppointment;
  } catch {
    window.localStorage.removeItem(APPOINTMENT_STORAGE_KEY);
    return null;
  }
}
