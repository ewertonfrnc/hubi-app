import supabaseUtilsService from "../../../shared/services/supabase/supabase-utils.service";

export async function fetchUserById(userId: string) {
  return await supabaseUtilsService.getUserDataById(userId);
}
