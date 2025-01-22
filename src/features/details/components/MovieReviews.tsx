import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { Movie } from "../../explore/types/Movies.types";

import { fetchMovieReviews } from "../data/fetchMovieReviews";
import { ReviewsContext } from "../contexts/reviews.context";
import { theme } from "../../../utils/theme";

import Review from "./Review";

type Props = { movie: Movie };
export default function MovieReviews({ movie }: Props) {
  const { reviews, setReviews } = useContext(ReviewsContext);

  const [loading, setLoading] = useState(true);

  async function loadReviews() {
    setLoading(true);

    try {
      const movieReviews = await fetchMovieReviews(movie.id);
      setReviews(movieReviews);
    } catch (error) {}

    setLoading(false);
  }

  useEffect(() => {
    loadReviews();
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
