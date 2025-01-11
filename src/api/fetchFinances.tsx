import { supabase } from "@/backend/client";
export async function fetchFinances() {
  const { data } = await supabase
    .from("financial_records")
    .select("*")
  return data;
}
