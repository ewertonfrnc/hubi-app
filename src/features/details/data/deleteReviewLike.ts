import DetailsServices from "../services/details.services";

export async function deleteReviewLike(userId: string, reviewId: number) {
  const {
    movie_reviews: { likeCount, movieId },
  } = await DetailsServices.removeMovieReviewLike(userId, reviewId);
  await DetailsServices.updateLikeCount(likeCount, movieId);
}
