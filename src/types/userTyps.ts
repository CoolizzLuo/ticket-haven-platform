export interface User {
  username: string;
  email: string;
  emailVerify: boolean;
  gender: 0 | 1;
  phone: string;
  phoneVerify: boolean;
  activityRegion: number | '';
  birth: string;
}

export interface SigninForm {
  email: string;
  password: string;
}

export interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
