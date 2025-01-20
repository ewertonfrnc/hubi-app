import DetailsServices from "../services/details.services";

export async function fetchReviewLikeOnReview(
  userId: string,
  reviewId: number,
): Promise<boolean> {
  return await DetailsServices.hasLiked(userId, reviewId);
}
