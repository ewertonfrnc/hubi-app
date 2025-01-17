import { LoginPayload } from "../types/user.types";
import AuthService from "../services/auth.service";

export async function loginUser(user: LoginPayload) {
  return await AuthService.logInWithEmailPassword(user);
}
