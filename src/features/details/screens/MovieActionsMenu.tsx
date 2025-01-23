import { useContext, useEffect, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Button, Divider, Snackbar, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types/RootStack.types";

import { fetchMovieDetails } from "../data/fetchMovieDetails";

import { DateTime } from "luxon";
import { theme } from "../../../utils/theme";
import { BASE_IMAGE_URL } from "../../../utils/tmdb";

import { Movie, MovieReviewPayload } from "../../explore/types/Movies.types";
import { AuthContext } from "../../auth/contexts/auth.context";
import { registerNewReview } from "../data/registerNewReview";
import MovieRating from "../components/MovieRating";

type Props = NativeStackScreenProps<RootStackParamList, "MovieActions">;
export default function MovieActionsMenu({ route, navigation }: Props) {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [movie, setMovieDetails] = useState<Movie>();
  const [rating, setRating] = useState(3);
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

  function handleRating(rating: number) {
    setRating(rating);
  }

  function handleSubmit() {
    saveMovieReview();
    handleMovieRating();

    navigation.goBack();
  }

  async function handleMovieRating() {
    if (!rating) {
      console.log({ rating });
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
      handleSnackbar();
    } catch (error) {
      console.log(error);
    }
  }

  function handleDiscardButton() {
    navigation.goBack();
  }

  useEffect(() => {
    loadMovieDetails();
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
          <MovieRating onFinishRating={handleRating} />
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

          <Button mode="elevated" onPress={handleSubmit}>
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
