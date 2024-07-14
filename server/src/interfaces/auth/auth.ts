import { User } from '../../futures/user/shemas/user.schema';

export interface TokenResponse {
  access_token: {
    token: string;
    expires: string;
  };
  refresh_token: {
    token: string | undefined;
    expires: string;
  };
  user: User;
}
