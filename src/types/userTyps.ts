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
