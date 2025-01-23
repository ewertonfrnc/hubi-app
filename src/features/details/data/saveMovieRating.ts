import DetailsServices from "../services/details.services";
import { MovieRatingPayload } from "../types";

export async function saveMovieRating(movieRatingPayload: MovieRatingPayload) {
  return await DetailsServices.saveMovieRating(movieRatingPayload);
}
