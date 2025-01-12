import type { User as SupabaseUser } from "@supabase/auth-js";
import { User, UserPayload } from "../types/user.types";
import supabase from "../../../utils/config/supabase.config";

class AuthService {
  async registerNewUser(user: UserPayload): Promise<SupabaseUser> {
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          name: user.name,
          email: user.email,
          username: user.username,
        },
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Não foi possível criar o usuário.");

    return data.user;
  }

  async registerNewUserToDB(user: User): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .insert([user])
      .select();

    if (error) throw new Error(error.message);

    return data[0];
  }
}

export default new AuthService();
