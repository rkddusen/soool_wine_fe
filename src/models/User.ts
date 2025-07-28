export interface SignUp {
  id: string;
  password: string;
  email: string;
  code: number | "";
}

export interface User {
  id: string;
  email: string;
}
