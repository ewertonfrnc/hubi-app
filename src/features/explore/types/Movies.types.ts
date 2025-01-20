import { User } from "../../auth/types/user.types";

export type TMDBCastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type TMDBCrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export type TMDBReview = {
  id: number;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    avatar_path: string;
    name: string;
    rating: number;
    username: string;
  };
};

export type TMDBMovie = {
  backdrop_path: string;
  id: number;
  title: string;
  tagline: string;
  name: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv" | "person";
  adult: boolean;
  original_language: string;
  genres: Genre[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  reviews: { results: TMDBReview[] };
  credits: {
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
  };
};

export type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string;
  castId: number;
  character: string;
  creditId: string;
  order: number;
};

export type CrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  knownForDepartment: string;
  name: string;
  originalName: string;
  popularity: number;
  profilePath: string | null;
  creditId: string;
  department: string;
  job: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  backdropPath: string;
  id: number;
  title: string;
  tagline: string;
  originalTitle: string;
  overview: string;
  posterPath: string;
  mediaType: "movie" | "tv" | "person";
  genreIds: Genre[];
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  runtime: number;
  reviews: MovieReview[];
  cast: CastMember[];
  crew: CrewMember[];
};

export type MovieReview = {
  id: number;
  createdAt: string;
  movieId?: number;
  userId?: string;
  review: string;
  spoilers?: boolean;
  likeCount: number;
  users: User;
};

export type MovieReviewPayload = {
  userId: string;
  movieId: number;
  review: string;
  spoilers: boolean;
};

export type MovieRatingPayload = {
  movieId: number;
  userId: number;
  rating: 1 | 2 | 3 | 4 | 5;
};
