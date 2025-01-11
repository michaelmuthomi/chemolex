import { supabase } from "@/backend/client";
export async function fetchRepairs() {
  const { data, error } = await supabase.from("repairs").select("*");
  if (error) {
    throw error;
  }
  console.log(`Repairs data: ${data}`);
  return data;
}
