export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
  avatarPath?: string;
};

export type UserPayload = {
  id?: string;
  name: string;
  email: string;
  username: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
