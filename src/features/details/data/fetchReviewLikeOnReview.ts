import DetailsServices from "../services/details.services";

export async function fetchReviewLikesOnReview(reviewId: number) {
  return await DetailsServices.checkReviewLikesOnReview(reviewId);
}
