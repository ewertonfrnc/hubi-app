import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "../features/auth/contexts/auth.context";
import { reactNavigationTheme } from "../utils/theme";

import AppNavigator from "./app.navigator";
import AccountNavigator from "./account.navigator";

export default function Navigation() {
  const { currentUser } = useContext(AuthContext);

  return (
    <NavigationContainer theme={reactNavigationTheme}>
      {currentUser ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
}
