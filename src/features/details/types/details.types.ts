export type MovieRatingPayload = {
  userId: string;
  movieId: number;
  rating: 1 | 2 | 3 | 4 | 5;
};
