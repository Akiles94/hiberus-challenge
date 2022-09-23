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
