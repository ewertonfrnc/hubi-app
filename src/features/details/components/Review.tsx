import { StyleSheet, View } from "react-native";
import { Avatar, Card, Divider, IconButton, Text } from "react-native-paper";
import { MovieReview } from "../../explore/types/Movies.types";
import { theme } from "../../../utils/theme";
import { BASE_IMAGE_URL } from "../../../utils/tmdb";
import { useEffect, useState } from "react";
import { fetchReviewLikeOnReview } from "../data/fetchReviewLikeOnReview";
import { registerReviewLike } from "../data/registerReviewLike";
import { deleteReviewLike } from "../data/deleteReviewLike";

type Props = { review: MovieReview };
export default function Review({ review }: Props) {
  const [hasLikedReview, setHasLikedReview] = useState(false);

  function handleAvatarText() {
    return String(review.users.name.at(0));
  }

  async function hasLiked() {
    const response = await fetchReviewLikeOnReview(review.users.id, review.id);
    setHasLikedReview(response);
  }

  function handleLike() {
    if (hasLikedReview) removeMovieReviewLike();
    else addMovieReviewLike();
  }

  async function addMovieReviewLike() {
    try {
      await registerReviewLike(review.users.id, review.id);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeMovieReviewLike() {
    try {
      await deleteReviewLike(review.users.id, review.id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    hasLiked();
  }, []);

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.userInfo}>
            {review.users.avatarPath ? (
              <Avatar.Image
                size={45}
                source={{ uri: `${BASE_IMAGE_URL}${review.users.avatarPath}` }}
              />
            ) : (
              <Avatar.Text size={45} label={handleAvatarText()} />
            )}

            <View>
              <Text variant="titleMedium" style={styles.name}>
                {review.users.name}
              </Text>
              <Text variant="labelSmall" style={styles.username}>
                {review.users.username}
              </Text>
            </View>
          </View>

          <View style={styles.likeContainer}>
            <Text>{review.likeCount}</Text>
            <IconButton
              icon={hasLikedReview ? "heart" : "heart-outline"}
              size={20}
              onPress={handleLike}
            />
          </View>
        </View>

        <Divider />

        <Text>{review.review}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.ui.lightDark,
  },
  cardContent: {
    gap: theme.spaces.sm,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spaces.sm,
  },
  name: {
    fontWeight: "bold",
  },
  username: {
    color: theme.COLORS.text.secondary,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
