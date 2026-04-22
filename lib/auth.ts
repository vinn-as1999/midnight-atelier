import { RegisterPayload, ServerResponse } from "@/types/client-types";
import supabase from "./db";


export async function getSession() {
  const {data: { session }} = await supabase.auth.getSession();
  return session;
};


export async function createSession(payload: RegisterPayload): Promise<ServerResponse> {
  console.log('aqui', payload)
  const redirectTo =
    typeof window !== "undefined" ? `${window.location.origin}/appointment` : undefined;

  const { error } = await supabase.auth.signInWithOtp({
    email: payload.email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) return { message: "Error sending magic link. Try again.", success: false }

  return { message: "Magic link sent successfully. Check your email to continue.", success: true };
};
