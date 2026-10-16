import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

console.log("Supabase URL loaded:", Boolean(supabaseUrl));
console.log(
  "Supabase URL format looks valid:",
  Boolean(
    supabaseUrl?.startsWith("https://") && supabaseUrl.includes(".supabase.co"),
  ),
);
console.log("Supabase key loaded:", Boolean(supabaseKey));

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase settings are missing. Check the .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
