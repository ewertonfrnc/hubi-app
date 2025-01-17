import AuthService from "../services/auth.service";
import { User } from "../types/user.types";

export async function fetchCurrentUser(userEmail: string): Promise<User> {
  const currentUser = await AuthService.getUserFromDB(userEmail);
  console.log({ currentUser });

  return currentUser;
}
