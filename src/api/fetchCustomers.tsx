import { supabase } from "@/backend/client";
export async function fetchCustomers() {
  const { data } = await supabase
    .from("mentees")
    .select("*, guardian:guardian_id(*)");
  console.log("Mentees Data:", data);
  return data;
}

export async function fetchMentees() {
  const { data } = await supabase
    .from("users")
    .select("*");
  console.log("Mentees Data:", data);
  return data;
}