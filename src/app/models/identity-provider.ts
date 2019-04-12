import { Expose } from 'class-transformer';

export class IdentityProvider {
  @Expose() public readonly clientId: string;
  @Expose() public readonly displayName: string;
  @Expose() public readonly iconUrl: string;
  @Expose() public readonly authorizeUrl: string;
}
