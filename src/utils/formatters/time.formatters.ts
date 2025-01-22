import { DateTime, Duration } from "luxon";
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

export const minToHours = (minutos: number) => {
  if (minutos < 0) return;

  const duration = Duration.fromObject({ minutes: minutos }).shiftTo(
    "hours",
    "minutes",
  );
  const hours = duration.hours;
  const minutes = duration.minutes;

  const formattedHours = hours > 0 ? `${Math.floor(hours)}h ` : "";
  const formattedMinutes = minutes > 0 ? `${Math.floor(minutes)}m` : "";

  return formattedHours + formattedMinutes;
};

export const getFullYear = (date: string) => {
  return new Date(date).getFullYear();
};

export function formatToHumanDate(date: Date) {
  return DateTime.fromJSDate(date).toFormat("DDDD");
}
