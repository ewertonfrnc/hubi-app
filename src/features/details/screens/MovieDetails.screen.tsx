import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  Divider,
  Portal,
  Text,
} from "react-native-paper";

import { fetchMovieDetails } from "../data/fetchMovieDetails";

import { Movie } from "../../explore/types/Movies.types";
import { RootStackParamList } from "../../../navigation/types/RootStack.types";

import { theme } from "../../../utils/theme";
import MovieHeader from "../components/MovieHeader";
import MovieStats from "../components/MovieStats";
import MovieOverview from "../components/MovieOverview";
import DetailsCast from "../components/MovieCast";
import MovieReviews from "../components/MovieReviews";
import { AuthContext } from "../../auth/contexts/auth.context";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;
export default function MovieDetailsScreen({ route }: Props) {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [showAlertNoUser, setShowAlertNoUser] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState<Movie>();

  async function loadMovieDetails() {
    setLoading(true);

    try {
      const movieDetails = await fetchMovieDetails(route.params.movieId);
      setMovieDetails(movieDetails);
    } catch (error) {}

    setLoading(false);
  }

  function handleMovieReviewModal() {
    setShowReviewModal((prevState) => !prevState);
  }

  function handleAlertDialog() {
    setShowAlertNoUser((prevState) => !prevState);
  }

  function authController() {
    if (!currentUser) handleAlertDialog();
    else handleMovieReviewModal();
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
              <MovieReviews
                movie={movieDetails}
                showModal={showReviewModal}
                handleModal={handleMovieReviewModal}
              />
            </View>
          </ScrollView>
        )
      )}

      <Appbar style={styles.bottom}>
        <Appbar.Action icon="star-plus" onPress={authController} />
        <Appbar.Action icon="chat-plus" onPress={authController} />
      </Appbar>

      <Portal>
        <Dialog visible={showAlertNoUser} onDismiss={handleAlertDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Só é possível avaliar, comentar e criar listas depois de entrar na
              sua conta.
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={handleAlertDialog}>Entendi</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
});
