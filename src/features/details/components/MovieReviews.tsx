import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Divider,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { theme } from "../../../utils/theme";
import { useContext, useEffect, useState } from "react";
import {
  Movie,
  MovieReview,
  MovieReviewPayload,
} from "../../explore/types/Movies.types";
import { fetchMovieReviews } from "../data/fetchMovieReviews";
import Review from "./Review";
import { registerNewReview } from "../data/registerNewReview";
import { AuthContext } from "../../auth/contexts/auth.context";
import supabase from "../../../utils/config/supabase.config";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { fetchUserById } from "../data/fetchUserById";

type Props = {
  movie: Movie;
  showModal: boolean;
  handleModal: () => void;
};
export default function MovieReviews({ movie, showModal, handleModal }: Props) {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [comment, setComment] = useState("");

  function handleSnackbar() {
    setShowSnackbar((prev) => !prev);
  }

  async function handlePostEvent(
    payload: RealtimePostgresChangesPayload<MovieReview>
  ) {
    if (payload.eventType === "INSERT" && payload?.new?.id) {
      const newReview = { ...payload.new };
      const reviewAuthor = await fetchUserById(newReview.userId);

      newReview.users = reviewAuthor;
      setReviews((prevReviews) => [newReview, ...prevReviews]);
    }

    if (payload.eventType === "DELETE") {
      const updatedReviews = reviews.filter(
        (review) => review.id !== payload.old.id
      );

      setReviews(updatedReviews);
    }
  }

  async function loadReviews() {
    setLoading(true);

    try {
      const movieReviews = await fetchMovieReviews(movie.id);
      setReviews(movieReviews);
    } catch (error) {}

    setLoading(false);
  }

  async function saveMovieReview() {
    if (!currentUser || !movie) return;

    const payload: MovieReviewPayload = {
      userId: currentUser.id,
      movieId: movie.id,
      content: comment,
    };

    try {
      await registerNewReview(payload);

      handleSnackbar();
      handleModal();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const postChannel = supabase
      .channel("reviews")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "movie_reviews" },
        handlePostEvent
      )
      .subscribe();

    loadReviews();

    return () => {
      postChannel.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium">Comentários</Text>
        <Text style={styles.link}>Ver mais</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        reviews
          .filter((_, idx) => idx < 3)
          .map((review) => <Review key={review.id} review={review} />)
      )}

      <Snackbar visible={showSnackbar} onDismiss={handleSnackbar}>
        Comentário criado com sucesso!
      </Snackbar>

      <Portal>
        <Modal
          visible={showModal}
          onDismiss={handleModal}
          contentContainerStyle={styles.modal}
        >
          <View style={styles.modalHeading}>
            <Text variant="titleMedium" style={styles.modalTitle}>
              💬 Novo comentário
            </Text>
          </View>

          <Divider />

          <TextInput
            multiline
            mode="outlined"
            value={comment}
            numberOfLines={4}
            style={{ height: 140 }}
            onChangeText={(text) => setComment(text)}
          />

          <Button
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={saveMovieReview}
          >
            Comentar
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spaces.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    color: theme.COLORS.text.secondary,
  },
  modal: {
    backgroundColor: theme.COLORS.ui.dark,
    borderRadius: theme.sizes.xsm,
    padding: theme.spaces.md,
    margin: theme.spaces.lg,
    gap: theme.spaces.md,
  },
  modalHeading: {},
  modalTitle: {
    fontWeight: "bold",
  },
  loginBtns: {
    flexDirection: "row",
    gap: theme.spaces.md,
  },
});