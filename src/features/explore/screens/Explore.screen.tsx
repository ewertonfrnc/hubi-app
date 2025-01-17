import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Divider, IconButton } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";

import { theme } from "../../../utils/theme";
import type { ExploreStackParamList } from "../../../navigation/types/RootStack.types";

import UpcomingMovies from "../components/UpcomingMovies";
import TrendingMovies from "../components/Trending.component";

import AuthService from "../../auth/services/auth.service";
import { AuthContext } from "../../auth/contexts/auth.context";

type Props = StackScreenProps<ExploreStackParamList>;

export default function ExploreScreen({ navigation }: Props) {
  const { setCurrentUser } = useContext(AuthContext);

  function handleNavigateTo(movieId: number): void {
    if (!movieId) return;
    navigation.navigate("Details", { movieId });
  }

  async function logOut() {
    await AuthService.signOut();
    setCurrentUser(null);
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

        <IconButton
          icon="account-cog"
          size={20}
          style={styles.settingsBtn}
          onPress={logOut}
        />
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
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spaces.md,
  },
  settingsBtn: {
    marginLeft: "auto",
  },
  divider: {
    marginVertical: theme.spaces.md,
  },
});
