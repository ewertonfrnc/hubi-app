import {
  CastMember,
  CrewMember,
  Movie,
  MovieReview,
  TMDBCastMember,
  TMDBCrewMember,
  TMDBMovie,
  TMDBReview,
} from "../../features/explore/types/Movies.types";

export function formatMovieResponse(movie: TMDBMovie): Movie {
  return {
    backdropPath: movie.backdrop_path,
    id: movie.id,
    title: movie.title || movie.name,
    tagline: movie.tagline,
    originalTitle: movie.original_title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    mediaType: movie.media_type,
    genreIds: movie.genres,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    runtime: movie?.runtime,
    reviews: movie.reviews ? formatTMDBMovieReview(movie?.reviews.results) : [],
    cast: movie?.credits ? formatCastMember(movie?.credits?.cast) : [],
    crew: movie?.credits ? formatCrewMember(movie?.credits?.crew) : [],
  };
}

export function formatTMDBMovieReview(reviews: TMDBReview[]): MovieReview[] {
  return reviews.map((review) => ({
    id: review.id,
    review: review.content,
    createdAt: review.created_at,
    likeCount: 0,
    users: {
      email: "",
      createdAt: "",
      name: review.author,
      id: review.author_details.username,
      username: review.author_details.username,
      avatarPath: review.author_details.avatar_path,
    },
  }));
}

export function formatCastMember(members: TMDBCastMember[]): CastMember[] {
  return members.map((member) => ({
    adult: member.adult,
    castId: member.cast_id,
    character: member.character,
    creditId: member.credit_id,
    gender: member.gender,
    id: member.id,
    knownForDepartment: member.known_for_department,
    name: member.name,
    order: member.order,
    originalName: member.original_name,
    popularity: member.popularity,
    profilePath: member.profile_path,
  }));
}

export function formatCrewMember(members: TMDBCrewMember[]): CrewMember[] {
  return members.map((member) => ({
    adult: member.adult,
    creditId: member.credit_id,
    gender: member.gender,
    id: member.id,
    knownForDepartment: member.known_for_department,
    name: member.name,
    originalName: member.original_name,
    popularity: member.popularity,
    profilePath: member.profile_path,
    job: member.job,
    department: member.department,
  }));
}
