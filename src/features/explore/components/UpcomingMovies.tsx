import { useEffect, useState } from "react";
import { ActivityIndicator, Card } from "react-native-paper";
import { fetchUpcomingMovies } from "../data/fetchUpcomingMovies";
import { Movie } from "../types/Movies.types";
import { FlatList, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";
import { theme } from "../../../utils/theme";

type Props = { onPress: (movieId: number) => void };

export default function UpcomingMovies({ onPress }: Props) {
  const [loading, setLoading] = useState(false);
  const [upcoming, setUpcomingMovies] = useState<Movie[]>([]);

  async function loadUpcomingMovies() {
    setLoading(true);

    const upcoming = await fetchUpcomingMovies();
    setUpcomingMovies(upcoming);

    setLoading(false);
  }

  useEffect(() => {
    loadUpcomingMovies();
  }, []);

  return (
    <Card>
      <Card.Title
        title="Filmes"
        subtitle="Em breve"
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
      />

      <Card.Content>
        {loading ? (
          <ActivityIndicator size="large" animating={loading} />
        ) : (
          <FlatList
            data={upcoming}
            renderItem={({ item }) => (
              <MovieCard movie={item} onPress={onPress} />
            )}
            horizontal
          />
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: theme.fontSizes.caption,
    fontWeight: "regular",
    textTransform: "uppercase",
  },
  cardSubtitle: {
    fontSize: theme.fontSizes.title,
    fontWeight: "bold",
  },
});
