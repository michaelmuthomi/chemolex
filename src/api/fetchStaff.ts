import { supabase } from "@/backend/client";
export async function fetchStaff() {
  const { data } = await supabase
    .from("guardian")
    .select("*")
  return data;
}