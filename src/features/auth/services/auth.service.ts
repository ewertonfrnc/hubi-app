import type { User as SupabaseUser } from "@supabase/auth-js";
import { LoginPayload, User, UserPayload } from "../types/user.types";
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

  async logInWithEmailPassword(
    loginPayload: LoginPayload,
  ): Promise<SupabaseUser> {
    const { data, error } =
      await supabase.auth.signInWithPassword(loginPayload);

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  }

  async getUserFromDB(userEmail: string): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", userEmail);

    if (error) throw new Error(error.message);

    return data[0];
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  }
}

export default new AuthService();
