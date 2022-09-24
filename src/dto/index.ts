import { User } from '../models';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

export type SignUpRequest = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type GetUsersResponse = {
  count: number;
  items: User[];
};
