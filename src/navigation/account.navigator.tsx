import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountNavigatorParamList } from "./types/RootStack.types";
import AuthScreen from "../features/auth/screens/Auth.screen";

const Stack = createStackNavigator<AccountNavigatorParamList>();

export default function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={AuthScreen} />
    </Stack.Navigator>
  );
}
