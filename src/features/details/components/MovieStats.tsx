import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { decimalToPercentage } from "../../../utils/tmdb";
import { minToHours } from "../../../utils/formatters";
import { theme } from "../../../utils/theme";
import { Movie } from "../../explore/types/Movies.types";

type Props = { movie: Movie };
export default function MovieStats({ movie }: Props) {
  const rankStyles =
    movie.voteAverage < 5
      ? "badRank"
      : movie.voteAverage < 7
        ? "goodRank"
        : "awesomeRank";

  return (
    <View style={styles.stats}>
      <Text style={[styles.rank, styles[rankStyles]]}>
        ⭐ {decimalToPercentage(movie.voteAverage)}
      </Text>
      <Text>⌛ {minToHours(movie.runtime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    gap: theme.spaces.md,
  },
  rank: {
    fontWeight: "bold",
  },
  badRank: {
    color: theme.COLORS.ranks.bad,
  },
  goodRank: {
    color: theme.COLORS.ranks.regular,
  },
  awesomeRank: {
    color: theme.COLORS.ranks.good,
  },
});
