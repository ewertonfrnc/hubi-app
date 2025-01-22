import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Divider, FAB } from "react-native-paper";

import { fetchMovieDetails } from "../data/fetchMovieDetails";

import { Movie } from "../../explore/types/Movies.types";
import { RootStackParamList } from "../../../navigation/types/RootStack.types";

import { theme } from "../../../utils/theme";
import MovieHeader from "../components/MovieHeader";
import MovieStats from "../components/MovieStats";
import MovieOverview from "../components/MovieOverview";
import DetailsCast from "../components/MovieCast";
import MovieReviews from "../components/MovieReviews";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;
export default function MovieDetailsScreen({ route, navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<Movie>();

  async function loadMovieDetails() {
    setLoading(true);

    try {
      const movieDetails = await fetchMovieDetails(route.params.movieId);
      setMovieDetails(movieDetails);
    } catch (error) {}

    setLoading(false);
  }

  useEffect(() => {
    loadMovieDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" animating={loading} />
      ) : (
        movieDetails && (
          <ScrollView>
            <MovieHeader movie={movieDetails} />

            <View style={styles.detailsContainer}>
              <MovieStats movie={movieDetails} />
              <MovieOverview movie={movieDetails} />
              <Divider />
              <DetailsCast movieCast={movieDetails.cast} />
              <Divider />
              <MovieReviews movie={movieDetails} />
            </View>
          </ScrollView>
        )
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate("MovieActions", { movieId: route.params.movieId })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    gap: theme.spaces.md,
    paddingHorizontal: theme.spaces.md,
    marginVertical: 90,
  },
  bottom: {
    height: theme.sizes.lg,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: "absolute",
    bottom: theme.spaces.lg,
    right: theme.spaces.lg,
  },
});
