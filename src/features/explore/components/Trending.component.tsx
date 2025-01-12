import { useEffect, useState } from "react";
import { ActivityIndicator, Card } from "react-native-paper";
import { fetchTrending } from "../data/fetchTrending";
import { Movie } from "../types/Movies.types";
import { FlatList, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";
import { theme } from "../../../utils/theme";

type Props = { onPress: (movieId: number) => void };

export default function TrendingMovies({ onPress }: Props) {
  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  async function loadTrendingMovies() {
    setLoading(true);

    const trendingMovies = await fetchTrending();
    setTrendingMovies(trendingMovies);

    setLoading(false);
  }

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <Card>
      <Card.Title
        title="Filmes"
        subtitle="Em alta"
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
      />

      <Card.Content>
        {loading ? (
          <ActivityIndicator size="large" animating={loading} />
        ) : (
          <FlatList
            data={trendingMovies}
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
