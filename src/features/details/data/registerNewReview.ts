import DetailsServices from "../services/details.services";
import {
  MovieReview,
  MovieReviewPayload,
} from "../../explore/types/Movies.types";

export async function registerNewReview(
  movieReviewPayload: MovieReviewPayload,
): Promise<MovieReview> {
  return await DetailsServices.registerMovieReview(movieReviewPayload);
}
