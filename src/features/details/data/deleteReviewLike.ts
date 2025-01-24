import DetailsServices from "../services/details.services";

export async function deleteReviewLike(userId: string, reviewId: number) {
  return await DetailsServices.removeMovieReviewLike(userId, reviewId);
}
