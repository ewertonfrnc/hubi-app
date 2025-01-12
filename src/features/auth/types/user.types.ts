export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
};

export type UserPayload = {
  id?: string;
  name: string;
  email: string;
  username: string;
  password: string;
};
