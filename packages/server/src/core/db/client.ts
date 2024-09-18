import { createClient } from "@supabase/supabase-js";
import { Database } from "common/types";

const { SUPABASE_PROJECT_URL, SUPABASE_PROJECT_ANON_KEY } = process.env;

export default createClient<Database>(SUPABASE_PROJECT_URL as string, SUPABASE_PROJECT_ANON_KEY as string)
