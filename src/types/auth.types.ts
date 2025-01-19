type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

type SignupRequest = {
  fullName: string;
  email: string;
  password: string;
};

type SignupResponse = User;
