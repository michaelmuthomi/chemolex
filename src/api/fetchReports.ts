import { supabase } from "@/backend/client";
export async function fetchReports() {
  const { data, error } = await supabase.from("reports").select("*");
  if (error) {
    throw error;
  }
  return data;
}
