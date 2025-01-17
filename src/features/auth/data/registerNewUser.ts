import AuthService from "../services/auth.service";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { User, UserPayload } from "../types/user.types";

export async function registerUser(userPayload: UserPayload) {
  const supabaseUser = await AuthService.registerNewUser(userPayload);

  const userToRegisterOnDatabase = formatSupabaseUser(supabaseUser);
  return await AuthService.registerNewUserToDB(userToRegisterOnDatabase);
}

function formatSupabaseUser(user: SupabaseUser): User {
  return {
    id: user.id,
    createdAt: user.created_at,
    name: user.user_metadata?.name,
    email: user.user_metadata?.email,
    username: user.user_metadata?.username,
  };
}
