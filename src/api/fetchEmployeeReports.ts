import { supabase } from "@/backend/client";
export async function fetchEmployeeReports() {
  const { data, error } = await supabase
    .from("reports")
    .select("*, users:generated_by(*)");
  if (error) {
    throw error;
  }
  return data;
}
