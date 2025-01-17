export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Details: {
    movieId: number;
  };
};

export type ExploreStackParamList = {
  Explore: undefined;
  Details: {
    movieId: number;
  };
};

export type AccountNavigatorParamList = {
  Register: undefined;
  Login: undefined;
};
