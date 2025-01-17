import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { AccountNavigatorParamList } from "./types/RootStack.types";

import RegisterScreen from "../features/auth/screens/Register.screen";
import LoginScreen from "../features/auth/screens/Login.screen";

const Stack = createStackNavigator<AccountNavigatorParamList>();

export default function AccountNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
