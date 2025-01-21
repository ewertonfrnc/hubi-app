import supabase from "../../../utils/config/supabase.config";

class SupabaseUtilsService {
  async getUserDataById(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw new Error(error.message);

    return data;
  }
}

export default new SupabaseUtilsService();
