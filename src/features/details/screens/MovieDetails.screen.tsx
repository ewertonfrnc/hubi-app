import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchMovieDetails } from "../data/fetchMovieDetails";

import { Movie } from "../../explore/types/Movies.types";
import { RootStackParamList } from "../../../navigation/types/RootStack.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Details from "../components/Details";

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

  function navigateToAuthScreen() {
    navigation.navigate("Auth");
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
          <Details
            movie={movieDetails}
            navigateToAuthScreen={navigateToAuthScreen}
          />
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
