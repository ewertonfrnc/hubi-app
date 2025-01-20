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
      .select("*, users(*)")
      .eq("movieId", movieId)
      .order("likeCount", { ascending: false });

    if (error) throw new Error(error.message);

    return data;
  }

  async registerMovieReview(review: MovieReviewPayload): Promise<MovieReview> {
    const { data, error } = await supabase
      .from("movie_reviews")
      .insert([review])
      .select();

    if (error) throw new Error(error.message);

    return data[0];
  }

  async addMovieReviewLike(userId: string, movieReviewId: number) {
    const { data, error } = await supabase
      .from("movie_reviews_likes")
      .insert([{ userId, movieReviewId }])
      .select(`*, movie_reviews(likeCount,movieId)`)
      .single();

    if (error) {
      throw new Error(`Error adding like: ${error.message}`);
    }

    console.log("data", data);
    return data;
  }

  async removeMovieReviewLike(userId: string, reviewId: number) {
    const { data, error } = await supabase
      .from("movie_reviews_likes")
      .delete()
      .eq("userId", userId)
      .eq("movieReviewId", reviewId)
      .select(`*, movie_reviews(likeCount,movieId)`)
      .single();

    if (error) {
      throw new Error(`Error removing like: ${error.message}`);
    }

    return data;
  }

  async updateLikeCount(currentCount: number, movieId: number) {
    const { data, error } = await supabase
      .from("movie_reviews")
      .update({ likeCount: currentCount + 1 })
      .eq("movieId", movieId)
      .select();

    if (error) throw new Error(error.message);

    console.log("updateLikeCount", data);
    return data;
  }

  async hasLiked(userId: string, reviewId: number) {
    const { data, error } = await supabase
      .from("movie_reviews_likes")
      .select("userId, movieReviewId")
      .eq("userId", userId)
      .eq("movieReviewId", reviewId)
      .single();

    if (error && error.code !== "PGRST116") {
      // Ignorar erro de não encontrado
      throw new Error(`Error checking like: ${error.message}`);
    }

    return !!data;
  }
}

export default new DetailsService();
