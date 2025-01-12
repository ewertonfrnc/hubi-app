import { View, ImageBackground, Image, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { Movie } from "../../explore/types/Movies.types";

import { BASE_IMAGE_URL } from "../../../utils/tmdb";
import { theme } from "../../../utils/theme";

type Props = { movie: Movie };

export default function DetailsHeader({ movie }: Props) {
  return (
    <View>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={{
          uri: `${BASE_IMAGE_URL}${movie?.backdropPath}`,
        }}
      />

      <View style={styles.overview}>
        <Image
          style={styles.posterImage}
          source={{
            uri: `${BASE_IMAGE_URL}${movie?.posterPath}`,
          }}
        />

        <View style={styles.actions}>
          <Button
            icon="star-plus"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Avaliar
          </Button>

          <Button
            icon="chat-plus"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Comentar
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    height: 250,
    opacity: 0.5,
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
  movieTitle: {
    fontWeight: "bold",
  },
  movieSubTitle: {
    opacity: 0.75,
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    gap: theme.spaces.sm,
  },
});
