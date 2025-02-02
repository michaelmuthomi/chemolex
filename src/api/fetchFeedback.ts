import { supabase } from "@/backend/client";
export async function fetchFeedback() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
  if (error) {
    throw error;
  }
  console.log("Feedback fetched: ", data)
  return data;
}
