import DetailsServices from "../services/details.services";
import { MovieReview } from "../../explore/types/Movies.types";

export async function registerReviewLike(
  userId: string,
  reviewId: number
): Promise<MovieReview> {
  return await DetailsServices.addMovieReviewLike(userId, reviewId);
}
