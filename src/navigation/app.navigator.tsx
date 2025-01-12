import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { reactNavigationTheme } from "../utils/theme";
import { RootStackParamList } from "./types/RootStack.types";

import ExploreScreen from "../features/explore/screens/Explore.screen";
import MovieDetailsScreen from "../features/details/screens/MovieDetails.screen";
import AuthScreen from "../features/auth/screens/Auth.screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer theme={reactNavigationTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={ExploreScreen} />
        <Stack.Screen name="Details" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
