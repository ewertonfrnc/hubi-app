import DetailsServices from "../services/details.services";
import { formatMovieResponse } from "../../../utils/formatters";

export async function fetchMovieDetails(movieId: number) {
  const movieDetails = await DetailsServices.getMovieDetails(movieId);
  return formatMovieResponse(movieDetails);
}
