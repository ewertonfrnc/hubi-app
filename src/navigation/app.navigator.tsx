import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { reactNavigationTheme } from "../utils/theme";
import { RootStackParamList } from "./types/RootStack.types";

import ExploreNavigator from "./explore.navigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={ExploreNavigator} />
    </Stack.Navigator>
  );
}
