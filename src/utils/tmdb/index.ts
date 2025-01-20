import { Genre } from "../../features/explore/types/Movies.types";

export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

export const decimalToPercentage = (value: number) => {
  return `${Math.ceil(value * 10)}%`;
};

export const generateGenreLabel = (genres: Genre[]) => {
  return genres
    .filter((_, idx) => idx < 3)
    .map((genre) => genre.name)
    .join(" • ");
};
