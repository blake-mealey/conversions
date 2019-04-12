import { Expose } from 'class-transformer';

export class UserAuth {
  @Expose() public readonly accessToken: string;
  @Expose() public readonly displayName: string;
  @Expose() public readonly profilePictureUrl: string;
}
