export interface LoginResponse {
  status: number;
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  firstname: string;
  lastname: string;
  dob: string;
  age: number;
  password: string;
}

export interface RegisterResponse {
  status: number;
  message: string;
}