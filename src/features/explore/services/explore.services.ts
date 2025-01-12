import api from "../../../utils/config/axios.config";
import { TMDBMovie } from "../types/Movies.types";

class ExploreService {
  async getTrendingMovies(): Promise<TMDBMovie[]> {
    const { data } = await api().get("/trending/movie/day", {
      params: {
        language: "pt-BR",
      },
    });

    return data.results;
  }

  async getUpcomingMovies(): Promise<TMDBMovie[]> {
    const { data } = await api().get("/movie/upcoming", {
      params: {
        language: "pt-BR",
        region: "BR",
      },
    });

    return data.results;
  }
}

export default new ExploreService();
