import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Divider } from "react-native-paper";

import { theme } from "../../../utils/theme";

import TrendingMovies from "../components/Trending.component";
import UpcomingMovies from "../components/UpcomingMovies";
import type { RootStackParamList } from "../../../navigation/types/RootStack.types";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function ExploreScreen({ navigation }: Props) {
  function handleNavigateTo(movieId: number): void {
    if (!movieId) return;
    navigation.navigate("Details", { movieId });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categories}>
        <Button mode="elevated" onPress={() => {}}>
          Filmes
        </Button>
        <Button mode="outlined" onPress={() => {}}>
          Séries
        </Button>
      </View>
      <Divider style={styles.divider} />
      <TrendingMovies onPress={handleNavigateTo} />
      <Divider style={styles.divider} />
      <UpcomingMovies onPress={handleNavigateTo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spaces.md,
    paddingTop: theme.spaces.md,
  },
  categories: {
    flexDirection: "row",
    gap: theme.spaces.md,
  },
  divider: {
    marginVertical: theme.spaces.md,
  },
});
