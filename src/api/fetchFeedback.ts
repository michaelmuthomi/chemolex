import { supabase } from "@/backend/client";
export async function fetchFeedback() {
  const { data, error } = await supabase.from("feedback").select("*");
  if (error) {
    throw error;
  }
  return data;
}
