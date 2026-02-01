import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL // import.meta.env.Name is use for importing the SECRETKEYS
const supabaseanonkey=import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl,supabaseanonkey)
