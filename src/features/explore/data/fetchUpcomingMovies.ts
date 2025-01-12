import ExploreServices from "../services/explore.services";
import { Movie } from "../types/Movies.types";
import {
  sortUpcomingMovies,
  formatMovieResponse,
} from "../../../utils/formatters";

export async function fetchUpcomingMovies(): Promise<Movie[]> {
  const upcomingMovies = await ExploreServices.getUpcomingMovies();
  const formatedUpcomingMovies = upcomingMovies.map((movie) =>
    formatMovieResponse(movie),
  );

  return sortUpcomingMovies(formatedUpcomingMovies);
}
