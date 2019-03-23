import { UserAuth } from '../user-auth';

export class AuthSessionResult {
  constructor(public success: boolean,
              public error: string,
              public userAuth: UserAuth) {
  }
}
