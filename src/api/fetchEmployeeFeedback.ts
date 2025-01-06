import { supabase } from "@/backend/client";
export async function fetchEmployeeFeedback() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*, users:user_id(role)")
    .neq("users.role", "Customer");
  if (error) {
    throw error;
    }
    console.log("Employee's role: ", data)
  return data;
}
