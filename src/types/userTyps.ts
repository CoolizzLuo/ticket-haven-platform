export interface User {
  username: string;
  email: string;
  email_verify: boolean;
  gender: 0 | 1;
  phone: string;
  phone_verify: boolean;
  activity_region: string;
  birth: string;
}
