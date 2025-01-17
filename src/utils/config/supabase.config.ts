import { AppState } from "react-native";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_CONFIG = {
  projectUrl: process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL,
  apiKey: process.env.EXPO_PUBLIC_SUPABASE_API_KEY,
};

const supabase = createClient(
  SUPABASE_CONFIG.projectUrl,
  SUPABASE_CONFIG.apiKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated.
AppState.addEventListener("change", (state) => {
  if (state === "active") supabase.auth.startAutoRefresh();
  else supabase.auth.stopAutoRefresh();
});

export default supabase;
