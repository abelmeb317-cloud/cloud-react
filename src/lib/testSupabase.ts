import { supabase } from "./supabase";

export async function testSupabaseConnection() {
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("Supabase connection test failed:", error.message);
    return;
  }

  console.log("Supabase connection successful!");
  console.log(
    "Available buckets:",
    data.map((bucket) => bucket.name),
  );
}
