import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

import { theme } from "../../../utils/theme";
import { CastMember } from "../../explore/types/Movies.types";

import CastAvatar from "./CastAvatar";

type Props = { movieCast: CastMember[] };
export default function MovieCast({ movieCast }: Props) {
  const filteredMovieCast = movieCast.filter((_, idx) => idx < 10);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium">Elenco</Text>
        <Text style={styles.link}>Ver mais</Text>
      </View>

      <FlatList
        data={filteredMovieCast}
        renderItem={({ item }) => <CastAvatar castMember={item} />}
        horizontal
      />
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
});
