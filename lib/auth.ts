import { Client, RegisterPayload, ServerResponse } from "@/types/client-types";
import supabase from "./db";

const CLIENT_STORAGE_KEY = "midnight-atelier-client";

export function saveClient(payload: RegisterPayload): ServerResponse<Client> {
  if (typeof window === "undefined") {
    return { message: "Client storage is unavailable.", success: false };
  }

  const currentClient = getStoredClient();

  const client: Client = {
    id: currentClient?.id ?? crypto.randomUUID(),
    name: payload.name,
    email: payload.email,
    gender: payload.gender,
  };

  window.localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(client));

  return {
    message: "Client registered successfully.",
    success: true,
    data: client,
  };
}

export function getStoredClient(): Client | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedClient = window.localStorage.getItem(CLIENT_STORAGE_KEY);

  if (!storedClient) {
    return null;
  }

  try {
    return JSON.parse(storedClient) as Client;
  } catch {
    window.localStorage.removeItem(CLIENT_STORAGE_KEY);
    return null;
  }
}

export async function ensureClientExists(client: Client): Promise<ServerResponse<Client>> {
  const { error } = await supabase
    .from("clients")
    .upsert(
      {
        id: client.id,
        name: client.name,
        email: client.email,
        gender: client.gender,
      },
      {
        onConflict: "id",
      }
    );

  if (error) {
    console.log("error syncing client", error);
    return { message: "Error registering client.", success: false };
  }

  return {
    message: "Client synchronized successfully.",
    success: true,
    data: client,
  };
}
