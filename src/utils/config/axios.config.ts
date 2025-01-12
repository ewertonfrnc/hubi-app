import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_TMDB_URL;

export default function api() {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
    },
  });
}
