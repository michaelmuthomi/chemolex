import { supabase } from "@/backend/client";
export async function fetchCustomers() {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("role", "customer");
  return data;
}
