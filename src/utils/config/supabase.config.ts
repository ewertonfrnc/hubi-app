import { createClient } from "@supabase/supabase-js";

const SUPABASE_CONFIG = {
  projectUrl: process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL,
  apiKey: process.env.EXPO_PUBLIC_SUPABASE_API_KEY,
};

const supabase = createClient(
  SUPABASE_CONFIG.projectUrl,
  SUPABASE_CONFIG.apiKey,
);

export default supabase;
