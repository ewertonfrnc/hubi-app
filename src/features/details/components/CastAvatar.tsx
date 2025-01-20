import React, { FC } from "react";
import { Text } from "react-native-paper";
import { ImageBackground, StyleSheet, View } from "react-native";

import { BASE_IMAGE_URL } from "../../../utils/tmdb";
import { theme } from "../../../utils/theme";

import { CastMember } from "../../explore/types/Movies.types";

type CastAvatarProps = { castMember: CastMember };
const CastAvatar: FC<CastAvatarProps> = ({ castMember }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        imageStyle={styles.image}
        source={{ uri: `${BASE_IMAGE_URL}${castMember.profilePath}` }}
      />
      <View style={styles.personalName}>
        <Text variant="labelMedium">{castMember.name}</Text>
        {/*<Text variant="labelSmall" style={styles.characterText}>*/}
        {/*  {castMember.character}*/}
        {/*</Text>*/}
      </View>
    </View>
  );
};

export default CastAvatar;

const styles = StyleSheet.create({
  container: {
    marginRight: theme.spaces.sm,
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: theme.sizes.lg,
  },
  personalName: {
    padding: theme.spaces.sm,
    alignItems: "center",
  },
  characterText: {
    color: theme.COLORS.text.secondary,
    fontSize: theme.fontSizes.caption,
  },
});
