import { DateTime } from "luxon";
import { Movie } from "../../features/explore/types/Movies.types";

export function countReleaseDays(date: string): number {
  const TMDBDate = DateTime.fromISO(date);
  const today = DateTime.now();

  return Math.floor(TMDBDate.diff(today, "days").days);
}

export function sortUpcomingMovies(TMDBMovies: Movie[]): Movie[] {
  return TMDBMovies.sort((a, b) => {
    const dateA = DateTime.fromISO(a.releaseDate);
    const dateB = DateTime.fromISO(b.releaseDate);

    if (!dateA.isValid || !dateB.isValid) {
      throw new Error("Uma ou mais datas de lançamento são inválidas.");
    }

    return dateA.toMillis() - dateB.toMillis();
  });
}
