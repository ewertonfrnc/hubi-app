import DetailsServices from "../services/details.services";

export async function registerReviewLike(
  userId: string,
  reviewId: number,
): Promise<void> {
  const {
    movie_reviews: { likeCount, movieId },
  } = await DetailsServices.addMovieReviewLike(userId, reviewId);
  await DetailsServices.updateLikeCount(likeCount, movieId);
}
