import {
  CastMember,
  CrewMember,
  Movie,
  TMDBCastMember,
  TMDBCrewMember,
  TMDBMovie,
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
    genreIds: movie.genre_ids,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    runtime: movie?.runtime,
    cast: movie?.credits ? formatCastMember(movie?.credits?.cast) : [],
    crew: movie?.credits ? formatCrewMember(movie?.credits?.crew) : [],
  };
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
