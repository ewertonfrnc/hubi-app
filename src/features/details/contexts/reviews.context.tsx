import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { MovieReview } from "../../explore/types/Movies.types";

type InitialState = {
  reviews: MovieReview[];
  setReviews: Dispatch<SetStateAction<MovieReview[]>>;
};

export const ReviewsContext = createContext<InitialState>({
  reviews: [],
  setReviews: () => null,
});

type Props = { children: ReactNode };
export function ReviewsProvider({ children }: Props) {
  const [reviews, setReviews] = useState<MovieReview[]>([]);

  return (
    <ReviewsContext.Provider value={{ reviews, setReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
}
