import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../utils/theme";
import { Movie } from "../../explore/types/Movies.types";

type Props = { movie: Movie };
export default function MovieOverview({ movie }: Props) {
  return (
    <View style={styles.overview}>
      {movie.tagline && (
        <Text style={styles.tagLine} variant="labelLarge">
          {movie.tagline}
        </Text>
      )}
      <Text>{movie.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overview: {
    gap: theme.spaces.md,
    padding: theme.spaces.sm,
  },
  tagLine: {
    color: theme.COLORS.text.secondary,
  },
});
