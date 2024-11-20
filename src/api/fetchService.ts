import { supabase } from "@/backend/client";
export async function fetchServices() {
  const { data, error } = await supabase.from("services").select("*");
  if (error) {
    throw error;
  }
  return data;
}
