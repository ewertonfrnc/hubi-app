import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import { Chip, Text } from "react-native-paper";
import { theme } from "../../../utils/theme";
import { BASE_IMAGE_URL } from "../../../utils/tmdb";
import { Movie } from "../types/Movies.types";
import { countReleaseDays } from "../../../utils/formatters/time.formatters";

type Props = {
  movie: Movie;
  onPress: (movieId: number) => void;
};

export default function MovieCard({ movie, onPress }: Props) {
  const remainingDays = countReleaseDays(movie.releaseDate);

  function handlePressNavigation() {
    onPress(movie.id);
  }

  return (
    <Pressable
      onPress={handlePressNavigation}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <ImageBackground
        source={{ uri: `${BASE_IMAGE_URL}/${movie?.backdropPath}` }}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.showContent}>
          <Image
            source={{ uri: `${BASE_IMAGE_URL}/${movie?.posterPath}` }}
            style={styles.poster}
          />

          <View>
            {remainingDays > 0 && (
              <Chip
                mode="flat"
                compact
                textStyle={styles.chip}
                style={{ width: 75 }}
              >
                {remainingDays === 1 ? "Amanhã" : `${remainingDays} dias`}
              </Chip>
            )}

            <Text>{movie.title}</Text>
            <Text>{movie.releaseDate}</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 200,
    marginRight: theme.spaces.md,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: theme.spaces.md,
  },
  image: {
    borderRadius: theme.sizes.xsm,
    opacity: 0.5,
  },
  poster: {
    width: 75,
    height: 100,
    borderWidth: 2,
    borderRadius: theme.sizes.xsm,
    borderColor: theme.COLORS.ui.tertiary,
  },
  showContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: theme.spaces.sm,
  },
  stats: {
    flexDirection: "row",
  },
  chip: {
    fontSize: 12,
  },
  pressed: { opacity: 0.5 },
});
