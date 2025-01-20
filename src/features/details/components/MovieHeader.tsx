import { View, ImageBackground, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Movie } from "../../explore/types/Movies.types";

import { BASE_IMAGE_URL, generateGenreLabel } from "../../../utils/tmdb";
import { theme } from "../../../utils/theme";
import { getFullYear } from "../../../utils/formatters";

type Props = { movie: Movie };

export default function MovieHeader({ movie }: Props) {
  return (
    <>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={{ uri: `${BASE_IMAGE_URL}${movie?.backdropPath}` }}
      />

      <View style={styles.overview}>
        <Image
          style={styles.posterImage}
          source={{
            uri: `${BASE_IMAGE_URL}${movie?.posterPath}`,
          }}
        />

        <View style={styles.titleSection}>
          <View>
            <Text variant="headlineSmall" style={styles.movieTitle}>
              {movie?.title}
            </Text>

            <Text style={styles.movieSubTitle}>
              {`${getFullYear(movie.releaseDate)} • ${generateGenreLabel(movie.genreIds)}`}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 250,
    opacity: 0.75,
  },
  overview: {
    paddingHorizontal: theme.spaces.md,

    position: "absolute",
    top: 220,

    flexDirection: "row",
    alignItems: "flex-end",
    gap: theme.spaces.md,
  },
  posterImage: {
    width: 75,
    height: 100,
    borderRadius: 4,
  },
  titleSection: {
    flex: 1,
    flexDirection: "row",
    gap: theme.spaces.sm,
  },
  movieTitle: {
    fontWeight: "bold",
  },
  movieSubTitle: {
    opacity: 0.75,
  },
});
