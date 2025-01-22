import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Card,
  Divider,
  IconButton,
  Text,
} from "react-native-paper";
import { MovieReview } from "../../explore/types/Movies.types";
import { theme } from "../../../utils/theme";
import { BASE_IMAGE_URL } from "../../../utils/tmdb";
import { useContext, useEffect, useState } from "react";
import { registerReviewLike } from "../data/registerReviewLike";
import { deleteReviewLike } from "../data/deleteReviewLike";
import { AuthContext } from "../../auth/contexts/auth.context";

type Props = { review: MovieReview };
export default function Review({ review }: Props) {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [hasLikedReview, setHasLikedReview] = useState(false);
  const [reviewLikes, setReviewLikes] = useState(review.reviewLikes || []);

  function handleAvatarText() {
    return String(review.users.name.at(0));
  }

  async function handleLikeButton() {
    if (!currentUser) return;

    setLoading(true);

    if (hasLikedReview) {
      const updatedLikes = reviewLikes.filter(
        (like) => like.userId !== currentUser.id,
      );
      setReviewLikes(updatedLikes);

      try {
        await deleteReviewLike(currentUser.id, review.id);
        setHasLikedReview(false);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const newReviewLikeDetails = await registerReviewLike(
          currentUser.id,
          review.id,
        );

        setHasLikedReview(true);
        setReviewLikes((prevLikes) => [...prevLikes, newReviewLikeDetails]);
      } catch (error) {
        console.log("error", error);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    const liked = reviewLikes.some((like) => like.userId === currentUser?.id);
    setHasLikedReview(liked);
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
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text>{reviewLikes.length}</Text>
            )}

            <IconButton
              icon={hasLikedReview ? "heart" : "heart-outline"}
              size={20}
              onPress={handleLikeButton}
            />
          </View>
        </View>

        <Divider />

        <Text>{review.content}</Text>
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
