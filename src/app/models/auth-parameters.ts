import { Expose } from 'class-transformer';

export class AuthParameters {
  @Expose() public readonly clientId: string;
  @Expose() public readonly redirectUri: string;
  @Expose() public readonly code: string;
  @Expose() public readonly nonce: string;
}
