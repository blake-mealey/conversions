import { Expose } from 'class-transformer';

export class AuthResponse {
  @Expose() public readonly code: string;
  @Expose() public readonly state: string;
}
