import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { ExploreStackParamList } from "./types/RootStack.types";

import ExploreScreen from "../features/explore/screens/Explore.screen";
import MovieDetailsScreen from "../features/details/screens/MovieDetails.screen";

const ExploreStack = createStackNavigator<ExploreStackParamList>();

export default function ExploreNavigator() {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
      <ExploreStack.Screen name="Details" component={MovieDetailsScreen} />
    </ExploreStack.Navigator>
  );
}
