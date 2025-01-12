import { Movie } from "../types/Movies.types";
import ExploreServices from "../services/explore.services";
import { formatMovieResponse } from "../../../utils/formatters";

export async function fetchTrending(): Promise<Movie[]> {
  const trendingMovies = await ExploreServices.getTrendingMovies();
  return trendingMovies.map((movie) => formatMovieResponse(movie));
}
