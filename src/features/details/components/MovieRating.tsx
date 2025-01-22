import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, MD3DarkTheme } from "react-native-paper";

const RATING_MAX_VALUE = 5;

type Props = { onFinishRating: (rating: number) => void };
export default function MovieRating({ onFinishRating }: Props) {
  const [rating, setRating] = useState(3);

  const handlePress = (index: number) => {
    const currentRating = rating;
    const starValue = index + 1;

    if (currentRating === starValue) {
      return setRating(currentRating - 0.5);
    }

    if (currentRating === starValue - 0.5) {
      return setRating(currentRating - 0.5);
    }

    setRating(starValue);
  };

  useEffect(() => {
    onFinishRating(rating);
  }, [rating]);

  return (
    <View style={styles.container}>
      {Array.from({ length: RATING_MAX_VALUE }, (_, index) => {
        const starValue = index + 1;
        let icon = "star-outline";

        if (rating >= starValue) {
          icon = "star";
        } else if (rating >= starValue - 0.5) {
          icon = "star-half-full";
        }

        return (
          <IconButton
            key={index}
            icon={icon}
            iconColor={MD3DarkTheme.colors.primary}
            size={40}
            onPress={() => handlePress(index)}
            style={{ padding: 0 }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
