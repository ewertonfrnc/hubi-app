import api from "../../../utils/config/axios.config";
import {
  MovieReview,
  MovieReviewPayload,
  TMDBMovie,
} from "../../explore/types/Movies.types";
import supabase from "../../../utils/config/supabase.config";

class DetailsService {
  async getMovieDetails(movieId: number): Promise<TMDBMovie> {
    const { data } = await api().get(`/movie/${movieId}`, {
      params: {
        language: "pt-BR",
        append_to_response: "credits,reviews",
      },
    });

    return data;
  }

  async loadMovieReviews(movieId: number): Promise<MovieReview[]> {
    const { data, error } = await supabase
      .from("movie_reviews")
      .select(
        `
        *, 
        users: users(*),
        reviewLikes: movie_review_likes(*)
        `,
      )
      .eq("movieId", movieId);

    if (error) throw new Error(error.message);

    return data;
  }

  async registerMovieReview(review: MovieReviewPayload): Promise<MovieReview> {
    const { data, error } = await supabase
      .from("movie_reviews")
      .insert([review])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  }

  // async checkReviewLikesOnReview(reviewId: number) {
  //   const { data, error } = await supabase
  //     .from("movie_review_likes")
  //     .select("*")
  //     .eq("reviewId", reviewId);

  //   if (error) throw new Error(error.message);

  //   return data;
  // }

  async addMovieReviewLike(userId: string, reviewId: number) {
    const { data, error } = await supabase
      .from("movie_review_likes")
      .insert([{ userId, reviewId }])
      .select()
      .single();

    if (error) {
      throw new Error(`Error adding like: ${error.message}`);
    }

    return data;
  }

  async removeMovieReviewLike(userId: string, reviewId: number) {
    const { error } = await supabase
      .from("movie_review_likes")
      .delete()
      .eq("userId", userId)
      .eq("reviewId", reviewId);

    if (error) {
      throw new Error(`Error removing like: ${error.message}`);
    }
  }
}

export default new DetailsService();
