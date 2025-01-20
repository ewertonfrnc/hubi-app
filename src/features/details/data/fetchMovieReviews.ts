import { MovieReview } from "../../explore/types/Movies.types";
import DetailsService from "../services/details.services";

export async function fetchMovieReviews(
  movieId: number
): Promise<MovieReview[]> {
  return await DetailsService.loadMovieReviews(movieId);
}
