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
        append_to_response: "credits",
      },
    });

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
}

export default new DetailsService();
