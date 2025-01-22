import { useContext, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Button, Divider, Snackbar, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types/RootStack.types";

import { fetchMovieDetails } from "../data/fetchMovieDetails";
import { fetchUserById } from "../data/fetchUserById";

import { DateTime } from "luxon";
import { theme } from "../../../utils/theme";
import { BASE_IMAGE_URL } from "../../../utils/tmdb";

import supabase from "../../../utils/config/supabase.config";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

import {
  Movie,
  MovieReview,
  MovieReviewPayload,
} from "../../explore/types/Movies.types";
import { ReviewsContext } from "../contexts/reviews.context";
import { AuthContext } from "../../auth/contexts/auth.context";
import { registerNewReview } from "../data/registerNewReview";

type Props = NativeStackScreenProps<RootStackParamList, "MovieActions">;
export default function MovieActionsMenu({ route, navigation }: Props) {
  const { currentUser } = useContext(AuthContext);
  const { reviews, setReviews } = useContext(ReviewsContext);

  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [movie, setMovieDetails] = useState<Movie>();
  const [reviewContent, setReviewContent] = useState("");

  async function loadMovieDetails() {
    setLoading(true);

    try {
      const movieDetails = await fetchMovieDetails(route.params.movieId);
      setMovieDetails(movieDetails);
    } catch (error) {}

    setLoading(false);
  }

  function handleSnackbar() {
    setShowSnackbar((prev) => !prev);
  }

  async function handlePostEvent(
    payload: RealtimePostgresChangesPayload<MovieReview>,
  ) {
    if (payload.eventType === "INSERT" && payload?.new?.id) {
      const newReview = { ...payload.new };
      newReview.users = await fetchUserById(newReview.userId);
      setReviews((prevReviews) => [newReview, ...prevReviews]);
    }

    if (payload.eventType === "DELETE") {
      const updatedReviews = reviews.filter(
        (review) => review.id !== payload.old.id,
      );
      setReviews(updatedReviews);
    }
  }

  async function saveMovieReview() {
    if (!currentUser || !movie) return;

    const payload: MovieReviewPayload = {
      userId: currentUser.id,
      movieId: movie.id,
      content: reviewContent,
    };

    try {
      await registerNewReview(payload);
      navigation.goBack();
      handleSnackbar();
    } catch (error) {
      console.log(error);
    }
  }

  function handleDiscardButton() {
    navigation.goBack();
  }

  useEffect(() => {
    const postChannel = supabase
      .channel("reviews")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "movie_reviews" },
        handlePostEvent,
      )
      .subscribe();

    loadMovieDetails();

    return () => {
      postChannel.unsubscribe();
    };
  }, []);

  const formattedDate = DateTime.fromJSDate(DateTime.now().toJSDate()).toFormat(
    "DDDD",
  );

  return (
    movie && (
      <SafeAreaView style={styles.container}>
        <View style={styles.section}>
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            Avaliar e Comentar
          </Text>

          <View style={styles.header}>
            <ImageBackground
              style={styles.posterImage}
              imageStyle={{ opacity: 0.5 }}
              source={{ uri: `${BASE_IMAGE_URL}${movie?.backdropPath}` }}
            >
              <Text variant="titleMedium" style={styles.headerTitle}>
                {movie.title}
              </Text>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.title}>
            Sua avaliação
          </Text>
          <Text>⭐⭐⭐⭐⭐</Text>
        </View>

        <Divider />

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.title}>
            Escreva seu comentário
          </Text>

          <TextInput
            multiline
            mode="outlined"
            value={reviewContent}
            placeholder="Insira seu comentário..."
            style={{ height: 300, backgroundColor: "transparent" }}
            outlineStyle={{ borderColor: theme.COLORS.ui.lightDark }}
            onChangeText={(text) => setReviewContent(text)}
          />
        </View>

        <Divider />

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.title}>
            Assistido em:
          </Text>
          <Pressable onPress={() => console.log("pressed")}>
            <Text>{formattedDate}</Text>
          </Pressable>
        </View>

        <View style={styles.actions}>
          <Button mode="text" onPress={handleDiscardButton}>
            Descartar
          </Button>

          <Button mode="elevated" onPress={saveMovieReview}>
            Enviar
          </Button>
        </View>

        <Snackbar visible={showSnackbar} onDismiss={handleSnackbar}>
          Comentário criado com sucesso!
        </Snackbar>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spaces.md,
    padding: theme.spaces.md,
  },
  section: {
    gap: theme.spaces.md,
  },
  title: {
    fontWeight: "bold",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  posterImage: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: theme.spaces.md,
  },
  actions: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
